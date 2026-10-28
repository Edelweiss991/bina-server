// Route kelas: buat kelas (guru), daftar kelas, gabung (siswa),
// daftar anggota + skor tersinkron (guru pemilik).

import { Router } from 'express';
import { randomBytes } from 'node:crypto';

import { prisma } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

// Alfabet tanpa karakter ambigu (0/O, 1/I/L) agar kode mudah dibagikan.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function makeCode() {
  const bytes = randomBytes(6);
  let code = '';
  for (let i = 0; i < 6; i++) code += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  return code;
}

async function uniqueCode() {
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = makeCode();
    const clash = await prisma.classRoom.findUnique({ where: { code } });
    if (!clash) return code;
  }
  throw new Error('Gagal membuat kode kelas unik.');
}

function classSummary(room, extra = {}) {
  return {
    id: room.id,
    name: room.name,
    code: room.code,
    teacherId: room.teacherId,
    createdAt: room.createdAt,
    ...extra,
  };
}

// ─── Buat kelas (guru) ────────────────────────────────────────────────────────
router.post('/classes', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const { name } = req.body ?? {};
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Nama kelas wajib diisi.' });
    }
    const room = await prisma.classRoom.create({
      data: { name: name.trim(), code: await uniqueCode(), teacherId: req.user.id },
    });
    return res.status(201).json({ class: classSummary(room) });
  } catch (err) {
    return next(err);
  }
});

// ─── Daftar kelas sesuai peran ────────────────────────────────────────────────
router.get('/classes', requireAuth, async (req, res, next) => {
  try {
    if (req.user.role === 'guru') {
      const rooms = await prisma.classRoom.findMany({
        where: { teacherId: req.user.id },
        include: { _count: { select: { members: true, tasks: true } } },
        orderBy: { createdAt: 'desc' },
      });
      return res.json({
        classes: rooms.map((r) =>
          classSummary(r, {
            memberCount: r._count.members,
            taskCount: r._count.tasks,
          }),
        ),
      });
    }
    const memberships = await prisma.classMember.findMany({
      where: { userId: req.user.id },
      include: { class: { include: { teacher: true } } },
      orderBy: { joinedAt: 'desc' },
    });
    return res.json({
      classes: memberships.map((m) =>
        classSummary(m.class, { teacherName: m.class.teacher.name }),
      ),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Gabung kelas (siswa) ─────────────────────────────────────────────────────
router.post('/classes/join', requireAuth, requireRole('siswa'), async (req, res, next) => {
  try {
    const { code } = req.body ?? {};
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Kode kelas wajib diisi.' });
    }
    const room = await prisma.classRoom.findUnique({
      where: { code: code.trim().toUpperCase() },
      include: { teacher: true },
    });
    if (!room) {
      return res.status(404).json({ error: 'Kode kelas tidak ditemukan.' });
    }
    const existing = await prisma.classMember.findUnique({
      where: { classId_userId: { classId: room.id, userId: req.user.id } },
    });
    if (!existing) {
      await prisma.classMember.create({
        data: { classId: room.id, userId: req.user.id },
      });
    }
    return res.json({
      class: classSummary(room, { teacherName: room.teacher.name }),
      alreadyMember: Boolean(existing),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Anggota kelas + skor tersinkron (guru pemilik) ───────────────────────────
router.get('/classes/:id/members', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const classId = Number(req.params.id);
    const room = await prisma.classRoom.findUnique({ where: { id: classId } });
    if (!room) return res.status(404).json({ error: 'Kelas tidak ditemukan.' });
    if (room.teacherId !== req.user.id) {
      return res.status(403).json({ error: 'Kelas ini bukan milik Anda.' });
    }
    const members = await prisma.classMember.findMany({
      where: { classId },
      include: { user: { include: { scoreSync: true } } },
      orderBy: { joinedAt: 'asc' },
    });
    return res.json({
      class: classSummary(room),
      members: members.map((m) => ({
        id: m.user.id,
        name: m.user.name,
        email: m.user.email,
        joinedAt: m.joinedAt,
        scores: m.user.scoreSync
          ? {
              pretest: m.user.scoreSync.pretest,
              posttest: m.user.scoreSync.posttest,
              latihanBest: m.user.scoreSync.latihanBest,
              simulatorBest: m.user.scoreSync.simulatorBest,
              updatedAt: m.user.scoreSync.updatedAt,
            }
          : null,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
