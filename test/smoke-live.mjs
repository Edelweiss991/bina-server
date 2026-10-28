// Smoke test ujung-ke-ujung fitur KELAS LIVE BINA Server (putaran
// BINA LIVE): briefing guru, sesi live + absensi otomatis, materi,
// kuis Boss Battle, lampu pemahaman, breakout + chat, leaderboard
// XP/badge, laporan orang tua, dan ringkasan akhir sesi.
//
// Sama seperti test/smoke.mjs: server sungguhan di atas SQLite
// terpisah (test/schema.sqlite.prisma, BINA_TEST_SQLITE=1).
// Jalankan: node test/smoke-live.mjs

import { execSync, spawn } from 'node:child_process';
import { existsSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4124;
const BASE = `http://127.0.0.1:${PORT}`;

const env = {
  ...process.env,
  DATABASE_URL: 'file:./smoke-live.db',
  BINA_TEST_SQLITE: '1',
  JWT_SECRET: 'smoke-live-secret',
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
  log('# Smoke Test Kelas Live BINA Server');
  log('');
  log(`- Waktu: ${new Date().toISOString()}`);
  log('- Datasource uji: SQLite (test/schema.sqlite.prisma), mode BINA_TEST_SQLITE=1');
  log('- Skema utama PostgreSQL tidak diubah.');
  log('');

  const dbFile = path.join(root, 'test', 'smoke-live.db');
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
  log('## Skenario dasar (akun & kelas)');

  let r = await api('POST', '/api/auth/register', {
    body: { name: 'Pak Guru Live', email: 'guru@live.id', password: 'guru123', role: 'guru' },
  });
  check('register guru → 201', r.status === 201, `status ${r.status}`);
  const guru = r.json.token;

  r = await api('POST', '/api/auth/register', {
    body: { name: 'Budi Siswa', email: 'budi@live.id', password: 'budi123', role: 'siswa' },
  });
  check('register siswa → 201', r.status === 201, `status ${r.status}`);
  const siswa = r.json.token;
  const siswaId = r.json.user?.id;

  r = await api('POST', '/api/classes', { token: guru, body: { name: 'TKJ Live' } });
  check('guru buat kelas → 201', r.status === 201, `status ${r.status}`);
  const classId = r.json.class?.id;
  const classCode = r.json.class?.code;

  r = await api('POST', '/api/classes/join', { token: siswa, body: { code: classCode } });
  check('siswa join kelas → 200', r.status === 200, `status ${r.status}`);

  r = await api('POST', '/api/scores/sync', {
    token: siswa,
    body: { pretest: 60, posttest: 80, simulatorBest: 95 },
  });
  check('siswa sync skor (pre 60, post 80, sim 95) → 200', r.status === 200, `status ${r.status}`);

  log('');
  log('## Briefing guru');
  r = await api('GET', '/api/guru/briefing', { token: guru });
  check('briefing → 200', r.status === 200, `status ${r.status}`);
  check('briefing classCount = 1', r.json.classCount === 1, `dapat ${r.json.classCount}`);
  check('briefing studentCount = 1', r.json.studentCount === 1, `dapat ${r.json.studentCount}`);
  check('briefing activeSessionCount = 0', r.json.activeSessionCount === 0);
  r = await api('GET', '/api/guru/briefing', { token: siswa });
  check('siswa membuka briefing → 403', r.status === 403, `status ${r.status}`);

  log('');
  log('## Sesi live & absensi otomatis');
  r = await api('POST', `/api/classes/${classId}/sessions`, {
    token: guru,
    body: { title: 'Pertemuan 5 — RAM', openingText: 'Tebak: komponen apa yang hilang?' },
  });
  check('guru buat sesi → 201', r.status === 201, `status ${r.status}`);
  const sessionId = r.json.session?.id;
  check('sesi berstatus active', r.json.session?.status === 'active');

  r = await api('POST', `/api/classes/${classId}/sessions`, {
    token: guru,
    body: { title: 'Sesi kedua' },
  });
  check('buat sesi kedua saat masih ada yang aktif → 409', r.status === 409, `status ${r.status}`);

  r = await api('POST', `/api/classes/${classId}/sessions`, {
    token: siswa,
    body: { title: 'Sesi siswa' },
  });
  check('siswa membuat sesi → 403', r.status === 403, `status ${r.status}`);

  r = await api('GET', `/api/classes/${classId}/sessions/active`, { token: siswa });
  check('siswa melihat sesi aktif', r.status === 200 && r.json.session?.id === sessionId);

  r = await api('POST', `/api/sessions/${sessionId}/join`, { token: siswa });
  check('siswa join sesi (absensi) → 200', r.status === 200, `status ${r.status}`);
  check('joinedAt tercatat', typeof r.json.attendance?.joinedAt === 'string');

  r = await api('POST', `/api/sessions/${sessionId}/join`, { token: siswa });
  check('join kedua (idempoten) → 200', r.status === 200, `status ${r.status}`);

  r = await api('PUT', `/api/sessions/${sessionId}/material`, {
    token: guru,
    body: { materialText: 'RAM dipasang pada slot DIMM A2/B2 untuk dual channel.' },
  });
  check('guru membagikan materi → 200', r.status === 200, `status ${r.status}`);

  r = await api('GET', `/api/sessions/${sessionId}/state`, { token: siswa });
  check('state siswa → 200', r.status === 200, `status ${r.status}`);
  check('attendanceCount tetap 1 setelah join ganda', r.json.attendanceCount === 1, `dapat ${r.json.attendanceCount}`);
  check('myAttendance.joined = true', r.json.myAttendance?.joined === true);
  check('materi tampil di state', (r.json.session?.materialText ?? '').includes('DIMM'));
  check('kode kelas ikut di state', r.json.session?.classCode === classCode);

  log('');
  log('## Kuis live — Boss Battle');
  r = await api('POST', `/api/sessions/${sessionId}/quizzes`, {
    token: guru,
    body: {
      title: 'Boss RAM',
      bossMaxHp: 10,
      questions: [
        { question: 'RAM dipasang di slot?', options: ['DIMM', 'PCIe', 'SATA', 'HDMI'], correctIndex: 0 },
        { question: 'Kepanjangan RAM?', options: ['Read Access Memory', 'Random Access Memory', 'Rapid Access Module', 'Remote Access Memory'], correctIndex: 1 },
      ],
    },
  });
  check('guru buat kuis → 201', r.status === 201, `status ${r.status}`);
  const quizId = r.json.quiz?.id;
  check('kuis waiting, bossHpRemaining = 10', r.json.quiz?.status === 'waiting' && r.json.quiz?.bossHpRemaining === 10, JSON.stringify(r.json.quiz));

  r = await api('GET', `/api/sessions/${sessionId}/state`, { token: siswa });
  const qzWaiting = (r.json.quizzes ?? []).find((q) => q.id === quizId);
  check('state: kuis waiting tanpa currentQuestion', qzWaiting?.status === 'waiting' && qzWaiting.currentQuestion === undefined);

  r = await api('POST', `/api/quizzes/${quizId}/answer`, {
    token: siswa,
    body: { questionIndex: 0, selectedIndex: 0 },
  });
  check('jawab sebelum kuis berjalan → 400', r.status === 400, `status ${r.status}`);

  r = await api('POST', `/api/quizzes/${quizId}/control`, { token: guru, body: { action: 'start' } });
  check('guru start kuis → running, currentIndex 0', r.status === 200 && r.json.quiz?.status === 'running' && r.json.quiz?.currentIndex === 0, JSON.stringify(r.json.quiz));

  r = await api('GET', `/api/sessions/${sessionId}/state`, { token: siswa });
  const qzRun = (r.json.quizzes ?? []).find((q) => q.id === quizId);
  check('state: currentQuestion tampil saat running', typeof qzRun?.currentQuestion?.question === 'string');
  check('state: correctIndex TIDAK bocor', !JSON.stringify(r.json).includes('correctIndex'));

  r = await api('POST', `/api/quizzes/${quizId}/answer`, {
    token: siswa,
    body: { questionIndex: 1, selectedIndex: 1 },
  });
  check('jawab soal yang bukan giliran → 400', r.status === 400, `status ${r.status}`);

  r = await api('POST', `/api/quizzes/${quizId}/answer`, {
    token: siswa,
    body: { questionIndex: 0, selectedIndex: 0 },
  });
  check('jawab soal 1 BENAR → correct true', r.status === 201 && r.json.correct === true, JSON.stringify(r.json));
  check('HP boss turun 10 → 9', r.json.bossHpRemaining === 9, `dapat ${r.json.bossHpRemaining}`);

  r = await api('POST', `/api/quizzes/${quizId}/answer`, {
    token: siswa,
    body: { questionIndex: 0, selectedIndex: 0 },
  });
  check('jawab soal yang sama dua kali → 409', r.status === 409, `status ${r.status}`);

  r = await api('POST', `/api/quizzes/${quizId}/control`, { token: guru, body: { action: 'next' } });
  check('guru next → currentIndex 1', r.status === 200 && r.json.quiz?.currentIndex === 1, JSON.stringify(r.json.quiz));

  r = await api('POST', `/api/quizzes/${quizId}/answer`, {
    token: siswa,
    body: { questionIndex: 1, selectedIndex: 0 },
  });
  check('jawab soal 2 SALAH → correct false, HP tetap 9', r.status === 201 && r.json.correct === false && r.json.bossHpRemaining === 9, JSON.stringify(r.json));

  r = await api('POST', `/api/quizzes/${quizId}/control`, { token: guru, body: { action: 'next' } });
  check('next melewati akhir → finished', r.status === 200 && r.json.quiz?.status === 'finished', JSON.stringify(r.json.quiz));

  log('');
  log('## Lampu pemahaman');
  r = await api('PUT', `/api/sessions/${sessionId}/understanding`, {
    token: siswa,
    body: { level: 1 },
  });
  check('siswa kirim lampu kuning → 200', r.status === 200, `status ${r.status}`);
  check('counts kuning = 1', r.json.counts?.['1'] === 1, JSON.stringify(r.json.counts));

  r = await api('GET', `/api/sessions/${sessionId}/state`, { token: guru });
  check('guru melihat counts lampu {0:0, 1:1, 2:0}',
    r.json.understanding?.counts?.['0'] === 0 &&
    r.json.understanding?.counts?.['1'] === 1 &&
    r.json.understanding?.counts?.['2'] === 0,
    JSON.stringify(r.json.understanding));

  r = await api('PUT', `/api/sessions/${sessionId}/understanding`, {
    token: siswa,
    body: { level: 5 },
  });
  check('level di luar 0..2 → 400', r.status === 400, `status ${r.status}`);

  log('');
  log('## Breakout room & chat');
  r = await api('POST', `/api/sessions/${sessionId}/groups`, {
    token: guru,
    body: { groupCount: 2 },
  });
  check('guru buat 2 kelompok → 201', r.status === 201, `status ${r.status}`);
  check('jumlah kelompok = 2', (r.json.groups ?? []).length === 2);
  const totalMembers = (r.json.groups ?? []).reduce((a, g) => a + g.members.length, 0);
  check('seluruh siswa terbagi (1 orang)', totalMembers === 1, `total ${totalMembers}`);

  r = await api('GET', `/api/sessions/${sessionId}/groups`, { token: siswa });
  check('siswa melihat kelompoknya (myGroupId terisi)', r.status === 200 && typeof r.json.myGroupId === 'number', JSON.stringify(r.json).slice(0, 200));
  const myGroupId = r.json.myGroupId;
  const allGroups = r.json.groups ?? [];
  const otherGroup = allGroups.find((g) => g.id !== myGroupId);

  r = await api('POST', `/api/groups/${myGroupId}/messages`, {
    token: siswa,
    body: { text: 'Halo kelompok, kita mulai dari motherboard ya.' },
  });
  check('siswa kirim chat → 201', r.status === 201, `status ${r.status}`);
  r = await api('POST', `/api/groups/${otherGroup.id}/messages`, {
    token: siswa,
    body: { text: 'menyusup' },
  });
  check('chat ke kelompok lain → 403', r.status === 403, `status ${r.status}`);

  r = await api('GET', `/api/groups/${myGroupId}/messages`, { token: siswa });
  check('riwayat chat terbaca (1 pesan, nama pengirim ikut)',
    (r.json.messages ?? []).length === 1 && r.json.messages[0].userName === 'Budi Siswa',
    JSON.stringify(r.json).slice(0, 200));

  log('');
  log('## Leaderboard XP & badge');
  r = await api('GET', `/api/classes/${classId}/leaderboard`, { token: guru });
  check('leaderboard → 200', r.status === 200, `status ${r.status}`);
  const entry = (r.json.leaderboard ?? []).find((e) => e.userId === siswaId);
  check('entri siswa ada', Boolean(entry));
  // XP = pre 60 + post 80 + latihan 0 + sim 95 + 10×1 hadir + 5×1 benar + tugas 0 = 250
  check('XP siswa = 250 sesuai rumus', entry?.xp === 250, `dapat ${entry?.xp}`);
  check('badge Langkah Pertama didapat', (entry?.badges ?? []).some((b) => b.id === 'hadir-1'));
  check('badge Master Simulator didapat (sim 95)', (entry?.badges ?? []).some((b) => b.id === 'master-simulator'));
  check('attendanceCount = 1 & liveCorrect = 1', entry?.attendanceCount === 1 && entry?.liveCorrect === 1, JSON.stringify(entry));

  log('');
  log('## Laporan orang tua');
  r = await api('POST', `/api/classes/${classId}/students/${siswaId}/parent-report`, { token: guru });
  check('guru menyusun laporan → 201', r.status === 201, `status ${r.status}`);
  check('narasi memuat nama siswa', (r.json.report?.content ?? '').includes('Budi Siswa'));
  check('narasi memuat nama kelas', (r.json.report?.content ?? '').includes('TKJ Live'));
  check('narasi menyebut kekuatan (Simulator 95)', (r.json.report?.content ?? '').includes('Simulator'));

  r = await api('GET', '/api/my/parent-reports', { token: siswa });
  check('siswa melihat laporannya (1 laporan)', r.status === 200 && (r.json.reports ?? []).length === 1, `status ${r.status}`);

  log('');
  log('## Akhiri sesi + ringkasan');
  r = await api('POST', `/api/sessions/${sessionId}/end`, { token: guru });
  check('akhiri sesi → 200, status ended', r.status === 200 && r.json.session?.status === 'ended', JSON.stringify(r.json.session));
  check('ringkasan attendanceCount = 1', r.json.summary?.attendanceCount === 1, JSON.stringify(r.json.summary));
  check('ringkasan quizCount = 1', r.json.summary?.quizCount === 1);
  check('ringkasan lampu {0:0, 1:1, 2:0}',
    r.json.summary?.understandingCounts?.['0'] === 0 &&
    r.json.summary?.understandingCounts?.['1'] === 1 &&
    r.json.summary?.understandingCounts?.['2'] === 0,
    JSON.stringify(r.json.summary));

  r = await api('GET', `/api/classes/${classId}/sessions/active`, { token: siswa });
  check('tidak ada sesi aktif setelah diakhiri', r.status === 200 && r.json.session === null);

  r = await api('POST', `/api/sessions/${sessionId}/join`, { token: siswa });
  check('join setelah sesi berakhir → 400', r.status === 400, `status ${r.status}`);

  r = await api('GET', '/api/guru/briefing', { token: guru });
  check('briefing akhir: activeSessionCount kembali 0', r.json.activeSessionCount === 0);

  log('');
  log(failures === 0 ? '## HASIL: SEMUA LULUS ✅' : `## HASIL: ${failures} KEGAGALAN ❌`);
} catch (err) {
  failures++;
  log(`\n## BERHENTI KARENA ERROR: ${err.message}`);
} finally {
  if (server) server.kill('SIGTERM');
  writeFileSync(
    path.join(root, 'SMOKE_TEST_LIVE.md'),
    lines.join('\n') + '\n',
  );
  console.log(`\nLog ditulis ke SMOKE_TEST_LIVE.md — ${failures} kegagalan.`);
  process.exit(failures === 0 ? 0 : 1);
}
