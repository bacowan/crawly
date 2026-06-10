create extension if not exists vector;

create table knowledge (
  id bigint primary key generated always as identity,
  bot_id bigint not null references bot(id),
  content text not null,
  embedding vector(768),
  source_page bigint references crawl_history(id),
  created_at timestamptz not null default now()
);

create index on knowledge using hnsw (embedding vector_cosine_ops);
create index on knowledge (bot_id);
