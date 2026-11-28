// Fungsi server Vercel. API key NVIDIA hanya dibaca dari environment variable (tidak pernah ke browser).
// mode "chat": mentor bertingkat. mode "quiz": pembuat soal pilihan ganda (JSON ketat, divalidasi di sini).
const DEPTH = {
  1: 'L1 ringkas sesuai jenjang.',
  2: 'L2 mulai dari cerita/perumpamaan benda sehari-hari.',
  3: 'L3 tiga sampai lima langkah bernomor, satu ide per langkah.',
  4: 'L4 kalimat maksimal 10 kata, satu contoh angka kecil, tanpa istilah sulit.'
};
const cap = { day: '', n: 0 }; // batas harian global (terbaik-upaya per instance)
const hits = new Map(); // pembatas laju per IP; terbaik-upaya (reset saat instance baru)
const clean = (s, n) => String(s == null ? '' : s).replace(/[\r\n\t]+/g, ' ').replace(/[<>{}`]/g, '').trim().slice(0, n);

function chatPrompt(b) {
  return `Kamu adalah mentor ${b.subject} (jalur: ${b.track}) untuk jenjang ${b.level}.
Gaya: ramah, sabar, memakai bahasa ${b.lang === 'en' ? 'Inggris' : 'Indonesia'}. Tingkat penjelasan sekarang: ${DEPTH[b.depth]}
Aturan:
1. Hanya bahas pelajaran/persiapan ujian. Jika di luar itu, tolak dengan sopan dan arahkan kembali.
2. Jangan langsung memberi jawaban soal; beri petunjuk dulu, lalu jawaban jika diminta.
3. Pujian jujur dan spesifik. Jangan pernah mengejek kesalahan.
4. Jika tidak yakin atau topiknya soal agama/sejarah sensitif, katakan tidak yakin dan sarankan bertanya ke guru atau orang tua. Jangan mengarang dalil, fakta, atau kisi-kisi.
5. Rumus ditulis dengan LaTeX di antara tanda $...$.
6. Akhiri dengan satu pertanyaan: Lanjut, tes dulu, atau ulangi lebih simpel?
7. Jangan membuat soal latihan atau ujian baru; arahkan ke menu Latihan.`;
}
function quizPrompt(b) {
  return `Kamu penyusun soal ujian Indonesia. Buat ${b.n} soal pilihan ganda untuk jalur "${b.track}", mapel "${b.subject}", jenjang "${b.level}"${b.topic ? `, topik "${b.topic}"` : ''}, dalam bahasa ${b.lang === 'en' ? 'Inggris' : 'Indonesia'}.
Soal harus sesuai kurikulum, silabus, atau kisi-kisi resmi jalur tersebut. Jika tidak yakin materi persisnya, buat soal konsep dasar yang pasti benar. Jangan menyalin soal berhak cipta. Variasikan tingkat kesulitan 1–5.
Setiap soal punya tepat 4 pilihan dan satu jawaban benar. Pastikan kunci jawaban benar dengan menghitung ulang sebelum menjawab.
Keluarkan HANYA JSON tanpa teks lain, tanpa tanda kutip balik, dengan bentuk:
{"questions":[{"body":"...","options":["...","...","...","..."],"answer_idx":0,"explanation":"...","difficulty":3}]}`;
}
function parseQuiz(text, n) {
  const a = text.indexOf('{'), z = text.lastIndexOf('}');
  if (a < 0 || z < a) return [];
  let d; try { d = JSON.parse(text.slice(a, z + 1)); } catch (e) { return []; }
  return (Array.isArray(d.questions) ? d.questions : []).map(q => {
    const o = Array.isArray(q.options) ? q.options.map(x => clean(x, 200)) : [];
    const idx = Number(q.answer_idx), df = Number(q.difficulty);
    if (!q.body || o.length < 2 || o.length > 5 || o.some(x => !x) || new Set(o).size !== o.length || !Number.isInteger(idx) || idx < 0 || idx >= o.length) return null;
    return { body: clean(q.body, 600), options: o, answer_idx: idx, explanation: clean(q.explanation, 500), difficulty: Number.isInteger(df) && df >= 1 && df <= 5 ? df : 3 };
  }).filter(Boolean).slice(0, n);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metode tidak diizinkan.' });
  res.setHeader('Cache-Control', 'no-store');
  const origin = req.headers.origin;
  if (origin) { let ok = false; try { ok = new URL(origin).host === req.headers.host; } catch (e) { ok = false; } if (!ok) return res.status(403).json({ error: 'Asal permintaan tidak diizinkan.' }); }
  if (!String(req.headers['content-type'] || '').includes('application/json')) return res.status(415).json({ error: 'Format tidak didukung.' });
  if (JSON.stringify(req.body || {}).length > 12000) return res.status(413).json({ error: 'Permintaan terlalu besar.' });
  const day = new Date().toISOString().slice(0, 10);
  if (cap.day !== day) { cap.day = day; cap.n = 0; }
  if (++cap.n > (Number(process.env.DAILY_LIMIT) || 500)) return res.status(429).json({ error: 'Jatah harian server habis. Coba lagi besok.' });
  const key = process.env.NVIDIA_API_KEY;
  if (!key) return res.status(500).json({ error: 'Server belum dikonfigurasi (NVIDIA_API_KEY).' });

  const ip = String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'x', now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) || []).filter(x => now - x < 60000);
  if (recent.length >= 10) return res.status(429).json({ error: 'Terlalu banyak permintaan. Tunggu sebentar.' });
  recent.push(now); hits.set(ip, recent);

  const r0 = req.body || {}, mode = r0.mode === 'quiz' ? 'quiz' : 'chat';
  const b = { track: clean(r0.track, 80), subject: clean(r0.subject, 80), level: clean(r0.levelText || r0.level, 60) || 'umum', topic: clean(r0.topic, 120), lang: r0.lang === 'en' ? 'en' : 'id', depth: Number(r0.depth) || 1, n: Math.min(10, Math.max(1, Number(r0.n) || 5)) };
  if (!b.track || !b.subject) return res.status(400).json({ error: 'Permintaan tidak valid.' });
  let messages;
  if (mode === 'chat') {
    if (!(b.depth in DEPTH) || !Array.isArray(r0.messages) || !r0.messages.length || r0.messages.length > 6) return res.status(400).json({ error: 'Permintaan tidak valid.' });
    const msgs = r0.messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 1000) }));
    if (msgs[msgs.length - 1].role !== 'user') return res.status(400).json({ error: 'Permintaan tidak valid.' });
    messages = [{ role: 'system', content: chatPrompt(b) }, ...msgs];
  } else messages = [{ role: 'system', content: quizPrompt(b) }, { role: 'user', content: 'Buat soalnya sekarang.' }];

  try {
    const r = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST', signal: AbortSignal.timeout(40000),
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify({ model: process.env.NVIDIA_MODEL || 'meta/llama-3.1-70b-instruct', max_tokens: mode === 'quiz' ? 2200 : 700, temperature: mode === 'quiz' ? 0.3 : 0.4, messages })
    });
    if (!r.ok) return res.status(502).json({ error: 'Penyedia AI menolak permintaan.' });
    const d = await r.json(), text = d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
    if (!text) return res.status(502).json({ error: 'Jawaban kosong.' });
    if (mode === 'chat') return res.status(200).json({ text });
    const questions = parseQuiz(text, b.n);
    return questions.length ? res.status(200).json({ questions }) : res.status(502).json({ error: 'AI belum menghasilkan soal yang valid. Coba lagi.' });
  } catch (e) {
    return res.status(502).json({ error: 'Gagal menghubungi penyedia AI.' });
  }
};
