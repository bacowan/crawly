create table crawl_history (
  id bigint primary key generated always as identity,
  bot_id bigint references bot(id),
  url text,
  log_time timestamptz, -- when the entry should be displayed
  created_at timestamptz default now() -- when the entry was truly created
);