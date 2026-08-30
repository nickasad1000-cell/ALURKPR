import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { WHATSAPP_DISPLAY } from "@/lib/brand";

const CIDR_PENUH = new Map<string, { count: number; reset: number }>();
const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 menit per IP

// Batas panjang (Anti spam / abuse).
const NAMA_MAX = 100;
const EMAIL_MAX = 254;
const PESAN_MAX = 2000;

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ipDariRequest(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Rate-limit sederhana per IP (in-memory, cukup untuk situs statis kecil). */
function bolehLanjut(ip: string): boolean {
  const now = Date.now();
  const cur = CIDR_PENUH.get(ip);
  if (!cur || now > cur.reset) {
    CIDR_PENUH.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  cur.count += 1;
  return cur.count <= MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = ipDariRequest(request);
  if (!bolehLanjut(ip)) {
    const wait = Math.ceil((CIDR_PENUH.get(ip)!.reset - Date.now()) / 1000);
    return NextResponse.json(
      { error: `Terlalu banyak permintaan. Coba lagi dalam ${wait} detik.` },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
  }

  // Honeypot: bot mengisi field tersembunyi "website". Bila terisi → abaikan diem (200 palsu).
  if (typeof body.website === "string" && body.website.length > 0) {
    console.warn(`[enquiries] honeypot terpicu dari ${ip}`);
    return NextResponse.json({ message: "Terima kasih! Pesanmu terkirim." });
  }

  const nama = typeof body.nama === "string" ? body.nama.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const pesan = typeof body.pesan === "string" ? body.pesan.trim() : "";

  if (!nama || !email || !pesan) {
    return NextResponse.json(
      { error: "Nama, email, dan pesan wajib diisi." },
      { status: 400 },
    );
  }
  if (nama.length > NAMA_MAX) {
    return NextResponse.json(
      { error: `Nama maksimal ${NAMA_MAX} karakter.` },
      { status: 400 },
    );
  }
  if (email.length > EMAIL_MAX || !RE_EMAIL.test(email)) {
    return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 });
  }
  if (pesan.length > PESAN_MAX) {
    return NextResponse.json(
      { error: `Pesan maksimal ${PESAN_MAX} karakter.` },
      { status: 400 },
    );
  }

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("enquiries").insert({ nama, email, pesan });
    if (error) {
      console.error(`[enquiries] gagal simpan dari ${ip}:`, error.message, error.code);
      return NextResponse.json(
        {
          error: `Penyimpanan pesan sedang terganggu. Agar tidak hilang, kirim langsung lewat WhatsApp ${WHATSAPP_DISPLAY}.`,
        },
        { status: 503 },
      );
    }
    return NextResponse.json({ message: "Terima kasih! Pesanmu terkirim." });
  }

  console.warn(
    `[enquiries] mode pengembangan tanpa Supabase — pesan DIBUANG (nama=${nama.length}ch, email=${email.length}ch, pesan=${pesan.length}ch).`,
  );
  return NextResponse.json({
    message: "Terima kasih! Pesan diterima (mode pengembangan tanpa penyimpanan).",
  });
}
