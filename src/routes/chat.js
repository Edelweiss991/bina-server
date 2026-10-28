// Route chat persisten guru↔siswa (putaran BINA GURU).
//
// Satu percakapan per (kelas, siswa): guru kelas itu ↔ siswa anggota
// kelas itu. Pesan disimpan di server; klien menyegarkan dengan
// polling seperti chat breakout Kelas Live. Status belum-dibaca
// dihitung dari timestamp terakhir membaca per pihak
// (guruReadAt / siswaReadAt di ChatConversation).

import { Router } from 'express';

import { prisma } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();

async function unreadCountFor(conv, userId) {
  const readAt = conv.teacherId === userId ? conv.guruReadAt : conv.siswaReadAt;
  return prisma.conversationMessage.count({
    where: {
      conversationId: conv.id,
      senderId: { not: userId },
      ...(readAt ? { createdAt: { gt: readAt } } : {}),
    },
  });
}

function conversationShape(conv, userId, lastMessage, unreadCount) {
  return {
    id: conv.id,
    classId: conv.classId,
    className: conv.class?.name ?? null,
    teacherId: conv.teacherId,
    teacherName: conv.teacher?.name ?? null,
    studentId: conv.studentId,
    studentName: conv.student?.name ?? null,
    lastMessage: lastMessage
      ? {
          id: lastMessage.id,
          senderId: lastMessage.senderId,
          text: lastMessage.text,
          createdAt: lastMessage.createdAt,
        }
      : null,
    unreadCount,
    createdAt: conv.createdAt,
  };
}

async function shapeMany(convs, userId) {
  const shaped = [];
  for (const conv of convs) {
    const last = await prisma.conversationMessage.findFirst({
      where: { conversationId: conv.id },
      orderBy: { createdAt: 'desc' },
    });
    shaped.push({
      sortKey: last?.createdAt ?? conv.createdAt,
      value: conversationShape(
        conv,
        userId,
        last,
        await unreadCountFor(conv, userId),
      ),
    });
  }
  shaped.sort((a, b) => b.sortKey - a.sortKey);
  return shaped.map((s) => s.value);
}

/** Muat percakapan dan pastikan pemanggil adalah salah satu pihaknya. */
async function loadConversationForParticipant(req, res, conversationId) {
  if (!Number.isInteger(conversationId) || conversationId <= 0) {
    res.status(404).json({ error: 'Percakapan tidak ditemukan.' });
    return null;
  }
  const conv = await prisma.chatConversation.findUnique({
    where: { id: conversationId },
    include: { class: true, teacher: true, student: true },
  });
  if (!conv) {
    res.status(404).json({ error: 'Percakapan tidak ditemukan.' });
    return null;
  }
  if (conv.teacherId !== req.user.id && conv.studentId !== req.user.id) {
    res.status(403).json({ error: 'Anda bukan pihak percakapan ini.' });
    return null;
  }
  return conv;
}

// ─── Daftar percakapan saya ───────────────────────────────────────────────────
router.get('/chat/conversations', requireAuth, async (req, res, next) => {
  try {
    const convs = await prisma.chatConversation.findMany({
      where:
        req.user.role === 'guru'
          ? { teacherId: req.user.id }
          : { studentId: req.user.id },
      include: { class: true, teacher: true, student: true },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ conversations: await shapeMany(convs, req.user.id) });
  } catch (err) {
    return next(err);
  }
});

// ─── Buka / buat percakapan ───────────────────────────────────────────────────
// Guru: body { classId, studentId } — kelas harus miliknya dan siswa
// harus anggota kelas itu.
// Siswa: body { classId } — siswa harus anggota; lawan bicaranya guru
// pemilik kelas.
router.post('/chat/conversations', requireAuth, async (req, res, next) => {
  try {
    const { classId, studentId } = req.body ?? {};
    if (!Number.isInteger(classId) || classId <= 0) {
      return res.status(400).json({ error: 'classId wajib diisi.' });
    }
    const room = await prisma.classRoom.findUnique({ where: { id: classId } });
    if (!room) return res.status(404).json({ error: 'Kelas tidak ditemukan.' });

    let teacherId;
    let resolvedStudentId;
    if (req.user.role === 'guru') {
      if (room.teacherId !== req.user.id) {
        return res.status(403).json({ error: 'Kelas ini bukan milik Anda.' });
      }
      if (!Number.isInteger(studentId) || studentId <= 0) {
        return res.status(400).json({ error: 'studentId wajib diisi.' });
      }
      const member = await prisma.classMember.findUnique({
        where: { classId_userId: { classId, userId: studentId } },
      });
      if (!member) {
        return res.status(404).json({ error: 'Siswa bukan anggota kelas ini.' });
      }
      teacherId = req.user.id;
      resolvedStudentId = studentId;
    } else {
      const member = await prisma.classMember.findUnique({
        where: { classId_userId: { classId, userId: req.user.id } },
      });
      if (!member) {
        return res.status(403).json({ error: 'Anda bukan anggota kelas ini.' });
      }
      teacherId = room.teacherId;
      resolvedStudentId = req.user.id;
    }

    const conv = await prisma.chatConversation.upsert({
      where: {
        classId_studentId: { classId, studentId: resolvedStudentId },
      },
      create: { classId, teacherId, studentId: resolvedStudentId },
      update: {},
      include: { class: true, teacher: true, student: true },
    });
    const last = await prisma.conversationMessage.findFirst({
      where: { conversationId: conv.id },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(201).json({
      conversation: conversationShape(
        conv,
        req.user.id,
        last,
        await unreadCountFor(conv, req.user.id),
      ),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Pesan dalam percakapan ───────────────────────────────────────────────────
router.get('/chat/conversations/:id/messages', requireAuth, async (req, res, next) => {
  try {
    const conv = await loadConversationForParticipant(
      req,
      res,
      Number(req.params.id),
    );
    if (!conv) return;
    const rows = await prisma.conversationMessage.findMany({
      where: { conversationId: conv.id },
      include: { sender: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    const messages = rows.reverse().map((m) => ({
      id: m.id,
      conversationId: m.conversationId,
      senderId: m.senderId,
      senderName: m.sender.name,
      text: m.text,
      createdAt: m.createdAt,
    }));
    return res.json({
      conversation: conversationShape(
        conv,
        req.user.id,
        rows[0] ?? null,
        await unreadCountFor(conv, req.user.id),
      ),
      messages,
    });
  } catch (err) {
    return next(err);
  }
});

router.post('/chat/conversations/:id/messages', requireAuth, async (req, res, next) => {
  try {
    const conv = await loadConversationForParticipant(
      req,
      res,
      Number(req.params.id),
    );
    if (!conv) return;
    const { text } = req.body ?? {};
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
    }
    if (text.length > 1000) {
      return res.status(400).json({ error: 'Pesan maksimal 1000 karakter.' });
    }
    const message = await prisma.conversationMessage.create({
      data: {
        conversationId: conv.id,
        senderId: req.user.id,
        text: text.trim(),
      },
      include: { sender: true },
    });
    // Pengirim otomatis sudah "membaca" sampai pesannya sendiri.
    await prisma.chatConversation.update({
      where: { id: conv.id },
      data:
        conv.teacherId === req.user.id
          ? { guruReadAt: message.createdAt }
          : { siswaReadAt: message.createdAt },
    });
    return res.status(201).json({
      message: {
        id: message.id,
        conversationId: message.conversationId,
        senderId: message.senderId,
        senderName: message.sender.name,
        text: message.text,
        createdAt: message.createdAt,
      },
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Tandai percakapan sudah dibaca ───────────────────────────────────────────
router.post('/chat/conversations/:id/read', requireAuth, async (req, res, next) => {
  try {
    const conv = await loadConversationForParticipant(
      req,
      res,
      Number(req.params.id),
    );
    if (!conv) return;
    const now = new Date();
    await prisma.chatConversation.update({
      where: { id: conv.id },
      data:
        conv.teacherId === req.user.id
          ? { guruReadAt: now }
          : { siswaReadAt: now },
    });
    return res.json({ ok: true, unreadCount: 0 });
  } catch (err) {
    return next(err);
  }
});

// ─── Total pesan belum dibaca (untuk badge tab Chat) ─────────────────────────
router.get('/chat/unread', requireAuth, async (req, res, next) => {
  try {
    const convs = await prisma.chatConversation.findMany({
      where:
        req.user.role === 'guru'
          ? { teacherId: req.user.id }
          : { studentId: req.user.id },
    });
    let total = 0;
    for (const conv of convs) {
      total += await unreadCountFor(conv, req.user.id);
    }
    return res.json({ total });
  } catch (err) {
    return next(err);
  }
});

export default router;
