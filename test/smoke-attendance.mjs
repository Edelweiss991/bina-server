// Smoke test endpoint ABSENSI WAJAH BINA Server (putaran 12 Nov 2026).
//
// Server sungguhan di atas SQLite terpisah, pola sama seperti
// test/smoke-admin.mjs. Jalankan: npm run smoke:absensi
import { execSync, spawn } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4126;
const BASE = `http://127.0.0.1:${PORT}`;

const env = {
  ...process.env,
  DATABASE_URL: 'file:./smoke-absensi.db',
  BINA_TEST_SQLITE: '1',
  JWT_SECRET: 'smoke-secret-absensi',
  PORT: String(PORT),
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

const pwGuru = 'guru123';
const pwSiswa = 'siswa123';

let server;
try {
  console.log('# Smoke Test Absensi Wajah BINA Server');
  const dbFile = path.join(root, 'test', 'smoke-absensi.db');
  if (existsSync(dbFile)) rmSync(dbFile);

  execSync('npx prisma generate --schema test/schema.sqlite.prisma', {
    cwd: root,
    env,
    stdio: 'pipe',
  });
  execSync(
    'npx prisma db push --schema test/schema.sqlite.prisma --skip-generate',
    { cwd: root, env, stdio: 'pipe' },
  );
  console.log('  ✅ prisma generate + db push (SQLite) berhasil');

  server = spawn('node', ['src/index.js'], { cwd: root, env, stdio: 'pipe' });
  server.stderr.on('data', (d) => process.stderr.write(`[server] ${d}`));
  const up = await waitHealth();
  check('server naik & /health ok', up);
  if (!up) throw new Error('Server tidak naik.');

  // Persiapan: guru + kelas + 2 siswa bergabung.
  let r = await api('POST', '/api/auth/register', {
    body: { name: 'Bu Guru', email: 'guru@smoke.id', password: pwGuru, role: 'guru' },
  });
  check('register guru → 201', r.status === 201, `status ${r.status}`);
  const guruToken = r.json.token;

  r = await api('POST', '/api/classes', {
    token: guruToken,
    body: { name: 'Kelas Absensi' },
  });
  check('guru buat kelas → 201', r.status === 201, `status ${r.status}`);
  const classId = r.json.class?.id;
  const code = r.json.class?.code;

  const siswaTokens = {};
  for (const [key, name, email] of [
    ['b', 'Bima', 'bima@smoke.id'],
    ['c', 'Citra', 'citra@smoke.id'],
  ]) {
    r = await api('POST', '/api/auth/register', {
      body: { name, email, password: pwSiswa, role: 'siswa' },
    });
    siswaTokens[key] = r.json.token;
    r = await api('POST', '/api/classes/join', {
      token: siswaTokens[key],
      body: { code },
    });
    check(`siswa ${name} gabung kelas → 200/201`, [200, 201].includes(r.status), `status ${r.status}`);
  }

  // 1) Check-in tanpa token → 401; format salah → 400.
  r = await api('POST', '/api/attendance/check-in', {
    body: { date: '2026-11-12', time: '06:55' },
  });
  check('check-in tanpa token → 401', r.status === 401, `status ${r.status}`);

  r = await api('POST', '/api/attendance/check-in', {
    token: siswaTokens.b,
    body: { date: '12-11-2026', time: '06:55' },
  });
  check('check-in format tanggal salah → 400', r.status === 400, `status ${r.status}`);

  // 2) Bima check-in; kirim ulang = idempoten (jam diperbarui).
  r = await api('POST', '/api/attendance/check-in', {
    token: siswaTokens.b,
    body: { date: '2026-11-12', time: '06:55' },
  });
  check('check-in Bima → 201', r.status === 201, `status ${r.status}`);

  r = await api('POST', '/api/attendance/check-in', {
    token: siswaTokens.b,
    body: { date: '2026-11-12', time: '06:57' },
  });
  check('check-in ulang → 201 (idempoten)', r.status === 201, `status ${r.status}`);

  r = await api('GET', '/api/attendance/me', { token: siswaTokens.b });
  check(
    'riwayat Bima tepat 1 catatan, jam terbaru 06:57',
    r.json.attendances?.length === 1 && r.json.attendances[0].time === '06:57',
    JSON.stringify(r.json),
  );

  // 3) Daftar hadir guru: Bima hadir, Citra belum.
  r = await api('GET', `/api/attendance/class/${classId}?date=2026-11-12`, {
    token: guruToken,
  });
  check('daftar hadir guru → 200', r.status === 200, `status ${r.status}`);
  check(
    'ringkasan: 1 hadir dari 2 siswa',
    r.json.presentCount === 1 && r.json.totalCount === 2,
    JSON.stringify(r.json),
  );
  const bima = r.json.students?.find((s) => s.name === 'Bima');
  const citra = r.json.students?.find((s) => s.name === 'Citra');
  check('Bima hadir jam 06:57', bima?.present === true && bima?.time === '06:57');
  check('Citra belum hadir', citra?.present === false && citra?.time === null);

  // Tanggal lain: semua belum hadir.
  r = await api('GET', `/api/attendance/class/${classId}?date=2026-11-13`, {
    token: guruToken,
  });
  check('tanggal lain → 0 hadir', r.json.presentCount === 0, JSON.stringify(r.json));

  // 4) Penolakan: siswa membaca daftar → 403; guru lain → 403.
  r = await api('GET', `/api/attendance/class/${classId}?date=2026-11-12`, {
    token: siswaTokens.b,
  });
  check('siswa baca daftar hadir → 403', r.status === 403, `status ${r.status}`);

  r = await api('POST', '/api/auth/register', {
    body: { name: 'Guru Lain', email: 'lain@smoke.id', password: pwGuru, role: 'guru' },
  });
  const guruLainToken = r.json.token;
  r = await api('GET', `/api/attendance/class/${classId}?date=2026-11-12`, {
    token: guruLainToken,
  });
  check('guru bukan pemilik kelas → 403', r.status === 403, `status ${r.status}`);

  console.log(failures === 0 ? '\nSEMUA LULUS ✅' : `\n${failures} GAGAL ❌`);
  process.exitCode = failures === 0 ? 0 : 1;
} finally {
  if (server) server.kill('SIGTERM');
}
