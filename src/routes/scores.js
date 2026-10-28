// Route sinkronisasi skor belajar dari aplikasi (siswa):
// pretest/posttest memakai nilai TERBARU, sedangkan latihanBest &
// simulatorBest memakai nilai TERBAIK (maksimum).

import { Router } from 'express';

import { prisma } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

const router = Router();

function validScore(value) {
  return Number.isInteger(value) && value >= 0 && value <= 100;
}

router.post('/scores/sync', requireAuth, requireRole('siswa'), async (req, res, next) => {
  try {
    const { pretest, posttest, latihanBest, simulatorBest } = req.body ?? {};
    const fields = { pretest, posttest, latihanBest, simulatorBest };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined && value !== null && !validScore(value)) {
        return res.status(400).json({ error: `${key} harus bilangan bulat 0..100.` });
      }
    }

    const existing = await prisma.scoreSync.findUnique({
      where: { userId: req.user.id },
    });

    const data = {};
    if (pretest != null) data.pretest = pretest; // terbaru menang
    if (posttest != null) data.posttest = posttest; // terbaru menang
    if (latihanBest != null) {
      data.latihanBest = Math.max(existing?.latihanBest ?? 0, latihanBest);
    }
    if (simulatorBest != null) {
      data.simulatorBest = Math.max(existing?.simulatorBest ?? 0, simulatorBest);
    }

    const saved = await prisma.scoreSync.upsert({
      where: { userId: req.user.id },
      create: { userId: req.user.id, ...data },
      update: data,
    });
    return res.json({
      scores: {
        pretest: saved.pretest,
        posttest: saved.posttest,
        latihanBest: saved.latihanBest,
        simulatorBest: saved.simulatorBest,
        updatedAt: saved.updatedAt,
      },
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
