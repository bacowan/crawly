create table crawl_history (
  id bigint primary key generated always as identity,
  url text,
  log_time timestamptz, -- when the entry should be displayed
  created_at timestamptz default now() -- when the entry was truly created
);