create table interests (
  id bigint primary key generated always as identity,
  name text,
  magnitude real check (magnitude >= -1 AND magnitude <= 1), -- value between -1 (dislike) to 1 (like)
  bot_id bigint references bot(id),
  created_at timestamptz default now()
);