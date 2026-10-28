# Smoke Test BINA Guru

- Waktu: 2026-10-28T20:43:31.647Z
- Datasource uji: SQLite (test/schema.sqlite.prisma), mode BINA_TEST_SQLITE=1
- Skema utama PostgreSQL tidak diubah.

## Persiapan skema SQLite
  ✅ prisma generate + db push (SQLite) berhasil

  ✅ server naik & /health ok

## Register bebas (putaran BINA GURU)
  ✅ register email tanpa format & nama 1 huruf → 201
  ✅ register email ganda → 409
  ✅ login akun email bebas → 200
  ✅ register nama kosong → 400
  ✅ register guru → 201
  ✅ register siswa → 201
  ✅ guru buat kelas → 201
  ✅ siswa join kelas → 200

## Pengumuman kelas
  ✅ siswa membuat pengumuman → 403
  ✅ guru membuat pengumuman → 201
  ✅ siswa membaca pengumuman kelasnya
  ✅ guru lain membaca pengumuman → 403
  ✅ guru lain menghapus pengumuman → 403
  ✅ guru menghapus pengumumannya → 200
  ✅ pengumuman kosong setelah dihapus

## Jadwal + part + agenda hari ini
  ✅ guru membuat jadwal → 201
  ✅ tanggal jadwal tersimpan (YYYY-MM-DD)
  ✅ tambah part 1 → 201
  ✅ sortOrder part 1 = 0
  ✅ tambah part 2 + link Meet → 201
  ✅ sortOrder part 2 = 1
  ✅ siswa membaca jadwal (read-only) terurut
  ✅ guru mengubah link Meet part → 200
  ✅ agenda hari ini memuat jadwal + nama kelas
  ✅ siswa membuat jadwal → 403
  ✅ guru menghapus part → 200
  ✅ guru menghapus jadwal → 200
  ✅ jadwal kosong setelah dihapus (part ikut terhapus)

## Tugas masuk & pemantauan siswa
  ✅ guru membuat tugas → 201
  ✅ siswa submit (semua benar) → autoScore 100
  ✅ scores/sync siswa → 200
  ✅ tugas masuk memuat submission belum dinilai
  ✅ monitoring guru → 200 + data siswa ada
  ✅ monitoring: persen tugas 100% (1/1)
  ✅ monitoring: XP = 50+70+60+80 + rata-rata tugas 100 = 360
  ✅ monitoring: streak ≥ 1 (aktivitas hari ini)
  ✅ monitoring: lastActivityAt terisi
  ✅ siswa membuka monitoring → 403
  ✅ guru menilai submission → 200
  ✅ tugas masuk kosong setelah dinilai

## Chat guru↔siswa
  ✅ siswa membuka percakapan dengan guru → 201
  ✅ percakapan memuat nama guru
  ✅ siswa mengirim pesan → 201
  ✅ badge guru: 1 pesan belum dibaca
  ✅ daftar percakapan guru: unreadCount 1 + nama siswa
  ✅ guru membuka percakapan yang sama (upsert)
  ✅ guru menandai dibaca → 200
  ✅ badge guru kembali 0 setelah dibaca
  ✅ guru membalas pesan → 201
  ✅ siswa membaca 2 pesan terurut
  ✅ badge siswa: 1 (balasan guru)
  ✅ guru lain membaca percakapan → 403
  ✅ bukan anggota membuka percakapan → 403

## HASIL: SEMUA LULUS ✅
