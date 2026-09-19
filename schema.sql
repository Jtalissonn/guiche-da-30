-- Guichê da 30 — esquema completo do Supabase
-- Execute uma única vez no SQL Editor de um projeto Supabase separado.

create extension if not exists pgcrypto;

create type public.order_status as enum (
  'aguardando_pagamento', 'pagamento_aprovado', 'comprando_ingresso',
  'ingresso_disponivel', 'ingresso_entregue', 'cancelado', 'reembolsado'
);
create type public.sale_status as enum (
  'disponivel', 'esgotado_automaticamente', 'pausado_manual', 'erro_verificacao'
);
create type public.event_review_status as enum ('pendente', 'aprovado', 'rejeitado');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  cpf text,
  phone text,
  address jsonb not null default '{}'::jsonb,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.artists (
  id uuid primary key default gen_random_uuid(),
  canonical_name text not null unique,
  aliases text[] not null default '{}',
  active boolean not null default true
);

insert into public.artists (canonical_name, aliases) values
  ('Matuê', array['matue','matuê']),
  ('Teto', array['teto']),
  ('WIU', array['wiu']),
  ('Brandão85', array['brandao','brandão','brandao85','brandão85'])
on conflict (canonical_name) do nothing;

create table public.events (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  source_event_id text not null,
  official_url text not null,
  supplier_name text not null,
  title text not null,
  description text not null default '',
  image_url text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  venue_name text not null default '',
  address text not null default '',
  city text not null default '',
  state text not null default '',
  age_rating text,
  lineup text[] not null default '{}',
  matched_artists text[] not null default '{}',
  review_status public.event_review_status not null default 'pendente',
  paused boolean not null default false,
  verification_error text,
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(source, source_event_id)
);

create table public.ticket_options (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  category text not null default 'inteira',
  supplier_price_cents integer not null check (supplier_price_cents >= 0),
  supplier_fee_cents integer not null default 0 check (supplier_fee_cents >= 0),
  displayed_price_cents integer generated always as (supplier_price_cents + supplier_fee_cents) stored,
  available_quantity integer,
  sale_status public.sale_status not null default 'erro_verificacao',
  benefit_requirements text,
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(event_id, name, category)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  event_id uuid not null references public.events(id),
  ticket_option_id uuid not null references public.ticket_options(id),
  quantity integer not null check (quantity between 1 and 6),
  attendee_data jsonb not null default '{}'::jsonb,
  unit_ticket_cents integer not null,
  unit_service_fee_cents integer not null,
  ticket_total_cents integer not null,
  service_fee_total_cents integer not null,
  total_cents integer not null,
  mercado_pago_fee_cents integer not null default 0,
  estimated_profit_cents integer not null default 0,
  status public.order_status not null default 'aguardando_pagamento',
  payment_status text not null default 'pending',
  mercado_pago_preference_id text,
  mercado_pago_payment_id text,
  paid_at timestamptz,
  purchase_started_at timestamptz,
  ticket_added_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  kind text not null check (kind in ('file','image','link')),
  storage_path text,
  external_url text,
  original_filename text,
  created_at timestamptz not null default now()
);

create table public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id, event_id)
);

create table public.artist_follows (
  user_id uuid not null references auth.users(id) on delete cascade,
  artist_id uuid not null references public.artists(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id, artist_id)
);

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_cents integer not null default 0,
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  max_uses integer,
  use_count integer not null default 0
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.source_watch (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null unique,
  supplier_name text not null,
  active boolean not null default true,
  last_checked_at timestamptz,
  last_error text
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''));
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_touch before update on public.profiles for each row execute procedure public.touch_updated_at();
create trigger events_touch before update on public.events for each row execute procedure public.touch_updated_at();
create trigger ticket_options_touch before update on public.ticket_options for each row execute procedure public.touch_updated_at();
create trigger orders_touch before update on public.orders for each row execute procedure public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.ticket_options enable row level security;
alter table public.orders enable row level security;
alter table public.tickets enable row level security;
alter table public.favorites enable row level security;
alter table public.artist_follows enable row level security;
alter table public.artists enable row level security;

create policy "public approved future events" on public.events for select
using (review_status = 'aprovado' and starts_at > now());
create policy "public ticket options" on public.ticket_options for select
using (exists (select 1 from public.events e where e.id = event_id and e.review_status = 'aprovado'));
create policy "public artists" on public.artists for select using (true);
create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id and is_admin = false);
create policy "own orders" on public.orders for select using (auth.uid() = user_id);
create policy "own tickets" on public.tickets for select using (auth.uid() = user_id);
create policy "own favorites" on public.favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own follows" on public.artist_follows for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('tickets', 'tickets', false, 10485760, array['application/pdf','image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = false;

create policy "no direct ticket reads" on storage.objects for select using (false);

create index events_starts_at_idx on public.events(starts_at);
create index events_review_idx on public.events(review_status, paused);
create index orders_user_idx on public.orders(user_id, created_at desc);
create index orders_status_idx on public.orders(status, created_at desc);
create index tickets_user_idx on public.tickets(user_id);

-- Depois de criar sua conta normal no site, torne-a administradora substituindo o e-mail:
-- update public.profiles set is_admin = true
-- where id = (select id from auth.users where email = 'SEU_EMAIL@EXEMPLO.COM');
