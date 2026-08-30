"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { inputCls } from "@/components/ui";
import { track } from "@/lib/analytics";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "done"; pesan: string }
  | { state: "error"; pesan: string };

export function HubungiForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [form, setForm] = useState({ nama: "", email: "", pesan: "", consent: false });
  const [website, setWebsite] = useState("");

  async function kirim(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.nama,
          email: form.email,
          pesan: form.pesan,
          consent: form.consent,
          website,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ state: "error", pesan: data.error ?? "Gagal mengirim." });
        return;
      }
      track("form_submitted", { channel: "enquiries" });
      setForm({ nama: "", email: "", pesan: "", consent: false });
      setStatus({ state: "done", pesan: data.message ?? "Terima kasih! Pesanmu terkirim." });
    } catch {
      setStatus({ state: "error", pesan: "Koneksi bermasalah. Coba lagi." });
    }
  }

  return (
    <form onSubmit={kirim} className="rounded-3xl border border-line bg-surface p-7 shadow-sm sm:p-8">
      {/* honeypot anti-bot: disembunyikan dari manusia, diisi bot */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold">Nama</span>
          <input
            type="text"
            required
            value={form.nama}
            onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
            className={`${inputCls} mt-1.5`}
            placeholder="Nama kamu"
          />
        </label>
        <label className="block">
          <span className="text-sm font-bold">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={`${inputCls} mt-1.5`}
            placeholder="kamu@email.com"
          />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="text-sm font-bold">Pesan</span>
        <textarea
          required
          rows={5}
          value={form.pesan}
          onChange={(e) => setForm((f) => ({ ...f, pesan: e.target.value }))}
          className={`${inputCls} mt-1.5 resize-y`}
          placeholder="Ceritakan pertanyaan atau kebutuhanmu seputar KPR…"
        />
      </label>

      <label className="mt-5 flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
          className="mt-0.5 size-4 accent-[var(--color-primary)]"
        />
        <span className="text-xs leading-relaxed text-ink-soft">
          Saya setuju data nama, email, dan isi pesan diproses untuk membalas
          pertanyaan ini, sesuai{" "}
          <Link href="/privasi" className="font-bold text-primary hover:text-primary-deep">
            kebijakan privasi
          </Link>
          . Tanpa persetujuan ini, pesan tidak dapat dikirim.
        </span>
      </label>

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary font-bold text-white transition hover:bg-primary-deep disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {status.state === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Mengirim…
          </>
        ) : (
          "Kirim pesan"
        )}
      </button>

      {status.state === "done" ? (
        <p role="status" className="mt-5 flex items-start gap-2 text-sm font-semibold text-primary">
          <CheckCircle2 className="mt-0.5 size-[18px] shrink-0" aria-hidden="true" />
          {status.pesan}
        </p>
      ) : null}
      {status.state === "error" ? (
        <p role="alert" className="mt-5 text-sm font-semibold text-danger">{status.pesan}</p>
      ) : null}
    </form>
  );
}