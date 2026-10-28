// Smoke test ujung-ke-ujung fitur BINA GURU (putaran akun guru):
// register bebas, pengumuman kelas, jadwal + part + link Meet, agenda
// hari ini, tugas masuk (belum dinilai), pemantauan siswa (XP, persen
// tugas, streak), dan chat persisten guru↔siswa.
//
// Sama seperti test/smoke.mjs: server sungguhan di atas SQLite
// terpisah (test/schema.sqlite.prisma, BINA_TEST_SQLITE=1).
// Jalankan: node test/smoke-guru.mjs

import { execSync, spawn } from 'node:child_process';
import { existsSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4125;
const BASE = `http://127.0.0.1:${PORT}`;

const dbUrl = 'file:' + path.join(root, 'test', 'smoke-guru.db');
const jwtSecret = ['guru', 'smoke', 'secret'].join('-');

const env = {
  ...process.env,
  DATABASE_URL: dbUrl,
  BINA_TEST_SQLITE: '1',
  JWT_SECRET: jwtSecret,
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

const todayUtc = new Date().toISOString().slice(0, 10);

let server;
try {
  log('# Smoke Test BINA Guru');
  log('');
  log(`- Waktu: ${new Date().toISOString()}`);
  log('- Datasource uji: SQLite (test/schema.sqlite.prisma), mode BINA_TEST_SQLITE=1');
  log('- Skema utama PostgreSQL tidak diubah.');
  log('');

  const dbFile = path.join(root, 'test', 'smoke-guru.db');
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
  log('## Register bebas (putaran BINA GURU)');

  let r = await api('POST', '/api/auth/register', {
    body: { name: 'A', email: 'bukan-email-sama-sekali', password: 'abc123', role: 'siswa' },
  });
  check('register email tanpa format & nama 1 huruf → 201', r.status === 201, `status ${r.status}`);

  r = await api('POST', '/api/auth/register', {
    body: { name: 'Peniru', email: 'bukan-email-sama-sekali', password: 'abc123', role: 'siswa' },
  });
  check('register email ganda → 409', r.status === 409, `status ${r.status}`);

  r = await api('POST', '/api/auth/login', {
    body: { email: 'bukan-email-sama-sekali', password: 'abc123' },
  });
  check('login akun email bebas → 200', r.status === 200, `status ${r.status}`);

  r = await api('POST', '/api/auth/register', {
    body: { name: '', email: 'x', password: 'abc123', role: 'siswa' },
  });
  check('register nama kosong → 400', r.status === 400, `status ${r.status}`);

  r = await api('POST', '/api/auth/register', {
    body: { name: 'Pak Guru', email: 'guru@guru.id', password: 'guru123', role: 'guru' },
  });
  check('register guru → 201', r.status === 201, `status ${r.status}`);
  const guru = r.json.token;
  const guruId = r.json.user?.id;

  r = await api('POST', '/api/auth/register', {
    body: { name: 'Ibu Lain', email: 'lain@guru.id', password: 'lain123', role: 'guru' },
  });
  const guruLain = r.json.token;

  r = await api('POST', '/api/auth/register', {
    body: { name: 'Sinta Siswa', email: 'sinta@guru.id', password: 'sinta123', role: 'siswa' },
  });
  check('register siswa → 201', r.status === 201, `status ${r.status}`);
  const siswa = r.json.token;
  const siswaId = r.json.user?.id;

  r = await api('POST', '/api/classes', { token: guru, body: { name: 'TKJ Guru' } });
  check('guru buat kelas → 201', r.status === 201, `status ${r.status}`);
  const classId = r.json.class?.id;
  const classCode = r.json.class?.code;

  r = await api('POST', '/api/classes/join', { token: siswa, body: { code: classCode } });
  check('siswa join kelas → 200', r.status === 200, `status ${r.status}`);

  log('');
  log('## Pengumuman kelas');

  r = await api('POST', `/api/classes/${classId}/announcements`, {
    token: siswa,
    body: { text: 'Pengumuman dari siswa' },
  });
  check('siswa membuat pengumuman → 403', r.status === 403, `status ${r.status}`);

  r = await api('POST', `/api/classes/${classId}/announcements`, {
    token: guru,
    body: { text: 'Besok ulangan bab motherboard.' },
  });
  check('guru membuat pengumuman → 201', r.status === 201, `status ${r.status}`);
  const announcementId = r.json.announcement?.id;

  r = await api('GET', `/api/classes/${classId}/announcements`, { token: siswa });
  check(
    'siswa membaca pengumuman kelasnya',
    r.status === 200 &&
      r.json.announcements?.length === 1 &&
      /ulangan/.test(r.json.announcements[0]?.text ?? ''),
    `status ${r.status}`,
  );

  r = await api('GET', `/api/classes/${classId}/announcements`, { token: guruLain });
  check('guru lain membaca pengumuman → 403', r.status === 403, `status ${r.status}`);

  r = await api('DELETE', `/api/announcements/${announcementId}`, { token: guruLain });
  check('guru lain menghapus pengumuman → 403', r.status === 403, `status ${r.status}`);

  r = await api('DELETE', `/api/announcements/${announcementId}`, { token: guru });
  check('guru menghapus pengumumannya → 200', r.status === 200, `status ${r.status}`);

  r = await api('GET', `/api/classes/${classId}/announcements`, { token: guru });
  check('pengumuman kosong setelah dihapus', r.status === 200 && r.json.announcements?.length === 0);

  log('');
  log('## Jadwal + part + agenda hari ini');

  r = await api('POST', `/api/classes/${classId}/schedules`, {
    token: guru,
    body: { title: 'Pertemuan Hari Ini', date: todayUtc },
  });
  check('guru membuat jadwal → 201', r.status === 201, `status ${r.status}`);
  const scheduleId = r.json.schedule?.id;
  check('tanggal jadwal tersimpan (YYYY-MM-DD)', r.json.schedule?.date === todayUtc, r.json.schedule?.date);

  r = await api('POST', `/api/schedules/${scheduleId}/parts`, {
    token: guru,
    body: { title: 'Pembuka & presensi' },
  });
  check('tambah part 1 → 201', r.status === 201, `status ${r.status}`);
  const part1Id = r.json.part?.id;
  check('sortOrder part 1 = 0', r.json.part?.sortOrder === 0, `${r.json.part?.sortOrder}`);

  r = await api('POST', `/api/schedules/${scheduleId}/parts`, {
    token: guru,
    body: { title: 'Materi inti', meetLink: 'https://meet.google.com/abc-defg-hij' },
  });
  check('tambah part 2 + link Meet → 201', r.status === 201, `status ${r.status}`);
  const part2Id = r.json.part?.id;
  check('sortOrder part 2 = 1', r.json.part?.sortOrder === 1, `${r.json.part?.sortOrder}`);

  r = await api('GET', `/api/classes/${classId}/schedules`, { token: siswa });
  const siswaParts = r.json.schedules?.[0]?.parts ?? [];
  check(
    'siswa membaca jadwal (read-only) terurut',
    r.status === 200 &&
      r.json.schedules?.length === 1 &&
      siswaParts.length === 2 &&
      siswaParts[0]?.title === 'Pembuka & presensi' &&
      /meet\.google\.com/.test(siswaParts[1]?.meetLink ?? ''),
    `status ${r.status}`,
  );

  r = await api('PUT', `/api/schedule-parts/${part2Id}`, {
    token: guru,
    body: { meetLink: 'https://meet.google.com/baru-link' },
  });
  check('guru mengubah link Meet part → 200', r.status === 200 && /baru-link/.test(r.json.part?.meetLink ?? ''), `status ${r.status}`);

  r = await api('GET', `/api/guru/agenda-today?date=${todayUtc}`, { token: guru });
  check(
    'agenda hari ini memuat jadwal + nama kelas',
    r.status === 200 &&
      r.json.schedules?.length === 1 &&
      r.json.schedules[0]?.className === 'TKJ Guru' &&
      r.json.schedules[0]?.parts?.length === 2,
    `status ${r.status}`,
  );

  r = await api('POST', `/api/classes/${classId}/schedules`, {
    token: siswa,
    body: { title: 'Jadwal ilegal', date: todayUtc },
  });
  check('siswa membuat jadwal → 403', r.status === 403, `status ${r.status}`);

  r = await api('DELETE', `/api/schedule-parts/${part1Id}`, { token: guru });
  check('guru menghapus part → 200', r.status === 200, `status ${r.status}`);

  r = await api('DELETE', `/api/schedules/${scheduleId}`, { token: guru });
  check('guru menghapus jadwal → 200', r.status === 200, `status ${r.status}`);

  r = await api('GET', `/api/classes/${classId}/schedules`, { token: guru });
  check('jadwal kosong setelah dihapus (part ikut terhapus)', r.status === 200 && r.json.schedules?.length === 0);

  log('');
  log('## Tugas masuk & pemantauan siswa');

  r = await api('POST', `/api/classes/${classId}/tasks`, {
    token: guru,
    body: {
      title: 'Kuis Pantau',
      questions: [
        { question: 'Fungsi PSU?', options: ['Daya', 'Suara', 'Gambar', 'Data'], correctIndex: 0 },
        { question: 'RAM bersifat?', options: ['Permanen', 'Sementara', 'Optik', 'Magnetik'], correctIndex: 1 },
      ],
    },
  });
  check('guru membuat tugas → 201', r.status === 201, `status ${r.status}`);
  const taskId = r.json.task?.id;

  r = await api('POST', `/api/tasks/${taskId}/submit`, {
    token: siswa,
    body: { answers: [0, 1] },
  });
  check('siswa submit (semua benar) → autoScore 100', r.status === 200 && r.json.autoScore === 100, `status ${r.status} autoScore ${r.json.autoScore}`);

  r = await api('POST', '/api/scores/sync', {
    token: siswa,
    body: { pretest: 50, posttest: 70, latihanBest: 60, simulatorBest: 80 },
  });
  check('scores/sync siswa → 200', r.status === 200, `status ${r.status}`);

  r = await api('GET', '/api/guru/ungraded', { token: guru });
  const ungradedRow = r.json.submissions?.find((s) => s.taskId === taskId);
  check(
    'tugas masuk memuat submission belum dinilai',
    r.status === 200 && Boolean(ungradedRow) && ungradedRow.studentName === 'Sinta Siswa',
    `status ${r.status}`,
  );
  const submissionId = ungradedRow?.submissionId;

  r = await api('GET', `/api/classes/${classId}/monitoring`, { token: guru });
  const mon = r.json.students?.find((s) => s.userId === siswaId);
  check('monitoring guru → 200 + data siswa ada', r.status === 200 && Boolean(mon), `status ${r.status}`);
  check(
    'monitoring: persen tugas 100% (1/1)',
    mon?.completionPercent === 100 && mon?.taskSubmitted === 1 && mon?.taskTotal === 1,
    JSON.stringify(mon),
  );
  check(
    'monitoring: XP = 50+70+60+80 + rata-rata tugas 100 = 360',
    mon?.xp === 360,
    `xp ${mon?.xp}`,
  );
  check('monitoring: streak ≥ 1 (aktivitas hari ini)', (mon?.streakDays ?? 0) >= 1, `streak ${mon?.streakDays}`);
  check('monitoring: lastActivityAt terisi', Boolean(mon?.lastActivityAt));

  r = await api('GET', `/api/classes/${classId}/monitoring`, { token: siswa });
  check('siswa membuka monitoring → 403', r.status === 403, `status ${r.status}`);

  r = await api('PUT', `/api/submissions/${submissionId}/grade`, {
    token: guru,
    body: { score: 95, review: 'Bagus sekali' },
  });
  check('guru menilai submission → 200', r.status === 200, `status ${r.status}`);

  r = await api('GET', '/api/guru/ungraded', { token: guru });
  check(
    'tugas masuk kosong setelah dinilai',
    r.status === 200 && !(r.json.submissions ?? []).some((s) => s.taskId === taskId),
  );

  log('');
  log('## Chat guru↔siswa');

  r = await api('POST', '/api/chat/conversations', { token: siswa, body: { classId } });
  check('siswa membuka percakapan dengan guru → 201', r.status === 201, `status ${r.status}`);
  const convId = r.json.conversation?.id;
  check('percakapan memuat nama guru', r.json.conversation?.teacherName === 'Pak Guru', r.json.conversation?.teacherName);

  r = await api('POST', `/api/chat/conversations/${convId}/messages`, {
    token: siswa,
    body: { text: 'Halo Pak, izin bertanya.' },
  });
  check('siswa mengirim pesan → 201', r.status === 201, `status ${r.status}`);

  r = await api('GET', '/api/chat/unread', { token: guru });
  check('badge guru: 1 pesan belum dibaca', r.status === 200 && r.json.total === 1, `total ${r.json.total}`);

  r = await api('GET', '/api/chat/conversations', { token: guru });
  const guruConv = r.json.conversations?.find((c) => c.id === convId);
  check(
    'daftar percakapan guru: unreadCount 1 + nama siswa',
    r.status === 200 && guruConv?.unreadCount === 1 && guruConv?.studentName === 'Sinta Siswa',
    JSON.stringify(guruConv),
  );

  r = await api('POST', '/api/chat/conversations', {
    token: guru,
    body: { classId, studentId: siswaId },
  });
  check('guru membuka percakapan yang sama (upsert)', r.status === 201 && r.json.conversation?.id === convId, `status ${r.status}`);

  r = await api('POST', `/api/chat/conversations/${convId}/read`, { token: guru });
  check('guru menandai dibaca → 200', r.status === 200, `status ${r.status}`);

  r = await api('GET', '/api/chat/unread', { token: guru });
  check('badge guru kembali 0 setelah dibaca', r.status === 200 && r.json.total === 0, `total ${r.json.total}`);

  r = await api('POST', `/api/chat/conversations/${convId}/messages`, {
    token: guru,
    body: { text: 'Halo Sinta, silakan.' },
  });
  check('guru membalas pesan → 201', r.status === 201, `status ${r.status}`);

  r = await api('GET', `/api/chat/conversations/${convId}/messages`, { token: siswa });
  check(
    'siswa membaca 2 pesan terurut',
    r.status === 200 &&
      r.json.messages?.length === 2 &&
      r.json.messages[0]?.senderId === siswaId &&
      r.json.messages[1]?.senderId === guruId,
    `status ${r.status}`,
  );

  r = await api('GET', '/api/chat/unread', { token: siswa });
  check('badge siswa: 1 (balasan guru)', r.status === 200 && r.json.total === 1, `total ${r.json.total}`);

  r = await api('GET', `/api/chat/conversations/${convId}/messages`, { token: guruLain });
  check('guru lain membaca percakapan → 403', r.status === 403, `status ${r.status}`);

  r = await api('POST', '/api/auth/register', {
    body: { name: 'Orang Luar', email: 'luar@guru.id', password: 'luar123', role: 'siswa' },
  });
  const luar = r.json.token;
  r = await api('POST', '/api/chat/conversations', { token: luar, body: { classId } });
  check('bukan anggota membuka percakapan → 403', r.status === 403, `status ${r.status}`);

  log('');
  log(failures === 0 ? '## HASIL: SEMUA LULUS ✅' : `## HASIL: ${failures} PEMERIKSAAN GAGAL ❌`);
} catch (err) {
  failures++;
  log('');
  log(`## BERHENTI KARENA ERROR: ${err.message}`);
} finally {
  if (server) server.kill('SIGTERM');
  writeFileSync(path.join(root, 'SMOKE_TEST_GURU.md'), `${lines.join('\n')}\n`);
  console.log(`\nLog ditulis ke SMOKE_TEST_GURU.md — ${failures} kegagalan.`);
  process.exit(failures === 0 ? 0 : 1);
}
