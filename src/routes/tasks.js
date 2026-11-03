// Route tugas: buat tugas (guru), daftar tugas per kelas, kerjakan
// (siswa), hasil per tugas (guru), penilaian (guru), hasil saya (siswa).

import { Router } from 'express';

import { prisma, jsonIn, jsonOut } from '../db.js';
import { parseFilePayload } from '../files.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

function validateQuestions(questions) {
  if (!Array.isArray(questions) || questions.length < 1) {
    return 'Tugas minimal memiliki 1 soal.';
  }
  for (const [i, q] of questions.entries()) {
    if (!q || typeof q.question !== 'string' || q.question.trim().length < 3) {
      return `Soal ke-${i + 1}: teks pertanyaan wajib diisi.`;
    }
    if (
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      q.options.some((o) => typeof o !== 'string' || o.trim().length === 0)
    ) {
      return `Soal ke-${i + 1}: wajib tepat 4 opsi jawaban dan tidak boleh kosong.`;
    }
    if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3) {
      return `Soal ke-${i + 1}: correctIndex harus 0..3.`;
    }
  }
  return null;
}

/** Pastikan user adalah guru pemilik kelas; kembalikan kelas atau null. */
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

function parseDateOrNull(value) {
  if (value == null || value === '') return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/** 403 bila di luar jendela pengerjaan; true bila boleh lanjut. */
function checkWindow(req, res, task) {
  const now = new Date();
  if (task.opensAt && now < task.opensAt) {
    res.status(403).json({ error: 'Belum dibuka. Tugas/kuis ini baru bisa dikerjakan mulai jadwal yang ditentukan guru.' });
    return false;
  }
  if (task.dueAt && now > task.dueAt) {
    res.status(403).json({ error: 'Sudah ditutup. Batas waktu pengerjaan telah lewat.' });
    return false;
  }
  return true;
}

// ─── Buat tugas (guru pemilik kelas) ──────────────────────────────────────────
router.post('/classes/:id/tasks', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const classId = Number(req.params.id);
    const room = await ownedClass(req, res, classId);
    if (!room) return;
    const { title, description, questions, type, opensAt, dueAt } = req.body ?? {};
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return res.status(400).json({ error: 'Judul tugas wajib diisi.' });
    }
    const taskType = type === 'assignment' ? 'assignment' : 'quiz';
    const cleanDesc =
      typeof description === 'string' && description.trim()
        ? description.trim()
        : null;
    let storedQuestions = [];
    if (taskType === 'quiz') {
      const qError = validateQuestions(questions);
      if (qError) return res.status(400).json({ error: qError });
      storedQuestions = questions;
    } else if (!cleanDesc) {
      return res.status(400).json({
        error: 'Instruksi tugas wajib diisi (apa yang harus dikerjakan siswa).',
      });
    }
    const opens = parseDateOrNull(opensAt);
    const due = parseDateOrNull(dueAt);
    if (opens === undefined || due === undefined) {
      return res.status(400).json({ error: 'Format tanggal jadwal tidak valid.' });
    }
    if (opens && due && due <= opens) {
      return res.status(400).json({ error: 'Waktu penutupan harus setelah waktu pembukaan.' });
    }
    const task = await prisma.task.create({
      data: {
        classId,
        teacherId: req.user.id,
        title: title.trim(),
        description: cleanDesc,
        questions: jsonIn(storedQuestions),
        type: taskType,
        opensAt: opens,
        dueAt: due,
      },
    });
    return res.status(201).json({
      task: {
        id: task.id,
        classId: task.classId,
        title: task.title,
        description: task.description,
        questions: jsonOut(task.questions),
        type: task.type,
        opensAt: task.opensAt,
        dueAt: task.dueAt,
        createdAt: task.createdAt,
      },
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Daftar tugas dalam kelas (anggota / guru pemilik) ────────────────────────
router.get('/classes/:id/tasks', requireAuth, async (req, res, next) => {
  try {
    const classId = Number(req.params.id);
    const room = await prisma.classRoom.findUnique({ where: { id: classId } });
    if (!room) return res.status(404).json({ error: 'Kelas tidak ditemukan.' });

    const isTeacherOwner = req.user.role === 'guru' && room.teacherId === req.user.id;
    let mySubmissions = new Map();
    if (!isTeacherOwner) {
      if (req.user.role !== 'siswa') {
        return res.status(403).json({ error: 'Anda bukan anggota kelas ini.' });
      }
      const member = await prisma.classMember.findUnique({
        where: { classId_userId: { classId, userId: req.user.id } },
      });
      if (!member) {
        return res.status(403).json({ error: 'Anda bukan anggota kelas ini.' });
      }
      const subs = await prisma.submission.findMany({
        where: { studentId: req.user.id, task: { classId } },
      });
      mySubmissions = new Map(subs.map((s) => [s.taskId, s]));
    }

    const tasks = await prisma.task.findMany({
      where: { classId },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({
      tasks: tasks.map((task) => {
        const questions = jsonOut(task.questions);
        const base = {
          id: task.id,
          classId: task.classId,
          title: task.title,
          description: task.description,
          questionCount: questions.length,
          type: task.type,
          opensAt: task.opensAt,
          dueAt: task.dueAt,
          createdAt: task.createdAt,
        };
        if (isTeacherOwner) {
          return { ...base, questions };
        }
        // Siswa: kunci jawaban TIDAK PERNAH dikirim.
        const mine = mySubmissions.get(task.id);
        return {
          ...base,
          questions: questions.map((q) => ({
            question: q.question,
            options: q.options,
          })),
          mySubmission: mine
            ? {
                autoScore: mine.autoScore,
                score: mine.score,
                review: mine.review,
                submittedAt: mine.submittedAt,
                fileName: mine.fileName,
              }
            : null,
        };
      }),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Kerjakan tugas (siswa anggota kelas) ─────────────────────────────────────
router.post('/tasks/:id/submit', requireAuth, requireRole('siswa'), async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ error: 'Tugas tidak ditemukan.' });
    const member = await prisma.classMember.findUnique({
      where: { classId_userId: { classId: task.classId, userId: req.user.id } },
    });
    if (!member) {
      return res.status(403).json({ error: 'Anda bukan anggota kelas tugas ini.' });
    }
    if (!checkWindow(req, res, task)) return;

    // ── Tugas bebas (assignment): kiriman teks/tautan/berkas ──
    if (task.type === 'assignment') {
      const { text, link, file } = req.body ?? {};
      const cleanText = typeof text === 'string' ? text.trim() : '';
      let cleanLink = null;
      if (link != null && link !== '') {
        if (typeof link !== 'string' || !/^https?:\/\//i.test(link.trim())) {
          return res.status(400).json({
            error: 'Tautan kiriman harus diawali http:// atau https://.',
          });
        }
        cleanLink = link.trim();
      }
      const parsed = parseFilePayload(file);
      if (parsed.error) return res.status(400).json({ error: parsed.error });
      if (!cleanText && !cleanLink && !parsed.buffer) {
        return res.status(400).json({
          error: 'Kiriman kosong — isi teks, tautan, atau lampirkan berkas.',
        });
      }
      const payload = { text: cleanText, link: cleanLink };
      const fileFields = parsed.buffer
        ? {
            fileName: parsed.fileName,
            fileMime: parsed.fileMime,
            fileData: parsed.buffer,
          }
        : { fileName: null, fileMime: null, fileData: null };
      // Kirim ulang menimpa kiriman lama & mengosongkan nilai guru.
      const submission = await prisma.submission.upsert({
        where: { taskId_studentId: { taskId, studentId: req.user.id } },
        create: {
          taskId,
          studentId: req.user.id,
          answers: jsonIn(payload),
          autoScore: 0,
          ...fileFields,
        },
        update: {
          answers: jsonIn(payload),
          autoScore: 0,
          score: null,
          review: null,
          submittedAt: new Date(),
          ...fileFields,
        },
      });
      return res.json({
        submission: {
          id: submission.id,
          taskId: submission.taskId,
          answers: payload,
          fileName: submission.fileName,
          submittedAt: submission.submittedAt,
        },
        autoScore: 0,
      });
    }

    const { answers } = req.body ?? {};
    const questions = jsonOut(task.questions);
    if (
      !Array.isArray(answers) ||
      answers.length !== questions.length ||
      answers.some((a) => !Number.isInteger(a) || a < 0 || a > 3)
    ) {
      return res.status(400).json({
        error: `answers harus berupa ${questions.length} indeks opsi (0..3).`,
      });
    }
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    const autoScore = Math.round((correct / questions.length) * 100);

    // Kirim ulang = menimpa jawaban & skor otomatis, dan mengosongkan
    // nilai final/ulasan guru agar dinilai ulang dari jawaban terbaru.
    const submission = await prisma.submission.upsert({
      where: { taskId_studentId: { taskId, studentId: req.user.id } },
      create: {
        taskId,
        studentId: req.user.id,
        answers: jsonIn(answers),
        autoScore,
      },
      update: {
        answers: jsonIn(answers),
        autoScore,
        score: null,
        review: null,
        submittedAt: new Date(),
      },
    });
    return res.json({
      submission: {
        id: submission.id,
        taskId: submission.taskId,
        answers,
        submittedAt: submission.submittedAt,
      },
      autoScore,
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Hasil satu tugas (guru pemilik) ──────────────────────────────────────────
router.get('/tasks/:id/results', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { class: true },
    });
    if (!task) return res.status(404).json({ error: 'Tugas tidak ditemukan.' });
    if (task.class.teacherId !== req.user.id) {
      return res.status(403).json({ error: 'Tugas ini bukan milik kelas Anda.' });
    }
    const submissions = await prisma.submission.findMany({
      where: { taskId },
      include: { student: true },
      orderBy: { submittedAt: 'asc' },
    });
    return res.json({
      task: {
        id: task.id,
        classId: task.classId,
        className: task.class.name,
        title: task.title,
        description: task.description,
        questions: jsonOut(task.questions),
        type: task.type,
        opensAt: task.opensAt,
        dueAt: task.dueAt,
      },
      results: submissions.map((s) => ({
        submissionId: s.id,
        studentId: s.studentId,
        studentName: s.student.name,
        studentEmail: s.student.email,
        answers: jsonOut(s.answers),
        fileName: s.fileName,
        autoScore: s.autoScore,
        score: s.score,
        review: s.review,
        submittedAt: s.submittedAt,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Beri nilai final & ulasan (guru pemilik) ─────────────────────────────────
router.put('/submissions/:id/grade', requireAuth, requireRole('guru'), async (req, res, next) => {
  try {
    const submissionId = Number(req.params.id);
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: { task: { include: { class: true } } },
    });
    if (!submission) {
      return res.status(404).json({ error: 'Submission tidak ditemukan.' });
    }
    if (submission.task.class.teacherId !== req.user.id) {
      return res.status(403).json({ error: 'Submission ini bukan dari kelas Anda.' });
    }
    const { score, review } = req.body ?? {};
    if (score === undefined && review === undefined) {
      return res.status(400).json({ error: 'Isi score dan/atau review.' });
    }
    const data = {};
    if (score !== undefined) {
      if (!Number.isInteger(score) || score < 0 || score > 100) {
        return res.status(400).json({ error: 'score harus bilangan bulat 0..100.' });
      }
      data.score = score;
    }
    if (review !== undefined) {
      if (review !== null && typeof review !== 'string') {
        return res.status(400).json({ error: 'review harus teks.' });
      }
      data.review = review;
    }
    const updated = await prisma.submission.update({
      where: { id: submissionId },
      data,
    });
    return res.json({
      submission: {
        id: updated.id,
        taskId: updated.taskId,
        studentId: updated.studentId,
        autoScore: updated.autoScore,
        score: updated.score,
        review: updated.review,
        submittedAt: updated.submittedAt,
      },
    });
  } catch (err) {
    return next(err);
  }
});

// ─── Hasil saya (siswa) ───────────────────────────────────────────────────────
router.get('/my/results', requireAuth, requireRole('siswa'), async (req, res, next) => {
  try {
    const submissions = await prisma.submission.findMany({
      where: { studentId: req.user.id },
      include: { task: { include: { class: true } } },
      orderBy: { submittedAt: 'desc' },
    });
    return res.json({
      results: submissions.map((s) => ({
        submissionId: s.id,
        taskId: s.taskId,
        taskTitle: s.task.title,
        classId: s.task.classId,
        className: s.task.class.name,
        autoScore: s.autoScore,
        // Nilai yang ditampilkan ke siswa: final guru bila ada.
        score: s.score ?? s.autoScore,
        finalScore: s.score,
        review: s.review,
        submittedAt: s.submittedAt,
      })),
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
