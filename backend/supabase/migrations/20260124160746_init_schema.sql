-- =========================
-- INCIDENTS
-- =========================
create table public.incident (
  id bigint generated always as identity primary key,
  type text not null,
  location text not null,
  title text not null,
  description text not null,
  date timestamptz not null,
  created_at timestamptz default now(),
  user_id uuid not null references auth.users(id) on delete cascade
);

alter table public.incident enable row level security;

create policy "Users can insert their own incidents"
on public.incident
for insert
with check (auth.uid() = user_id);

create policy "Users can read their own incidents"
on public.incident
for select
using (auth.uid() = user_id);

create policy "Users can update their own incidents"
on public.incident
for update
using (auth.uid() = user_id);

create policy "Users can delete their own incidents"
on public.incident
for delete
using (auth.uid() = user_id);

-- =========================
-- SUBSCRIPTIONS
-- =========================
create table public.subscription (
  id bigint generated always as identity primary key,
  stripe_subscription_id varchar(255) not null unique,
  status varchar(50) not null,
  start_date date not null,
  end_date date,
  user_id uuid not null references auth.users(id) on delete cascade
);

alter table public.subscription enable row level security;

create policy "Users can read their own subscription"
on public.subscription
for select
using (auth.uid() = user_id);

create policy "Service role can manage subscriptions"
on public.subscription
for all
using (auth.role() = 'service_role');

-- =========================
-- INDEXES
-- =========================
create index idx_incidents_user_id on public.incident(user_id);
create index idx_subscriptions_user_id on public.subscription(user_id);
