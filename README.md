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
