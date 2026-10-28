# Smoke Test Kelas Live BINA Server

- Waktu: 2026-10-28T20:42:45.611Z
- Datasource uji: SQLite (test/schema.sqlite.prisma), mode BINA_TEST_SQLITE=1
- Skema utama PostgreSQL tidak diubah.

## Persiapan skema SQLite
  ✅ prisma generate + db push (SQLite) berhasil

  ✅ server naik & /health ok

## Skenario dasar (akun & kelas)
  ✅ register guru → 201
  ✅ register siswa → 201
  ✅ guru buat kelas → 201
  ✅ siswa join kelas → 200
  ✅ siswa sync skor (pre 60, post 80, sim 95) → 200

## Briefing guru
  ✅ briefing → 200
  ✅ briefing classCount = 1
  ✅ briefing studentCount = 1
  ✅ briefing activeSessionCount = 0
  ✅ siswa membuka briefing → 403

## Sesi live & absensi otomatis
  ✅ guru buat sesi → 201
  ✅ sesi berstatus active
  ✅ buat sesi kedua saat masih ada yang aktif → 409
  ✅ siswa membuat sesi → 403
  ✅ siswa melihat sesi aktif
  ✅ siswa join sesi (absensi) → 200
  ✅ joinedAt tercatat
  ✅ join kedua (idempoten) → 200
  ✅ guru membagikan materi → 200
  ✅ state siswa → 200
  ✅ attendanceCount tetap 1 setelah join ganda
  ✅ myAttendance.joined = true
  ✅ materi tampil di state
  ✅ kode kelas ikut di state

## Kuis live — Boss Battle
  ✅ guru buat kuis → 201
  ✅ kuis waiting, bossHpRemaining = 10
  ✅ state: kuis waiting tanpa currentQuestion
  ✅ jawab sebelum kuis berjalan → 400
  ✅ guru start kuis → running, currentIndex 0
  ✅ state: currentQuestion tampil saat running
  ✅ state: correctIndex TIDAK bocor
  ✅ jawab soal yang bukan giliran → 400
  ✅ jawab soal 1 BENAR → correct true
  ✅ HP boss turun 10 → 9
  ✅ jawab soal yang sama dua kali → 409
  ✅ guru next → currentIndex 1
  ✅ jawab soal 2 SALAH → correct false, HP tetap 9
  ✅ next melewati akhir → finished

## Lampu pemahaman
  ✅ siswa kirim lampu kuning → 200
  ✅ counts kuning = 1
  ✅ guru melihat counts lampu {0:0, 1:1, 2:0}
  ✅ level di luar 0..2 → 400

## Breakout room & chat
  ✅ guru buat 2 kelompok → 201
  ✅ jumlah kelompok = 2
  ✅ seluruh siswa terbagi (1 orang)
  ✅ siswa melihat kelompoknya (myGroupId terisi)
  ✅ siswa kirim chat → 201
  ✅ chat ke kelompok lain → 403
  ✅ riwayat chat terbaca (1 pesan, nama pengirim ikut)

## Leaderboard XP & badge
  ✅ leaderboard → 200
  ✅ entri siswa ada
  ✅ XP siswa = 250 sesuai rumus
  ✅ badge Langkah Pertama didapat
  ✅ badge Master Simulator didapat (sim 95)
  ✅ attendanceCount = 1 & liveCorrect = 1

## Laporan orang tua
  ✅ guru menyusun laporan → 201
  ✅ narasi memuat nama siswa
  ✅ narasi memuat nama kelas
  ✅ narasi menyebut kekuatan (Simulator 95)
  ✅ siswa melihat laporannya (1 laporan)

## Akhiri sesi + ringkasan
  ✅ akhiri sesi → 200, status ended
  ✅ ringkasan attendanceCount = 1
  ✅ ringkasan quizCount = 1
  ✅ ringkasan lampu {0:0, 1:1, 2:0}
  ✅ tidak ada sesi aktif setelah diakhiri
  ✅ join setelah sesi berakhir → 400
  ✅ briefing akhir: activeSessionCount kembali 0

## HASIL: SEMUA LULUS ✅
