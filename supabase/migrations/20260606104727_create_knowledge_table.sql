create table knowledge (
  id bigint primary key generated always as identity,
  topic text not null,
  summary text not null,
  bot_id bigint not null references bot(id),
  created_at timestamptz not null default now()
);