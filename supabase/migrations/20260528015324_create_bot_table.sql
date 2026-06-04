create table bot (
  id bigint primary key generated always as identity,
  public_id uuid not null default gen_random_uuid() unique,
  personality_summary text,
  created_at timestamptz not null default now()
);