// Route ADMIN (Fase 1 aplikasi gabungan BINA — 11 Nov 2026):
// - Ringkasan aktivitas (Beranda admin)
// - Kelola Pengguna: daftar, buat akun (peran apa pun termasuk admin),
//   ubah peran, hapus akun
// - Kelola Kelas: daftar semua kelas lintas guru, hapus kelas
//
// Semua endpoint di sini wajib JWT + peran 'admin'. Peran admin TIDAK
// bisa diperoleh lewat register publik (routes/auth.js hanya menerima
// 'guru'/'siswa'); akun admin pertama dibuat lewat bootstrap env
// BINA_ADMIN_EMAIL/BINA_ADMIN_PASSWORD di src/index.js, setelah itu
// admin dapat membuatkan akun admin lain dari endpoint POST di sini.

import { Router } from 'express';
import bcrypt from 'bcryptjs';

import { prisma } from '../db.js';
import { publicUser, requireAuth, requireRole } from '../auth.js';

const router = Router();
const adminOnly = [requireAuth, requireRole('admin')];

const ROLES = ['guru', 'siswa', 'admin'];

// ─── Helper hapus berantai ───────────────────────────────────────────────────

/** Hapus satu kelas beserta seluruh data yang menempel padanya. */
async function deleteClassCascade(tx, classId) {
  const taskIds = (
    await tx.task.findMany({ where: { classId }, select: { id: true } })
  ).map((t) => t.id);
  if (taskIds.length) {
    await tx.submission.deleteMany({ where: { taskId: { in: taskIds } } });
  }
  await tx.task.deleteMany({ where: { classId } });
  await tx.classMember.deleteMany({ where: { classId } });
  await tx.material.deleteMany({ where: { classId } });
  await tx.announcement.deleteMany({ where: { classId } });
  const scheduleIds = (
    await tx.schedule.findMany({ where: { classId }, select: { id: true } })
  ).map((s) => s.id);
  if (scheduleIds.length) {
    await tx.schedulePart.deleteMany({
      where: { scheduleId: { in: scheduleIds } },
    });
  }
  await tx.schedule.deleteMany({ where: { classId } });
  await tx.parentReport.deleteMany({ where: { classId } });
  const convIds = (
    await tx.chatConversation.findMany({
      where: { classId },
      select: { id: true },
    })
  ).map((c) => c.id);
  if (convIds.length) {
    await tx.conversationMessage.deleteMany({
      where: { conversationId: { in: convIds } },
    });
  }
  await tx.chatConversation.deleteMany({ where: { classId } });
  const sessionIds = (
    await tx.liveSession.findMany({
      where: { classId },
      select: { id: true },
    })
  ).map((s) => s.id);
  if (sessionIds.length) {
    const quizIds = (
      await tx.liveQuiz.findMany({
        where: { sessionId: { in: sessionIds } },
        select: { id: true },
      })
    ).map((q) => q.id);
    if (quizIds.length) {
      await tx.liveAnswer.deleteMany({ where: { quizId: { in: quizIds } } });
    }
    await tx.liveQuiz.deleteMany({ where: { sessionId: { in: sessionIds } } });
    await tx.attendance.deleteMany({ where: { sessionId: { in: sessionIds } } });
    await tx.understandingVote.deleteMany({
      where: { sessionId: { in: sessionIds } },
    });
    const groupIds = (
      await tx.breakoutGroup.findMany({
        where: { sessionId: { in: sessionIds } },
        select: { id: true },
      })
    ).map((g) => g.id);
    if (groupIds.length) {
      await tx.breakoutMember.deleteMany({
        where: { groupId: { in: groupIds } },
      });
    }
    await tx.breakoutGroup.deleteMany({
      where: { sessionId: { in: sessionIds } },
    });
    await tx.liveSession.deleteMany({ where: { id: { in: sessionIds } } });
  }
  await tx.classRoom.delete({ where: { id: classId } });
}

/** Hapus satu pengguna beserta data inti miliknya & kelas yang ia miliki. */
async function deleteUserCascade(tx, userId) {
  await tx.submission.deleteMany({ where: { studentId: userId } });
  await tx.classMember.deleteMany({ where: { userId } });
  await tx.scoreSync.deleteMany({ where: { userId } });
  await tx.attendance.deleteMany({ where: { userId } });
  await tx.faceAttendance.deleteMany({ where: { userId } });
  await tx.liveAnswer.deleteMany({ where: { userId } });
  await tx.understandingVote.deleteMany({ where: { userId } });
  await tx.breakoutMember.deleteMany({ where: { userId } });
  await tx.chatMessage.deleteMany({ where: { userId } });
  await tx.parentReport.deleteMany({ where: { studentId: userId } });
  await tx.parentReport.deleteMany({ where: { teacherId: userId } });
  const convIds = (
    await tx.chatConversation.findMany({
      where: { OR: [{ teacherId: userId }, { studentId: userId }] },
      select: { id: true },
    })
  ).map((c) => c.id);
  if (convIds.length) {
    await tx.conversationMessage.deleteMany({
      where: { conversationId: { in: convIds } },
    });
    await tx.chatConversation.deleteMany({ where: { id: { in: convIds } } });
  }
  const owned = await tx.classRoom.findMany({
    where: { teacherId: userId },
    select: { id: true },
  });
  for (const room of owned) {
    await deleteClassCascade(tx, room.id);
  }
  await tx.user.delete({ where: { id: userId } });
}

async function countAdmins() {
  return prisma.user.count({ where: { role: 'admin' } });
}

// ─── Ringkasan (Beranda Admin) ───────────────────────────────────────────────

router.get('/admin/summary', ...adminOnly, async (req, res, next) => {
  try {
    const [
      totalUsers,
      guru,
      siswa,
      admin,
      classes,
      tasks,
      materials,
      recentUsers,
      recentClasses,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'guru' } }),
      prisma.user.count({ where: { role: 'siswa' } }),
      prisma.user.count({ where: { role: 'admin' } }),
      prisma.classRoom.count(),
      prisma.task.count(),
      prisma.material.count(),
      prisma.user.findMany({
        orderBy: { id: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.classRoom.findMany({
        orderBy: { id: 'desc' },
        take: 5,
        include: {
          teacher: { select: { name: true, email: true } },
          _count: { select: { members: true } },
        },
      }),
    ]);
    return res.json({
      totals: { users: totalUsers, guru, siswa, admin, classes, tasks, materials },
      recentUsers,
      recentClasses: recentClasses.map((c) => ({
        id: c.id,
        name: c.name,
        code: c.code,
        teacherName: c.teacher?.name ?? '',
        memberCount: c._count.members,
        createdAt: c.createdAt,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Kelola Pengguna ─────────────────────────────────────────────────────────

router.get('/admin/users', ...adminOnly, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'asc' },
      include: {
        _count: { select: { classesOwned: true, memberships: true } },
      },
    });
    return res.json({
      users: users.map((u) => ({
        ...publicUser(u),
        createdAt: u.createdAt,
        classesOwned: u._count.classesOwned,
        memberships: u._count.memberships,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

router.post('/admin/users', ...adminOnly, async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body ?? {};
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return res.status(400).json({ error: 'Nama wajib diisi.' });
    }
    if (!email || typeof email !== 'string' || email.trim().length < 1) {
      return res.status(400).json({ error: 'Email wajib diisi.' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password minimal 6 karakter.' });
    }
    if (!ROLES.includes(role)) {
      return res
        .status(400)
        .json({ error: "Peran harus 'guru', 'siswa', atau 'admin'." });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) {
      return res.status(409).json({ error: 'Email sudah terdaftar.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name: name.trim(), email: normalizedEmail, passwordHash, role },
    });
    return res.status(201).json({ user: publicUser(user) });
  } catch (err) {
    return next(err);
  }
});

router.patch('/admin/users/:id/role', ...adminOnly, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { role } = req.body ?? {};
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID pengguna tidak valid.' });
    }
    if (!ROLES.includes(role)) {
      return res
        .status(400)
        .json({ error: "Peran harus 'guru', 'siswa', atau 'admin'." });
    }
    if (id === req.user.id) {
      return res
        .status(400)
        .json({ error: 'Tidak dapat mengubah peran akun sendiri.' });
    }
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }
    if (target.role === 'admin' && role !== 'admin' && (await countAdmins()) <= 1) {
      return res
        .status(400)
        .json({ error: 'Tidak dapat menurunkan admin terakhir.' });
    }
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });
    return res.json({ user: publicUser(user) });
  } catch (err) {
    return next(err);
  }
});

router.delete('/admin/users/:id', ...adminOnly, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID pengguna tidak valid.' });
    }
    if (id === req.user.id) {
      return res
        .status(400)
        .json({ error: 'Tidak dapat menghapus akun sendiri.' });
    }
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }
    if (target.role === 'admin' && (await countAdmins()) <= 1) {
      return res
        .status(400)
        .json({ error: 'Tidak dapat menghapus admin terakhir.' });
    }
    try {
      await prisma.$transaction(async (tx) => {
        await deleteUserCascade(tx, id);
      });
    } catch {
      return res.status(409).json({
        error:
          'Pengguna masih memiliki data terkait yang tidak dapat dihapus otomatis.',
      });
    }
    return res.json({ ok: true });
  } catch (err) {
    return next(err);
  }
});

// ─── Kelola Kelas ────────────────────────────────────────────────────────────

router.get('/admin/classes', ...adminOnly, async (req, res, next) => {
  try {
    const classes = await prisma.classRoom.findMany({
      orderBy: { id: 'desc' },
      include: {
        teacher: { select: { name: true, email: true } },
        _count: { select: { members: true, tasks: true, materials: true } },
      },
    });
    return res.json({
      classes: classes.map((c) => ({
        id: c.id,
        name: c.name,
        code: c.code,
        teacherId: c.teacherId,
        teacherName: c.teacher?.name ?? '',
        teacherEmail: c.teacher?.email ?? '',
        memberCount: c._count.members,
        taskCount: c._count.tasks,
        materialCount: c._count.materials,
        createdAt: c.createdAt,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

router.delete('/admin/classes/:id', ...adminOnly, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID kelas tidak valid.' });
    }
    const room = await prisma.classRoom.findUnique({ where: { id } });
    if (!room) {
      return res.status(404).json({ error: 'Kelas tidak ditemukan.' });
    }
    try {
      await prisma.$transaction(async (tx) => {
        await deleteClassCascade(tx, id);
      });
    } catch {
      return res.status(409).json({
        error:
          'Kelas masih memiliki data terkait yang tidak dapat dihapus otomatis.',
      });
    }
    return res.json({ ok: true });
  } catch (err) {
    return next(err);
  }
});

export default router;
