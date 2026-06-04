create table page_links (
  id bigint primary key generated always as identity,
  url text not null,
  summary text not null,
  initial_interest int not null, -- rank (1 being highest) of initial interest, within the parent page. No uniqueness since it's "okay" to have equal interest.
  is_crawling_okay boolean not null default true,
  parent_page bigint not null references crawl_history(id),
  created_at timestamptz not null default now()
);