create table page_links (
  id bigint primary key generated always as identity,
  url text not null,
  summary text not null,
  is_crawling_okay boolean not null default true,
  parent_page bigint not null references crawl_history(id),
  created_at timestamptz not null default now()
);