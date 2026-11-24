# Ayek & Zaki — Belajar

Aplikasi belajar untuk maksimal 5 orang: Kurikulum Merdeka SD (isi awal: Matematika dan IPAS kelas 4), kerangka Lomba dan Persiapan Kuliah, Mentor AI bertingkat, tes penempatan, latihan adaptif, Buku Catatan Salah (pengulangan berjarak), PDF, cadangan, dan mode offline.

## Pasang (tanpa terminal)

### A. Supabase (database dan login) — gratis
1. Daftar di https://supabase.com → New project (catat kata sandi database, simpan baik-baik).
2. Authentication → Providers → Email: matikan **Confirm email** (supaya bisa langsung masuk).
3. SQL Editor → New query → tempel seluruh isi `supabase/schema.sql` → Run. Harus berhasil tanpa merah.
4. Project Settings → API: salin **Project URL**, **anon public key**, dan **service_role key**. Yang terakhir RAHASIA.

### B. GitHub
Buat repo baru, upload semua isi folder ini (Add file → Upload files). Pastikan folder `api`, `public`, `supabase`, `tools`, `tests`, `docs` tetap berupa folder.

### C. Vercel
1. https://vercel.com → Add New → Project → pilih repo → Deploy.
2. Settings → Environment Variables, tambahkan: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`, `NVIDIA_API_KEY`, `NVIDIA_MODEL` (lihat `.env.example`).
3. Deployments → titik tiga → **Redeploy**.

### D. Pertama kali dipakai
- **Ayek mendaftar paling dulu**: akun pertama otomatis menjadi penjaga. Setelah itu Zaki dan teman-teman mendaftar sendiri. Pendaftar ke-6 ditolak oleh database.
- Buka **Aku → Panel Ayek** untuk membuat PIN dan melihat laporan.

## Cek cepat setelah deploy
1. `alamat-anda.vercel.app/api/config` harus menampilkan JSON berisi `url` dan `anon` (bukan kosong).
2. Daftar, masuk, kerjakan satu soal, lalu coba Mentor AI.
3. Jika Mentor AI gagal: cek nama model di build.nvidia.com lalu perbarui `NVIDIA_MODEL` dan Redeploy.

## Isi konten
Soal ada di `public/content/*.json`. Semua soal contoh masih `"verified": false` dan tautan sumber masih `TODO`; isi tautan resmi dan periksa soal, lalu ubah menjadi `true`. Jalankan `node tools/validate-content.mjs` untuk memeriksa format.

## Batasan yang perlu diketahui
- NVIDIA gratis dibatasi (sekitar 40 permintaan per menit dan kredit awal terbatas, dan untuk pengembangan, bukan produksi). Jatah per orang diatur `AI_DAILY_LIMIT`.
- PIN Ayek hanya pagar ringan di HP; pengaman sebenarnya adalah peran penjaga dan RLS di Supabase.
- OCR foto berjalan di perangkat (Tesseract.js): bagus untuk teks cetak, lemah untuk tulisan tangan.
- Offline: materi, soal, dan progres tersedia; Mentor AI, sinkron, dan login pertama butuh internet.
- Daftar fitur dan statusnya ada di `docs/FITUR.md`.
