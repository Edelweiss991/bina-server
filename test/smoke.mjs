// Smoke test ujung-ke-ujung BINA Server.
//
// Menjalankan server sungguhan (child process) di atas datasource
// SQLite terpisah (test/schema.sqlite.prisma) karena PostgreSQL tidak
// tersedia di VM pengembangan — skema utama PostgreSQL TIDAK diubah.
// Skenario penuh sesuai kontrak API, lalu hasilnya ditulis ringkas ke
// SMOKE_TEST.md di root proyek.
//
// Jalankan: npm run smoke   (atau: node test/smoke.mjs)

import { execSync, spawn } from 'node:child_process';
import { existsSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4123;
const BASE = `http://127.0.0.1:${PORT}`;

const env = {
  ...process.env,
  DATABASE_URL: 'file:./smoke.db',
  BINA_TEST_SQLITE: '1',
  JWT_SECRET: 'smoke-test-secret',
  PORT: String(PORT),
};

const lines = [];
const log = (msg) => {
  lines.push(msg);
  console.log(msg);
};

let failures = 0;
function check(label, cond, extra = '') {
  if (cond) {
    log(`  ✅ ${label}`);
  } else {
    failures++;
    log(`  ❌ ${label}${extra ? ` — ${extra}` : ''}`);
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
  log('# Smoke Test BINA Server');
  log('');
  log(`- Waktu: ${new Date().toISOString()}`);
  log('- Datasource uji: SQLite (test/schema.sqlite.prisma), mode BINA_TEST_SQLITE=1');
  log('- Skema utama PostgreSQL tidak diubah.');
  log('');

  const dbFile = path.join(root, 'test', 'smoke.db');
  if (existsSync(dbFile)) rmSync(dbFile);

  log('## Persiapan skema SQLite');
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
  log('  ✅ prisma generate + db push (SQLite) berhasil');
  log('');

  server = spawn('node', ['src/index.js'], { cwd: root, env, stdio: 'pipe' });
  server.stderr.on('data', (d) => process.stderr.write(`[server] ${d}`));
  const up = await waitHealth();
  check('server naik & /health ok', up);
  if (!up) throw new Error('Server tidak naik.');

  log('');
  log('## Skenario');

  // 1) Register guru
  let r = await api('POST', '/api/auth/register', {
    body: {
      name: 'Bu Sari Guru',
      email: 'guru@smoke.id',
      password: 'guru123',
      role: 'guru',
    },
  });
  check('register guru → 201', r.status === 201, `status ${r.status}`);
  const guruToken = r.json.token;
  check('token guru diterbitkan', typeof guruToken === 'string' && guruToken.length > 10);

  // 2) Login guru
  r = await api('POST', '/api/auth/login', {
    body: { email: 'guru@smoke.id', password: 'guru123' },
  });
  check('login guru → 200 + peran guru', r.status === 200 && r.json.user?.role === 'guru');

  // 3) Buat kelas
  r = await api('POST', '/api/classes', {
    token: guruToken,
    body: { name: 'TKJ X-1' },
  });
  check('buat kelas → 201', r.status === 201, `status ${r.status}`);
  const classId = r.json.class?.id;
  const classCode = r.json.class?.code;
  check('kode kelas 6 karakter', typeof classCode === 'string' && classCode.length === 6, classCode);

  // 4) Register siswa
  r = await api('POST', '/api/auth/register', {
    body: {
      name: 'Andi Siswa',
      email: 'siswa@smoke.id',
      password: 'siswa123',
      role: 'siswa',
    },
  });
  check('register siswa → 201', r.status === 201, `status ${r.status}`);
  const siswaToken = r.json.token;

  // 5) Siswa gabung kelas pakai kode
  r = await api('POST', '/api/classes/join', {
    token: siswaToken,
    body: { code: classCode },
  });
  check('siswa join kelas → 200', r.status === 200 && r.json.class?.id === classId, `status ${r.status}`);

  // 6) Guru buat tugas 2 soal
  r = await api('POST', `/api/classes/${classId}/tasks`, {
    token: guruToken,
    body: {
      title: 'Kuis Komponen Dasar',
      description: 'Kerjakan dengan teliti.',
      questions: [
        {
          question: 'Komponen yang disebut otak komputer adalah…',
          options: ['RAM', 'CPU', 'PSU', 'SSD'],
          correctIndex: 1,
        },
        {
          question: 'Thermal paste dioleskan di atas…',
          options: ['GPU', 'RAM', 'CPU', 'Motherboard'],
          correctIndex: 2,
        },
      ],
    },
  });
  check('guru buat tugas → 201', r.status === 201, `status ${r.status}`);
  const taskId = r.json.task?.id;

  // 7) Siswa GET tugas — correctIndex TIDAK boleh ada
  r = await api('GET', `/api/classes/${classId}/tasks`, { token: siswaToken });
  const studentTask = r.json.tasks?.find((t) => t.id === taskId);
  check('siswa dapat daftar tugas', r.status === 200 && Boolean(studentTask));
  const leaksKey = JSON.stringify(studentTask ?? {}).includes('correctIndex');
  check('correctIndex TIDAK dikirim ke siswa', !leaksKey);

  // 8) Siswa submit: 1 benar 1 salah → autoScore 50
  r = await api('POST', `/api/tasks/${taskId}/submit`, {
    token: siswaToken,
    body: { answers: [1, 0] },
  });
  check('submit → 200', r.status === 200, `status ${r.status}`);
  check('autoScore = 50', r.json.autoScore === 50, `autoScore ${r.json.autoScore}`);
  const submissionId = r.json.submission?.id;

  // 9) Guru GET results
  r = await api('GET', `/api/tasks/${taskId}/results`, { token: guruToken });
  const resultRow = r.json.results?.find((x) => x.submissionId === submissionId);
  check(
    'guru melihat hasil siswa (autoScore 50)',
    r.status === 200 && resultRow?.autoScore === 50 && resultRow?.studentName === 'Andi Siswa',
  );

  // 10) Guru beri nilai final + ulasan
  r = await api('PUT', `/api/submissions/${submissionId}/grade`, {
    token: guruToken,
    body: { score: 85, review: 'Bagus, satu soal lagi perlu diteliti.' },
  });
  check(
    'grade → score 85 + review tersimpan',
    r.status === 200 && r.json.submission?.score === 85 && /Bagus/.test(r.json.submission?.review ?? ''),
    `status ${r.status}`,
  );

  // 11) Siswa GET /my/results — nilai final 85 + ulasan tampil
  r = await api('GET', '/api/my/results', { token: siswaToken });
  const mine = r.json.results?.find((x) => x.submissionId === submissionId);
  check(
    'siswa melihat nilai final 85',
    r.status === 200 && mine?.score === 85,
    `score ${mine?.score}`,
  );
  check('siswa melihat ulasan guru', /Bagus/.test(mine?.review ?? ''));
  check('judul tugas & nama kelas ikut tampil', mine?.taskTitle === 'Kuis Komponen Dasar' && mine?.className === 'TKJ X-1');

  // 12) Siswa sinkron skor belajar
  r = await api('POST', '/api/scores/sync', {
    token: siswaToken,
    body: { pretest: 60, posttest: 88, latihanBest: 75, simulatorBest: 95 },
  });
  check(
    'scores/sync → 200 & tersimpan',
    r.status === 200 && r.json.scores?.posttest === 88 && r.json.scores?.simulatorBest === 95,
    `status ${r.status}`,
  );

  // 13) Guru GET members — skor tersinkron tampil
  r = await api('GET', `/api/classes/${classId}/members`, { token: guruToken });
  const member = r.json.members?.find((m) => m.email === 'siswa@smoke.id');
  check(
    'guru melihat skor tersinkron siswa',
    r.status === 200 &&
      member?.scores?.pretest === 60 &&
      member?.scores?.posttest === 88 &&
      member?.scores?.latihanBest === 75 &&
      member?.scores?.simulatorBest === 95,
  );

  // 14) Penolakan peran: siswa tidak boleh membuat kelas
  r = await api('POST', '/api/classes', {
    token: siswaToken,
    body: { name: 'Kelas Ilegal' },
  });
  check('siswa membuat kelas → 403', r.status === 403, `status ${r.status}`);

  log('');
  log(failures === 0 ? '## HASIL: SEMUA LULUS ✅' : `## HASIL: ${failures} PEMERIKSAAN GAGAL ❌`);
} catch (err) {
  failures++;
  log('');
  log(`## BERHENTI KARENA ERROR: ${err.message}`);
} finally {
  if (server) server.kill('SIGTERM');
  writeFileSync(path.join(root, 'SMOKE_TEST.md'), `${lines.join('\n')}\n`);
  console.log(`\nLog ditulis ke SMOKE_TEST.md — ${failures} kegagalan.`);
  process.exit(failures === 0 ? 0 : 1);
}
