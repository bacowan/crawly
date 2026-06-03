create table personality (
  id bigint primary key generated always as identity,
  name text not null,
  magnitude real not null check (magnitude >= -1 AND magnitude <= 1),
  bot_id bigint not null references bot(id),
  created_at timestamptz not null default now()
);