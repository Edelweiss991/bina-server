// Smoke test GERBANG GABUNG KELAS (14 Nov 2026):
// pratinjau kode (lookup), atur ulang kode (reset-code), keluarkan
// anggota (DELETE members). Server sungguhan di atas SQLite terpisah
// (BINA_TEST_SQLITE=1) — skema PostgreSQL utama tidak diubah.
//
// Jalankan: node test/smoke-gabung.mjs

import { execSync, spawn } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4127;
const BASE = `http://127.0.0.1:${PORT}`;

const env = {
  ...process.env,
  DATABASE_URL: 'file:./smoke-gabung.db',
  BINA_TEST_SQLITE: '1',
  JWT_SECRET: 'smoke-gabung-secret',
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
    } catch { /* belum naik */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

let server;
try {
  console.log('# Smoke Test GERBANG GABUNG KELAS');
  const dbFile = path.join(root, 'test', 'smoke-gabung.db');
  if (existsSync(dbFile)) rmSync(dbFile);
  execSync('npx prisma generate --schema test/schema.sqlite.prisma', { cwd: root, env, stdio: 'pipe' });
  execSync('npx prisma db push --schema test/schema.sqlite.prisma --skip-generate', { cwd: root, env, stdio: 'pipe' });
  console.log('  ✅ prisma generate + db push (SQLite) berhasil');

  server = spawn('node', ['src/index.js'], { cwd: root, env, stdio: 'pipe' });
  server.stderr.on('data', (d) => process.stderr.write(`[server] ${d}`));
  check('server naik & /health ok', await waitHealth());

  // ── Akun ──
  let r = await api('POST', '/api/auth/register', { body: { name: 'Bu Guru Gabung', email: 'guru@gabung.id', password: 'guru123', role: 'guru' } });
  check('register guru → 201', r.status === 201, `status ${r.status}`);
  const guru = r.json.token;
  r = await api('POST', '/api/auth/register', { body: { name: 'Pak Guru Lain', email: 'lain@gabung.id', password: 'guru123', role: 'guru' } });
  const guruLain = r.json.token;
  check('register guru lain → 201', r.status === 201, `status ${r.status}`);
  r = await api('POST', '/api/auth/register', { body: { name: 'Siswa Gabung', email: 'siswa@gabung.id', password: 'siswa123', role: 'siswa' } });
  const siswa = r.json.token;
  const siswaId = r.json.user?.id;
  check('register siswa → 201', r.status === 201, `status ${r.status}`);

  // ── Kelas ──
  r = await api('POST', '/api/classes', { token: guru, body: { name: 'TKJ Gabung' } });
  check('buat kelas → 201 + ada kode', r.status === 201 && typeof r.json.class?.code === 'string' && r.json.class.code.length === 6, `status ${r.status}`);
  const classId = r.json.class.id;
  const oldCode = r.json.class.code;

  // ── Lookup ──
  r = await api('GET', '/api/classes/lookup/ZZZZZZ', { token: siswa });
  check('lookup kode ngawur → 404', r.status === 404, `status ${r.status}`);
  r = await api('GET', `/api/classes/lookup/${oldCode.toLowerCase()}`, { token: siswa });
  check('lookup kode benar (huruf kecil) → nama + guru + 0 anggota',
    r.status === 200 && r.json.class?.name === 'TKJ Gabung' && r.json.class?.teacherName === 'Bu Guru Gabung' && r.json.class?.memberCount === 0,
    `status ${r.status} ${JSON.stringify(r.json).slice(0, 140)}`);
  r = await api('GET', `/api/classes/lookup/${oldCode}`, { token: guru });
  check('lookup oleh guru → 403 (khusus siswa)', r.status === 403, `status ${r.status}`);

  // ── Gabung lewat kode ──
  r = await api('POST', '/api/classes/join', { token: siswa, body: { code: oldCode } });
  check('gabung via kode → 200', r.status === 200 && r.json.class?.id === classId, `status ${r.status}`);
  r = await api('GET', `/api/classes/lookup/${oldCode}`, { token: siswa });
  check('lookup sesudah gabung → memberCount 1', r.status === 200 && r.json.class?.memberCount === 1, `status ${r.status}`);

  // ── Reset kode ──
  r = await api('POST', `/api/classes/${classId}/reset-code`, { token: guruLain });
  check('reset kode oleh BUKAN pemilik → 403', r.status === 403, `status ${r.status}`);
  r = await api('POST', `/api/classes/${classId}/reset-code`, { token: guru });
  const newCode = r.json.class?.code;
  check('reset kode oleh pemilik → 200 + kode berubah', r.status === 200 && typeof newCode === 'string' && newCode.length === 6 && newCode !== oldCode, `status ${r.status}`);
  r = await api('GET', `/api/classes/lookup/${oldCode}`, { token: siswa });
  check('kode lama sesudah reset → 404', r.status === 404, `status ${r.status}`);
  r = await api('GET', `/api/classes/lookup/${newCode}`, { token: siswa });
  check('kode baru berlaku → 200', r.status === 200, `status ${r.status}`);
  r = await api('GET', '/api/classes', { token: siswa });
  check('anggota lama TETAP anggota sesudah reset kode', r.status === 200 && (r.json.classes ?? []).some((c) => c.id === classId), `status ${r.status}`);

  // ── Keluarkan anggota ──
  r = await api('DELETE', `/api/classes/${classId}/members/${siswaId}`, { token: guruLain });
  check('keluarkan anggota oleh BUKAN pemilik → 403', r.status === 403, `status ${r.status}`);
  r = await api('DELETE', `/api/classes/${classId}/members/${siswaId}`, { token: guru });
  check('keluarkan anggota oleh pemilik → 200', r.status === 200 && r.json.removed === true, `status ${r.status} ${JSON.stringify(r.json).slice(0, 120)}`);
  r = await api('GET', '/api/classes', { token: siswa });
  check('siswa terkeluar → daftar kelasnya kosong', r.status === 200 && (r.json.classes ?? []).length === 0, `status ${r.status}`);
  r = await api('DELETE', `/api/classes/${classId}/members/${siswaId}`, { token: guru });
  check('keluarkan ulang (bukan anggota) → 404', r.status === 404, `status ${r.status}`);
  r = await api('POST', '/api/classes/join', { token: siswa, body: { code: newCode } });
  check('siswa bisa gabung lagi pakai kode baru → 200', r.status === 200, `status ${r.status}`);

  console.log(failures === 0 ? '\nSEMUA LULUS ✅' : `\n${failures} GAGAL ❌`);
  process.exitCode = failures === 0 ? 0 : 1;
} finally {
  if (server) server.kill('SIGTERM');
}
