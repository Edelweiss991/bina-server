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

  // 7b) Edit lengkap pengguna + ganti kata sandi sendiri (14 Nov 2026)
  r = await api('PATCH', `/api/admin/users/${siswa2Id}`, {
    token: adminToken,
    body: { name: 'Siswa Dua Baru', email: 'siswa2baru@smoke.id' },
  });
  check(
    'edit nama+email siswa2 → 200 & berubah',
    r.status === 200 && r.json.user?.name === 'Siswa Dua Baru' && r.json.user?.email === 'siswa2baru@smoke.id',
    `status ${r.status} ${JSON.stringify(r.json).slice(0, 160)}`,
  );

  r = await api('PATCH', `/api/admin/users/${siswa2Id}`, {
    token: adminToken,
    body: { email: 'guru@smoke.id' },
  });
  check('edit email ke email yang sudah dipakai → 409', r.status === 409, `status ${r.status}`);

  r = await api('PATCH', `/api/admin/users/${siswa2Id}`, {
    token: adminToken,
    body: { password: 'baru12345' },
  });
  check('admin atur kata sandi baru siswa2 → 200', r.status === 200, `status ${r.status}`);
  r = await api('POST', '/api/auth/login', {
    body: { email: 'siswa2baru@smoke.id', password: 'siswa234' },
  });
  check('login sandi lama siswa2 → 401', r.status === 401, `status ${r.status}`);
  r = await api('POST', '/api/auth/login', {
    body: { email: 'siswa2baru@smoke.id', password: 'baru12345' },
  });
  check('login sandi baru siswa2 → 200', r.status === 200, `status ${r.status}`);

  r = await api('PATCH', `/api/admin/users/${adminId}`, {
    token: adminToken,
    body: { role: 'siswa' },
  });
  check('edit peran diri sendiri lewat edit lengkap → 400', r.status === 400, `status ${r.status}`);
  r = await api('PATCH', `/api/admin/users/${adminId}`, {
    token: adminToken,
    body: { name: 'Admin Utama' },
  });
  check('edit nama diri sendiri → 200', r.status === 200 && r.json.user?.name === 'Admin Utama', `status ${r.status}`);

  r = await api('PATCH', `/api/admin/users/${siswa2Id}`, {
    token: adminToken,
    body: {},
  });
  check('edit tanpa perubahan → 400', r.status === 400, `status ${r.status}`);

  // Ganti kata sandi sendiri (siswa Andi)
  r = await api('POST', '/api/auth/change-password', {
    token: siswaToken,
    body: { currentPassword: 'salah123', newPassword: 'andi9999' },
  });
  check('ganti sandi dengan sandi lama salah → 401', r.status === 401, `status ${r.status}`);
  r = await api('POST', '/api/auth/change-password', {
    token: siswaToken,
    body: { currentPassword: 'siswa123', newPassword: 'andi9999' },
  });
  check('ganti sandi sendiri → 200', r.status === 200, `status ${r.status}`);
  r = await api('POST', '/api/auth/login', {
    body: { email: 'siswa@smoke.id', password: 'siswa123' },
  });
  check('login sandi lama setelah ganti → 401', r.status === 401, `status ${r.status}`);
  r = await api('POST', '/api/auth/login', {
    body: { email: 'siswa@smoke.id', password: 'andi9999' },
  });
  check('login sandi baru setelah ganti → 200', r.status === 200, `status ${r.status}`);

  // 7c) Edit profil sendiri (PATCH /api/me) — 14 Nov 2026 malam
  r = await api('PATCH', '/api/me', {
    token: siswaToken,
    body: { name: 'Andi Diperbarui', email: 'andi.baru@smoke.id' },
  });
  check('edit profil sendiri → 200 & tercermin', r.status === 200 && r.json.user?.name === 'Andi Diperbarui' && r.json.user?.email === 'andi.baru@smoke.id', `status ${r.status}`);
  r = await api('GET', '/api/me', { token: siswaToken });
  check('GET /me memuat profil baru', r.status === 200 && r.json.user?.email === 'andi.baru@smoke.id', `status ${r.status}`);
  r = await api('PATCH', '/api/me', {
    token: siswaToken,
    body: { email: 'admin@smoke.id' },
  });
  check('edit profil ke email duplikat → 409', r.status === 409, `status ${r.status}`);
  r = await api('PATCH', '/api/me', {
    token: siswaToken,
    body: { role: 'admin' },
  });
  check('edit profil tidak bisa ubah peran → 400', r.status === 400, `status ${r.status}`);
  r = await api('PATCH', '/api/me', {
    token: siswaToken,
    body: { name: 'A' },
  });
  check('edit profil nama terlalu pendek → 400', r.status === 400, `status ${r.status}`);
  r = await api('PATCH', '/api/me', {
    body: { name: 'Tanpa Token' },
  });
  check('edit profil tanpa token → 401', r.status === 401, `status ${r.status}`);
  // Pulihkan email Andi agar cek-cek berikutnya tetap memakai alamat lama
  r = await api('PATCH', '/api/me', {
    token: siswaToken,
    body: { email: 'siswa@smoke.id' },
  });
  check('pulihkan email sendiri → 200', r.status === 200, `status ${r.status}`);

  // 8) Daftar pengguna memuat hitungan kelas
  r = await api('GET', '/api/admin/users', { token: adminToken });
  const guruRow = (r.json.users ?? []).find((u) => u.id === guruId);
  check(
    'admin users → guru classesOwned = 1',
    r.status === 200 && guruRow && guruRow.classesOwned === 1,
    JSON.stringify(guruRow),
  );

  // 8b) Hapus pengguna/kelas dengan DATA KAYA (regresi 14 Nov 2026):
  //     chat breakout milik siswa LAIN menempel ke kelompok sesi live —
  //     dulu membuat hapus guru/kelas selalu gagal 409.
  r = await api('POST', '/api/auth/register', {
    body: { name: 'Guru Kaya', email: 'gurukaya@smoke.id', password: 'guru123', role: 'guru' },
  });
  const guruRToken = r.json.token;
  const guruRId = r.json.user?.id;
  check('register guru kaya → 201', r.status === 201, `status ${r.status}`);

  r = await api('POST', '/api/auth/register', {
    body: { name: 'Siswa Tiga', email: 'siswa3@smoke.id', password: 'siswa123', role: 'siswa' },
  });
  const siswa3Token = r.json.token;
  const siswa3Id = r.json.user?.id;
  check('register siswa3 → 201', r.status === 201, `status ${r.status}`);

  r = await api('POST', '/api/classes', { token: guruRToken, body: { name: 'Kelas Kaya Data' } });
  const richClassId = r.json.class?.id;
  const richCode = r.json.class?.code;
  check('guru kaya buat kelas → 201', r.status === 201, `status ${r.status}`);

  r = await api('POST', '/api/classes/join', { token: siswaToken, body: { code: richCode } });
  check('siswa join kelas kaya → 200', r.status === 200, `status ${r.status}`);
  r = await api('POST', '/api/classes/join', { token: siswa3Token, body: { code: richCode } });
  check('siswa3 join kelas kaya → 200', r.status === 200, `status ${r.status}`);

  r = await api('POST', '/api/scores/sync', { token: siswaToken, body: { pretest: 55, posttest: 77 } });
  check('siswa sync skor → 200', r.status === 200, `status ${r.status}`);
  r = await api('POST', '/api/attendance/check-in', {
    token: siswaToken,
    body: { date: '2026-11-14', time: '07:15' },
  });
  check('siswa check-in absensi wajah → 2xx', r.status === 200 || r.status === 201, `status ${r.status}`);

  const questions = [
    { question: 'Fungsi RAM?', options: ['Simpan sementara', 'Pendingin', 'Daya', 'Tampilan'], correctIndex: 0 },
  ];
  r = await api('POST', `/api/classes/${richClassId}/tasks`, {
    token: guruRToken,
    body: { title: 'Kuis Kaya', questions },
  });
  const richTaskId = r.json.task?.id;
  check('guru kaya buat tugas → 201', r.status === 201, `status ${r.status}`);
  r = await api('POST', `/api/tasks/${richTaskId}/submit`, { token: siswaToken, body: { answers: [0] } });
  check('siswa kumpulkan tugas → 2xx', r.status === 200 || r.status === 201, `status ${r.status}`);

  r = await api('POST', `/api/classes/${richClassId}/announcements`, {
    token: guruRToken,
    body: { text: 'Pengumuman kelas kaya data.' },
  });
  check('guru kaya buat pengumuman → 2xx', r.status === 200 || r.status === 201, `status ${r.status}`);

  r = await api('POST', '/api/chat/conversations', {
    token: guruRToken,
    body: { classId: richClassId, studentId: siswaId },
  });
  const convId = r.json.conversation?.id;
  check('guru kaya buka percakapan → 201', r.status === 201, `status ${r.status}`);
  r = await api('POST', `/api/chat/conversations/${convId}/messages`, {
    token: guruRToken,
    body: { text: 'Halo, ini guru.' },
  });
  check('guru kirim DM → 2xx', r.status === 200 || r.status === 201, `status ${r.status}`);
  r = await api('POST', `/api/chat/conversations/${convId}/messages`, {
    token: siswaToken,
    body: { text: 'Siap, Bu.' },
  });
  check('siswa balas DM → 2xx', r.status === 200 || r.status === 201, `status ${r.status}`);

  r = await api('POST', `/api/classes/${richClassId}/sessions`, {
    token: guruRToken,
    body: { title: 'Sesi Kaya' },
  });
  const richSessionId = r.json.session?.id;
  check('guru kaya buat sesi live → 201', r.status === 201, `status ${r.status}`);
  r = await api('POST', `/api/sessions/${richSessionId}/join`, { token: siswaToken });
  check('siswa join sesi kaya → 200', r.status === 200, `status ${r.status}`);
  r = await api('POST', `/api/sessions/${richSessionId}/join`, { token: siswa3Token });
  check('siswa3 join sesi kaya → 200', r.status === 200, `status ${r.status}`);
  r = await api('PUT', `/api/sessions/${richSessionId}/understanding`, {
    token: siswaToken,
    body: { level: 2 },
  });
  check('siswa kirim lampu pemahaman → 200', r.status === 200, `status ${r.status}`);

  r = await api('POST', `/api/sessions/${richSessionId}/quizzes`, {
    token: guruRToken,
    body: { title: 'Kuis Live Kaya', bossMaxHp: 10, questions },
  });
  const richQuizId = r.json.quiz?.id;
  check('guru kaya buat kuis live → 201', r.status === 201, `status ${r.status}`);
  r = await api('POST', `/api/quizzes/${richQuizId}/control`, { token: guruRToken, body: { action: 'start' } });
  check('kuis live kaya dimulai → 200', r.status === 200, `status ${r.status}`);
  r = await api('POST', `/api/quizzes/${richQuizId}/answer`, {
    token: siswaToken,
    body: { questionIndex: 0, selectedIndex: 0 },
  });
  check('siswa jawab kuis live → 201', r.status === 201, `status ${r.status}`);

  r = await api('POST', `/api/sessions/${richSessionId}/groups`, {
    token: guruRToken,
    body: { groupCount: 1 },
  });
  check('guru kaya buat kelompok breakout → 201', r.status === 201, `status ${r.status}`);
  r = await api('GET', `/api/sessions/${richSessionId}/groups`, { token: siswa3Token });
  const richGroupId = r.json.myGroupId;
  check('siswa3 punya kelompok', typeof richGroupId === 'number', JSON.stringify(r.json).slice(0, 160));
  r = await api('POST', `/api/groups/${richGroupId}/messages`, {
    token: siswa3Token,
    body: { text: 'Chat breakout dari siswa3.' },
  });
  check('siswa3 kirim chat breakout → 201', r.status === 201, `status ${r.status}`);
  r = await api('POST', `/api/groups/${richGroupId}/messages`, {
    token: siswaToken,
    body: { text: 'Chat breakout dari siswa.' },
  });
  check('siswa kirim chat breakout → 201', r.status === 201, `status ${r.status}`);

  r = await api('POST', `/api/classes/${richClassId}/students/${siswaId}/parent-report`, {
    token: guruRToken,
    body: {},
  });
  check('guru kaya buat laporan orang tua → 2xx', r.status === 200 || r.status === 201, `status ${r.status}`);

  // Hapus SISWA yang datanya kaya → harus 200
  r = await api('DELETE', `/api/admin/users/${siswaId}`, { token: adminToken });
  check('admin hapus siswa kaya data → 200', r.status === 200, `status ${r.status} ${JSON.stringify(r.json)}`);
  r = await api('POST', '/api/auth/login', {
    body: { email: 'siswa@smoke.id', password: 'siswa123' },
  });
  check('siswa kaya terhapus tidak bisa login → 401', r.status === 401, `status ${r.status}`);
  r = await api('POST', '/api/auth/login', {
    body: { email: 'siswa3@smoke.id', password: 'siswa123' },
  });
  check('siswa3 (pemilik chat breakout) masih bisa login → 200', r.status === 200, `status ${r.status}`);

  // Hapus GURU pemilik kelas kaya — chat breakout siswa3 masih ada di
  // kelas itu; inilah kasus yang dulu selalu gagal 409.
  r = await api('DELETE', `/api/admin/users/${guruRId}`, { token: adminToken });
  check('admin hapus guru kaya data → 200', r.status === 200, `status ${r.status} ${JSON.stringify(r.json)}`);
  r = await api('GET', '/api/admin/classes', { token: adminToken });
  check(
    'kelas kaya ikut terhapus bersama gurunya',
    !(r.json.classes ?? []).some((c) => c.id === richClassId),
  );
  r = await api('POST', '/api/auth/login', {
    body: { email: 'siswa3@smoke.id', password: 'siswa123' },
  });
  check('siswa3 tetap hidup setelah kelasnya terhapus → 200', r.status === 200, `status ${r.status}`);

  // 8c) Hapus KELAS kaya secara langsung (jalur deleteClassCascade murni)
  r = await api('POST', '/api/auth/register', {
    body: { name: 'Guru Kelas', email: 'gurukelas@smoke.id', password: 'guru123', role: 'guru' },
  });
  const guruKToken = r.json.token;
  check('register guru kelas → 201', r.status === 201, `status ${r.status}`);
  r = await api('POST', '/api/classes', { token: guruKToken, body: { name: 'Kelas Langsung Hapus' } });
  const directClassId = r.json.class?.id;
  const directCode = r.json.class?.code;
  r = await api('POST', '/api/classes/join', { token: siswa3Token, body: { code: directCode } });
  check('siswa3 join kelas langsung → 200', r.status === 200, `status ${r.status}`);
  r = await api('POST', `/api/classes/${directClassId}/sessions`, {
    token: guruKToken,
    body: { title: 'Sesi Langsung' },
  });
  const directSessionId = r.json.session?.id;
  r = await api('POST', `/api/sessions/${directSessionId}/join`, { token: siswa3Token });
  check('siswa3 join sesi langsung → 200', r.status === 200, `status ${r.status}`);
  r = await api('POST', `/api/sessions/${directSessionId}/groups`, {
    token: guruKToken,
    body: { groupCount: 1 },
  });
  check('breakout kelas langsung dibuat → 201', r.status === 201, `status ${r.status}`);
  r = await api('GET', `/api/sessions/${directSessionId}/groups`, { token: siswa3Token });
  const directGroupId = r.json.myGroupId;
  r = await api('POST', `/api/groups/${directGroupId}/messages`, {
    token: siswa3Token,
    body: { text: 'Chat penutup kelas langsung.' },
  });
  check('siswa3 chat di kelas langsung → 201', r.status === 201, `status ${r.status}`);
  r = await api('DELETE', `/api/admin/classes/${directClassId}`, { token: adminToken });
  check('admin hapus kelas kaya secara langsung → 200', r.status === 200, `status ${r.status} ${JSON.stringify(r.json)}`);

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

  // (Siswa pertama sudah dihapus di 8b; di sini siswa3 yang dihapus.)
  r = await api('DELETE', `/api/admin/users/${siswa3Id}`, { token: adminToken });
  check('admin hapus siswa3 → 200', r.status === 200, `status ${r.status}`);
  r = await api('POST', '/api/auth/login', {
    body: { email: 'siswa3@smoke.id', password: 'siswa123' },
  });
  check('siswa3 terhapus tidak bisa login → 401', r.status === 401, `status ${r.status}`);

  console.log('');
  console.log(failures === 0 ? 'SEMUA LULUS ✅' : `ADA ${failures} KEGAGALAN ❌`);
} finally {
  if (server) server.kill();
}
process.exit(failures === 0 ? 0 : 1);
