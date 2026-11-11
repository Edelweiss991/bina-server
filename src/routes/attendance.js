// Absensi WAJAH harian (putaran sinkronisasi 12 Nov 2026).
//
// Selama ini absensi wajah hanya tersimpan lokal di HP siswa
// (riwayat per perangkat). Rute ini menyinkronkannya ke server:
// siswa mengirim satu catatan per tanggal setelah absen berhasil,
// dan GURU pemilik kelas dapat membaca daftar hadir per kelas +
// tanggal (siapa sudah absen, siapa belum, jam berapa).
//
// Foto bukti selfie TIDAK diunggah — tetap di perangkat siswa.
import { Router } from 'express';
import { prisma } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}(:\d{2})?$/;

// POST /api/attendance/check-in  { date: 'yyyy-MM-dd', time: 'HH:mm' }
// Siswa (peran apa pun yang terautentikasi): catat absensi wajah
// hari itu. Idempoten — kirim ulang di tanggal yang sama memperbarui
// jam, tidak menggandakan catatan.
router.post('/attendance/check-in', requireAuth, async (req, res, next) => {
  try {
    const { date, time } = req.body ?? {};
    if (!DATE_RE.test(date ?? '') || !TIME_RE.test(time ?? '')) {
      return res.status(400).json({
        error: 'Format tanggal (yyyy-MM-dd) atau jam (HH:mm) tidak valid.',
      });
    }
    const record = await prisma.faceAttendance.upsert({
      where: { userId_date: { userId: req.user.id, date } },
      create: { userId: req.user.id, date, time },
      update: { time },
    });
    return res.status(201).json({
      attendance: { id: record.id, date: record.date, time: record.time },
    });
  } catch (err) {
    return next(err);
  }
});

// GET /api/attendance/me — riwayat absensi wajah milik sendiri
// (maks 90 catatan terakhir), untuk verifikasi sinkronisasi.
router.get('/attendance/me', requireAuth, async (req, res, next) => {
  try {
    const rows = await prisma.faceAttendance.findMany({
      where: { userId: req.user.id },
      orderBy: { date: 'desc' },
      take: 90,
    });
    return res.json({
      attendances: rows.map((r) => ({ id: r.id, date: r.date, time: r.time })),
    });
  } catch (err) {
    return next(err);
  }
});

// GET /api/attendance/class/:classId?date=yyyy-MM-dd
// Daftar hadir untuk GURU pemilik kelas pada tanggal tsb: semua
// anggota kelas + status hadir & jam absensinya.
router.get(
  '/attendance/class/:classId',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const classId = Number(req.params.classId);
      const date = String(req.query.date ?? '');
      if (!Number.isInteger(classId) || classId <= 0 || !DATE_RE.test(date)) {
        return res
          .status(400)
          .json({ error: 'classId atau tanggal (yyyy-MM-dd) tidak valid.' });
      }
      const room = await prisma.classRoom.findUnique({
        where: { id: classId },
      });
      if (!room) {
        return res.status(404).json({ error: 'Kelas tidak ditemukan.' });
      }
      if (room.teacherId !== req.user.id) {
        return res
          .status(403)
          .json({ error: 'Kelas ini bukan kelas milik Anda.' });
      }
      const members = await prisma.classMember.findMany({
        where: { classId },
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { id: 'asc' },
      });
      const records = members.length
        ? await prisma.faceAttendance.findMany({
            where: { date, userId: { in: members.map((m) => m.userId) } },
          })
        : [];
      const byUser = new Map(records.map((r) => [r.userId, r]));
      const students = members.map((m) => {
        const rec = byUser.get(m.userId);
        return {
          userId: m.userId,
          name: m.user.name,
          email: m.user.email,
          present: Boolean(rec),
          time: rec ? rec.time : null,
        };
      });
      return res.json({
        class: { id: room.id, name: room.name, code: room.code },
        date,
        presentCount: students.filter((s) => s.present).length,
        totalCount: students.length,
        students,
      });
    } catch (err) {
      return next(err);
    }
  },
);

export default router;
