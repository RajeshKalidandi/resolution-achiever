-- Drop previous tables if they exist
DROP TABLE IF EXISTS habit_logs CASCADE;
DROP TABLE IF EXISTS streaks CASCADE;
DROP TABLE IF EXISTS relapse_logs CASCADE;
DROP TABLE IF EXISTS emergency_contacts CASCADE;

-- Create emergency_contacts table
CREATE TABLE emergency_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT,
  phone TEXT,
  email TEXT,
  is_notified_on_relapse BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create habits table with enhanced tracking
CREATE TABLE habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  target_count INTEGER NOT NULL DEFAULT 1,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_completed TIMESTAMP WITH TIME ZONE,
  mood_tracking BOOLEAN DEFAULT false,
  trigger_tracking BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create habit_logs with mood and trigger tracking
CREATE TABLE habit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  mood TEXT CHECK (mood IN ('great', 'good', 'neutral', 'bad', 'terrible')),
  trigger_notes TEXT,
  coping_strategy TEXT,
  notes TEXT
);

-- Create addictions table for recovery tracking
CREATE TABLE addictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  quit_date TIMESTAMP WITH TIME ZONE NOT NULL,
  money_saved_per_day NUMERIC(10,2),
  triggers TEXT[],
  coping_strategies TEXT[],
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  relapse_count INTEGER NOT NULL DEFAULT 0,
  emergency_contact_id UUID REFERENCES emergency_contacts(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create relapse_logs with enhanced tracking
CREATE TABLE relapse_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  addiction_id UUID REFERENCES addictions(id) ON DELETE CASCADE NOT NULL,
  relapse_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  trigger TEXT,
  mood TEXT CHECK (mood IN ('great', 'good', 'neutral', 'bad', 'terrible')),
  intensity INTEGER CHECK (intensity BETWEEN 1 AND 5),
  coping_strategies_used TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE addictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE relapse_logs ENABLE ROW LEVEL SECURITY;

-- Emergency contacts policies
CREATE POLICY "Users can view their own emergency contacts"
  ON emergency_contacts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own emergency contacts"
  ON emergency_contacts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emergency contacts"
  ON emergency_contacts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emergency contacts"
  ON emergency_contacts FOR DELETE
  USING (auth.uid() = user_id);

-- Habits policies
CREATE POLICY "Users can view their own habits"
  ON habits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own habits"
  ON habits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own habits"
  ON habits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own habits"
  ON habits FOR DELETE
  USING (auth.uid() = user_id);

-- Habit logs policies
CREATE POLICY "Users can view their habit logs"
  ON habit_logs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM habits
    WHERE habits.id = habit_logs.habit_id
    AND habits.user_id = auth.uid()
  ));

CREATE POLICY "Users can create their habit logs"
  ON habit_logs FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM habits
    WHERE habits.id = habit_logs.habit_id
    AND habits.user_id = auth.uid()
  ));

-- Addictions policies
CREATE POLICY "Users can view their own addictions"
  ON addictions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own addictions"
  ON addictions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addictions"
  ON addictions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own addictions"
  ON addictions FOR DELETE
  USING (auth.uid() = user_id);

-- Relapse logs policies
CREATE POLICY "Users can view their relapse logs"
  ON relapse_logs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM addictions
    WHERE addictions.id = relapse_logs.addiction_id
    AND addictions.user_id = auth.uid()
  ));

CREATE POLICY "Users can create their relapse logs"
  ON relapse_logs FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM addictions
    WHERE addictions.id = relapse_logs.addiction_id
    AND addictions.user_id = auth.uid()
  ));
