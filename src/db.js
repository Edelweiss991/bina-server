// Koneksi Prisma + helper kolom JSON.
//
// Mode produksi/development memakai @prisma/client dari skema utama
// (PostgreSQL). Khusus smoke test lokal TANPA PostgreSQL, set
// BINA_TEST_SQLITE=1 — client diambil dari salinan skema SQLite di
// test/schema.sqlite.prisma (output test/generated-client) yang
// kolom JSON-nya disimpan sebagai String; helper di bawah menangani
// perbedaan itu agar kode route tetap satu.

let PrismaClient;
if (process.env.BINA_TEST_SQLITE === '1') {
  ({ PrismaClient } = await import('../test/generated-client/index.js'));
} else {
  ({ PrismaClient } = await import('@prisma/client'));
}

export const prisma = new PrismaClient();

const sqliteMode = process.env.BINA_TEST_SQLITE === '1';

/** Encode nilai untuk kolom JSON sebelum disimpan. */
export function jsonIn(value) {
  return sqliteMode ? JSON.stringify(value) : value;
}

/** Decode nilai dari kolom JSON setelah dibaca. */
export function jsonOut(value) {
  if (value == null) return value;
  return sqliteMode && typeof value === 'string' ? JSON.parse(value) : value;
}
