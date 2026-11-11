// Smoke test endpoint ADMIN BINA Server (Fase 1 aplikasi gabungan).
//
// Menjalankan server sungguhan di atas SQLite terpisah, sama seperti
// test/smoke.mjs. Akun admin awal dibuat lewat bootstrap env
// BINA_ADMIN_EMAIL/BINA_ADMIN_PASSWORD (peran admin tidak bisa
// didaftarkan publik). Jalankan: npm run smoke:admin

import { execSync, spawn } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4124;
const BASE = `http://127.0.0.1:${PORT}`;

const env = {
  ...process.env,
  DATABASE_URL: 'file:./smoke-admin.db',
  BINA_TEST_SQLITE: '1',
  JWT_SECRET: 'smoke-admin-secret',
  PORT: String(PORT),
  BINA_ADMIN_EMAIL: 'admin@smoke.id',
  BINA_ADMIN_PASSWORD: 'admin123',
};

let failures = 0;
function check(label, cond, extra = '') {
  if (cond) {
    console.log(`  ✅ ${label}`);
  } else {
    failures++;
    console.log(`  ❌ ${label}${extra ? ` — ${extra}` : ''}`);
  }
}

async function api(method, pathName, { token, body } = {}) {
  const res = await fetch(`${BASE}${pathName}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

async function waitHealth(tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(`${BASE}/health`);
      if (res.ok) return true;
    } catch {
      /* belum naik */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

let server;
try {
  console.log('# Smoke Test Admin BINA Server');
  const dbFile = path.join(root, 'test', 'smoke-admin.db');
  if (existsSync(dbFile)) rmSync(dbFile);

  execSync('npx prisma generate --schema test/schema.sqlite.prisma', {
    cwd: root,
    env,
    stdio: 'pipe',
  });
  execSync('npx prisma db push --schema test/schema.sqlite.prisma --skip-generate', {
    cwd: root,
    env,
    stdio: 'pipe',
  });
  console.log('  ✅ prisma generate + db push (SQLite) berhasil');

  server = spawn('node', ['src/index.js'], { cwd: root, env, stdio: 'pipe' });
  server.stderr.on('data', (d) => process.stderr.write(`[server] ${d}`));
  const up = await waitHealth();
  check('server naik & /health ok', up);
  if (!up) throw new Error('Server tidak naik.');

  // 1) Register publik peran admin harus DITOLAK
  let r = await api('POST', '/api/auth/register', {
    body: { name: 'Calon Admin', email: 'calon@smoke.id', password: 'calon123', role: 'admin' },
  });
  check('register publik role admin → 400', r.status === 400, `status ${r.status}`);

  // 2) Login admin bootstrap
  r = await api('POST', '/api/auth/login', {
    body: { email: 'admin@smoke.id', password: 'admin123' },
  });
  check('login admin bootstrap → 200 + role admin', r.status === 200 && r.json.user?.role === 'admin');
  const adminToken = r.json.token;
  const adminId = r.json.user?.id;

  // 3) Tanpa token → 401; peran lain → 403
  r = await api('GET', '/api/admin/summary');
  check('summary tanpa token → 401', r.status === 401, `status ${r.status}`);

  r = await api('POST', '/api/auth/register', {
    body: { name: 'Bu Guru', email: 'guru@smoke.id', password: 'guru123', role: 'guru' },
  });
  const guruToken = r.json.token;
  const guruId = r.json.user?.id;
  check('register guru → 201', r.status === 201, `status ${r.status}`);

  r = await api('POST', '/api/auth/register', {
    body: { name: 'Andi Siswa', email: 'siswa@smoke.id', password: 'siswa123', role: 'siswa' },
  });
  const siswaToken = r.json.token;
  const siswaId = r.json.user?.id;
  check('register siswa → 201', r.status === 201, `status ${r.status}`);

  r = await api('GET', '/api/admin/summary', { token: guruToken });
  check('summary dengan token guru → 403', r.status === 403, `status ${r.status}`);
  r = await api('GET', '/api/admin/users', { token: siswaToken });
  check('users dengan token siswa → 403', r.status === 403, `status ${r.status}`);

  // 4) Ringkasan
  r = await api('GET', '/api/admin/summary', { token: adminToken });
  check(
    'summary admin → total 3 pengguna (1 admin, 1 guru, 1 siswa)',
    r.status === 200 &&
      r.json.totals?.users === 3 &&
      r.json.totals?.admin === 1 &&
      r.json.totals?.guru === 1 &&
      r.json.totals?.siswa === 1,
    JSON.stringify(r.json.totals),
  );

  // 5) Guru buat kelas → admin melihatnya di Kelola Kelas
  r = await api('POST', '/api/classes', { token: guruToken, body: { name: 'TKJ X-1' } });
  check('guru buat kelas → 201', r.status === 201, `status ${r.status}`);
  const classId = r.json.class?.id;

  r = await api('GET', '/api/admin/classes', { token: adminToken });
  const found = (r.json.classes ?? []).find((c) => c.id === classId);
  check(
    'admin classes → kelas guru tampil + nama guru benar',
    r.status === 200 && found && found.teacherName === 'Bu Guru',
    JSON.stringify(r.json.classes),
  );

  // 6) Admin buat akun (siswa + admin kedua)
  r = await api('POST', '/api/admin/users', {
    token: adminToken,
    body: { name: 'Siswa Dua', email: 'siswa2@smoke.id', password: 'siswa234', role: 'siswa' },
  });
  check('admin buat akun siswa → 201', r.status === 201, `status ${r.status}`);
  const siswa2Id = r.json.user?.id;

  r = await api('POST', '/api/admin/users', {
    token: adminToken,
    body: { name: 'Admin Dua', email: 'admin2@smoke.id', password: 'admin234', role: 'admin' },
  });
  check('admin buat akun admin kedua → 201', r.status === 201, `status ${r.status}`);
  const admin2Id = r.json.user?.id;

  r = await api('POST', '/api/admin/users', {
    token: adminToken,
    body: { name: 'Duplikat', email: 'siswa2@smoke.id', password: 'dup12345', role: 'siswa' },
  });
  check('admin buat akun email duplikat → 409', r.status === 409, `status ${r.status}`);

  // 7) Ubah peran
  r = await api('PATCH', `/api/admin/users/${siswa2Id}/role`, {
    token: adminToken,
    body: { role: 'guru' },
  });
  check('ubah peran siswa2 → guru: 200', r.status === 200 && r.json.user?.role === 'guru', `status ${r.status}`);

  r = await api('PATCH', `/api/admin/users/${adminId}/role`, {
    token: adminToken,
    body: { role: 'siswa' },
  });
  check('ubah peran diri sendiri → 400', r.status === 400, `status ${r.status}`);

  r = await api('PATCH', `/api/admin/users/${admin2Id}/role`, {
    token: adminToken,
    body: { role: 'siswa' },
  });
  check('turunkan admin kedua (masih ada admin lain) → 200', r.status === 200, `status ${r.status}`);

  // 8) Daftar pengguna memuat hitungan kelas
  r = await api('GET', '/api/admin/users', { token: adminToken });
  const guruRow = (r.json.users ?? []).find((u) => u.id === guruId);
  check(
    'admin users → guru classesOwned = 1',
    r.status === 200 && guruRow && guruRow.classesOwned === 1,
    JSON.stringify(guruRow),
  );

  // 9) Hapus kelas oleh admin
  r = await api('DELETE', `/api/admin/classes/${classId}`, { token: adminToken });
  check('admin hapus kelas → 200', r.status === 200, `status ${r.status}`);
  r = await api('GET', '/api/admin/classes', { token: adminToken });
  check(
    'kelas terhapus dari daftar',
    !(r.json.classes ?? []).some((c) => c.id === classId),
  );

  // 10) Hapus pengguna
  r = await api('DELETE', `/api/admin/users/${adminId}`, { token: adminToken });
  check('hapus akun sendiri → 400', r.status === 400, `status ${r.status}`);

  r = await api('DELETE', `/api/admin/users/${siswaId}`, { token: adminToken });
  check('admin hapus siswa → 200', r.status === 200, `status ${r.status}`);
  r = await api('POST', '/api/auth/login', {
    body: { email: 'siswa@smoke.id', password: 'siswa123' },
  });
  check('siswa terhapus tidak bisa login → 401', r.status === 401, `status ${r.status}`);

  console.log('');
  console.log(failures === 0 ? 'SEMUA LULUS ✅' : `ADA ${failures} KEGAGALAN ❌`);
} finally {
  if (server) server.kill();
}
process.exit(failures === 0 ? 0 : 1);
