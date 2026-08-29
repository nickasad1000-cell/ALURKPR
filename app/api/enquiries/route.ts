import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const panjang = (s: unknown) => typeof s === "string" && s.trim().length > 0;

export async function POST(request: Request) {
  let body: { nama?: unknown; email?: unknown; pesan?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload tidak valid." }, { status: 400 });
  }

  const nama = typeof body.nama === "string" ? body.nama.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const pesan = typeof body.pesan === "string" ? body.pesan.trim() : "";

  if (!panjang(nama) || !panjang(email) || !panjang(pesan)) {
    return NextResponse.json(
      { error: "Nama, email, dan pesan wajib diisi." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 });
  }
  if (pesan.length > 2000) {
    return NextResponse.json({ error: "Pesan maksimal 2000 karakter." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("enquiries").insert({ nama, email, pesan });
    if (error) {
      return NextResponse.json(
        { error: "Gagal menyimpan pesan. Coba lagi nanti." },
        { status: 500 },
      );
    }
    return NextResponse.json({ message: "Terima kasih! Pesanmu terkirim." });
  }

  return NextResponse.json({
    message: "Terima kasih! Pesan diterima (mode pengembangan tanpa penyimpanan).",
  });
}