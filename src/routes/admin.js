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

/** Hapus sesi live beserta seluruh data turunannya. */
async function deleteLiveSessionsCascade(tx, sessionIds) {
  if (!sessionIds.length) return;
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
    // PENTING: pesan chat breakout menempel ke kelompok (ChatMessage.groupId).
    // Baris ini dulu terlewat — menghapus kelompok yang punya riwayat chat
    // selalu gagal kunci asing, sehingga hapus kelas/guru ditolak dengan
    // pesan "data terkait tidak dapat dihapus otomatis" (dilaporkan user
    // 14 Nov 2026 saat membersihkan akun-akun uji E2E).
    await tx.chatMessage.deleteMany({ where: { groupId: { in: groupIds } } });
    await tx.breakoutMember.deleteMany({
      where: { groupId: { in: groupIds } },
    });
  }
  await tx.breakoutGroup.deleteMany({
    where: { sessionId: { in: sessionIds } },
  });
  await tx.liveSession.deleteMany({ where: { id: { in: sessionIds } } });
}

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
  await deleteLiveSessionsCascade(tx, sessionIds);
  await tx.classRoom.delete({ where: { id: classId } });
}

/** Hapus satu pengguna beserta SEMUA data yang menempel padanya. */
async function deleteUserCascade(tx, userId) {
  // 1) Kelas milik pengguna (guru) lebih dulu — berantai penuh, termasuk
  //    tugas/jadwal/materi/pengumuman/sesi live/percakapan di kelas itu.
  const owned = await tx.classRoom.findMany({
    where: { teacherId: userId },
    select: { id: true },
  });
  for (const room of owned) {
    await deleteClassCascade(tx, room.id);
  }

  // 2) Jaring pengaman: sisa baris yang menunjuk pengguna sebagai
  //    guru/pembuat di luar kelas miliknya (normalnya sudah bersih
  //    di langkah 1; tetap dihapus agar tidak ada kunci asing tersisa).
  const strayTaskIds = (
    await tx.task.findMany({
      where: { teacherId: userId },
      select: { id: true },
    })
  ).map((t) => t.id);
  if (strayTaskIds.length) {
    await tx.submission.deleteMany({
      where: { taskId: { in: strayTaskIds } },
    });
    await tx.task.deleteMany({ where: { id: { in: strayTaskIds } } });
  }
  const straySessionIds = (
    await tx.liveSession.findMany({
      where: { teacherId: userId },
      select: { id: true },
    })
  ).map((s) => s.id);
  await deleteLiveSessionsCascade(tx, straySessionIds);
  const strayScheduleIds = (
    await tx.schedule.findMany({
      where: { teacherId: userId },
      select: { id: true },
    })
  ).map((s) => s.id);
  if (strayScheduleIds.length) {
    await tx.schedulePart.deleteMany({
      where: { scheduleId: { in: strayScheduleIds } },
    });
    await tx.schedule.deleteMany({ where: { id: { in: strayScheduleIds } } });
  }
  await tx.material.deleteMany({ where: { teacherId: userId } });
  await tx.announcement.deleteMany({ where: { authorId: userId } });

  // 3) Data pribadi pengguna (sebagai siswa/peserta/pengirim).
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

  // 4) Percakapan langsung: pesan kiriman pengguna di mana pun, lalu
  //    percakapan yang melibatkan pengguna beserta seluruh pesannya.
  await tx.conversationMessage.deleteMany({ where: { senderId: userId } });
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

// Edit lengkap satu pengguna (14 Nov 2026): nama, email, peran, dan/atau
// kata sandi baru — semua opsional, hanya yang dikirim yang berubah.
// Pengaman peran sama seperti PATCH /role: tidak bisa mengubah peran
// akun sendiri dan admin terakhir tidak bisa diturunkan.
router.patch('/admin/users/:id', ...adminOnly, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID pengguna tidak valid.' });
    }
    const { name, email, role, password } = req.body ?? {};
    const data = {};
    if (name !== undefined) {
      if (!name || typeof name !== 'string' || name.trim().length < 1) {
        return res.status(400).json({ error: 'Nama wajib diisi.' });
      }
      data.name = name.trim();
    }
    if (email !== undefined) {
      if (!email || typeof email !== 'string' || email.trim().length < 1) {
        return res.status(400).json({ error: 'Email wajib diisi.' });
      }
      data.email = email.trim().toLowerCase();
    }
    if (role !== undefined) {
      if (!ROLES.includes(role)) {
        return res
          .status(400)
          .json({ error: "Peran harus 'guru', 'siswa', atau 'admin'." });
      }
      data.role = role;
    }
    if (password !== undefined) {
      if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'Password minimal 6 karakter.' });
      }
    }
    if (Object.keys(data).length === 0 && password === undefined) {
      return res.status(400).json({ error: 'Tidak ada perubahan.' });
    }
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }
    if (data.email && data.email !== target.email) {
      const existing = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (existing) {
        return res.status(409).json({ error: 'Email sudah terdaftar.' });
      }
    }
    if (data.role && data.role !== target.role) {
      if (id === req.user.id) {
        return res
          .status(400)
          .json({ error: 'Tidak dapat mengubah peran akun sendiri.' });
      }
      if (target.role === 'admin' && (await countAdmins()) <= 1) {
        return res
          .status(400)
          .json({ error: 'Tidak dapat menurunkan admin terakhir.' });
      }
    }
    if (password !== undefined) {
      data.passwordHash = await bcrypt.hash(password, 10);
    }
    const user = await prisma.user.update({ where: { id }, data });
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
      await prisma.$transaction(
        async (tx) => {
          await deleteUserCascade(tx, id);
        },
        { timeout: 30000, maxWait: 15000 },
      );
    } catch (err) {
      // Catat sebab asli di log server — jangan ditelan diam-diam.
      console.error('[admin] gagal menghapus pengguna', id, err);
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
      await prisma.$transaction(
        async (tx) => {
          await deleteClassCascade(tx, id);
        },
        { timeout: 30000, maxWait: 15000 },
      );
    } catch (err) {
      // Catat sebab asli di log server — jangan ditelan diam-diam.
      console.error('[admin] gagal menghapus kelas', id, err);
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
