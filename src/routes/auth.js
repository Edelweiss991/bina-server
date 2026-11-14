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

// Ganti kata sandi sendiri (semua peran) — wajib kata sandi lama yang
// benar. Ditambahkan 14 Nov 2026 agar pengguna (termasuk admin) bisa
// memasang sandi yang mudah diingat tanpa bantuan siapa pun.
router.post('/auth/change-password', requireAuth, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body ?? {};
    if (!currentPassword || typeof currentPassword !== 'string') {
      return res.status(400).json({ error: 'Kata sandi lama wajib diisi.' });
    }
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ error: 'Kata sandi baru minimal 6 karakter.' });
    }
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }
    if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
      return res.status(401).json({ error: 'Kata sandi lama salah.' });
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
    return res.json({ ok: true });
  } catch (err) {
    return next(err);
  }
});

// Edit profil sendiri (nama & email) saat sedang login — perintah
// pengguna 14 Nov 2026 malam: info profil siswa & guru harus bisa
// diedit sendiri. Peran TIDAK bisa diubah lewat sini (itu hak admin).
router.patch('/me', requireAuth, async (req, res, next) => {
  try {
    const { name, email } = req.body ?? {};
    const data = {};
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({ error: 'Nama minimal 2 karakter.' });
      }
      data.name = name.trim();
    }
    if (email !== undefined) {
      if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({ error: 'Format email tidak valid.' });
      }
      data.email = email.trim().toLowerCase();
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Tidak ada data yang diubah.' });
    }
    if (data.email) {
      const existing = await prisma.user.findUnique({ where: { email: data.email } });
      if (existing && existing.id !== req.user.id) {
        return res.status(409).json({ error: 'Email sudah dipakai akun lain.' });
      }
    }
    const user = await prisma.user.update({ where: { id: req.user.id }, data });
    return res.json({ user: publicUser(user) });
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
