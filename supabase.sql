create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  attendance text not null check (attendance in ('yes','no')),
  guests integer not null check (guests between 0 and 6),
  dietary text not null default '',
  message text not null default ''
);
alter table public.rsvps enable row level security;
-- No public policies: only your trusted server-side service-role key can write/read.
