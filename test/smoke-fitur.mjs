// Smoke test putaran FITUR PEMBELAJARAN (materi, kuis terjadwal,
// tugas bebas, discover + gabung langsung, dashboard siswa).
//
// Menjalankan server sungguhan di atas datasource SQLite terpisah
// (test/schema.sqlite.prisma, mode BINA_TEST_SQLITE=1) — skema utama
// PostgreSQL tidak diubah.
//
// Jalankan: node test/smoke-fitur.mjs

import { execSync, spawn } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4124;
const BASE = `http://127.0.0.1:${PORT}`;

const env = {
  ...process.env,
  DATABASE_URL: 'file:./smoke-fitur.db',
  BINA_TEST_SQLITE: '1',
  JWT_SECRET: 'smoke-fitur-secret',
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

const iso = (d) => d.toISOString();
const now = Date.now();
const H = 3600 * 1000;

let server;
try {
  console.log('# Smoke Test FITUR PEMBELAJARAN');
  const dbFile = path.join(root, 'test', 'smoke-fitur.db');
  if (existsSync(dbFile)) rmSync(dbFile);
  execSync('npx prisma generate --schema test/schema.sqlite.prisma', { cwd: root, env, stdio: 'pipe' });
  execSync('npx prisma db push --schema test/schema.sqlite.prisma --skip-generate', { cwd: root, env, stdio: 'pipe' });
  console.log('  ✅ prisma generate + db push (SQLite) berhasil');

  server = spawn('node', ['src/index.js'], { cwd: root, env, stdio: 'pipe' });
  server.stderr.on('data', (d) => process.stderr.write(`[server] ${d}`));
  check('server naik & /health ok', await waitHealth());

  // ── Akun ──
  let r = await api('POST', '/api/auth/register', { body: { name: 'Pak Guru Fitur', email: 'guru@fitur.id', password: 'guru123', role: 'guru' } });
  check('register guru → 201', r.status === 201, `status ${r.status}`);
  const guru = r.json.token;
  r = await api('POST', '/api/auth/register', { body: { name: 'Siswa Satu', email: 'satu@fitur.id', password: 'siswa123', role: 'siswa' } });
  const siswa = r.json.token;
  check('register siswa → 201', r.status === 201, `status ${r.status}`);
  r = await api('POST', '/api/auth/register', { body: { name: 'Siswa Dua', email: 'dua@fitur.id', password: 'siswa123', role: 'siswa' } });
  const siswa2 = r.json.token;
  check('register siswa-2 → 201', r.status === 201, `status ${r.status}`);

  // ── Kelas + discover + gabung ──
  r = await api('POST', '/api/classes', { token: guru, body: { name: 'Perakitan X-2' } });
  check('buat kelas → 201', r.status === 201, `status ${r.status}`);
  const classId = r.json.class.id;

  r = await api('GET', '/api/classes/discover', { token: siswa });
  const found = (r.json.classes ?? []).find((c) => c.id === classId);
  check('discover memuat kelas + belum bergabung', r.status === 200 && found && found.joined === false && found.teacherName === 'Pak Guru Fitur', JSON.stringify(r.json).slice(0, 160));

  r = await api('POST', `/api/classes/${classId}/join`, { token: siswa });
  check('gabung langsung → 200', r.status === 200 && r.json.alreadyMember === false, `status ${r.status}`);
  r = await api('POST', `/api/classes/${classId}/join`, { token: siswa });
  check('gabung ulang → alreadyMember', r.status === 200 && r.json.alreadyMember === true);

  // ── Materi ──
  r = await api('POST', `/api/classes/${classId}/materials`, {
    token: guru,
    body: { title: 'Modul RAM & Memori', description: 'Baca sebelum praktik.', linkUrl: 'https://drive.google.com/contoh-modul' },
  });
  check('guru buat materi tautan → 201', r.status === 201 && r.json.material?.hasFile === false, `status ${r.status}`);

  const fileB64 = Buffer.from('Isi berkas materi uji.').toString('base64');
  r = await api('POST', `/api/classes/${classId}/materials`, {
    token: guru,
    body: { title: 'LKPD Praktik 1', file: { name: 'lkpd-1.txt', mime: 'text/plain', base64: fileB64 } },
  });
  check('guru buat materi berkas → 201', r.status === 201 && r.json.material?.hasFile === true, `status ${r.status} ${JSON.stringify(r.json).slice(0, 120)}`);
  const materialFileId = r.json.material.id;

  r = await api('GET', `/api/classes/${classId}/materials`, { token: siswa });
  check('siswa daftar materi (tanpa bytes bocor)', r.status === 200 && r.json.materials.length === 2 && !JSON.stringify(r.json).includes(fileB64), `status ${r.status}`);
  r = await api('GET', `/api/classes/${classId}/materials`, { token: siswa2 });
  check('non-anggota daftar materi → 403', r.status === 403, `status ${r.status}`);

  r = await api('POST', `/api/materials/${materialFileId}/download-token`, { token: siswa });
  check('token unduh materi diterbitkan', r.status === 200 && typeof r.json.url === 'string', `status ${r.status}`);
  const dl = await fetch(`${BASE}${r.json.url}`);
  const dlText = await dl.text();
  check('unduh materi → isi berkas cocok', dl.status === 200 && dlText === 'Isi berkas materi uji.', `status ${dl.status}`);
  const bad = await fetch(`${BASE}/api/materials/${materialFileId}/file?token=rusak.token`);
  check('token rusak → 401', bad.status === 401, `status ${bad.status}`);

  // ── Kuis terjadwal ──
  const questions = [
    { question: 'Fungsi utama RAM adalah?', options: ['Menyimpan sementara', 'Menampilkan gambar', 'Mendinginkan CPU', 'Menyalurkan daya'], correctIndex: 0 },
    { question: 'Singkatan PSU adalah?', options: ['Power Supply Unit', 'Personal System Unit', 'Power Saving Utility', 'Primary Storage Unit'], correctIndex: 0 },
  ];
  r = await api('POST', `/api/classes/${classId}/tasks`, {
    token: guru,
    body: { title: 'Kuis Mendatang', questions, opensAt: iso(new Date(now + 2 * H)), dueAt: iso(new Date(now + 3 * H)) },
  });
  check('guru buat kuis terjadwal → 201 + type quiz', r.status === 201 && r.json.task?.type === 'quiz', `status ${r.status}`);
  const futureQuizId = r.json.task.id;
  r = await api('POST', `/api/tasks/${futureQuizId}/submit`, { token: siswa, body: { answers: [0, 0] } });
  check('submit kuis belum dibuka → 403', r.status === 403, `status ${r.status}`);

  r = await api('POST', `/api/classes/${classId}/tasks`, {
    token: guru,
    body: { title: 'Kuis Bab 1', questions, opensAt: iso(new Date(now - H)), dueAt: iso(new Date(now + H)) },
  });
  const quizId = r.json.task.id;
  check('guru buat kuis aktif → 201', r.status === 201, `status ${r.status}`);
  r = await api('POST', `/api/tasks/${quizId}/submit`, { token: siswa, body: { answers: [0, 1] } });
  check('submit kuis aktif → skor otomatis 50', r.status === 200 && r.json.autoScore === 50, `status ${r.status} ${JSON.stringify(r.json).slice(0, 120)}`);

  r = await api('POST', `/api/classes/${classId}/tasks`, {
    token: guru,
    body: { title: 'Kuis Lewat', questions, opensAt: iso(new Date(now - 3 * H)), dueAt: iso(new Date(now - 2 * H)) },
  });
  const lateQuizId = r.json.task.id;
  r = await api('POST', `/api/tasks/${lateQuizId}/submit`, { token: siswa, body: { answers: [0, 0] } });
  check('submit kuis sudah ditutup → 403', r.status === 403, `status ${r.status}`);

  // ── Tugas bebas ──
  r = await api('POST', `/api/classes/${classId}/tasks`, {
    token: guru,
    body: { title: 'Laporan Praktik', type: 'assignment', description: 'Tulis laporan praktik memasang RAM, sertakan foto/tautan bila ada.', dueAt: iso(new Date(now + 24 * H)) },
  });
  check('guru buat tugas bebas → 201 + type assignment', r.status === 201 && r.json.task?.type === 'assignment', `status ${r.status} ${JSON.stringify(r.json).slice(0, 140)}`);
  const assignmentId = r.json.task.id;

  const subB64 = Buffer.from('Lampiran laporan siswa.').toString('base64');
  r = await api('POST', `/api/tasks/${assignmentId}/submit`, {
    token: siswa,
    body: { text: 'Laporan selesai, RAM terpasang 2x8GB.', link: 'https://drive.google.com/laporan', file: { name: 'laporan.txt', mime: 'text/plain', base64: subB64 } },
  });
  check('siswa kumpulkan tugas bebas → 200', r.status === 200 && r.json.submission?.fileName === 'laporan.txt', `status ${r.status} ${JSON.stringify(r.json).slice(0, 140)}`);
  const submissionId = r.json.submission.id;

  r = await api('GET', `/api/tasks/${assignmentId}/results`, { token: guru });
  const row = (r.json.results ?? [])[0];
  check('hasil guru memuat teks + nama berkas kiriman', r.status === 200 && row?.answers?.text?.includes('RAM terpasang') && row?.fileName === 'laporan.txt', JSON.stringify(r.json).slice(0, 200));

  r = await api('POST', `/api/submissions/${submissionId}/download-token`, { token: guru });
  check('token unduh kiriman diterbitkan', r.status === 200, `status ${r.status}`);
  const dl2 = await fetch(`${BASE}${r.json.url}`);
  check('unduh kiriman → isi cocok', dl2.status === 200 && (await dl2.text()) === 'Lampiran laporan siswa.', `status ${dl2.status}`);

  r = await api('PUT', `/api/submissions/${submissionId}/grade`, { token: guru, body: { score: 88, review: 'Laporan rapi, foto jelas.' } });
  check('guru menilai tugas bebas → 200', r.status === 200 && r.json.submission?.score === 88, `status ${r.status}`);
  r = await api('GET', '/api/my/results', { token: siswa });
  const myRow = (r.json.results ?? []).find((x) => x.taskId === assignmentId);
  check('hasil saya menampilkan nilai final 88', r.status === 200 && myRow?.finalScore === 88, JSON.stringify(r.json).slice(0, 160));

  // ── Jadwal meeting + pengumuman ──
  const tomorrow = new Date(now + 24 * H);
  r = await api('POST', `/api/classes/${classId}/schedules`, { token: guru, body: { title: 'Pertemuan Daring', date: tomorrow.toISOString().slice(0, 10) } });
  check('guru buat jadwal → 201', r.status === 201, `status ${r.status} ${JSON.stringify(r.json).slice(0, 120)}`);
  const scheduleId = r.json.schedule.id;
  r = await api('POST', `/api/schedules/${scheduleId}/parts`, { token: guru, body: { title: 'Sesi Google Meet', meetLink: 'https://meet.google.com/abc-defg-hij' } });
  check('guru tambah bagian + tautan Meet → 201', r.status === 201 && r.json.part?.meetLink?.includes('meet.google.com'), `status ${r.status}`);

  r = await api('POST', `/api/classes/${classId}/announcements`, { token: guru, body: { text: 'Besok kelas daring via Google Meet, siapkan LKPD.' } });
  check('guru buat pengumuman → 201', r.status === 201, `status ${r.status}`);

  // ── Dashboard siswa ──
  r = await api('GET', '/api/my/dashboard', { token: siswa });
  const d = r.json;
  check('dashboard: kelas saya ada', r.status === 200 && d.classes?.some((c) => c.id === classId), `status ${r.status}`);
  check('dashboard: tugas & kuis tercantum (dua tipe)', (d.tasks ?? []).some((t) => t.type === 'quiz') && d.tasks.some((t) => t.type === 'assignment'), JSON.stringify(d.tasks ?? []).slice(0, 160));
  check('dashboard: meeting Meet tercantum', (d.meetings ?? []).some((m) => (m.meetLink ?? '').includes('meet.google.com')), JSON.stringify(d.meetings ?? []).slice(0, 160));
  check('dashboard: pengumuman terbaru tercantum', (d.announcements ?? []).some((a) => a.text.includes('Google Meet')), '');
  check('dashboard: materi terbaru tercantum', (d.materials ?? []).some((m) => m.title === 'LKPD Praktik 1'), '');
  check('dashboard: hasil terbaru tercantum', (d.results ?? []).some((x) => x.taskId === assignmentId && x.finalScore === 88), '');

  console.log(failures === 0 ? '\nSEMUA LULUS ✅' : `\n${failures} GAGAL ❌`);
  process.exitCode = failures === 0 ? 0 : 1;
} finally {
  if (server) server.kill('SIGTERM');
}
