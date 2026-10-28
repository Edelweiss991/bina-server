// Route putaran BINA GURU:
// - Pengumuman kelas (guru menulis/menghapus, anggota kelas membaca)
// - Jadwal mengajar per kelas + part/pertemuan + link Google Meet
// - Agenda hari ini untuk Beranda guru
// - Tugas masuk: submission yang belum dinilai lintas kelas guru
// - Penilaian > Pantau: pemantauan siswa per kelas (XP rumus yang sama
//   dengan papan prestasi, persen penyelesaian tugas, dan streak
//   aktivitas harian)
//
// Pola keamanan sama seperti route lain: JWT wajib, peran diperiksa,
// guru hanya mengelola kelas miliknya, siswa hanya membaca data
// kelas yang diikutinya.

import { Router } from 'express';

import { prisma } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

// ─── Helper umum ──────────────────────────────────────────────────────────────

async function findClass(classId) {
  if (!Number.isInteger(classId) || classId <= 0) return null;
  return prisma.classRoom.findUnique({ where: { id: classId } });
}

async function isClassMember(classId, userId) {
  const m = await prisma.classMember.findUnique({
    where: { classId_userId: { classId, userId } },
  });
  return Boolean(m);
}

/** Pastikan pemanggil adalah guru pemilik kelas; kirim error bila bukan. */
async function requireOwnedClass(req, res, classId) {
  const room = await findClass(classId);
  if (!room) {
    res.status(404).json({ error: 'Kelas tidak ditemukan.' });
    return null;
  }
  if (room.teacherId !== req.user.id) {
    res.status(403).json({ error: 'Kelas ini bukan milik Anda.' });
    return null;
  }
  return room;
}

/** Pastikan pemanggil anggota kelas (guru pemilik ATAU siswa anggota). */
async function requireClassAccess(req, res, room) {
  if (req.user.role === 'guru') {
    if (room.teacherId !== req.user.id) {
      res.status(403).json({ error: 'Kelas ini bukan milik Anda.' });
      return false;
    }
    return true;
  }
  if (!(await isClassMember(room.id, req.user.id))) {
    res.status(403).json({ error: 'Anda bukan anggota kelas ini.' });
    return false;
  }
  return true;
}

// ─── Helper tanggal (semua perbandingan memakai tanggal UTC) ─────────────────

/** 'YYYY-MM-DD' → Date tengah malam UTC; null bila format tidak valid. */
function parseDateOnly(value) {
  if (typeof value !== 'string') return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Date → kunci tanggal UTC 'YYYY-MM-DD'. */
function dateKeyUTC(date) {
  return date.toISOString().slice(0, 10);
}

// ─── Pengumuman ───────────────────────────────────────────────────────────────

function announcementShape(a) {
  return {
    id: a.id,
    classId: a.classId,
    authorId: a.authorId,
    authorName: a.author?.name ?? null,
    text: a.text,
    createdAt: a.createdAt,
  };
}

router.get('/classes/:id/announcements', requireAuth, async (req, res, next) => {
  try {
    const room = await findClass(Number(req.params.id));
    if (!room) return res.status(404).json({ error: 'Kelas tidak ditemukan.' });
    if (!(await requireClassAccess(req, res, room))) return;
    const rows = await prisma.announcement.findMany({
      where: { classId: room.id },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return res.json({ announcements: rows.map(announcementShape) });
  } catch (err) {
    return next(err);
  }
});

router.post(
  '/classes/:id/announcements',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const room = await requireOwnedClass(req, res, Number(req.params.id));
      if (!room) return;
      const { text } = req.body ?? {};
      if (!text || typeof text !== 'string' || text.trim() === '') {
        return res.status(400).json({ error: 'Isi pengumuman tidak boleh kosong.' });
      }
      if (text.length > 2000) {
        return res.status(400).json({ error: 'Pengumuman maksimal 2000 karakter.' });
      }
      const created = await prisma.announcement.create({
        data: { classId: room.id, authorId: req.user.id, text: text.trim() },
        include: { author: true },
      });
      return res.status(201).json({ announcement: announcementShape(created) });
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/announcements/:id',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const existing = await prisma.announcement.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ error: 'Pengumuman tidak ditemukan.' });
      }
      if (existing.authorId !== req.user.id) {
        return res.status(403).json({ error: 'Pengumuman ini bukan milik Anda.' });
      }
      await prisma.announcement.delete({ where: { id } });
      return res.json({ ok: true });
    } catch (err) {
      return next(err);
    }
  },
);

// ─── Jadwal mengajar + part ───────────────────────────────────────────────────

function partShape(p) {
  return {
    id: p.id,
    scheduleId: p.scheduleId,
    title: p.title,
    sortOrder: p.sortOrder,
    meetLink: p.meetLink ?? null,
  };
}

function scheduleShape(s) {
  return {
    id: s.id,
    classId: s.classId,
    title: s.title,
    // Tanggal dikirim sebagai 'YYYY-MM-DD' (kalender UTC) agar klien
    // tidak perlu menebak zona waktu.
    date: dateKeyUTC(s.date),
    parts: (s.parts ?? []).map(partShape),
  };
}

async function loadOwnedSchedule(req, res, scheduleId) {
  if (!Number.isInteger(scheduleId) || scheduleId <= 0) {
    res.status(404).json({ error: 'Jadwal tidak ditemukan.' });
    return null;
  }
  const schedule = await prisma.schedule.findUnique({
    where: { id: scheduleId },
  });
  if (!schedule) {
    res.status(404).json({ error: 'Jadwal tidak ditemukan.' });
    return null;
  }
  if (schedule.teacherId !== req.user.id) {
    res.status(403).json({ error: 'Jadwal ini bukan milik Anda.' });
    return null;
  }
  return schedule;
}

router.get('/classes/:id/schedules', requireAuth, async (req, res, next) => {
  try {
    const room = await findClass(Number(req.params.id));
    if (!room) return res.status(404).json({ error: 'Kelas tidak ditemukan.' });
    if (!(await requireClassAccess(req, res, room))) return;
    const rows = await prisma.schedule.findMany({
      where: { classId: room.id },
      include: { parts: { orderBy: { sortOrder: 'asc' } } },
      orderBy: [{ date: 'asc' }, { id: 'asc' }],
    });
    return res.json({ schedules: rows.map(scheduleShape) });
  } catch (err) {
    return next(err);
  }
});

router.post(
  '/classes/:id/schedules',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const room = await requireOwnedClass(req, res, Number(req.params.id));
      if (!room) return;
      const { title, date } = req.body ?? {};
      if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Judul jadwal wajib diisi.' });
      }
      const parsed = parseDateOnly(date);
      if (!parsed) {
        return res
          .status(400)
          .json({ error: "date wajib berformat 'YYYY-MM-DD'." });
      }
      const created = await prisma.schedule.create({
        data: {
          classId: room.id,
          teacherId: req.user.id,
          title: title.trim(),
          date: parsed,
        },
        include: { parts: true },
      });
      return res.status(201).json({ schedule: scheduleShape(created) });
    } catch (err) {
      return next(err);
    }
  },
);

router.put(
  '/schedules/:id',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const schedule = await loadOwnedSchedule(req, res, Number(req.params.id));
      if (!schedule) return;
      const { title, date } = req.body ?? {};
      const data = {};
      if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
          return res.status(400).json({ error: 'Judul jadwal wajib diisi.' });
        }
        data.title = title.trim();
      }
      if (date !== undefined) {
        const parsed = parseDateOnly(date);
        if (!parsed) {
          return res
            .status(400)
            .json({ error: "date wajib berformat 'YYYY-MM-DD'." });
        }
        data.date = parsed;
      }
      const updated = await prisma.schedule.update({
        where: { id: schedule.id },
        data,
        include: { parts: { orderBy: { sortOrder: 'asc' } } },
      });
      return res.json({ schedule: scheduleShape(updated) });
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/schedules/:id',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const schedule = await loadOwnedSchedule(req, res, Number(req.params.id));
      if (!schedule) return;
      await prisma.schedulePart.deleteMany({
        where: { scheduleId: schedule.id },
      });
      await prisma.schedule.delete({ where: { id: schedule.id } });
      return res.json({ ok: true });
    } catch (err) {
      return next(err);
    }
  },
);

router.post(
  '/schedules/:id/parts',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const schedule = await loadOwnedSchedule(req, res, Number(req.params.id));
      if (!schedule) return;
      const { title, meetLink, sortOrder } = req.body ?? {};
      if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Judul part wajib diisi.' });
      }
      let order = sortOrder;
      if (order === undefined || order === null) {
        order = await prisma.schedulePart.count({
          where: { scheduleId: schedule.id },
        });
      }
      if (!Number.isInteger(order) || order < 0 || order > 1000) {
        return res.status(400).json({ error: 'sortOrder harus bilangan 0..1000.' });
      }
      const link = typeof meetLink === 'string' && meetLink.trim()
        ? meetLink.trim()
        : null;
      if (link && link.length > 500) {
        return res.status(400).json({ error: 'Link Meet maksimal 500 karakter.' });
      }
      const part = await prisma.schedulePart.create({
        data: { scheduleId: schedule.id, title: title.trim(), sortOrder: order, meetLink: link },
      });
      return res.status(201).json({ part: partShape(part) });
    } catch (err) {
      return next(err);
    }
  },
);

async function loadOwnedPart(req, res, partId) {
  if (!Number.isInteger(partId) || partId <= 0) {
    res.status(404).json({ error: 'Part tidak ditemukan.' });
    return null;
  }
  const part = await prisma.schedulePart.findUnique({
    where: { id: partId },
    include: { schedule: true },
  });
  if (!part) {
    res.status(404).json({ error: 'Part tidak ditemukan.' });
    return null;
  }
  if (part.schedule.teacherId !== req.user.id) {
    res.status(403).json({ error: 'Part ini bukan milik jadwal Anda.' });
    return null;
  }
  return part;
}

router.put(
  '/schedule-parts/:id',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const part = await loadOwnedPart(req, res, Number(req.params.id));
      if (!part) return;
      const { title, meetLink, sortOrder } = req.body ?? {};
      const data = {};
      if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
          return res.status(400).json({ error: 'Judul part wajib diisi.' });
        }
        data.title = title.trim();
      }
      if (meetLink !== undefined) {
        if (meetLink !== null && typeof meetLink !== 'string') {
          return res.status(400).json({ error: 'meetLink harus teks atau null.' });
        }
        const link = typeof meetLink === 'string' && meetLink.trim()
          ? meetLink.trim()
          : null;
        if (link && link.length > 500) {
          return res.status(400).json({ error: 'Link Meet maksimal 500 karakter.' });
        }
        data.meetLink = link;
      }
      if (sortOrder !== undefined) {
        if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 1000) {
          return res.status(400).json({ error: 'sortOrder harus bilangan 0..1000.' });
        }
        data.sortOrder = sortOrder;
      }
      const updated = await prisma.schedulePart.update({
        where: { id: part.id },
        data,
      });
      return res.json({ part: partShape(updated) });
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/schedule-parts/:id',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const part = await loadOwnedPart(req, res, Number(req.params.id));
      if (!part) return;
      await prisma.schedulePart.delete({ where: { id: part.id } });
      return res.json({ ok: true });
    } catch (err) {
      return next(err);
    }
  },
);

// ─── Agenda hari ini (Beranda guru) ───────────────────────────────────────────
//
// Mengembalikan jadwal guru pada satu tanggal kalender. Klien mengirim
// ?date=YYYY-MM-DD sesuai tanggal LOKAL ponselnya; tanpa parameter,
// dipakai tanggal UTC hari ini di server.
router.get('/guru/agenda-today', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const day = parseDateOnly(req.query.date) ?? parseDateOnly(dateKeyUTC(new Date()));
    const nextDay = new Date(day.getTime() + 24 * 60 * 60 * 1000);
    const rows = await prisma.schedule.findMany({
      where: {
        teacherId: req.user.id,
        date: { gte: day, lt: nextDay },
      },
      include: {
        class: true,
        parts: { orderBy: { sortOrder: 'asc' } },
      },
      orderBy: [{ date: 'asc' }, { id: 'asc' }],
    });
    return res.json({
      date: dateKeyUTC(day),
      schedules: rows.map((s) => ({
        ...scheduleShape(s),
        className: s.class.name,
        classCode: s.class.code,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Tugas masuk: submission belum dinilai lintas kelas ──────────────────────

router.get('/guru/ungraded', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const rows = await prisma.submission.findMany({
      where: { score: null, task: { teacherId: req.user.id } },
      include: {
        student: true,
        task: { include: { class: true } },
      },
      orderBy: { submittedAt: 'desc' },
      take: 50,
    });
    return res.json({
      submissions: rows.map((s) => ({
        submissionId: s.id,
        taskId: s.taskId,
        taskTitle: s.task.title,
        classId: s.task.classId,
        className: s.task.class.name,
        studentId: s.studentId,
        studentName: s.student.name,
        autoScore: s.autoScore,
        submittedAt: s.submittedAt,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Penilaian > Pantau: pemantauan siswa per kelas ──────────────────────────
//
// Per siswa dikembalikan:
// - xp: RUMUS YANG SAMA dengan papan prestasi (GET /classes/:id/leaderboard):
//     XP = (pretest ?? 0) + (posttest ?? 0) + (latihanBest ?? 0)
//        + (simulatorBest ?? 0)                       ← ScoreSync
//        + 10 × kehadiran sesi live di kelas ini
//        + 5  × jawaban kuis live BENAR di kelas ini
//        + rata-rata autoScore tugas kelas ini (dibulatkan; 0 bila belum ada)
// - completionPercent: persen tugas kelas ini yang sudah dikumpulkan
//   siswa (submission ada / total tugas × 100, dibulatkan; 0 bila kelas
//   belum memiliki tugas).
// - streakDays: STREAK AKTIVITAS — definisi: jumlah hari kalender UTC
//   BERURUTAN yang memiliki minimal satu aktivitas tercatat, dihitung
//   mundur dari hari ini; bila hari ini belum ada aktivitas, hitungan
//   dimulai dari kemarin (streak dianggap belum putus sampai satu hari
//   penuh berlalu tanpa aktivitas). Sumber aktivitas: submission tugas
//   (submittedAt) dan kehadiran sesi live (joinedAt) di kelas ini,
//   ditambah pembaruan ScoreSync siswa (updatedAt, bersifat global).
// - lastActivityAt: waktu aktivitas terbaru dari sumber yang sama.
export function computeStreakDays(dateKeys, now = new Date()) {
  const cursor = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  if (!dateKeys.has(dateKeyUTC(cursor))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
    if (!dateKeys.has(dateKeyUTC(cursor))) return 0;
  }
  let streak = 0;
  while (dateKeys.has(dateKeyUTC(cursor))) {
    streak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

router.get(
  '/classes/:id/monitoring',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const classId = Number(req.params.id);
      const room = await requireOwnedClass(req, res, classId);
      if (!room) return;

      const [members, taskTotal] = await Promise.all([
        prisma.classMember.findMany({
          where: { classId },
          include: { user: { include: { scoreSync: true } } },
          orderBy: { joinedAt: 'asc' },
        }),
        prisma.task.count({ where: { classId } }),
      ]);

      const students = [];
      for (const m of members) {
        const user = m.user;
        const scores = user.scoreSync;
        const [attendanceRows, liveCorrect, subs] = await Promise.all([
          prisma.attendance.findMany({
            where: { userId: user.id, session: { classId } },
            select: { joinedAt: true },
          }),
          prisma.liveAnswer.count({
            where: {
              userId: user.id,
              correct: true,
              quiz: { session: { classId } },
            },
          }),
          prisma.submission.findMany({
            where: { studentId: user.id, task: { classId } },
            select: { autoScore: true, submittedAt: true },
          }),
        ]);

        const taskAvg = subs.length
          ? Math.round(subs.reduce((a, s) => a + s.autoScore, 0) / subs.length)
          : 0;
        const xp =
          (scores?.pretest ?? 0) +
          (scores?.posttest ?? 0) +
          (scores?.latihanBest ?? 0) +
          (scores?.simulatorBest ?? 0) +
          10 * attendanceRows.length +
          5 * liveCorrect +
          taskAvg;

        // Kumpulkan hari aktivitas (UTC) + aktivitas terakhir.
        const dateKeys = new Set();
        let lastActivityAt = null;
        const noteActivity = (dt) => {
          if (!dt) return;
          dateKeys.add(dateKeyUTC(dt));
          if (!lastActivityAt || dt > lastActivityAt) lastActivityAt = dt;
        };
        for (const s of subs) noteActivity(s.submittedAt);
        for (const a of attendanceRows) noteActivity(a.joinedAt);
        if (scores?.updatedAt) noteActivity(scores.updatedAt);

        students.push({
          userId: user.id,
          name: user.name,
          email: user.email,
          xp,
          attendanceCount: attendanceRows.length,
          liveCorrect,
          taskTotal,
          taskSubmitted: subs.length,
          completionPercent: taskTotal
            ? Math.round((subs.length / taskTotal) * 100)
            : 0,
          streakDays: computeStreakDays(dateKeys),
          lastActivityAt,
        });
      }
      students.sort((a, b) => b.xp - a.xp);
      return res.json({
        class: { id: room.id, name: room.name, code: room.code },
        students,
      });
    } catch (err) {
      return next(err);
    }
  },
);

export default router;
