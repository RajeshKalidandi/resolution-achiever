-- Create habits table
create table habits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  description text,
  frequency text not null, -- 'daily', 'weekly', 'monthly'
  target_count integer not null default 1,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  start_date timestamp with time zone default now(),
  last_completed timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create habit_logs table for tracking completions
create table habit_logs (
  id uuid default uuid_generate_v4() primary key,
  habit_id uuid references habits(id) on delete cascade,
  completed_at timestamp with time zone default now(),
  notes text
);

-- Create addictions table for tracking things to quit
create table addictions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  description text,
  quit_date timestamp with time zone not null,
  money_saved_per_day numeric(10,2),
  triggers text[], -- Array of common triggers
  coping_strategies text[],
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  relapse_count integer not null default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create relapse_logs table
create table relapse_logs (
  id uuid default uuid_generate_v4() primary key,
  addiction_id uuid references addictions(id) on delete cascade,
  relapse_date timestamp with time zone default now(),
  trigger text,
  notes text
);

-- Add RLS policies
alter table habits enable row level security;
alter table habit_logs enable row level security;
alter table addictions enable row level security;
alter table relapse_logs enable row level security;

-- Habits policies
create policy "Users can view their own habits"
  on habits for select
  using (auth.uid() = user_id);

create policy "Users can create their own habits"
  on habits for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own habits"
  on habits for update
  using (auth.uid() = user_id);

create policy "Users can delete their own habits"
  on habits for delete
  using (auth.uid() = user_id);

-- Habit logs policies
create policy "Users can view their habit logs"
  on habit_logs for select
  using (exists (
    select 1 from habits
    where habits.id = habit_logs.habit_id
    and habits.user_id = auth.uid()
  ));

create policy "Users can create their habit logs"
  on habit_logs for insert
  with check (exists (
    select 1 from habits
    where habits.id = habit_logs.habit_id
    and habits.user_id = auth.uid()
  ));

-- Addictions policies
create policy "Users can view their own addictions"
  on addictions for select
  using (auth.uid() = user_id);

create policy "Users can create their own addictions"
  on addictions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own addictions"
  on addictions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own addictions"
  on addictions for delete
  using (auth.uid() = user_id);

-- Relapse logs policies
create policy "Users can view their relapse logs"
  on relapse_logs for select
  using (exists (
    select 1 from addictions
    where addictions.id = relapse_logs.addiction_id
    and addictions.user_id = auth.uid()
  ));

create policy "Users can create their relapse logs"
  on relapse_logs for insert
  with check (exists (
    select 1 from addictions
    where addictions.id = relapse_logs.addiction_id
    and addictions.user_id = auth.uid()
  ));
