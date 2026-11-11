// BINA Server — API Kelas Online untuk aplikasi BINA.
//
// Menjalankan: npm install && npx prisma generate &&
//              npx prisma db push && npm start
// Env wajib: DATABASE_URL (PostgreSQL), JWT_SECRET. PORT opsional.

import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';

import { prisma } from './db.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import classRoutes from './routes/classes.js';
import taskRoutes from './routes/tasks.js';
import scoreRoutes from './routes/scores.js';
import liveRoutes from './routes/live.js';
import guruRoutes from './routes/guru.js';
import chatRoutes from './routes/chat.js';
import fiturRoutes from './routes/fitur.js';
import attendanceRoutes from './routes/attendance.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '12mb' }));

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', classRoutes);
app.use('/api', taskRoutes);
app.use('/api', scoreRoutes);
app.use('/api', liveRoutes);
app.use('/api', guruRoutes);
app.use('/api', chatRoutes);
app.use('/api', fiturRoutes);
app.use('/api', attendanceRoutes);
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

// Bootstrap akun admin pertama: peran 'admin' tidak dapat diperoleh
// lewat register publik, jadi akun awal dibuat dari env
// BINA_ADMIN_EMAIL + BINA_ADMIN_PASSWORD bila belum ada pengguna
// dengan email tersebut. Setelah masuk, admin dapat membuatkan akun
// admin lain lewat POST /api/admin/users.
async function ensureSeedAdmin() {
  const readEnv = (name) => process.env[name] || '';
  const email = readEnv('BINA_ADMIN_EMAIL').trim().toLowerCase();
  const pw = process.env.BINA_ADMIN_PASSWORD || '';
  if (!email || !pw) return;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return;
    const passwordHash = await bcrypt.hash(pw, 10);
    await prisma.user.create({
      data: { name: 'Administrator BINA', email, passwordHash, role: 'admin' },
    });
    console.log(`Akun admin awal dibuat: ${email}`);
  } catch (err) {
    console.error('Gagal membuat akun admin awal:', err);
  }
}
ensureSeedAdmin();

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`BINA server berjalan di port ${port}`);
});
