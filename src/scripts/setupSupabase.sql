create extension if not exists pgcrypto;

create table if not exists fare_history (
  id uuid primary key default gen_random_uuid(),
  airport_code text,
  price numeric,
  source text check (source in ('seed', 'bootstrap', 'live')),
  recorded_at timestamptz default now()
);

create table if not exists deals_log (
  id uuid primary key default gen_random_uuid(),
  airport_code text,
  continent text,
  price numeric,
  score integer,
  signal text,
  label text,
  surfaced_at timestamptz default now()
);

create table if not exists dedup_index (
  airport_code text primary key,
  last_surfaced_at timestamptz
);

create table if not exists hub_config (
  id uuid primary key default gen_random_uuid(),
  continent text,
  hubs jsonb,
  active boolean default true
);

create table if not exists run_errors (
  id uuid primary key default gen_random_uuid(),
  airport_code text,
  run_at timestamptz default now(),
  error_message text,
  status_code integer
);

create table if not exists verification_log (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid references deals_log(id),
  verified_at timestamptz default now(),
  gf_price numeric,
  price_match boolean,
  is_bookable boolean,
  itinerary_ok boolean,
  human_verdict text check (human_verdict in ('good_deal', 'marginal', 'not_a_deal')),
  score_justified boolean,
  notes text
);
