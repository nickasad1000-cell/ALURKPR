# Plan Komprehensif — AlurKPR v6 (2026-09-02)

Berpasangan dengan `2026-09-02-audit-komprehensif-v6.md`. Fase diberi label agar
kredibilitas terjaga; setiap fase ditutup dengan verifikasi. Item A1–A3 (teks hero,
ikon, footer grid) sudah dikerjakan sesi ini dan tinggal diverifikasi + commit di Fase 7–8.

**Goal:** Menuntaskan inkonsistensi lintas page/tab hasil audit v6, plus verifikasi &
commit perubahan sesi ini (teks hero, ikon alur, footer).

**Tech Stack:** Next.js 16 (Turbopack) + Tailwind v4, token warna di `@theme`
(`globals.css:14-29`). Style: `npm run lint` (eslint) · `npm test` (vitest) · `npm run build` (static).

---

## Fase 1 — Copy typo "hinggap" di planner-DP (P1)

**Lokasi:** `components/planner-dp.tsx:265`.

**Langkah:**
1. Ubah `label="Tanya tentang target hinggap"` → `label="Tanya tentang target DP"`.

**Verifikasi fase:** `npm run lint` bersih. Grep `grep -n "hinggap" components/runner*.tsx
components/planner-dp.tsx` → kosong (jalankan pada file planner-dp).

---

## Fase 2 — Hero halaman informasi ikut strip (P1)

**Lokasi:**
- `app/privasi/page.tsx:64` (`<section className="py-14 sm:py-20">`)
- `app/hubungi/page.tsx:17` (sama)

**Sebelum:** bandingkan pola strip di `app/tentang/page.tsx:39-40`:
```tsx
<section className="border-b border-line bg-surface">
  <Container className="py-14 sm:py-20">
```

**Langkah:**
1. `privasi` & `hubungi`: ubah `<section className="py-14 sm:py-20">` →
   `<section className="border-b border-line bg-surface">`.
2. Pindahkan padding ke `Container`: `<Container>` → `<Container className="py-14 sm:py-20">`.
3. Biarkan halaman alat (`py-12 sm:py-16`) dan `panduan/[slug]` tidak berubah.

**Verifikasi fase:** `npm run build`. Manual: `/privasi` & `/hubungi` punya strip terang
di bawah header seperti `/tentang`/`/faq`.

---

## Fase 3 — Toggle segmented planner-DP diseragamkan dengan kalkulator (P2)

**Lokasi:** `components/planner-dp.tsx:63-84`.

**Sebelum:** pola kalkulator di `components/kalkulator.tsx:204-232` — container berboder,
tombol `min-h-10 ... text-sm`, `aria-pressed`.

**Langkah — ganti blok toggle planner-DP (baris 63–84) menjadi:**
```tsx
<div
  className="mt-5 grid grid-cols-2 gap-1 rounded-2xl border border-line bg-paper p-1"
  role="group"
  aria-label="Mode planner DP"
>
  <button
    type="button"
    onClick={() => setMode("lama")}
    aria-pressed={mode === "lama"}
    className={`min-h-10 rounded-xl px-3 text-sm font-bold transition ${
      mode === "lama"
        ? "bg-primary text-white shadow-sm"
        : "text-ink-soft hover:bg-paper hover:text-ink"
    }`}
  >
    Berapa lama?
  </button>
  <button
    type="button"
    onClick={() => setMode("bulanan")}
    aria-pressed={mode === "bulanan"}
    className={`min-h-10 rounded-xl px-3 text-sm font-bold transition ${
      mode === "bulanan"
        ? "bg-primary text-white shadow-sm"
        : "text-ink-soft hover:bg-paper hover:text-ink"
    }`}
  >
    Berapa sebulan?
  </button>
</div>
```

**Verifikasi fase:** `npm run build`; manual: toggle planner identik gaya dengan kalkulator.

---

## Fase 4 — Kelas checkbox + tombol submit kelayakan (P2)

**Lokasi:**
- `components/checklist-dokumen.tsx:192`
- `app/hubungi/hubungi-form.tsx:106`
- `components/kelayakan-form.tsx:114` (sudah `accent-primary` — dipakai sebagai target)
- `components/kelayakan-form.tsx:121-126` (submit inline)

**Langkah:**
1. `checklist-dokumen.tsx:192` & `hubungi-form.tsx:106`:
   `accent-[var(--color-primary)]` → `accent-primary`.
2. Submit di `kelayakan-form.tsx` (baris 123) — ganti inline class dengan token:
   ```tsx
   className={`mt-7 ${btnPrimary} w-full`}
   ```
   (`btnPrimary` sudah di-import di baris 10. Hindari duplikasi kelas; biarkan `btnFocus`
   yang sudah ada di dalam `btnPrimary`.)

**Verifikasi fase:** `npm run build`; grep `accent-\[` di `components/` dan `app/` → kosong.

---

## Fase 5 — Ganti `CheckIcon` hand-rolled dengan lucide `Check` (P2)

**Lokasi:** `components/planner-dp.tsx:3-4` (import), `:210-214` (pemakaian), `:274-287` (definisi).

**Langkah:**
1. Tambah `Check` ke import lucide-react di baris 4:
   ```tsx
   import { CalendarDays, Check, Info, PiggyBank, Wallet } from "lucide-react";
   ```
2. Ganti `<CheckIcon />` (baris 212) →
   ```tsx
   <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
   ```
3. Hapus definisi lokal `function CheckIcon() { ... }` (baris 274–287).

**Verifikasi fase:** `npm run lint` (tidak ada `CheckIcon` unresolved) + `npm run build`.

---

## Fase 6 — [OPSIONAL] Input nominal seragam format titik ribuan (P2)

**Lokasi (bila dikerjakan):** `components/mampu-beli.tsx:54-88`,
`components/planner-dp.tsx:86-183`, `components/sewa-vs-beli.tsx:53-165`,
`components/kelayakan-form.tsx:43-82`.

Rujuk pola sudah ada di `components/kalkulator.tsx:72-79` (`formatAngkaId`) dan
pemakaiannya di `:285-326` (input text + prefix "Rp" + `onFocus select`).

> Keputusan: refactor ini menyentuh 4 file dengan perubahan state draft/commit. Nilai
> manfaat sedang vs risiko sedang. **Jangan dikerjakan pada sesi ini** kecuali diminta —
> disarankan masuk backlog.

**Verifikasi bila dikerjakan:** `npm run build` + manual ketik "8000000" → tampil
"8.000.000" di ketiga alat.

---

## Fase 7 — Verifikasi menyeluruh

1. `npm run lint` → bersih.
2. `npm test` → semua pass (vitest, termasuk `finance.test.ts*` — tidak boleh ada test
   yang menyentuh perubahan UI dipecah).
3. `npm run build` → sukses, 37 halaman statis.
4. Grep string yang dihapus/diubah:
   - `grep -n "bisa diakad" app/page.tsx` → kosong
   - `grep -n "hinggap" components/planner-dp.tsx` → kosong
   - `grep -n "accent-\[" components app` → kosong
   - `git diff --stat` → 5 file (page.tsx, blueprint-icons.tsx, footer.tsx, privasi,
     hubungi, planner-dp) + 2 doc baru.

---

## Fase 8 — Commit & push (hanya bila pengguna minta)

- Commit gaya repo (mis. `feat(ui+ux): konsistensi ikon, footer, hero & copy (v6)`).
- `git add` semua file yang relevan (termasuk 2 doc plan).
- `git push origin main`.
- Deploy `vercel --prod --yes` → https://alurkpr.vercel.app (hanya bila diminta).