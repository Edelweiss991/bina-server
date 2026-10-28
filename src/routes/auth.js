// Route autentikasi: register, login, profil sendiri.

import { Router } from 'express';
import bcrypt from 'bcryptjs';

import { prisma } from '../db.js';
import { publicUser, requireAuth, signToken } from '../auth.js';

const router = Router();

router.post('/auth/register', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body ?? {};
    // Putaran BINA GURU: register dibuat BEBAS — nama cukup teks tidak
    // kosong, email cukup string tidak kosong (TIDAK lagi divalidasi
    // format email); keunikan email tetap dijaga (409 bila ganda).
    // Memang tidak ada email verifikasi di sistem ini.
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return res.status(400).json({ error: 'Nama wajib diisi.' });
    }
    if (!email || typeof email !== 'string' || email.trim().length < 1) {
      return res.status(400).json({ error: 'Email wajib diisi.' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password minimal 6 karakter.' });
    }
    if (role !== 'guru' && role !== 'siswa') {
      return res.status(400).json({ error: "Peran harus 'guru' atau 'siswa'." });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return res.status(409).json({ error: 'Email sudah terdaftar. Silakan login.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name: name.trim(), email: normalizedEmail, passwordHash, role },
    });
    return res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    return next(err);
  }
});

router.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi.' });
    }
    const user = await prisma.user.findUnique({
      where: { email: String(email).trim().toLowerCase() },
    });
    if (!user || !(await bcrypt.compare(String(password), user.passwordHash))) {
      return res.status(401).json({ error: 'Email atau password salah.' });
    }
    return res.json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    return next(err);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    return res.json({ user: publicUser(user) });
  } catch (err) {
    return next(err);
  }
});

export default router;
