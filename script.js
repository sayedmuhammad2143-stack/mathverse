'use strict';
/* Katalog jalur belajar + tautan sumber. Tautan hanya yang benar-benar ditemukan saat pencarian (Nov 2026); yang null = [tautan resmi belum ditemukan].
   Soal TIDAK disimpan di sini: dibuat AI (NVIDIA) lewat /api/chat. Di bawah hanya 6 contoh soal sebagai acuan bentuk. */
(function () {
  const U = {
    sibi: 'https://buku.kemendikdasmen.go.id/', kur: 'https://kurikulum.kemdikbud.go.id/', cpipa: 'https://kurikulum.kemdikbud.go.id/file/cp/dasmen/14.%20CP%20IPA.pdf',
    pres: 'https://pusatprestasinasional.kemendikdasmen.go.id', kat: 'https://krti.kemdikbud.go.id/storage/unduhan/katalog-ajang-talenta-balai-pengembangan-talenta-indonesia-2025-497865.pdf',
    kurasi: 'https://simt.kemdikbud.go.id/guidelines/Pedoman%20Kurasi%20Talenta.pdf', snpmb: 'https://snpmb.id/utbk-snbt/informasi-umum', ptn: 'https://snpmb.id/utbk-snbt/daftar-ptn-snbt',
    tka: 'https://tka.kemendikdasmen.go.id', imo: 'https://www.imo-official.org/', ioi: 'https://ioinformatics.org', ibo: 'http://www.ibo-info.org/', ipho: 'http://ipho.org/',
    iol: 'http://www.ioling.org/', usaco: 'http://usaco.org/', ijso: 'http://www.ijsoweb.org/', euso: 'http://euso.eu', olymp: 'https://olympiads.win.tue.nl',
    sat: 'https://satsuite.collegeboard.org/practice', blue: 'https://bluebook.collegeboard.org/students', khan: 'https://khanacademy.org/test-prep/digital-sat'
  };
  const r = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => 'Kelas ' + (a + i));
  const SD = r(1, 6), SMP = r(7, 9), SMA = r(10, 12), ALL = r(1, 12);
  const s = (n, lv, t) => ({ n, lv: lv || ['Umum'], t: t || [] });
  const core = [s('Matematika', ALL), s('Bahasa Indonesia', ALL), s('Bahasa Inggris', r(3, 12)), s('IPAS', r(3, 6)), s('IPA', SMP), s('IPS', SMP), s('PAI dan Budi Pekerti', ALL), s('Pendidikan Pancasila', ALL), s('Informatika', r(7, 12)), s('Fisika', SMA), s('Kimia', SMA), s('Biologi', SMA), s('Ekonomi', SMA), s('Geografi', SMA), s('Sosiologi', SMA), s('Sejarah', SMA)];
  const extra = [s('PJOK', ALL), s('Antropologi', SMA), s('Seni Musik', ALL), s('Seni Rupa', ALL), s('Seni Teater', ALL), s('Seni Tari', ALL), s('Prakarya', r(1, 9)), s('Muatan Lokal dan Bahasa Daerah', ALL), s('Bahasa Arab', r(7, 12)), s('Bahasa Jepang', SMA), s('Bahasa Mandarin', SMA), s('Bahasa Jerman', SMA), s('Bahasa Prancis', SMA), s('Matematika Tingkat Lanjut', SMA), s('Pendidikan Agama Kristen', ALL), s('Pendidikan Agama Katolik', ALL), s('Pendidikan Agama Hindu', ALL), s('Pendidikan Agama Buddha', ALL), s('Pendidikan Agama Khonghucu', ALL)];
  const sci = lv => [s('Matematika', lv), s('IPA', lv), s('IPS', lv)];
  const lombaSub = ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Informatika', 'Ekonomi', 'Geografi', 'Astronomi', 'Kebumian'];
  window.AZ_CONTENT = {
    catalog: [
      { id: 'merdeka', name: 'Kurikulum Merdeka (berlaku saat ini)', note: 'Fase A kelas 1–2, B kelas 3–4, C kelas 5–6; IPAS mulai kelas 3. Daftar mapel per jenjang: [cek struktur kurikulum resmi].', links: [['Buku teks resmi (SIBI)', U.sibi], ['Portal Kurikulum Kemendikdasmen', U.kur], ['CP IPA Fase D (PDF resmi)', U.cpipa]], subjects: [...core, ...extra] },
      { id: 'k13', name: 'Kurikulum 2013', note: 'Buku K13 dan Merdeka sama-sama tersedia di SIBI. SD memakai tema terpadu.', links: [['Buku teks resmi (SIBI)', U.sibi]], subjects: [s('Tematik Terpadu', SD), s('Matematika', ALL), s('Bahasa Indonesia', ALL), s('IPA', SMP), s('IPS', SMP), s('PPKn', ALL), s('PAI dan Budi Pekerti', ALL), s('Bahasa Inggris', r(7, 12)), s('Fisika', SMA), s('Kimia', SMA), s('Biologi', SMA), s('Ekonomi', SMA), s('Geografi', SMA), s('Sosiologi', SMA), s('Sejarah Indonesia', SMA), ...extra] },
      { id: 'ktsp', name: 'KTSP 2006', note: 'Kurikulum Tingkat Satuan Pendidikan (Permendikbud 160/2014 sempat memberlakukannya kembali).', links: [['Arsip resmi KTSP', null]], subjects: [s('Matematika', ALL), s('Bahasa Indonesia', ALL), s('IPA', r(1, 9)), s('IPS', r(1, 9)), s('PKn', ALL), s('Bahasa Inggris', r(7, 12)), s('Fisika', SMA), s('Kimia', SMA), s('Biologi', SMA), ...extra] },
      { id: 'kbk', name: 'KBK 2004 dan kurikulum lama (1947–1994)', note: 'Kurikulum Berbasis Kompetensi serta rencana pelajaran/kurikulum sebelumnya. [rincian tahun dan arsip resmi belum diverifikasi]', links: [['Arsip resmi', null]], subjects: [s('Matematika', ALL), s('Bahasa Indonesia', ALL), s('IPA', ALL), s('IPS', ALL)] },
      { id: 'osn', name: 'OSN (Olimpiade Sains Nasional) — Puspresnas', note: 'Bidang menurut Katalog Ajang Talenta BPTI 2025: SD dan SMP (Matematika, IPA, IPS); SMA (Matematika, Fisika, Kimia, Biologi, Informatika, Ekonomi, Geografi, Astronomi, Kebumian). Ekshibisi AI SMA dibuka 2026.', links: [['Portal Pusat Prestasi Nasional', U.pres], ['Katalog Ajang Talenta 2025 (PDF)', U.kat], ['Pedoman Kurasi Talenta (PDF)', U.kurasi]], subjects: [...sci(['SD (Kelas 4–6)']).map(x => Object.assign(x, { n: 'OSN SD ' + x.n })), ...sci(['SMP (Kelas 7–9)']).map(x => Object.assign(x, { n: 'OSN SMP ' + x.n })), ...lombaSub.map(n => s('OSN SMA ' + n, ['SMA (Kelas 10–12)'])), s('Kecerdasan Artifisial (ekshibisi)', ['SMA'])] },
      { id: 'puspres', name: 'Ajang Puspresnas lainnya (terkurasi)', note: 'Dari Katalog BPTI 2025. Peringkat "bintang" kurasi: [tidak ditemukan di sumber yang saya baca; cek Pedoman Kurasi].', links: [['Portal Pusat Prestasi Nasional', U.pres], ['Katalog Ajang Talenta 2025 (PDF)', U.kat], ['Pedoman Kurasi Talenta (PDF)', U.kurasi]], subjects: [
        s('ONMIPA Matematika', ['Mahasiswa'], ['Aljabar linear', 'Struktur aljabar', 'Analisis real', 'Analisis kompleks', 'Kombinatorika']),
        s('ONMIPA Fisika', ['Mahasiswa'], ['Mekanika klasik', 'Mekanika kuantum', 'Elektrodinamika', 'Termodinamika dan fisika statistik', 'Fisika modern']),
        s('ONMIPA Kimia', ['Mahasiswa'], ['Kimia anorganik', 'Kimia fisika', 'Kimia organik', 'Kimia analitik']),
        s('ONMIPA Biologi', ['Mahasiswa'], ['Biologi sel', 'Biologi molekuler', 'Bioinformatika', 'Bioteknologi', 'Genetika', 'Fisiologi dan metabolisme', 'Perilaku', 'Keanekaragaman hayati dan evolusi', 'Ekologi']),
        s('OPSI (Olimpiade Penelitian Siswa)', ['SMP', 'SMA'], ['Metode penelitian', 'Penulisan karya ilmiah', 'Presentasi ilmiah']),
        s('GELATIK: Statistika dan Sains Data', ['Mahasiswa']), s('GELATIK: Pemrograman dan Keamanan Siber', ['Mahasiswa']),
        s('KBKI/FIKSI: Bisnis dan Kewirausahaan', ['SMA', 'Mahasiswa']), s('Kompetisi Debat Indonesia', ['SMA', 'Mahasiswa']),
        s('PKM / PIMNAS', ['Mahasiswa']), s('LKS/LKI SMK: Teknologi Informasi', ['SMK']), s('MTQ dan FLS2N (Sastra)', ['SD', 'SMP', 'SMA'])] },
      { id: 'intl', name: 'Olimpiade dan lomba internasional', note: 'Situs resmi yang saya temukan dicantumkan. IChO, IOAA, iGeo, IEO, IESO, IAO: lihat daftar rujukan (bukan situs resmi). Lomba matematika lain (APMO, AMC, Kangaroo): [tautan resmi belum dicari].', links: [['IMO (resmi)', U.imo], ['IOI (resmi)', U.ioi], ['IBO (resmi)', U.ibo], ['IPhO', U.ipho], ['IOL (linguistik)', U.iol], ['IJSO', U.ijso], ['EUSO', U.euso], ['USACO (latihan algoritma)', U.usaco], ['Daftar rujukan olimpiade sains (tidak resmi)', U.olymp]], subjects: ['IMO Matematika', 'IPhO Fisika', 'IChO Kimia', 'IOI Informatika', 'IBO Biologi', 'IOAA Astronomi', 'iGeo Geografi', 'IEO Ekonomi', 'IESO Kebumian', 'IJSO Sains Junior', 'IOL Linguistik', 'APMO Matematika', 'AMC Matematika', 'Mathematical Kangaroo'].map(n => s(n, ['Tingkat olimpiade'])) },
      { id: 'utbk', name: 'UTBK-SNBT (SNPMB)', note: '7 subtes: Tes Potensi Skolastik (4) dan Tes Literasi (3). Jumlah soal per subtes menurut paparan SNPMB 2026: PU 30, PPU 20, PBM 20, PK 20, LBI 30, LBE 20, PM 20.', links: [['Informasi umum SNPMB', U.snpmb], ['Daya tampung PTN SNBT', U.ptn]], subjects: [s('Penalaran Umum', ['SMA/UTBK'], ['Penalaran induktif', 'Penalaran deduktif', 'Penalaran kuantitatif']), s('Pengetahuan dan Pemahaman Umum', ['SMA/UTBK']), s('Pemahaman Bacaan dan Menulis', ['SMA/UTBK']), s('Pengetahuan Kuantitatif', ['SMA/UTBK']), s('Literasi Bahasa Indonesia', ['SMA/UTBK']), s('Literasi Bahasa Inggris', ['SMA/UTBK']), s('Penalaran Matematika', ['SMA/UTBK'])] },
      { id: 'tka', name: 'TKA (Tes Kemampuan Akademik)', note: 'SD/SMP: Bahasa Indonesia dan Matematika. SMA/SMK: Bahasa Indonesia, Matematika, Bahasa Inggris + 2 mapel pilihan (contoh: Fisika, Biologi, Sosiologi, Sejarah, Bahasa Jepang). Daftar pilihan lengkap: [cek portal].', links: [['Portal TKA', U.tka]], subjects: [s('TKA Bahasa Indonesia', ['SD', 'SMP', 'SMA']), s('TKA Matematika', ['SD', 'SMP', 'SMA']), s('TKA Bahasa Inggris', ['SMA']), s('TKA Fisika', ['SMA']), s('TKA Biologi', ['SMA']), s('TKA Sosiologi', ['SMA']), s('TKA Sejarah', ['SMA']), s('TKA Bahasa Jepang', ['SMA'])] },
      { id: 'sat', name: 'SAT (College Board)', note: 'Bluebook untuk tes latihan resmi, Khan Academy untuk latihan terarah.', links: [['Persiapan SAT resmi', U.sat], ['Bluebook', U.blue], ['Official SAT Prep (Khan Academy)', U.khan]], subjects: [s('SAT Reading and Writing', ['SMA']), s('SAT Math', ['SMA'])] },
      { id: 'kuliah', name: 'Ujian masuk kuliah lain (SNBP, mandiri PTN, ITB)', note: '[Tautan resmi SNBP/seleksi mandiri/SM-ITB belum dicari.] Soal AI hanya latihan umum.', links: [['Daya tampung PTN (SNPMB)', U.ptn]], subjects: [s('Tes Potensi Akademik', ['SMA']), s('Matematika Dasar', ['SMA']), s('Bahasa Inggris Akademik', ['SMA'])] }
    ],
    questions: [
      { id: 'cx1', subject: 'Matematika', level: 'Kelas 4', body: 'FPB dari 12 dan 18 adalah …', options: ['2', '3', '6', '36'], answer_idx: 2, explanation: 'Faktor 12: 1, 2, 3, 4, 6, 12. Faktor 18: 1, 2, 3, 6, 9, 18. Yang sama dan terbesar: 6.', difficulty: 3 },
      { id: 'cx2', subject: 'IPAS', level: 'Kelas 4', body: 'Perubahan wujud dari cair menjadi gas disebut …', options: ['membeku', 'mencair', 'menguap', 'mengembun'], answer_idx: 2, explanation: 'Cair ke gas = menguap.', difficulty: 2 },
      { id: 'cx3', subject: 'Matematika', level: 'Kelas 6', body: 'Rata-rata dari 6, 8, dan 10 adalah …', options: ['7', '8', '9', '24'], answer_idx: 1, explanation: '(6 + 8 + 10) ÷ 3 = 8.', difficulty: 3 },
      { id: 'cx4', subject: 'Penalaran Matematika', level: 'SMA/UTBK', body: 'Jika 2x + 3 = 11, nilai x adalah …', options: ['3', '4', '5', '7'], answer_idx: 1, explanation: '2x = 8, jadi x = 4.', difficulty: 2 },
      { id: 'cx5', subject: 'OSN SMA Matematika', level: 'SMA (Kelas 10–12)', body: 'Jumlah semua bilangan bulat positif ≤ 10 yang habis dibagi 3 adalah …', options: ['9', '15', '18', '27'], answer_idx: 2, explanation: '3 + 6 + 9 = 18.', difficulty: 2 },
      { id: 'cx6', subject: 'SAT Math', level: 'SMA', body: 'If 3x + 5 = 20, what is x?', options: ['3', '5', '6', '15'], answer_idx: 1, explanation: '3x = 15, so x = 5.', difficulty: 2 }
    ].map(q => Object.assign(q, { origin: 'contoh', verified: false }))
  };
})();

/* Lentera Belajar — frontend tanpa build. Data tersimpan di localStorage perangkat ini (belum ada database server). */
const KEY = 'az_v1', DAY = 864e5, BOX_DAYS = [1, 3, 7, 14, 30], MAX_LEVEL = 4;
const T = {
  id: { pilih: 'Pilih siapa yang belajar.', belajar: 'Belajar', latihan: 'Latihan', mentor: 'Mentor', aku: 'Aku' },
  en: { pilih: 'Choose who is learning.', belajar: 'Learn', latihan: 'Practice', mentor: 'Mentor', aku: 'Me' }
};
const $ = (s, r = document) => r.querySelector(s);
const today = () => new Date().toISOString().slice(0, 10);

let S, cur = null, tab = 'belajar', quiz = null, chat = { key: 'matematika', level: 1, msgs: [] };

const NUMS = ['ab', 'n', 'ok', 'grade'];
function defaults() { return { prefs: { theme: 'auto', font: 1, lang: 'id' }, pin: null, pinZ: null, reports: [], sheet: [], sel: null, bank: { topics: [], questions: [] }, users: { ayek: blank(), zaki: blank() } }; }
const isObj = x => x && typeof x === 'object' && !Array.isArray(x);
const safeKeys = o => Object.fromEntries(Object.entries(o).filter(([k]) => k !== '__proto__' && k !== 'constructor' && k !== 'prototype'));
const okQ = q => isObj(q) && typeof q.id === 'string' && /^[\w-]{1,40}$/.test(q.id) && typeof q.body === 'string' && Array.isArray(q.options) && q.options.every(o => typeof o === 'string') && Number.isInteger(q.answer_idx) && q.answer_idx >= 0 && q.answer_idx < q.options.length;
// hanya kunci yang dikenal yang disalin; objek dari berkas/penyimpanan tidak dipercaya begitu saja
function pickState(d, base) {
  if (!isObj(d)) return base;
  if (isObj(d.prefs)) { if (['auto', 'light', 'dark'].includes(d.prefs.theme)) base.prefs.theme = d.prefs.theme; if ([0.9, 1, 1.15, 1.3].includes(d.prefs.font)) base.prefs.font = d.prefs.font; if (['id', 'en'].includes(d.prefs.lang)) base.prefs.lang = d.prefs.lang; }
  ['pin', 'pinZ'].forEach(k => { if (typeof d[k] === 'string' && /^[0-9a-f]{32}\$[0-9a-f]{64}$/.test(d[k])) base[k] = d[k]; });
  if (isObj(d.sel)) base.sel = safeKeys(d.sel);
  if (Array.isArray(d.reports)) base.reports = d.reports.filter(r => isObj(r) && typeof r.qid === 'string').slice(0, 500).map(r => ({ qid: r.qid, reason: String(r.reason || '').slice(0, 200), status: r.status === 'closed' ? 'closed' : 'open', at: Number(r.at) || 0 }));
  if (Array.isArray(d.sheet)) base.sheet = d.sheet.filter(x => typeof x === 'string').slice(0, 20);
  if (isObj(d.bank)) { if (Array.isArray(d.bank.questions)) base.bank.questions = d.bank.questions.filter(okQ).slice(0, 3000); if (Array.isArray(d.bank.topics)) base.bank.topics = d.bank.topics.filter(x => isObj(x) && typeof x.title === 'string').slice(0, 500); }
  if (isObj(d.users)) ['ayek', 'zaki'].forEach(n => { const u = d.users[n]; if (!isObj(u)) return; const b = base.users[n];
    NUMS.forEach(k => { if (Number.isFinite(u[k])) b[k] = u[k]; }); ['queue', 'days', 'weekly', 'placed'].forEach(k => { if (isObj(u[k])) b[k] = safeKeys(u[k]); });
    if (Array.isArray(u.badges)) b.badges = u.badges.filter(x => typeof x === 'string').slice(0, 50); });
  return base;
}
function load() { try { return pickState(JSON.parse(localStorage.getItem(KEY)), defaults()); } catch (e) { return defaults(); } }
S = load(); // setelah semua definisi di atas siap (hindari TDZ)
function blank() { return { ab: 0.3, n: 0, ok: 0, queue: {}, days: {}, badges: [], grade: 4, placed: null }; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Penyimpanan penuh atau diblokir.'); } }
const me = () => S.users[cur];
const isGuardian = () => cur === 'ayek';

/* elemen aman: teks selalu lewat textContent, tidak pernah innerHTML dari data pengguna */
function h(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'on') for (const [ev, fn] of Object.entries(v)) e.addEventListener(ev, fn);
    else if (k === 'class') e.className = v; else e.setAttribute(k, v);
  }
  kids.flat().forEach(c => e.append(c instanceof Node ? c : document.createTextNode(c ?? '')));
  return e;
}
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove('on'), 2600); }
const t = k => (T[S.prefs.lang] || T.id)[k] || k;

/* tema & huruf */
function applyPrefs() {
  const dark = S.prefs.theme === 'dark' || (S.prefs.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.style.setProperty('--fs', S.prefs.font);
  document.documentElement.lang = S.prefs.lang;
  document.querySelectorAll('[data-t]').forEach(e => e.textContent = t(e.dataset.t));
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyPrefs);

/* masuk */
const hex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
async function kdf(pin, salt) { const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits']); return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: new TextEncoder().encode(salt), iterations: 150000 }, k, 256)); }
async function sha(pin) { const salt = hex(crypto.getRandomValues(new Uint8Array(16))); return salt + '$' + await kdf(pin, salt); }
async function checkPin(pin, stored) { const [salt, hh] = String(stored).split('$'); return !!hh && (await kdf(pin, salt)) === hh; }
const FKEY = KEY + '_f', fails = () => { try { return JSON.parse(localStorage.getItem(FKEY)) || { n: 0, until: 0 }; } catch (e) { return { n: 0, until: 0 }; } };
const lockLeft = () => Math.max(0, Math.ceil((fails().until - Date.now()) / 1000));
function failPin() { const f = fails(); f.n++; if (f.n >= 5) f.until = Date.now() + Math.min(300, 30 * 2 ** (f.n - 5)) * 1000; try { localStorage.setItem(FKEY, JSON.stringify(f)); } catch (e) { /* diabaikan */ } }
function enter(u) { cur = u; sessionStorage.setItem('az_cur', u); $('#gate').hidden = true; $('#app').hidden = false; $('#who').textContent = u === 'ayek' ? '🛡️ Ayek' : '🧒 Zaki'; go('belajar'); }
let installEv = null;
addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEv = e; });
let pendU = null;
document.querySelectorAll('[data-user]').forEach(b => b.addEventListener('click', () => {
  pendU = b.dataset.user;
  if (pendU === 'zaki' && !S.pinZ) return enter('zaki');
  const has = pendU === 'ayek' ? S.pin : S.pinZ;
  $('#pinForm').hidden = false; $('#pinLabel').textContent = has ? 'PIN ' + (pendU === 'ayek' ? 'Ayek' : 'Zaki') : 'Buat PIN Ayek (4–8 angka)'; $('#pin').focus();
}));
$('#pinForm').addEventListener('submit', async e => {
  e.preventDefault(); const v = $('#pin').value.trim();
  if (!/^\d{4,8}$/.test(v)) return toast('PIN harus 4–8 angka.');
  if (!window.crypto || !crypto.subtle) return toast('Buka lewat alamat https agar PIN bisa dipakai.');
  if (pendU === 'ayek' && !S.pin) { S.pin = await sha(v); save(); return enter('ayek'); }
  if (lockLeft() > 0) return toast(`Terlalu banyak percobaan. Tunggu ${lockLeft()} detik.`);
  if (await checkPin(v, pendU === 'ayek' ? S.pin : S.pinZ)) { try { localStorage.removeItem(FKEY); } catch (e) { /* diabaikan */ } enter(pendU); } else { failPin(); toast('PIN salah.'); $('#pin').value = ''; }
});

/* navigasi */
document.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => go(b.dataset.tab)));
function go(name) {
  tab = name;
  document.querySelectorAll('[data-tab]').forEach(b => b.dataset.tab === name ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current'));
  const v = $('#view'); v.replaceChildren(); ({ belajar: vLearn, latihan: vPractice, mentor: vMentor, aku: vMe })[name](v); v.focus({ preventScroll: true });
  $('#streakPill').textContent = '🔥 ' + streak() + ' hari';
}

/* bank soal: hanya yang verified & bersumber yang tampil ke siswa */
function seed() {
  const C = window.AZ_CONTENT; if (!C) return;
  const qs = new Set(S.bank.questions.map(x => x.id));
  C.questions.forEach(x => qs.has(x.id) || S.bank.questions.push(Object.assign({}, x)));
  save();
}
// siswa melihat soal yang sudah dicek Ayek, atau soal bawaan buatan Claude (diberi label)
const bank = () => S.bank.questions.filter(q => q.verified || q.origin);
const srcText = o => o.source_url ? o.source_url : o.origin === 'ai' ? 'dibuat AI (NVIDIA), belum diverifikasi manusia' : o.origin === 'contoh' ? 'contoh acuan bentuk soal' : 'belum ada sumber';
function validQ(q) {
  return q && typeof q.body === 'string' && q.body.length <= 1000 && Array.isArray(q.options) && q.options.every(o => typeof o === 'string' && o.length <= 300) && q.options.length >= 2 && q.options.length <= 6 &&
    Number.isInteger(q.answer_idx) && q.answer_idx >= 0 && q.answer_idx < q.options.length && /^https?:\/\//.test(q.source_url || '') &&
    Number.isInteger(q.difficulty) && q.difficulty >= 1 && q.difficulty <= 5;
}
function importBank(text) {
  let d; try { d = JSON.parse(text); } catch (e) { return toast('Berkas bukan JSON yang valid.'); }
  const topics = (Array.isArray(d.topics) ? d.topics.slice(0, 500) : []).filter(x => x && typeof x.title === 'string' && /^https?:\/\//.test(x.source_url || '')).map(x => ({ id: String(x.id || 't' + Math.random().toString(36).slice(2, 8)).slice(0, 40), title: x.title.slice(0, 200), grade: Number(x.grade) || 0, order_no: Number(x.order_no) || 0, summary: String(x.summary || '').slice(0, 1500), source_url: x.source_url }));
  const rawQ = Array.isArray(d.questions) ? d.questions.slice(0, 2000) : [], skipped = rawQ.length - rawQ.filter(validQ).length + ((Array.isArray(d.topics) ? d.topics.length : 0) - topics.length);
  const qs = rawQ.filter(validQ).map(q => ({ id: /^[\w-]{1,40}$/.test(String(q.id)) ? String(q.id) : '', subject: String(q.subject || '').slice(0, 80), level: String(q.level || '').slice(0, 60), body: q.body, options: q.options.slice(), answer_idx: q.answer_idx, explanation: String(q.explanation || '').slice(0, 600), difficulty: q.difficulty, source_url: q.source_url }));
  qs.forEach(q => { q.id = q.id || 'q' + Math.random().toString(36).slice(2, 9); q.verified = false; delete q.verified_by; });
  const ids = new Set(S.bank.questions.map(q => q.id)), tids = new Set(S.bank.topics.map(x => x.id));
  S.bank.questions.push(...qs.filter(q => !ids.has(q.id))); S.bank.topics.push(...topics.filter(x => !tids.has(x.id)));
  save(); toast(`Masuk: ${qs.length} soal, ${topics.length} materi. Ditolak: ${skipped}. Soal baru perlu diverifikasi Ayek.`); go(tab);
}

/* KATALOG */
const CAT = () => window.AZ_CONTENT.catalog;
function curSel() {
  const c = S.sel || {}, tr = CAT().find(t => t.id === c.track) || CAT()[0], sb = tr.subjects.find(x => x.n === c.subject) || tr.subjects[0];
  return { track: tr.id, subject: sb.n, level: sb.lv.includes(c.level) ? c.level : sb.lv[0], topic: sb.t.includes(c.topic) ? c.topic : '' };
}
const trackName = id => (CAT().find(t => t.id === id) || {}).name || id;

/* BELAJAR */
function vLearn(v) {
  v.append(h('h2', {}, '📚 ' + t('belajar')), h('p', { class: 'muted small' }, 'Pilih jalur lalu mapel. Tautan mengarah ke sumber resmi atau rujukan; soal dan penjelasan dibuat AI dan perlu dicek.'));
  CAT().forEach(tr => v.append(h('details', { class: 'card' }, h('summary', {}, h('strong', {}, tr.name)), h('p', { class: 'small muted' }, tr.note || ''),
    h('ul', {}, tr.links.map(([n, u]) => h('li', {}, u ? h('a', { href: u, target: '_blank', rel: 'noopener noreferrer' }, n) : n + ' — [tautan resmi belum ditemukan]'))),
    h('div', { class: 'chips' }, tr.subjects.map(sb => h('button', { class: 'chip', on: { click: () => { S.sel = { track: tr.id, subject: sb.n, level: sb.lv[0], topic: '' }; save(); go('latihan'); } } }, sb.n))))));
  S.bank.topics.forEach(x => v.append(h('article', { class: 'card' }, h('h3', {}, x.title), h('p', {}, x.summary || ''), h('p', { class: 'src' }, 'Sumber: ' + srcText(x)))));
}

/* LATIHAN: adaptif + Leitner */
function nextQ() {
  const u = me(), all = bank(), c = curSel(), same = all.filter(q => q.subject === c.subject), pool = same.length ? same : all, now = Date.now();
  if (!pool.length) return null;
  const due = Object.entries(me().queue).filter(([, r]) => r.due <= now).map(([id]) => pool.find(q => q.id === id)).filter(Boolean);
  if (due.length) return Object.assign({ review: true }, due[0]);
  const want = Math.min(5, Math.max(1, Math.round(1 + me().ab * 4)));
  const near = pool.slice().sort((a, b) => Math.abs(a.difficulty - want) - Math.abs(b.difficulty - want) || Math.random() - .5);
  return near[0];
}
function vPractice(v) {
  v.append(h('h2', {}, '✏️ ' + t('latihan')));
  const due = Object.values(me().queue).filter(r => r.due <= Date.now()).length, d = me().days[today()] || { done: 0, ok: 0 };
  const pct = Math.min(100, Math.round(d.done / 5 * 100));
  v.append(h('div', { class: 'card' }, h('div', { class: 'ring', style: `--p:${pct}` }, h('b', {}, d.done + '/5')),
    h('p', { class: 'muted', style: 'text-align:center' }, `Target harian 5 soal · ${due} soal di Buku Catatan Salah siap diulang`)));
  v.append(h('div', { class: 'row', style: 'margin-bottom:1rem' },
    h('button', { class: 'btn alt', on: { click: () => vPlace($('#view')) } }, '🧭 Tes penempatan' + (((me().placed || {})[curSel().subject]) ? ` (${me().placed[curSel().subject]})` : '')),
    h('button', { class: 'btn alt', on: { click: () => printSoal() } }, '🖨️ Lembar soal'),
    h('button', { class: 'btn alt', on: { click: () => printKunci() } }, '🔑 Kunci')));
  const box = h('div'); vGen(v, box); v.append(box);
  const q = nextQ();
  if (!q) return box.append(h('div', { class: 'card' }, 'Belum ada soal. Pilih jalur dan mapel di atas, lalu tekan "Buat 5 soal".'));
  renderQ(box, q);
}
function renderQ(box, q) {
  quiz = { q, t0: Date.now(), done: false };
  const card = h('div', { class: 'card' }, q.review ? h('span', { class: 'tag n' }, '🔁 Ulangan') : '', q.verified ? h('span', { class: 'tag v' }, '✔ Sudah dicek') : h('span', { class: 'tag n' }, '🤖 Belum dicek Ayek'), h('h3', {}, q.body));
  const fb = h('div');
  q.options.forEach((o, i) => card.append(h('button', { class: 'opt', on: { click: e => answer(i, card, fb, box) } }, h('b', {}, String.fromCharCode(65 + i) + '.'), o)));
  card.append(fb); box.replaceChildren(card);
}
function answer(i, card, fb, box) {
  if (quiz.done) return; quiz.done = true;
  const q = quiz.q, ok = i === q.answer_idx, u = me(), id = q.id, d = u.days[today()] = u.days[today()] || { done: 0, ok: 0 };
  card.querySelectorAll('.opt').forEach((b, k) => { b.disabled = true; if (k === q.answer_idx) { b.classList.add('ok'); b.prepend('✅ '); } else if (k === i) { b.classList.add('no'); b.prepend('🟠 '); } });
  u.n++; d.done++; if (ok) { u.ok++; d.ok++; }
  u.ab = ok ? Math.min(1, u.ab + 0.08) : Math.max(0, u.ab - 0.12); // sasaran sukses ±70–80% lewat naik-turun kesulitan
  const r = u.queue[id];
  if (ok && r) { r.box++; if (r.box > BOX_DAYS.length) delete u.queue[id]; else r.due = Date.now() + BOX_DAYS[r.box - 1] * DAY; }
  if (!ok) u.queue[id] = { box: 1, due: Date.now() + DAY, lapses: (r ? r.lapses : 0) + 1 };
  const kid = cur === 'zaki';
  fb.replaceChildren(h('div', { class: 'fb ' + (ok ? 'ok' : 'no') },
    h('strong', {}, ok ? '✅ Benar! Kerja bagus.' : (kid ? '🟠 Hampir! Coba lihat ini.' : '🟠 Belum tepat. Lihat pembahasan.')),
    h('p', {}, q.explanation || ''), h('p', { class: 'src' }, 'Sumber: ' + srcText(q))),
    h('div', { class: 'row' }, h('button', { class: 'btn', on: { click: () => go('latihan') } }, 'Soal berikutnya'),
      h('button', { class: 'btn alt', on: { click: () => report(q) } }, '🚩 Laporkan soal'),
      ok ? '' : h('button', { class: 'btn alt', on: { click: () => { go('mentor'); $('#msg').value = 'Aku salah soal ini: ' + q.body; } } }, 'Minta petunjuk mentor')));
  checkBadges(); save();
}

/* MENTOR */
function vMentor(v) {
  v.append(h('h2', {}, '🧑‍🏫 ' + t('mentor')));
  const cs = curSel();
  const sel = h('select', { id: 'mk', 'aria-label': 'Pilih mapel mentor', on: { change: e => { const [tid, n] = e.target.value.split('|'), sb = CAT().find(x => x.id === tid).subjects.find(x => x.n === n); S.sel = { track: tid, subject: n, level: sb.lv[0], topic: '' }; chat = { key: '', level: 1, msgs: [] }; save(); go('mentor'); } } },
    CAT().map(tr => h('optgroup', { label: tr.name }, tr.subjects.map(sb => h('option', Object.assign({ value: tr.id + '|' + sb.n }, (tr.id === cs.track && sb.n === cs.subject) ? { selected: '' } : {}), sb.n)))));
  const log = h('div', { class: 'chat', id: 'log', 'aria-live': 'polite' }), chips = h('div', { class: 'chips' });
  chat.msgs.forEach(m => log.append(h('div', { class: 'msg ' + (m.role === 'user' ? 'u' : 'a') }, m.content)));
  const ta = h('textarea', { id: 'msg', rows: '3', maxlength: '1000', placeholder: 'Tulis pertanyaanmu…', 'aria-label': 'Pesan untuk mentor' });
  const send = h('button', { class: 'btn', on: { click: () => ask(ta.value, log, chips, send) } }, 'Kirim');
  v.append(h('div', { class: 'card' }, sel, log, chips, ta, h('div', { class: 'row' }, send,
    h('button', { class: 'btn alt', on: { click: () => speak() } }, '🔊 Bacakan'),
    h('label', { class: 'btn alt', style: 'text-align:center;cursor:pointer' }, '📷 Foto → teks', h('input', { type: 'file', accept: 'image/*', hidden: '', on: { change: e => { const f = e.target.files[0]; e.target.value = ''; ocr(f, ta, send); } } })))));
  if (chat.msgs.length) chips.append(...followChips(log, chips, send, ta));
  v.append(h('p', { class: 'muted small' }, 'Mentor AI bisa keliru. Untuk soal agama atau sejarah sensitif, tanyakan juga ke guru atau orang tua.'));
}
function followChips(log, chips, send, ta) {
  const go2 = (txt, lvl) => { if (lvl) chat.level = Math.min(MAX_LEVEL, chat.level + 1); ask(txt, log, chips, send); };
  return [h('button', { class: 'chip', on: { click: () => go2('Lanjut ke bagian berikutnya.') } }, 'Lanjut'),
    h('button', { class: 'chip', on: { click: () => go('latihan') } }, 'Tes dulu (Latihan)'),
    h('button', { class: 'chip', disabled: chat.level >= MAX_LEVEL ? '' : null, on: { click: () => go2('Ulangi dengan lebih simpel.', true) } }, `Jelaskan lebih simpel (L${chat.level})`)];
}
async function ask(text, log, chips, send) {
  text = (text || '').trim(); if (!text) return toast('Tulis pertanyaan dulu.');
  log.append(h('div', { class: 'msg u' }, text)); chat.msgs.push({ role: 'user', content: text });
  const wait = h('div', { class: 'msg a' }, '…'); log.append(wait); log.scrollTop = log.scrollHeight; send.disabled = true;
  try {
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 30000);
    const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctl.signal,
      body: JSON.stringify({ mode: 'chat', track: trackName(curSel().track), subject: curSel().subject, levelText: curSel().level, depth: chat.level, lang: S.prefs.lang, messages: chat.msgs.slice(-6) }) });
    clearTimeout(to);
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d.error || 'Mentor sedang tidak bisa dihubungi.');
    wait.textContent = d.text; chat.msgs.push({ role: 'assistant', content: d.text });
    chips.replaceChildren(...followChips(log, chips, send));
    const ta = $('#msg'); if (ta) ta.value = '';
  } catch (e) {
    chat.msgs.pop(); wait.textContent = e.name === 'AbortError' ? 'Terlalu lama menunggu. Coba lagi.' : (navigator.onLine ? e.message : 'Kamu sedang offline. Mentor butuh internet.');
  } finally { send.disabled = false; log.scrollTop = log.scrollHeight; }
}
function speak() {
  const last = [...chat.msgs].reverse().find(m => m.role === 'assistant');
  if (!last) return toast('Belum ada jawaban untuk dibacakan.');
  if (!('speechSynthesis' in window)) return toast('Perangkat ini tidak mendukung suara.');
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(last.content.replace(/[$*#_`]/g, '')); u.lang = S.prefs.lang === 'en' ? 'en-US' : 'id-ID'; speechSynthesis.speak(u);
}

/* AKU: progres, lencana, papan skor sehat, pengaturan, ruang Ayek */
function streak() {
  let n = 0, d = new Date(); const days = me() ? me().days : {};
  if (!(days[d.toISOString().slice(0, 10)] || {}).done) d = new Date(d - DAY);
  while ((days[d.toISOString().slice(0, 10)] || {}).done) { n++; d = new Date(d - DAY); }
  return n;
}
const BADGES = { first10: ['🌱 10 soal pertama', u => u.n >= 10], streak3: ['🔥 Belajar 3 hari beruntun', () => streak() >= 3], streak7: ['🏅 7 hari beruntun', () => streak() >= 7], steady: ['🎯 Akurasi ≥ 70% (min. 20 soal)', u => u.n >= 20 && u.ok / u.n >= .7] };
function checkBadges() { const u = me(); Object.entries(BADGES).forEach(([k, [n, f]]) => { if (!u.badges.includes(k) && f(u)) { u.badges.push(k); toast('Lencana baru: ' + n); } }); }
function stats(u) { const w = Object.entries(u.days).filter(([d]) => Date.now() - new Date(d) < 7 * DAY).reduce((s, [, x]) => s + x.done, 0); return { n: u.n, acc: u.n ? Math.round(u.ok / u.n * 100) : 0, week: w, queue: Object.keys(u.queue).length }; }
function vMe(v) {
  const u = me(), s = stats(u);
  v.append(h('h2', {}, '🙂 ' + t('aku')),
    h('div', { class: 'card' }, h('h3', {}, 'Kemajuanku'), h('p', {}, `🔥 Beruntun: ${streak()} hari · ✏️ Minggu ini: ${s.week} soal · 📒 Catatan Salah: ${s.queue}`),
      h('p', { class: 'muted' }, 'Yang dibandingkan adalah konsistensi dan kemajuan pribadi, bukan nilai mentah.'),
      h('p', {}, '📅 Kuis mingguan: ' + (Object.entries(u.weekly || {}).sort().slice(-4).map(([d, w]) => `${d} ${w.done ? w.score + '/' + w.total : 'belum selesai'}`).join(' · ') || 'belum ada')),
      h('div', { class: 'chips' }, u.badges.length ? u.badges.map(k => h('span', { class: 'tag v' }, BADGES[k][0])) : h('span', { class: 'muted' }, 'Belum ada lencana. Mulai latihan ya!'))),
    h('div', { class: 'card' }, h('h3', {}, 'Tampilan'),
      sel('Tema', 'theme', [['auto', 'Otomatis'], ['light', 'Terang'], ['dark', 'Gelap']]),
      sel('Ukuran huruf', 'font', [[.9, 'Kecil'], [1, 'Normal'], [1.15, 'Besar'], [1.3, 'Sangat besar']]),
      sel('Bahasa', 'lang', [['id', 'Indonesia'], ['en', 'English']]),
      sel('Kelas (untuk mentor)', 'grade', Array.from({ length: 12 }, (_, i) => [i + 1, 'Kelas ' + (i + 1)]), true)),
    h('div', { class: 'card' }, h('h3', {}, '📲 Pasang di layar utama'), h('p', { class: 'muted small' }, 'Android (Chrome): menu ⋮ → Pasang aplikasi. iPhone (Safari): Bagikan → Tambah ke Layar Utama. Setelah dibuka sekali saat online, aplikasi bisa dibuka offline; fitur AI tetap butuh internet.'),
      installEv ? h('button', { class: 'btn', on: { click: async () => { installEv.prompt(); await installEv.userChoice.catch(() => {}); installEv = null; go('aku'); } } }, 'Pasang sekarang') : ''),
    h('div', { class: 'card' }, h('h3', {}, 'Data'), h('div', { class: 'row' },
      h('button', { class: 'btn alt', on: { click: exportData } }, 'Ekspor cadangan'),
      h('button', { class: 'btn alt', on: { click: printRekap } }, '🖨️ Rekap mingguan'),
      h('label', { class: 'btn alt', style: 'text-align:center;cursor:pointer' }, 'Impor cadangan', h('input', { type: 'file', accept: '.json', hidden: '', on: { change: e => readFile(e, restore) } })),
      h('button', { class: 'btn alt', on: { click: () => { if (confirm('Hapus semua data progres milikku di perangkat ini?')) { S.users[cur] = blank(); save(); go('aku'); } } } }, 'Hapus dataku')))
  );
  if (isGuardian()) vGuardian(v);
  v.append(h('button', { class: 'btn alt', on: { click: () => { sessionStorage.removeItem('az_cur'); location.reload(); } } }, 'Ganti pengguna'));
}
function sel(label, key, opts, user) {
  const store = user ? me() : S.prefs;
  return h('div', {}, h('label', {}, label), h('select', { on: { change: e => { const v = e.target.value; store[key] = ['font', 'grade'].includes(key) ? +v : v; save(); applyPrefs(); } } },
    opts.map(([v, n]) => h('option', Object.assign({ value: v }, String(store[key]) === String(v) ? { selected: '' } : {}), n))));
}
function vGuardian(v) {
  const z = stats(S.users.zaki), pend = S.bank.questions.filter(q => !q.verified), open = S.reports.filter(r => r.status === 'open');
  v.append(h('div', { class: 'card' }, h('h3', {}, 'PIN Zaki (opsional)'), h('input', { id: 'pz', type: 'password', inputmode: 'numeric', maxlength: '8', placeholder: S.pinZ ? 'PIN aktif · isi baru untuk ganti' : 'Kosong = Zaki masuk tanpa PIN', 'aria-label': 'PIN Zaki' }),
    h('div', { class: 'row' }, h('button', { class: 'btn', on: { click: async () => { const x = $('#pz').value.trim(); if (!/^\d{4,8}$/.test(x)) return toast('PIN 4–8 angka.'); S.pinZ = await sha(x); save(); toast('PIN Zaki disimpan.'); go('aku'); } } }, 'Simpan PIN'),
      h('button', { class: 'btn alt', on: { click: () => { S.pinZ = null; save(); toast('PIN Zaki dihapus.'); go('aku'); } } }, 'Hapus PIN'))));
  const rc = h('div', { class: 'card' }, h('h3', {}, `🚩 Laporan soal (${open.length})`));
  if (!open.length) rc.append(h('p', { class: 'muted' }, 'Tidak ada laporan terbuka.'));
  open.forEach(r => { const q = S.bank.questions.find(x => x.id === r.qid); rc.append(h('div', { class: 'fb' }, h('strong', {}, q ? q.body : r.qid), h('p', {}, 'Alasan: ' + r.reason), h('button', { class: 'btn alt', on: { click: () => { r.status = 'closed'; save(); go('aku'); } } }, 'Tutup laporan'))); });
  v.append(rc);
  v.append(h('div', { class: 'card' }, h('h3', {}, '🛡️ Laporan Zaki'),
    h('p', {}, `Soal dijawab: ${z.n} · Akurasi: ${z.acc}% · Minggu ini: ${z.week} · Catatan Salah: ${z.queue} · Beruntun: ${(() => { const c = cur; cur = 'zaki'; const s = streak(); cur = c; return s; })()} hari`)));
  v.append(h('div', { class: 'card' }, h('h3', {}, 'Impor bank materi'),
    h('p', { class: 'muted small' }, 'Format JSON: {"topics":[{"id":1,"title":"…","grade":4,"order_no":1,"summary":"…","source_url":"https://…"}],"questions":[{"topic_id":1,"body":"…","options":["a","b"],"answer_idx":0,"explanation":"…","difficulty":1,"source_url":"https://…"}]}. Entri tanpa source_url atau kunci jawaban tidak valid ditolak.'),
    h('input', { type: 'file', accept: '.json', on: { change: e => readFile(e, importBank) } })));
  const c = h('div', { class: 'card' }, h('h3', {}, `Verifikasi soal (${pend.length} menunggu)`), pend.length ? h('button', { class: 'btn alt', on: { click: () => { if (confirm('Tandai SEMUA soal menunggu sebagai sudah dicek? Lakukan hanya setelah Anda memeriksanya.')) { pend.forEach(q => { q.verified = true; q.verified_at = Date.now(); }); save(); go('aku'); } } } }, 'Tandai semua sudah dicek') : '');
  if (!pend.length) c.append(h('p', { class: 'muted' }, 'Tidak ada soal menunggu.'));
  pend.slice(0, 40).forEach(q => c.append(h('div', { class: 'fb' }, h('strong', {}, q.body), h('p', {}, q.options.map((o, i) => (i === q.answer_idx ? '✅ ' : '· ') + o).join(' | ')), h('p', { class: 'src' }, srcText(q)),
    h('div', { class: 'row' }, h('button', { class: 'btn', on: { click: () => { q.verified = true; q.verified_at = Date.now(); save(); go('aku'); } } }, 'Tandai sudah dicek'),
      h('button', { class: 'btn alt', on: { click: () => { S.bank.questions = S.bank.questions.filter(x => x !== q); save(); go('aku'); } } }, 'Buang')))));
  v.append(c);
}
function readFile(e, fn) { const f = e.target.files[0]; if (!f) return; if (f.size > 5e6) return toast('Berkas terlalu besar (maks. 5 MB).'); const r = new FileReader(); r.onload = () => fn(String(r.result)); r.readAsText(f); e.target.value = ''; }
function exportData() { const a = h('a', { href: URL.createObjectURL(new Blob([JSON.stringify(S)], { type: 'application/json' })), download: `lentera-belajar-${today()}.json` }); a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); }
function restore(txt) {
  try { const d = JSON.parse(txt); if (!isObj(d) || !isObj(d.users) || !isObj(d.users.ayek) || !isObj(d.users.zaki) || !isObj(d.bank)) throw 0; if (!confirm('Timpa semua data di perangkat ini dengan cadangan?')) return; S = pickState(d, defaults()); save(); applyPrefs(); go('aku'); toast('Cadangan dipulihkan.'); }
  catch (e) { toast('Berkas cadangan tidak valid.'); }
}

/* SOAL DARI AI (NVIDIA lewat /api/chat) */
async function genQs(m, n) {
  const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 45000);
  try {
    const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctl.signal,
      body: JSON.stringify({ mode: 'quiz', track: trackName(m.track), subject: m.subject, levelText: m.level, topic: m.topic || '', n, lang: S.prefs.lang }) });
    const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error || 'Gagal membuat soal.');
    const qs = (d.questions || []).map((q, i) => Object.assign(q, { id: 'ai' + Date.now().toString(36) + i, origin: 'ai', track: m.track, subject: m.subject, level: m.level, topic: m.topic || '', verified: false }));
    if (!qs.length) throw new Error('AI belum menghasilkan soal valid. Coba lagi.');
    S.bank.questions.push(...qs);
    const ai = S.bank.questions.filter(q => q.origin === 'ai'); // batasi 300 soal AI tersimpan
    if (ai.length > 300) { const keep = id => Object.values(S.users).some(u => u.queue[id] || Object.values(u.weekly || {}).some(w => w.ids.includes(id))); const drop = new Set(ai.slice(0, ai.length - 300).filter(q => !keep(q.id)).map(q => q.id)); S.bank.questions = S.bank.questions.filter(q => !drop.has(q.id)); }
    save(); return qs;
  } catch (e) { throw new Error(e.name === 'AbortError' ? 'Terlalu lama menunggu. Coba lagi.' : (navigator.onLine ? e.message : 'Kamu sedang offline. Pembuat soal butuh internet.')); }
  finally { clearTimeout(to); }
}
function record(q, ok) {
  const u = me(), d = u.days[today()] = u.days[today()] || { done: 0, ok: 0 }, r = u.queue[q.id];
  u.n++; d.done++; if (ok) { u.ok++; d.ok++; }
  u.ab = ok ? Math.min(1, u.ab + 0.08) : Math.max(0, u.ab - 0.12);
  if (ok && r) { r.box++; if (r.box > BOX_DAYS.length) delete u.queue[q.id]; else r.due = Date.now() + BOX_DAYS[r.box - 1] * DAY; }
  if (!ok) u.queue[q.id] = { box: 1, due: Date.now() + DAY, lapses: (r ? r.lapses : 0) + 1 };
}
function runSet(box, qs, title, done) {
  let i = 0, ok = 0;
  (function next() {
    if (i >= qs.length) { checkBadges(); save(); return done(ok); }
    const q = qs[i], card = h('div', { class: 'card' }, h('span', { class: 'tag' }, `${title} · ${i + 1}/${qs.length}`), h('span', { class: 'tag n' }, '🤖 Dibuat AI · belum diverifikasi'), h('h3', {}, q.body)), fb = h('div');
    q.options.forEach((o, k) => card.append(h('button', { class: 'opt', on: { click: () => {
      if (card.dataset.d) return; card.dataset.d = '1'; const good = k === q.answer_idx; record(q, good); if (good) ok++;
      card.querySelectorAll('.opt').forEach((b, j) => { b.disabled = true; if (j === q.answer_idx) { b.classList.add('ok'); b.prepend('✅ '); } else if (j === k) { b.classList.add('no'); b.prepend('🟠 '); } });
      fb.replaceChildren(h('div', { class: 'fb ' + (good ? 'ok' : 'no') }, h('strong', {}, good ? '✅ Benar!' : (cur === 'zaki' ? '🟠 Hampir! Coba lihat ini.' : '🟠 Belum tepat.')), h('p', {}, q.explanation || '')),
        h('div', { class: 'row' }, h('button', { class: 'btn', on: { click: () => { i++; next(); } } }, i + 1 < qs.length ? 'Berikutnya' : 'Selesai'), h('button', { class: 'btn alt', on: { click: () => report(q) } }, '🚩 Laporkan')));
    } } }, h('b', {}, String.fromCharCode(65 + k) + '.'), o)));
    card.append(fb); box.replaceChildren(card);
  })();
}
const resultCard = (ok, n) => h('div', { class: 'card' }, h('h3', {}, `Skor: ${ok}/${n}`), h('p', {}, 'Soal yang salah masuk Buku Catatan Salah dan akan diulang.'), h('button', { class: 'btn', on: { click: () => go('latihan') } }, 'Lanjut'));
function vGen(v, box) {
  const c = curSel(), tr = CAT().find(x => x.id === c.track), sb = tr.subjects.find(x => x.n === c.subject);
  const pick = (label, opts, val, fn) => h('div', {}, h('label', {}, label), h('select', { on: { change: e => { fn(e.target.value); save(); go('latihan'); } } }, opts.map(([o, n]) => h('option', Object.assign({ value: o }, String(o) === String(val) ? { selected: '' } : {}), n))));
  async function start(btn) { btn.disabled = true; box.replaceChildren(h('div', { class: 'card' }, 'AI sedang menyiapkan soal…')); try { const qs = await genQs(c, 5); runSet(box, qs, sb.n, ok => box.replaceChildren(resultCard(ok, qs.length))); } catch (e) { box.replaceChildren(h('div', { class: 'card' }, e.message)); } btn.disabled = false; }
  v.append(h('div', { class: 'card' }, h('h3', {}, '🤖 Soal dari AI'), h('p', { class: 'muted small' }, 'Dibuat NVIDIA LLM sesuai pilihanmu. Belum diverifikasi manusia; laporkan (🚩) jika ragu.'),
    pick('Jalur', CAT().map(x => [x.id, x.name]), c.track, x => { const n = CAT().find(y => y.id === x).subjects[0]; S.sel = { track: x, subject: n.n, level: n.lv[0], topic: '' }; }),
    pick('Mapel', tr.subjects.map(x => [x.n, x.n]), c.subject, x => { const n = tr.subjects.find(y => y.n === x); S.sel = { track: c.track, subject: x, level: n.lv[0], topic: '' }; }),
    pick('Jenjang', sb.lv.map(x => [x, x]), c.level, x => { S.sel = Object.assign({}, c, { level: x }); }),
    sb.t.length ? pick('Topik', [['', 'Semua topik'], ...sb.t.map(x => [x, x])], c.topic, x => { S.sel = Object.assign({}, c, { topic: x }); }) : '',
    h('div', { class: 'row' }, h('button', { class: 'btn', on: { click: e => start(e.currentTarget) } }, 'Buat 5 soal'), h('button', { class: 'btn alt', on: { click: () => weekly(box) } }, '📅 Kuis mingguan'))));
}
const mondayKey = () => { const d = new Date(), k = (d.getDay() + 6) % 7; return new Date(d - k * DAY).toISOString().slice(0, 10); };
async function weekly(box) {
  const u = me(); u.weekly = u.weekly || {}; const k = mondayKey(); let w = u.weekly[k];
  if (w && w.done) return toast(`Kuis minggu ini sudah selesai: ${w.score}/${w.total}. Kuis baru muncul Senin depan.`);
  if (!w) {
    box.replaceChildren(h('div', { class: 'card' }, 'AI menyiapkan 10 soal kuis mingguan…'));
    try { const c = curSel(), qs = await genQs(c, 10); w = u.weekly[k] = { subject: c.subject, ids: qs.map(q => q.id), score: 0, total: qs.length, done: false }; save(); }
    catch (e) { return box.replaceChildren(h('div', { class: 'card' }, e.message)); }
  }
  const qs = w.ids.map(id => S.bank.questions.find(q => q.id === id)).filter(Boolean);
  runSet(box, qs, 'Kuis mingguan', ok => { w.score = ok; w.done = true; save(); box.replaceChildren(resultCard(ok, w.total)); });
}

/* TES PENEMPATAN untuk mapel yang dipilih (jenjang berbasis kelas); soal dibuat AI; lulus = benar 2 dari 3 */
async function vPlace(v) {
  const c = curSel(), sb = CAT().find(x => x.id === c.track).subjects.find(x => x.n === c.subject), lv = sb.lv.filter(x => /^Kelas/.test(x));
  if (lv.length < 2) return toast('Tes penempatan hanya untuk mapel yang berjenjang kelas.');
  v.replaceChildren(h('h2', {}, '🧭 Tes penempatan: ' + sb.n)); const box = h('div'); v.append(box);
  const step = lv.length > 6 ? 2 : 1; let i = 0, passed = -1;
  async function round() {
    box.replaceChildren(h('div', { class: 'card' }, `AI menyiapkan soal ${lv[i]}…`));
    let qs; try { qs = await genQs(Object.assign({}, c, { level: lv[i], topic: '' }), 3); } catch (e) { return box.replaceChildren(h('div', { class: 'card' }, e.message)); }
    runSet(box, qs, lv[i], ok => { if (ok >= 2) { passed = i; if (i + step < lv.length) { i += step; return round(); } } finish(); });
  }
  function finish() {
    const u = me(), p = Math.max(0, passed); u.placed = (u.placed && typeof u.placed === 'object') ? u.placed : {}; u.placed[sb.n] = lv[p];
    u.ab = Math.min(0.9, 0.15 + 0.6 * p / (lv.length - 1)); S.sel = Object.assign({}, c, { level: lv[p] }); save();
    box.replaceChildren(h('div', { class: 'card' }, h('h3', {}, `Hasil: mulai dari ${lv[p]}`), h('button', { class: 'btn', on: { click: () => go('latihan') } }, 'Mulai latihan')));
  }
  round();
}

/* LAPORAN SOAL */
function report(q) {
  const r = prompt('Apa yang salah dengan soal ini? (maks. 200 huruf)'); if (!r || !r.trim()) return;
  S.reports.push({ qid: q.id, reason: r.trim().slice(0, 200), status: 'open', at: Date.now() }); save(); toast('Laporan terkirim ke Ayek.');
}

/* CETAK / SIMPAN PDF lewat dialog cetak peramban (tanpa pustaka) */
function printDoc(title, nodes) {
  let p = $('#print'); if (!p) { p = h('div', { id: 'print' }); document.body.append(p); }
  p.replaceChildren(h('h1', {}, title), h('p', {}, `Tanggal: ${today()}`), ...nodes);
  document.body.classList.add('printing');
  addEventListener('afterprint', () => document.body.classList.remove('printing'), { once: true });
  window.print();
}
function printSoal() {
  const pool = bank(); if (!pool.length) return toast('Belum ada soal.');
  S.sheet = pool.slice().sort(() => Math.random() - .5).slice(0, 10).map(q => q.id); save();
  const qs = S.sheet.map(id => S.bank.questions.find(q => q.id === id));
  printDoc('Lembar Soal — ' + (cur === 'ayek' ? 'Ayek' : 'Zaki'), [h('ol', {}, qs.map(q => h('li', {}, h('p', {}, q.body), h('p', {}, q.options.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join('    ')))))]);
}
function printKunci() {
  const qs = S.sheet.map(id => S.bank.questions.find(q => q.id === id)).filter(Boolean); if (!qs.length) return toast('Cetak lembar soal dulu.');
  printDoc('Kunci Jawaban', [h('ol', {}, qs.map(q => h('li', {}, `${String.fromCharCode(65 + q.answer_idx)}. ${q.options[q.answer_idx]} — ${q.explanation || ''}`)))]);
}
function printRekap() {
  const u = me(), s = stats(u), rows = Object.entries(u.days).sort().slice(-7).map(([d, x]) => h('li', {}, `${d}: ${x.done} soal, ${x.ok} benar`));
  printDoc('Rekap Mingguan — ' + (cur === 'ayek' ? 'Ayek' : 'Zaki'), [h('p', {}, `Total soal: ${s.n} · Akurasi: ${s.acc}% · Minggu ini: ${s.week} soal · Beruntun: ${streak()} hari · Catatan Salah: ${s.queue}`), h('ul', {}, rows)]);
}

/* OCR di perangkat (Tesseract.js dimuat saat dibutuhkan; data bahasa diunduh pertama kali) */
async function ocr(file, ta, btn) {
  if (!file) return; if (!/^image\//.test(file.type)) return toast('Pilih berkas gambar.'); if (file.size > 8e6) return toast('Foto terlalu besar (maks. 8 MB).');
  btn.disabled = true; toast('Membaca foto… butuh internet saat pertama kali.');
  try {
    if (!window.Tesseract) await new Promise((ok, no) => { const sc = h('script', { src: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js' }); sc.onload = ok; sc.onerror = () => no(new Error('muat gagal')); document.head.append(sc); });
    const r = await Tesseract.recognize(file, 'ind+eng'); ta.value = String(r.data.text || '').trim().slice(0, 1000);
    toast(ta.value ? 'Selesai. Periksa dan edit teksnya dulu.' : 'Tidak ada teks terbaca. Coba foto lebih jelas.');
  } catch (e) { toast('Gagal membaca foto. Cek internet atau ketik manual.'); } finally { btn.disabled = false; }
}

/* mulai */
seed();
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) navigator.serviceWorker.register('sw.js').catch(() => { /* offline mode opsional */ });
applyPrefs();
const prev = sessionStorage.getItem('az_cur');
if (prev && S.users[prev]) enter(prev); else $('#gate').hidden = false;
