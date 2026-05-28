create table page_links (
  id bigint primary key generated always as identity,
  url text,
  summary text,
  parent_page bigint references crawl_history(id),
  created_at timestamptz default now()
);