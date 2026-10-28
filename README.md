# BINA Server — Backend Kelas Online

API untuk fitur **Kelas Online** aplikasi BINA (Belajar Instalasi dan
Perakitan Komputer): akun Guru & Siswa, kelas berkode, tugas/soal dari
guru, pengumpulan jawaban dengan skor otomatis, penilaian & ulasan
guru, dan sinkronisasi skor belajar siswa (pretest, posttest, latihan,
simulator).

Stack: Node.js + Express + Prisma + PostgreSQL (JWT + bcryptjs).

## Menjalankan lokal

```bash
cp .env.example .env   # isi DATABASE_URL & JWT_SECRET
npm install
npx prisma generate
npx prisma db push     # membuat tabel dari prisma/schema.prisma
npm start              # http://localhost:4000 (PORT dari env)
```

Cek kesehatan: `GET /health` → `{"ok":true}`.

Tanpa PostgreSQL lokal, jalankan smoke test ujung-ke-ujung yang memakai
datasource SQLite terpisah (skema utama tidak diubah):

```bash
npm run smoke          # hasil ringkas ditulis ke SMOKE_TEST.md
```

## Deploy (Render + Neon)

1. Buat database PostgreSQL di Neon, salin connection string-nya.
2. Di Render: *New Web Service* dari repo/folder ini — `render.yaml`
   sudah berisi konfigurasi (build: `npm install && npx prisma generate
   && npx prisma db push`, start: `node src/index.js`).
3. Isi env var `DATABASE_URL` (dari Neon) dan `JWT_SECRET` (acak,
   panjang) di dashboard Render — keduanya `sync: false`.
4. Setelah live, alamat service (mis. `https://bina-api.onrender.com`)
   menjadi nilai `kBinaServerBaseUrl` di aplikasi Flutter
   (`lib/config/server_config.dart`).

## Ringkasan endpoint (prefix `/api`, JWT Bearer)

| Method | Path | Peran | Keterangan |
|---|---|---|---|
| POST | `/auth/register` | publik | `{name,email,password,role}` → token + user |
| POST | `/auth/login` | publik | → token + user |
| GET | `/me` | semua | profil sendiri |
| POST | `/classes` | guru | buat kelas, server membuat kode 6 karakter |
| GET | `/classes` | semua | guru: kelas miliknya; siswa: kelas diikuti (+nama guru) |
| POST | `/classes/join` | siswa | gabung memakai `{code}` |
| GET | `/classes/:id/members` | guru pemilik | siswa + skor tersinkron mereka |
| POST | `/classes/:id/tasks` | guru pemilik | `{title,description?,questions:[{question,options[4],correctIndex}]}` |
| GET | `/classes/:id/tasks` | anggota | untuk siswa `correctIndex` TIDAK dikirim |
| POST | `/tasks/:id/submit` | siswa anggota | `{answers:[int]}` → skor otomatis 0–100 |
| GET | `/tasks/:id/results` | guru pemilik | semua submission tugas |
| PUT | `/submissions/:id/grade` | guru pemilik | `{score?, review?}` nilai final & ulasan |
| GET | `/my/results` | siswa | hasil tugas saya + nilai final + ulasan |
| POST | `/scores/sync` | siswa | upsert skor belajar (pre/posttest = terbaru; latihan/simulator = terbaik) |

Catatan perilaku: mengirim ulang jawaban tugas menimpa jawaban & skor
otomatis serta mengosongkan nilai final/ulasan guru (dinilai ulang).

## Kelas Live (putaran BINA LIVE)

| Method | Path | Peran | Keterangan |
|---|---|---|---|
| GET | `/guru/briefing` | guru | ringkasan: jumlah kelas/siswa, sesi aktif, belum dinilai, kiriman terbaru |
| POST | `/classes/:id/sessions` | guru pemilik | mulai sesi live `{title, openingText?}` — hanya 1 aktif per kelas (409 bila sudah ada) |
| GET | `/classes/:id/sessions/active` | anggota | sesi aktif kelas atau `null` |
| POST | `/sessions/:id/end` | guru pemilik | akhiri sesi → ringkasan (hadir, kuis, lampu) |
| POST | `/sessions/:id/join` | siswa anggota | masuk sesi = absensi otomatis tercatat |
| PUT | `/sessions/:id/material` | guru pemilik | `{materialText?, openingText?}` |
| GET | `/sessions/:id/state` | anggota | keadaan sesi untuk polling: hadir, kuis (+HP boss), lampu pemahaman. Soal berjalan TANPA `correctIndex` |
| POST | `/sessions/:id/quizzes` | guru pemilik | buat kuis Boss Battle `{title, questions, bossMaxHp?}` (bawaan HP = jumlah soal × 5) |
| POST | `/quizzes/:id/control` | guru pemilik | `{action: 'start' \| 'next' \| 'finish'}` |
| POST | `/quizzes/:id/answer` | siswa anggota | jawab soal berjalan → `{correct, bossHpRemaining}` |
| PUT | `/sessions/:id/understanding` | siswa anggota | lampu pemahaman `{level: 0\|1\|2}` |
| POST | `/sessions/:id/groups` | guru pemilik | bagi kelas acak ke `{groupCount}` kelompok breakout |
| GET | `/sessions/:id/groups` | anggota | daftar kelompok + kelompok saya |
| GET/POST | `/groups/:id/messages` | anggota kelompok | chat kelompok (guru pemilik boleh memantau) |
| GET | `/classes/:id/leaderboard` | anggota | papan prestasi XP & badge (rumus di bawah) |
| POST | `/classes/:id/students/:userId/parent-report` | guru pemilik | susun + simpan laporan naratif orang tua |
| GET | `/my/parent-reports` | siswa | laporan orang tua untuk dirinya |

**HP Boss** = `bossMaxHp − jumlah jawaban BENAR seluruh kelas` (tidak
pernah negatif).

**Rumus XP** per siswa dalam satu kelas:

```
XP = (pretest ?? 0) + (posttest ?? 0) + (latihanBest ?? 0) + (simulatorBest ?? 0)
   + 10 × kehadiran sesi live kelas ini
   + 5  × jawaban kuis live yang benar di kelas ini
   + rata-rata autoScore tugas kelas ini (dibulatkan; 0 bila belum ada)
```

**Badge:** `hadir-1` Langkah Pertama (hadir ≥1), `hadir-5` Hadir Andal
(hadir ≥5), `master-simulator` Master Simulator (simulatorBest ≥90),
`ahli-kuis` Ahli Kuis Live (jawaban live benar ≥20), `rajin-tugas`
Pejuang Tugas (submit ≥5 tugas), `bintang-kelas` Bintang Kelas
(XP ≥400).

Uji fitur live: `npm run smoke:live` (hasil di `SMOKE_TEST_LIVE.md`).
