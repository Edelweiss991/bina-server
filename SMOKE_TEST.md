# Smoke Test BINA Server

- Waktu: 2026-10-28T05:00:19.392Z
- Datasource uji: SQLite (test/schema.sqlite.prisma), mode BINA_TEST_SQLITE=1
- Skema utama PostgreSQL tidak diubah.

## Persiapan skema SQLite
  ✅ prisma generate + db push (SQLite) berhasil

  ✅ server naik & /health ok

## Skenario
  ✅ register guru → 201
  ✅ token guru diterbitkan
  ✅ login guru → 200 + peran guru
  ✅ buat kelas → 201
  ✅ kode kelas 6 karakter
  ✅ register siswa → 201
  ✅ siswa join kelas → 200
  ✅ guru buat tugas → 201
  ✅ siswa dapat daftar tugas
  ✅ correctIndex TIDAK dikirim ke siswa
  ✅ submit → 200
  ✅ autoScore = 50
  ✅ guru melihat hasil siswa (autoScore 50)
  ✅ grade → score 85 + review tersimpan
  ✅ siswa melihat nilai final 85
  ✅ siswa melihat ulasan guru
  ✅ judul tugas & nama kelas ikut tampil
  ✅ scores/sync → 200 & tersimpan
  ✅ guru melihat skor tersinkron siswa
  ✅ siswa membuat kelas → 403

## HASIL: SEMUA LULUS ✅
