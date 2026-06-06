create table knowledge (
  id bigint primary key generated always as identity,
  topic text not null,
  subtopic text not null,
  summary text not null,
  bot_id bigint not null references bot(id),
  created_at timestamptz not null default now()
);

create unique index knowledge_bot_id_topic_subtopic_unique on knowledge (bot_id, lower(topic), lower(subtopic));