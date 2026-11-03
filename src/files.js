// Helper berkas bersama: validasi payload berkas base64 dari aplikasi
// (dipakai materi guru & kiriman tugas bebas siswa).

export const MAX_FILE_BASE64 = 8_000_000; // ±6 MB berkas asli

/**
 * Validasi payload berkas { name, mime, base64 }.
 * Mengembalikan { buffer, fileName, fileMime } atau { error }.
 * Bila `file` null/undefined → { buffer: null } (tidak ada berkas).
 */
export function parseFilePayload(file) {
  if (file == null) return { buffer: null };
  if (typeof file !== 'object') return { error: 'Format berkas tidak valid.' };
  const { name, mime, base64 } = file;
  if (typeof base64 !== 'string' || base64.length === 0) {
    return { error: 'Isi berkas (base64) wajib diisi.' };
  }
  if (base64.length > MAX_FILE_BASE64) {
    return { error: 'Ukuran berkas melebihi batas ±6 MB.' };
  }
  let buffer;
  try {
    buffer = Buffer.from(base64, 'base64');
  } catch {
    return { error: 'Isi berkas bukan base64 yang valid.' };
  }
  if (buffer.length === 0) return { error: 'Berkas kosong.' };
  return {
    buffer,
    fileName:
      typeof name === 'string' && name.trim()
        ? name.trim().slice(0, 160)
        : 'berkas',
    fileMime:
      typeof mime === 'string' && mime.trim()
        ? mime.trim().slice(0, 100)
        : 'application/octet-stream',
  };
}
