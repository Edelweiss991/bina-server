// Autentikasi JWT + helper validasi peran.

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'bina-dev-secret-ganti-di-produksi';
const TOKEN_TTL = '30d';

export function signToken(user) {
  return jwt.sign(
    { sub: String(user.id), role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: TOKEN_TTL },
  );
}

/** Middleware: wajib header Authorization: Bearer <token>. */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Token tidak ada. Silakan login dulu.' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: Number(payload.sub), role: payload.role, name: payload.name };
    return next();
  } catch {
    return res.status(401).json({ error: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
}

/** Middleware lanjutan: batasi ke satu peran ('guru' / 'siswa'). */
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: `Akses hanya untuk peran ${role}.` });
    }
    return next();
  };
}

/** Bentuk publik user (tanpa passwordHash). */
export function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
