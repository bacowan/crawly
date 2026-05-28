create table crawl_history (
  id bigint primary key generated always as identity,
  url text,
  created_at timestamptz default now()
);