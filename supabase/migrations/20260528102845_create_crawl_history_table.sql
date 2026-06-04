create table crawl_history (
  id bigint primary key generated always as identity,
  bot_id bigint not null references bot(id),
  url text not null,
  thoughts text not null,
  summary text not null,
  log_time timestamptz not null, -- when the entry should be displayed
  created_at timestamptz not null default now() -- when the entry was truly created
);