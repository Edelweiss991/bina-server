// Route Kelas Live (putaran BINA LIVE):
// briefing guru, sesi live + absensi otomatis, materi sesi, kuis live
// Boss Battle, lampu pemahaman, breakout room + chat, papan prestasi
// (XP & badge), dan laporan orang tua.
//
// Pola keamanan sama seperti route lama: JWT wajib, peran diperiksa,
// guru hanya boleh mengelola kelas/sesi miliknya, siswa hanya kelas
// yang diikutinya. Kunci jawaban kuis live TIDAK pernah dikirim ke
// klien lewat endpoint state.

import { Router } from 'express';

import { prisma, jsonIn, jsonOut } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

// ─── Helper ───────────────────────────────────────────────────────────────────

function sessionSummary(s) {
  return {
    id: s.id,
    classId: s.classId,
    teacherId: s.teacherId,
    title: s.title,
    openingText: s.openingText ?? null,
    materialText: s.materialText ?? null,
    status: s.status,
    startedAt: s.startedAt,
    endedAt: s.endedAt ?? null,
  };
}

async function findClass(classId) {
  if (!Number.isInteger(classId) || classId <= 0) return null;
  return prisma.classRoom.findUnique({ where: { id: classId } });
}

async function findSession(sessionId) {
  if (!Number.isInteger(sessionId) || sessionId <= 0) return null;
  return prisma.liveSession.findUnique({
    where: { id: sessionId },
    include: { class: true },
  });
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

/** Muat sesi + periksa akses kelasnya; kirim error bila gagal. */
async function loadSessionForUser(req, res, sessionId) {
  const session = await findSession(sessionId);
  if (!session) {
    res.status(404).json({ error: 'Sesi tidak ditemukan.' });
    return null;
  }
  if (!(await requireClassAccess(req, res, session.class))) return null;
  return session;
}

/** Muat sesi yang WAJIB dimiliki guru pemanggil. */
async function loadSessionForTeacher(req, res, sessionId) {
  const session = await findSession(sessionId);
  if (!session) {
    res.status(404).json({ error: 'Sesi tidak ditemukan.' });
    return null;
  }
  if (session.teacherId !== req.user.id) {
    res.status(403).json({ error: 'Sesi ini bukan milik Anda.' });
    return null;
  }
  return session;
}

function validateQuestions(questions) {
  if (!Array.isArray(questions) || questions.length < 1) {
    return 'questions wajib berupa array berisi minimal 1 soal.';
  }
  for (const [i, q] of questions.entries()) {
    if (!q || typeof q.question !== 'string' || q.question.trim() === '') {
      return `Soal ke-${i + 1}: pertanyaan wajib diisi.`;
    }
    if (
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      q.options.some((o) => typeof o !== 'string' || o.trim() === '')
    ) {
      return `Soal ke-${i + 1}: options wajib berisi 4 pilihan teks.`;
    }
    if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3) {
      return `Soal ke-${i + 1}: correctIndex harus bilangan 0..3.`;
    }
  }
  return null;
}

/** Sisa HP boss: maxHp dikurangi jumlah jawaban BENAR seluruh kelas. */
async function bossHpRemaining(quiz) {
  const correct = await prisma.liveAnswer.count({
    where: { quizId: quiz.id, correct: true },
  });
  return Math.max(0, quiz.bossMaxHp - correct);
}

async function understandingCounts(sessionId) {
  const votes = await prisma.understandingVote.findMany({
    where: { sessionId },
    select: { level: true },
  });
  const counts = { 0: 0, 1: 0, 2: 0 };
  for (const v of votes) {
    if (v.level === 0 || v.level === 1 || v.level === 2) counts[v.level]++;
  }
  return counts;
}

// ─── Briefing guru ────────────────────────────────────────────────────────────
router.get('/guru/briefing', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const teacherId = req.user.id;
    const myClasses = await prisma.classRoom.findMany({
      where: { teacherId },
      select: { id: true },
    });
    const classIds = myClasses.map((c) => c.id);

    const [studentCount, activeSessions, ungradedCount, recent] = await Promise.all([
      prisma.classMember.count({ where: { classId: { in: classIds } } }),
      prisma.liveSession.findMany({
        where: { teacherId, status: 'active' },
        include: { class: true },
        orderBy: { startedAt: 'desc' },
      }),
      prisma.submission.count({
        where: { score: null, task: { teacherId } },
      }),
      prisma.submission.findMany({
        where: { task: { teacherId } },
        include: { student: true, task: true },
        orderBy: { submittedAt: 'desc' },
        take: 5,
      }),
    ]);

    return res.json({
      classCount: myClasses.length,
      studentCount,
      activeSessionCount: activeSessions.length,
      ungradedCount,
      recentSubmissions: recent.map((s) => ({
        studentName: s.student.name,
        taskTitle: s.task.title,
        autoScore: s.autoScore,
        submittedAt: s.submittedAt,
      })),
      activeSessions: activeSessions.map((s) => ({
        ...sessionSummary(s),
        className: s.class.name,
        classCode: s.class.code,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Buat sesi (guru pemilik kelas) ───────────────────────────────────────────
router.post('/classes/:id/sessions', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const classId = Number(req.params.id);
    const room = await requireOwnedClass(req, res, classId);
    if (!room) return;

    const { title, openingText } = req.body ?? {};
    if (!title || typeof title !== 'string' || title.trim().length < 2) {
      return res.status(400).json({ error: 'Judul sesi wajib diisi.' });
    }
    const active = await prisma.liveSession.findFirst({
      where: { classId, status: 'active' },
    });
    if (active) {
      return res.status(409).json({
        error: 'Masih ada sesi aktif di kelas ini. Akhiri sesi itu dulu.',
        session: sessionSummary(active),
      });
    }
    const session = await prisma.liveSession.create({
      data: {
        classId,
        teacherId: req.user.id,
        title: title.trim(),
        openingText:
          typeof openingText === 'string' && openingText.trim()
            ? openingText.trim()
            : null,
      },
    });
    return res.status(201).json({ session: sessionSummary(session) });
  } catch (err) {
    return next(err);
  }
});

// ─── Sesi aktif sebuah kelas (anggota) ────────────────────────────────────────
router.get('/classes/:id/sessions/active', requireAuth, async (req, res, next) => {
  try {
    const classId = Number(req.params.id);
    const room = await findClass(classId);
    if (!room) return res.status(404).json({ error: 'Kelas tidak ditemukan.' });
    if (!(await requireClassAccess(req, res, room))) return;
    const session = await prisma.liveSession.findFirst({
      where: { classId, status: 'active' },
      orderBy: { startedAt: 'desc' },
    });
    return res.json({ session: session ? sessionSummary(session) : null });
  } catch (err) {
    return next(err);
  }
});

// ─── Akhiri sesi (guru pemilik) + ringkasan ───────────────────────────────────
router.post('/sessions/:id/end', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const session = await loadSessionForTeacher(req, res, Number(req.params.id));
    if (!session) return;

    let current = session;
    if (session.status !== 'ended') {
      current = await prisma.liveSession.update({
        where: { id: session.id },
        data: { status: 'ended', endedAt: new Date() },
        include: { class: true },
      });
    }
    const [attendanceCount, quizCount, counts] = await Promise.all([
      prisma.attendance.count({ where: { sessionId: session.id } }),
      prisma.liveQuiz.count({ where: { sessionId: session.id } }),
      understandingCounts(session.id),
    ]);
    return res.json({
      session: sessionSummary(current),
      summary: { attendanceCount, quizCount, understandingCounts: counts },
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Siswa masuk sesi = absensi otomatis ──────────────────────────────────────
router.post('/sessions/:id/join', requireAuth, requireRole('siswa'), async (req, res, next) => {
  try {
    const session = await loadSessionForUser(req, res, Number(req.params.id));
    if (!session) return;
    if (session.status !== 'active') {
      return res.status(400).json({ error: 'Sesi sudah berakhir.' });
    }
    const attendance = await prisma.attendance.upsert({
      where: {
        sessionId_userId: { sessionId: session.id, userId: req.user.id },
      },
      create: { sessionId: session.id, userId: req.user.id },
      update: {},
    });
    return res.json({
      attendance: { joinedAt: attendance.joinedAt },
      session: sessionSummary(session),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Guru memperbarui materi / pembuka sesi ───────────────────────────────────
router.put('/sessions/:id/material', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const session = await loadSessionForTeacher(req, res, Number(req.params.id));
    if (!session) return;
    const { materialText, openingText } = req.body ?? {};
    const data = {};
    if (materialText !== undefined) {
      if (materialText !== null && typeof materialText !== 'string') {
        return res.status(400).json({ error: 'materialText harus berupa teks.' });
      }
      data.materialText = materialText;
    }
    if (openingText !== undefined) {
      if (openingText !== null && typeof openingText !== 'string') {
        return res.status(400).json({ error: 'openingText harus berupa teks.' });
      }
      data.openingText = openingText;
    }
    const updated = await prisma.liveSession.update({
      where: { id: session.id },
      data,
    });
    return res.json({ session: sessionSummary(updated) });
  } catch (err) {
    return next(err);
  }
});

// ─── Keadaan sesi (polling klien) ─────────────────────────────────────────────
router.get('/sessions/:id/state', requireAuth, async (req, res, next) => {
  try {
    const session = await loadSessionForUser(req, res, Number(req.params.id));
    if (!session) return;

    const [attendanceCount, myAttendance, quizzes, counts, myVote] =
      await Promise.all([
        prisma.attendance.count({ where: { sessionId: session.id } }),
        prisma.attendance.findUnique({
          where: {
            sessionId_userId: { sessionId: session.id, userId: req.user.id },
          },
        }),
        prisma.liveQuiz.findMany({
          where: { sessionId: session.id },
          orderBy: { createdAt: 'asc' },
        }),
        understandingCounts(session.id),
        prisma.understandingVote.findUnique({
          where: {
            sessionId_userId: { sessionId: session.id, userId: req.user.id },
          },
        }),
      ]);

    const quizStates = [];
    for (const quiz of quizzes) {
      const questions = jsonOut(quiz.questions) ?? [];
      const [hp, myAnswers] = await Promise.all([
        bossHpRemaining(quiz),
        prisma.liveAnswer.count({
          where: { quizId: quiz.id, userId: req.user.id },
        }),
      ]);
      const state = {
        id: quiz.id,
        title: quiz.title,
        status: quiz.status,
        currentIndex: quiz.currentIndex,
        totalQuestions: questions.length,
        bossMaxHp: quiz.bossMaxHp,
        bossHpRemaining: hp,
        myAnsweredCount: myAnswers,
      };
      // Soal berjalan hanya untuk kuis running — TANPA correctIndex.
      if (quiz.status === 'running' &&
          quiz.currentIndex >= 0 &&
          quiz.currentIndex < questions.length) {
        const q = questions[quiz.currentIndex];
        state.currentQuestion = { question: q.question, options: q.options };
      }
      quizStates.push(state);
    }

    return res.json({
      session: {
        ...sessionSummary(session),
        className: session.class.name,
        classCode: session.class.code,
      },
      attendanceCount,
      myAttendance: myAttendance
        ? { joined: true, joinedAt: myAttendance.joinedAt }
        : { joined: false, joinedAt: null },
      quizzes: quizStates,
      understanding: { counts, myLevel: myVote ? myVote.level : null },
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Guru membuat kuis live (Boss Battle) ─────────────────────────────────────
router.post('/sessions/:id/quizzes', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const session = await loadSessionForTeacher(req, res, Number(req.params.id));
    if (!session) return;
    if (session.status !== 'active') {
      return res.status(400).json({ error: 'Sesi sudah berakhir.' });
    }
    const { title, questions, bossMaxHp } = req.body ?? {};
    if (!title || typeof title !== 'string' || title.trim().length < 2) {
      return res.status(400).json({ error: 'Judul kuis wajib diisi.' });
    }
    const qError = validateQuestions(questions);
    if (qError) return res.status(400).json({ error: qError });

    let maxHp = questions.length * 5;
    if (bossMaxHp !== undefined && bossMaxHp !== null) {
      if (!Number.isInteger(bossMaxHp) || bossMaxHp < 1 || bossMaxHp > 10000) {
        return res.status(400).json({ error: 'bossMaxHp harus bilangan 1..10000.' });
      }
      maxHp = bossMaxHp;
    }
    const quiz = await prisma.liveQuiz.create({
      data: {
        sessionId: session.id,
        title: title.trim(),
        questions: jsonIn(questions),
        bossMaxHp: maxHp,
      },
    });
    return res.status(201).json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        status: quiz.status,
        currentIndex: quiz.currentIndex,
        totalQuestions: questions.length,
        bossMaxHp: quiz.bossMaxHp,
        bossHpRemaining: quiz.bossMaxHp,
      },
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Kontrol kuis oleh guru: start | next | finish ────────────────────────────
router.post('/quizzes/:id/control', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const quizId = Number(req.params.id);
    const quiz = await prisma.liveQuiz.findUnique({
      where: { id: quizId },
      include: { session: true },
    });
    if (!quiz) return res.status(404).json({ error: 'Kuis tidak ditemukan.' });
    if (quiz.session.teacherId !== req.user.id) {
      return res.status(403).json({ error: 'Kuis ini bukan milik Anda.' });
    }
    const { action } = req.body ?? {};
    const questions = jsonOut(quiz.questions) ?? [];
    const total = questions.length;

    let data = null;
    if (action === 'start') {
      if (quiz.status === 'finished') {
        return res.status(400).json({ error: 'Kuis sudah selesai.' });
      }
      data = { status: 'running', currentIndex: 0 };
    } else if (action === 'next') {
      if (quiz.status !== 'running') {
        return res.status(400).json({ error: 'Kuis belum berjalan.' });
      }
      const nextIndex = quiz.currentIndex + 1;
      data = nextIndex >= total
        ? { status: 'finished', currentIndex: total - 1 }
        : { currentIndex: nextIndex };
    } else if (action === 'finish') {
      data = { status: 'finished' };
    } else {
      return res.status(400).json({ error: "action harus 'start', 'next', atau 'finish'." });
    }

    const updated = await prisma.liveQuiz.update({ where: { id: quizId }, data });
    return res.json({
      quiz: {
        id: updated.id,
        title: updated.title,
        status: updated.status,
        currentIndex: updated.currentIndex,
        totalQuestions: total,
        bossMaxHp: updated.bossMaxHp,
        bossHpRemaining: await bossHpRemaining(updated),
      },
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Siswa menjawab soal kuis yang sedang berjalan ────────────────────────────
router.post('/quizzes/:id/answer', requireAuth, requireRole('siswa'), async (req, res, next) => {
  try {
    const quizId = Number(req.params.id);
    const quiz = await prisma.liveQuiz.findUnique({
      where: { id: quizId },
      include: { session: { include: { class: true } } },
    });
    if (!quiz) return res.status(404).json({ error: 'Kuis tidak ditemukan.' });
    if (!(await isClassMember(quiz.session.classId, req.user.id))) {
      return res.status(403).json({ error: 'Anda bukan anggota kelas ini.' });
    }
    if (quiz.status !== 'running') {
      return res.status(400).json({ error: 'Kuis tidak sedang berjalan.' });
    }
    const { questionIndex, selectedIndex } = req.body ?? {};
    if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex > 3) {
      return res.status(400).json({ error: 'selectedIndex harus bilangan 0..3.' });
    }
    if (questionIndex !== quiz.currentIndex) {
      return res.status(400).json({ error: 'Soal itu bukan soal yang sedang berjalan.' });
    }
    const questions = jsonOut(quiz.questions) ?? [];
    const current = questions[quiz.currentIndex];
    if (!current) return res.status(400).json({ error: 'Soal tidak ditemukan.' });

    const existing = await prisma.liveAnswer.findUnique({
      where: {
        quizId_userId_questionIndex: {
          quizId,
          userId: req.user.id,
          questionIndex,
        },
      },
    });
    if (existing) {
      return res.status(409).json({ error: 'Soal ini sudah Anda jawab.' });
    }
    const correct = current.correctIndex === selectedIndex;
    await prisma.liveAnswer.create({
      data: { quizId, userId: req.user.id, questionIndex, selectedIndex, correct },
    });
    return res.status(201).json({
      correct,
      bossHpRemaining: await bossHpRemaining(quiz),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Lampu pemahaman siswa ────────────────────────────────────────────────────
router.put('/sessions/:id/understanding', requireAuth, requireRole('siswa'), async (req, res, next) => {
  try {
    const session = await loadSessionForUser(req, res, Number(req.params.id));
    if (!session) return;
    const { level } = req.body ?? {};
    if (!Number.isInteger(level) || level < 0 || level > 2) {
      return res.status(400).json({ error: 'level harus 0 (merah), 1 (kuning), atau 2 (hijau).' });
    }
    const vote = await prisma.understandingVote.upsert({
      where: {
        sessionId_userId: { sessionId: session.id, userId: req.user.id },
      },
      create: { sessionId: session.id, userId: req.user.id, level },
      update: { level },
    });
    return res.json({
      vote: { level: vote.level },
      counts: await understandingCounts(session.id),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Guru membagi kelas menjadi kelompok breakout acak ───────────────────────
router.post('/sessions/:id/groups', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const session = await loadSessionForTeacher(req, res, Number(req.params.id));
    if (!session) return;
    const { groupCount } = req.body ?? {};
    if (!Number.isInteger(groupCount) || groupCount < 1 || groupCount > 20) {
      return res.status(400).json({ error: 'groupCount harus bilangan 1..20.' });
    }
    const members = await prisma.classMember.findMany({
      where: { classId: session.classId },
      include: { user: true },
      orderBy: { joinedAt: 'asc' },
    });
    // Acak (Fisher–Yates) lalu bagi rata bergiliran.
    const pool = members.map((m) => m.user);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Hapus grup lama sesi ini beserta anggota & pesannya.
    const oldGroups = await prisma.breakoutGroup.findMany({
      where: { sessionId: session.id },
      select: { id: true },
    });
    const oldIds = oldGroups.map((g) => g.id);
    if (oldIds.length > 0) {
      await prisma.chatMessage.deleteMany({ where: { groupId: { in: oldIds } } });
      await prisma.breakoutMember.deleteMany({ where: { groupId: { in: oldIds } } });
      await prisma.breakoutGroup.deleteMany({ where: { id: { in: oldIds } } });
    }

    const groups = [];
    for (let g = 0; g < groupCount; g++) {
      const group = await prisma.breakoutGroup.create({
        data: { sessionId: session.id, name: `Kelompok ${g + 1}` },
      });
      const assigned = pool.filter((_, idx) => idx % groupCount === g);
      for (const user of assigned) {
        await prisma.breakoutMember.create({
          data: { groupId: group.id, userId: user.id },
        });
      }
      groups.push({
        id: group.id,
        name: group.name,
        members: assigned.map((u) => ({ userId: u.id, name: u.name })),
      });
    }
    return res.status(201).json({ groups });
  } catch (err) {
    return next(err);
  }
});

// ─── Daftar kelompok sesi (anggota) ───────────────────────────────────────────
router.get('/sessions/:id/groups', requireAuth, async (req, res, next) => {
  try {
    const session = await loadSessionForUser(req, res, Number(req.params.id));
    if (!session) return;
    const groups = await prisma.breakoutGroup.findMany({
      where: { sessionId: session.id },
      include: { members: { include: { user: true } } },
      orderBy: { id: 'asc' },
    });
    let myGroupId = null;
    const shaped = groups.map((g) => {
      const members = g.members.map((m) => ({
        userId: m.user.id,
        name: m.user.name,
      }));
      if (members.some((m) => m.userId === req.user.id)) myGroupId = g.id;
      return { id: g.id, name: g.name, members };
    });
    return res.json({ groups: shaped, myGroupId });
  } catch (err) {
    return next(err);
  }
});

// ─── Chat kelompok breakout ───────────────────────────────────────────────────
async function loadGroupForMember(req, res, groupId) {
  const group = await prisma.breakoutGroup.findUnique({
    where: { id: groupId },
    include: { session: true },
  });
  if (!group) {
    res.status(404).json({ error: 'Kelompok tidak ditemukan.' });
    return null;
  }
  if (group.session.teacherId === req.user.id) return group; // guru pemilik boleh memantau
  const membership = await prisma.breakoutMember.findUnique({
    where: { groupId_userId: { groupId, userId: req.user.id } },
  });
  if (!membership) {
    res.status(403).json({ error: 'Anda bukan anggota kelompok ini.' });
    return null;
  }
  return group;
}

router.get('/groups/:id/messages', requireAuth, async (req, res, next) => {
  try {
    const group = await loadGroupForMember(req, res, Number(req.params.id));
    if (!group) return;
    const rows = await prisma.chatMessage.findMany({
      where: { groupId: group.id },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    const messages = rows.reverse().map((m) => ({
      id: m.id,
      userId: m.userId,
      userName: m.user.name,
      text: m.text,
      createdAt: m.createdAt,
    }));
    return res.json({ messages });
  } catch (err) {
    return next(err);
  }
});

router.post('/groups/:id/messages', requireAuth, async (req, res, next) => {
  try {
    const group = await loadGroupForMember(req, res, Number(req.params.id));
    if (!group) return;
    const { text } = req.body ?? {};
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
    }
    if (text.length > 1000) {
      return res.status(400).json({ error: 'Pesan maksimal 1000 karakter.' });
    }
    const message = await prisma.chatMessage.create({
      data: { groupId: group.id, userId: req.user.id, text: text.trim() },
      include: { user: true },
    });
    return res.status(201).json({
      message: {
        id: message.id,
        userId: message.userId,
        userName: message.user.name,
        text: message.text,
        createdAt: message.createdAt,
      },
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Papan prestasi: XP & badge ───────────────────────────────────────────────
//
// RUMUS XP (per siswa, dalam satu kelas):
//   XP = (pretest ?? 0) + (posttest ?? 0) + (latihanBest ?? 0)
//      + (simulatorBest ?? 0)                        ← dari ScoreSync
//      + 10 × jumlah kehadiran sesi live kelas ini
//      + 5  × jumlah jawaban kuis live yang BENAR di kelas ini
//      + rata-rata autoScore tugas kelas ini (dibulatkan; 0 bila belum ada)
//
// BADGE:
//   hadir-1 'Langkah Pertama'  — kehadiran ≥ 1
//   hadir-5 'Hadir Andal'      — kehadiran ≥ 5
//   master-simulator           — simulatorBest ≥ 90  ('Master Simulator')
//   ahli-kuis 'Ahli Kuis Live' — jawaban live benar ≥ 20
//   rajin-tugas 'Pejuang Tugas'— submit tugas ≥ 5
//   bintang-kelas              — XP ≥ 400 ('Bintang Kelas')
export function computeBadges({ attendanceCount, liveCorrect, simulatorBest, taskSubmitCount, xp }) {
  const badges = [];
  if (attendanceCount >= 1) badges.push({ id: 'hadir-1', name: 'Langkah Pertama' });
  if (attendanceCount >= 5) badges.push({ id: 'hadir-5', name: 'Hadir Andal' });
  if ((simulatorBest ?? 0) >= 90) badges.push({ id: 'master-simulator', name: 'Master Simulator' });
  if (liveCorrect >= 20) badges.push({ id: 'ahli-kuis', name: 'Ahli Kuis Live' });
  if (taskSubmitCount >= 5) badges.push({ id: 'rajin-tugas', name: 'Pejuang Tugas' });
  if (xp >= 400) badges.push({ id: 'bintang-kelas', name: 'Bintang Kelas' });
  return badges;
}

router.get('/classes/:id/leaderboard', requireAuth, async (req, res, next) => {
  try {
    const classId = Number(req.params.id);
    const room = await findClass(classId);
    if (!room) return res.status(404).json({ error: 'Kelas tidak ditemukan.' });
    if (!(await requireClassAccess(req, res, room))) return;

    const members = await prisma.classMember.findMany({
      where: { classId },
      include: { user: { include: { scoreSync: true } } },
      orderBy: { joinedAt: 'asc' },
    });

    const entries = [];
    for (const m of members) {
      const user = m.user;
      const scores = user.scoreSync;
      const [attendanceCount, liveCorrect, subs] = await Promise.all([
        prisma.attendance.count({
          where: { userId: user.id, session: { classId } },
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
          select: { autoScore: true },
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
        10 * attendanceCount +
        5 * liveCorrect +
        taskAvg;
      entries.push({
        userId: user.id,
        name: user.name,
        xp,
        badges: computeBadges({
          attendanceCount,
          liveCorrect,
          simulatorBest: scores?.simulatorBest ?? null,
          taskSubmitCount: subs.length,
          xp,
        }),
        attendanceCount,
        liveCorrect,
      });
    }
    entries.sort((a, b) => b.xp - a.xp);
    return res.json({ leaderboard: entries });
  } catch (err) {
    return next(err);
  }
});

// ─── Laporan orang tua (guru menyusun dari data siswa) ────────────────────────
router.post(
  '/classes/:id/students/:userId/parent-report',
  requireAuth,
  requireRole('guru'),
  async (req, res, next) => {
    try {
      const classId = Number(req.params.id);
      const studentId = Number(req.params.userId);
      const room = await requireOwnedClass(req, res, classId);
      if (!room) return;
      if (!(await isClassMember(classId, studentId))) {
        return res.status(404).json({ error: 'Siswa bukan anggota kelas ini.' });
      }
      const student = await prisma.user.findUnique({
        where: { id: studentId },
        include: { scoreSync: true },
      });

      const [attendanceCount, subs, latestReview] = await Promise.all([
        prisma.attendance.count({
          where: { userId: studentId, session: { classId } },
        }),
        prisma.submission.findMany({
          where: { studentId, task: { classId } },
          select: { autoScore: true },
        }),
        prisma.submission.findFirst({
          where: { studentId, task: { classId }, review: { not: null } },
          orderBy: { submittedAt: 'desc' },
          select: { review: true },
        }),
      ]);

      const scores = student.scoreSync;
      const pretest = scores?.pretest ?? null;
      const posttest = scores?.posttest ?? null;
      const simulatorBest = scores?.simulatorBest ?? null;
      const taskAvg = subs.length
        ? Math.round(subs.reduce((a, s) => a + s.autoScore, 0) / subs.length)
        : null;

      const aspects = [
        { label: 'nilai Post-Test', value: posttest },
        { label: 'skor Simulator Rakit PC', value: simulatorBest },
        { label: 'rata-rata nilai tugas', value: taskAvg },
      ].filter((a) => a.value !== null);
      const hasData =
        aspects.length > 0 || attendanceCount > 0 || subs.length > 0;

      const name = student.name;
      const lines = [];
      lines.push(`Laporan Belajar — ${name}`);
      lines.push(`Kelas: ${room.name}`);
      lines.push('');
      lines.push(
        `Yth. Bapak/Ibu orang tua/wali dari ${name}, berikut ringkasan ` +
          `perkembangan belajar putra/putri Bapak/Ibu pada kelas ${room.name} ` +
          `di aplikasi BINA (Belajar Instalasi dan Perakitan Komputer).`,
      );
      lines.push('');
      if (!hasData) {
        lines.push(
          `Saat ini belum cukup data belajar yang tercatat untuk ${name} — ` +
            `ia belum mengikuti sesi live, mengumpulkan tugas, atau ` +
            `menyelesaikan tes yang tersinkron. Laporan akan lebih lengkap ` +
            `setelah aktivitas belajarnya tercatat di aplikasi.`,
        );
      } else {
        lines.push(
          `Kehadiran: ${name} tercatat hadir pada ${attendanceCount} sesi ` +
            `live kelas ini.`,
        );
        if (pretest !== null || posttest !== null) {
          let growth = '';
          if (pretest !== null && posttest !== null) {
            growth = posttest >= pretest
              ? ` — ada peningkatan sebesar ${posttest - pretest} poin dari Pre-Test ke Post-Test`
              : ` — perlu pendampingan tambahan karena turun ${pretest - posttest} poin dari Pre-Test ke Post-Test`;
          }
          lines.push(
            `Perkembangan tes: Pre-Test ${pretest ?? '—'}, Post-Test ` +
              `${posttest ?? '—'}${growth}.`,
          );
        }
        if (subs.length > 0) {
          lines.push(
            `Tugas: sudah mengumpulkan ${subs.length} tugas dengan ` +
              `rata-rata nilai ${taskAvg}.`,
          );
        }
        if (simulatorBest !== null) {
          lines.push(
            `Praktik simulator: skor terbaik merakit PC secara virtual ` +
              `adalah ${simulatorBest} dari 100.`,
          );
        }
        if (aspects.length > 0) {
          const sorted = [...aspects].sort((a, b) => b.value - a.value);
          const strongest = sorted[0];
          lines.push(
            `Kekuatan: ${name} paling menonjol pada ${strongest.label} ` +
              `dengan capaian ${strongest.value}.`,
          );
          if (sorted.length > 1) {
            const weakest = sorted[sorted.length - 1];
            if (weakest.label !== strongest.label) {
              lines.push(
                `Yang masih perlu dilatih: ${weakest.label} ` +
                  `(capaian ${weakest.value}) — akan kami dampingi pada ` +
                  `pertemuan berikutnya.`,
              );
            }
          }
        }
        if (latestReview?.review) {
          lines.push(`Ulasan guru terakhir: "${latestReview.review}"`);
        }
      }
      lines.push('');
      lines.push(
        `Terima kasih atas dukungan Bapak/Ibu di rumah. Bila ada yang ` +
          `ingin ditanyakan, silakan menghubungi guru kelas ${room.name}.`,
      );
      lines.push('');
      lines.push(`— ${req.user.name}, Guru Kelas ${room.name}`);

      const content = lines.join('\n');
      const report = await prisma.parentReport.create({
        data: {
          classId,
          studentId,
          teacherId: req.user.id,
          content,
        },
      });
      return res.status(201).json({
        report: {
          id: report.id,
          classId: report.classId,
          className: room.name,
          studentId: report.studentId,
          studentName: student.name,
          content: report.content,
          createdAt: report.createdAt,
        },
      });
    } catch (err) {
      return next(err);
    }
  },
);

// ─── Laporan orang tua milik siswa yang login ─────────────────────────────────
router.get('/my/parent-reports', requireAuth, requireRole('siswa'), async (req, res, next) => {
  try {
    const reports = await prisma.parentReport.findMany({
      where: { studentId: req.user.id },
      include: { class: true },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({
      reports: reports.map((r) => ({
        id: r.id,
        classId: r.classId,
        className: r.class.name,
        content: r.content,
        createdAt: r.createdAt,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
