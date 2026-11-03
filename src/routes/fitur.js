// Route putaran FITUR PEMBELAJARAN:
// - Materi kelas (guru membagikan teks/tautan/berkas; siswa mengunduh)
// - Unduhan berkas bertanda tangan (materi & kiriman tugas) — token HMAC
//   berumur pendek agar tautan bisa dibuka browser/url_launcher tanpa
//   header Authorization.
// - Jelajahi kelas (discover) + gabung langsung (siswa)
// - Dashboard pembelajaran siswa: agregasi kelas, tugas & kuis, jadwal
//   meeting (Google Meet), pengumuman, materi, sesi live, chat belum
//   dibaca — dalam satu panggilan.

import { Router } from 'express';
import { createHmac, timingSafeEqual } from 'node:crypto';

import { prisma, jsonOut } from '../db.js';
import { parseFilePayload } from '../files.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'bina-dev-secret-ganti-di-produksi';

// ─── Token unduh bertanda tangan ──────────────────────────────────────────────

function signDownload(kind, id, userId, minutes = 15) {
  const payload = Buffer.from(
    JSON.stringify({ kind, id, uid: userId, exp: Date.now() + minutes * 60_000 }),
  ).toString('base64url');
  const sig = createHmac('sha256', JWT_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyDownload(token, kind, id) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  const expected = createHmac('sha256', JWT_SECRET).update(payload).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data.kind !== kind || data.id !== id) return null;
    if (typeof data.exp !== 'number' || Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

async function ownedClass(req, res, classId) {
  const room = await prisma.classRoom.findUnique({ where: { id: classId } });
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

/** true bila user adalah guru pemilik kelas ATAU siswa anggota kelas. */
async function canAccessClass(user, room) {
  if (user.role === 'guru') return room.teacherId === user.id;
  const member = await prisma.classMember.findUnique({
    where: { classId_userId: { classId: room.id, userId: user.id } },
  });
  return Boolean(member);
}

function materialShape(m) {
  return {
    id: m.id,
    classId: m.classId,
    teacherId: m.teacherId,
    title: m.title,
    description: m.description,
    linkUrl: m.linkUrl,
    fileName: m.fileName,
    fileMime: m.fileMime,
    hasFile: m.fileData != null,
    createdAt: m.createdAt,
  };
}

// ─── Materi: buat (guru pemilik kelas) ────────────────────────────────────────
router.post('/classes/:id/materials', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const classId = Number(req.params.id);
    const room = await ownedClass(req, res, classId);
    if (!room) return;
    const { title, description, linkUrl, file } = req.body ?? {};
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({ error: 'Judul materi wajib diisi.' });
    }
    let cleanLink = null;
    if (linkUrl != null && linkUrl !== '') {
      if (typeof linkUrl !== 'string' || !/^https?:\/\//i.test(linkUrl.trim())) {
        return res.status(400).json({ error: 'Tautan materi harus diawali http:// atau https://.' });
      }
      cleanLink = linkUrl.trim();
    }
    const parsed = parseFilePayload(file);
    if (parsed.error) return res.status(400).json({ error: parsed.error });
    const cleanDesc =
      typeof description === 'string' && description.trim() ? description.trim() : null;
    if (!cleanLink && !parsed.buffer && !cleanDesc) {
      return res.status(400).json({
        error: 'Materi harus memiliki isi: deskripsi, tautan, atau berkas.',
      });
    }
    const material = await prisma.material.create({
      data: {
        classId,
        teacherId: req.user.id,
        title: title.trim(),
        description: cleanDesc,
        linkUrl: cleanLink,
        fileName: parsed.buffer ? parsed.fileName : null,
        fileMime: parsed.buffer ? parsed.fileMime : null,
        fileData: parsed.buffer,
      },
    });
    return res.status(201).json({ material: materialShape(material) });
  } catch (err) {
    return next(err);
  }
});

// ─── Materi: daftar per kelas (guru pemilik / siswa anggota) ──────────────────
router.get('/classes/:id/materials', requireAuth, async (req, res, next) => {
  try {
    const classId = Number(req.params.id);
    const room = await prisma.classRoom.findUnique({ where: { id: classId } });
    if (!room) return res.status(404).json({ error: 'Kelas tidak ditemukan.' });
    if (!(await canAccessClass(req.user, room))) {
      return res.status(403).json({ error: 'Anda tidak memiliki akses ke kelas ini.' });
    }
    const materials = await prisma.material.findMany({
      where: { classId },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ materials: materials.map(materialShape) });
  } catch (err) {
    return next(err);
  }
});

// ─── Materi: hapus (guru pemilik) ─────────────────────────────────────────────
router.delete('/materials/:id', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const material = await prisma.material.findUnique({
      where: { id: Number(req.params.id) },
      include: { class: true },
    });
    if (!material) return res.status(404).json({ error: 'Materi tidak ditemukan.' });
    if (material.class.teacherId !== req.user.id) {
      return res.status(403).json({ error: 'Materi ini bukan dari kelas Anda.' });
    }
    await prisma.material.delete({ where: { id: material.id } });
    return res.json({ ok: true });
  } catch (err) {
    return next(err);
  }
});

// ─── Token unduh materi (guru pemilik / siswa anggota) ────────────────────────
router.post('/materials/:id/download-token', requireAuth, async (req, res, next) => {
  try {
    const material = await prisma.material.findUnique({
      where: { id: Number(req.params.id) },
      include: { class: true },
    });
    if (!material) return res.status(404).json({ error: 'Materi tidak ditemukan.' });
    if (!material.fileData) {
      return res.status(404).json({ error: 'Materi ini tidak memiliki berkas.' });
    }
    if (!(await canAccessClass(req.user, material.class))) {
      return res.status(403).json({ error: 'Anda tidak memiliki akses ke materi ini.' });
    }
    const token = signDownload('mat', material.id, req.user.id);
    return res.json({
      url: `/api/materials/${material.id}/file?token=${token}`,
      fileName: material.fileName,
      expiresInSeconds: 15 * 60,
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Unduh berkas materi (tautan bertanda tangan, tanpa header auth) ──────────
router.get('/materials/:id/file', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = verifyDownload(req.query.token, 'mat', id);
    if (!data) return res.status(401).json({ error: 'Tautan unduh tidak valid atau kedaluwarsa.' });
    const material = await prisma.material.findUnique({ where: { id } });
    if (!material || !material.fileData) {
      return res.status(404).json({ error: 'Berkas tidak ditemukan.' });
    }
    res.setHeader('Content-Type', material.fileMime || 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(material.fileName || 'materi')}"`,
    );
    return res.send(Buffer.from(material.fileData));
  } catch (err) {
    return next(err);
  }
});

// ─── Token unduh kiriman tugas (guru penilai / siswa pemilik kiriman) ─────────
router.post('/submissions/:id/download-token', requireAuth, async (req, res, next) => {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: Number(req.params.id) },
      include: { task: { include: { class: true } } },
    });
    if (!submission) return res.status(404).json({ error: 'Submission tidak ditemukan.' });
    if (!submission.fileData) {
      return res.status(404).json({ error: 'Kiriman ini tidak memiliki berkas.' });
    }
    const isTeacher = req.user.role === 'guru' && submission.task.class.teacherId === req.user.id;
    const isOwner = req.user.role === 'siswa' && submission.studentId === req.user.id;
    if (!isTeacher && !isOwner) {
      return res.status(403).json({ error: 'Anda tidak memiliki akses ke kiriman ini.' });
    }
    const token = signDownload('sub', submission.id, req.user.id);
    return res.json({
      url: `/api/submissions/${submission.id}/file?token=${token}`,
      fileName: submission.fileName,
      expiresInSeconds: 15 * 60,
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Unduh berkas kiriman tugas (tautan bertanda tangan) ──────────────────────
router.get('/submissions/:id/file', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = verifyDownload(req.query.token, 'sub', id);
    if (!data) return res.status(401).json({ error: 'Tautan unduh tidak valid atau kedaluwarsa.' });
    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission || !submission.fileData) {
      return res.status(404).json({ error: 'Berkas tidak ditemukan.' });
    }
    res.setHeader('Content-Type', submission.fileMime || 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(submission.fileName || 'kiriman')}"`,
    );
    return res.send(Buffer.from(submission.fileData));
  } catch (err) {
    return next(err);
  }
});

// ─── Jelajahi kelas (semua kelas yang dibuat guru) ────────────────────────────
router.get('/classes/discover', requireAuth, async (req, res, next) => {
  try {
    const rooms = await prisma.classRoom.findMany({
      include: {
        teacher: true,
        _count: { select: { members: true, tasks: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    let joinedIds = new Set();
    if (req.user.role === 'siswa') {
      const mine = await prisma.classMember.findMany({
        where: { userId: req.user.id },
        select: { classId: true },
      });
      joinedIds = new Set(mine.map((m) => m.classId));
    }
    return res.json({
      classes: rooms.map((r) => ({
        id: r.id,
        name: r.name,
        teacherId: r.teacherId,
        teacherName: r.teacher.name,
        memberCount: r._count.members,
        taskCount: r._count.tasks,
        joined: joinedIds.has(r.id),
        owned: req.user.role === 'guru' && r.teacherId === req.user.id,
        createdAt: r.createdAt,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Gabung kelas langsung dari daftar jelajahi (siswa) ───────────────────────
router.post('/classes/:id/join', requireAuth, requireRole('siswa'), async (req, res, next) => {
  try {
    const classId = Number(req.params.id);
    const room = await prisma.classRoom.findUnique({
      where: { id: classId },
      include: { teacher: true },
    });
    if (!room) return res.status(404).json({ error: 'Kelas tidak ditemukan.' });
    const existing = await prisma.classMember.findUnique({
      where: { classId_userId: { classId, userId: req.user.id } },
    });
    if (!existing) {
      await prisma.classMember.create({
        data: { classId, userId: req.user.id },
      });
    }
    return res.json({
      class: {
        id: room.id,
        name: room.name,
        code: room.code,
        teacherId: room.teacherId,
        teacherName: room.teacher.name,
        createdAt: room.createdAt,
      },
      alreadyMember: Boolean(existing),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Dashboard pembelajaran (siswa) ───────────────────────────────────────────
router.get('/my/dashboard', requireAuth, requireRole('siswa'), async (req, res, next) => {
  try {
    const memberships = await prisma.classMember.findMany({
      where: { userId: req.user.id },
      include: { class: { include: { teacher: true } } },
      orderBy: { joinedAt: 'desc' },
    });
    const classIds = memberships.map((m) => m.classId);
    const classes = memberships.map((m) => ({
      id: m.class.id,
      name: m.class.name,
      code: m.class.code,
      teacherId: m.class.teacherId,
      teacherName: m.class.teacher.name,
      joinedAt: m.joinedAt,
    }));
    if (classIds.length === 0) {
      return res.json({
        classes: [],
        tasks: [],
        meetings: [],
        announcements: [],
        materials: [],
        liveSessions: [],
        results: [],
        unreadChat: 0,
      });
    }

    const tasks = await prisma.task.findMany({
      where: { classId: { in: classIds } },
      include: { class: true },
      orderBy: { createdAt: 'desc' },
      take: 30,
    });
    const mySubs = await prisma.submission.findMany({
      where: { studentId: req.user.id, taskId: { in: tasks.map((t) => t.id) } },
    });
    const subByTask = new Map(mySubs.map((s) => [s.taskId, s]));

    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 3600 * 1000);
    const schedules = await prisma.schedule.findMany({
      where: { classId: { in: classIds }, date: { gte: twoDaysAgo } },
      include: { class: true, parts: { orderBy: { sortOrder: 'asc' } } },
      orderBy: { date: 'asc' },
      take: 20,
    });
    const meetings = [];
    for (const sch of schedules) {
      for (const part of sch.parts) {
        if (!part.meetLink) continue;
        meetings.push({
          scheduleId: sch.id,
          scheduleTitle: sch.title,
          date: sch.date,
          partId: part.id,
          partTitle: part.title,
          meetLink: part.meetLink,
          classId: sch.classId,
          className: sch.class.name,
        });
      }
    }
    meetings.sort((a, b) => new Date(a.date) - new Date(b.date));

    const announcements = await prisma.announcement.findMany({
      where: { classId: { in: classIds } },
      include: { class: true, author: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const materials = await prisma.material.findMany({
      where: { classId: { in: classIds } },
      include: { class: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    const liveSessions = await prisma.liveSession.findMany({
      where: { classId: { in: classIds }, status: 'active' },
      include: { class: true },
      orderBy: { startedAt: 'desc' },
    });

    const myResults = await prisma.submission.findMany({
      where: { studentId: req.user.id },
      include: { task: { include: { class: true } } },
      orderBy: { submittedAt: 'desc' },
      take: 5,
    });

    const conversations = await prisma.chatConversation.findMany({
      where: { studentId: req.user.id },
      select: { id: true, siswaReadAt: true },
    });
    let unreadChat = 0;
    for (const conv of conversations) {
      unreadChat += await prisma.conversationMessage.count({
        where: {
          conversationId: conv.id,
          senderId: { not: req.user.id },
          ...(conv.siswaReadAt ? { createdAt: { gt: conv.siswaReadAt } } : {}),
        },
      });
    }

    return res.json({
      classes,
      tasks: tasks.map((t) => {
        const mine = subByTask.get(t.id);
        return {
          id: t.id,
          classId: t.classId,
          className: t.class.name,
          title: t.title,
          description: t.description,
          type: t.type,
          opensAt: t.opensAt,
          dueAt: t.dueAt,
          questionCount: jsonOut(t.questions)?.length ?? 0,
          createdAt: t.createdAt,
          mySubmission: mine
            ? {
                autoScore: mine.autoScore,
                score: mine.score,
                review: mine.review,
                submittedAt: mine.submittedAt,
              }
            : null,
        };
      }),
      meetings: meetings.slice(0, 12),
      announcements: announcements.map((a) => ({
        id: a.id,
        classId: a.classId,
        className: a.class.name,
        text: a.text,
        authorName: a.author.name,
        createdAt: a.createdAt,
      })),
      materials: materials.map((m) => ({
        ...materialShape(m),
        className: m.class.name,
      })),
      liveSessions: liveSessions.map((s) => ({
        id: s.id,
        classId: s.classId,
        className: s.class.name,
        title: s.title,
        startedAt: s.startedAt,
      })),
      results: myResults.map((s) => ({
        submissionId: s.id,
        taskId: s.taskId,
        taskTitle: s.task.title,
        taskType: s.task.type,
        classId: s.task.classId,
        className: s.task.class.name,
        score: s.score ?? s.autoScore,
        finalScore: s.score,
        review: s.review,
        submittedAt: s.submittedAt,
      })),
      unreadChat,
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
