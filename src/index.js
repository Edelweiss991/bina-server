// BINA Server — API Kelas Online untuk aplikasi BINA.
//
// Menjalankan: npm install && npx prisma generate &&
//              npx prisma db push && npm start
// Env wajib: DATABASE_URL (PostgreSQL), JWT_SECRET. PORT opsional.

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import classRoutes from './routes/classes.js';
import taskRoutes from './routes/tasks.js';
import scoreRoutes from './routes/scores.js';
import liveRoutes from './routes/live.js';
import guruRoutes from './routes/guru.js';
import chatRoutes from './routes/chat.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '256kb' }));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api', authRoutes);
app.use('/api', classRoutes);
app.use('/api', taskRoutes);
app.use('/api', scoreRoutes);
app.use('/api', liveRoutes);
app.use('/api', guruRoutes);
app.use('/api', chatRoutes);
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan.' });
});

// Penanganan error terpusat — selalu JSON rapi.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err && err.code === 'P2002') {
    return res.status(409).json({ error: 'Data duplikat (melanggar batas unik).' });
  }
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Body bukan JSON yang valid.' });
  }
  return res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`BINA server berjalan di port ${port}`);
});
