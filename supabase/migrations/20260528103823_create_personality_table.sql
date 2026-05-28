create table personality (
  id bigint primary key generated always as identity,
  name text,
  magnitude real check (magnitude >= -1 AND magnitude <= 1),
  created_at timestamptz default now()
);