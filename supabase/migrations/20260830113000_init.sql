-- Skema opsional untuk menyinkronkan data KPR ke Supabase.
-- Jalankan di SQL Editor Supabase bila pengguna ingin memakai data live.

create table if not exists public.bank_rates (
  id text primary key,
  bank_name text not null,
  kpr_type text not null check (kpr_type in ('subsidi', 'komersial')),
  fixed_rate numeric not null,
  fixed_years integer not null default 0,
  floating_rate numeric,
  max_tenor_years integer not null,
  min_dp_percent integer not null,
  notes text,
  updated_at timestamptz not null default now()
);

alter table public.bank_rates enable row level security;

create policy "public read bank_rates"
  on public.bank_rates for select
  using (true);

-- Tabel penampung pesan dari halaman hubungi (opsional).
create table if not exists public.enquiries (
  id bigint generated always as identity primary key,
  nama text not null,
  email text not null,
  pesan text not null,
  created_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;

-- Insert saja; tidak bisa dibaca publik (dibaca dari server dgn service role).
create policy "insert only enquiries"
  on public.enquiries for insert
  with check (true);