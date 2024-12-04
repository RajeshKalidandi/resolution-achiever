-- Add new columns to resolutions table
ALTER TABLE resolutions
ADD COLUMN is_private BOOLEAN DEFAULT false,
ADD COLUMN streak_count INTEGER DEFAULT 0,
ADD COLUMN last_check_in TIMESTAMP WITH TIME ZONE;

-- Create habit_logs table
CREATE TABLE IF NOT EXISTS habit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resolution_id UUID REFERENCES resolutions(id) ON DELETE CASCADE NOT NULL,
  check_in_date TIMESTAMP WITH TIME ZONE NOT NULL,
  mood TEXT CHECK (mood IN ('great', 'good', 'neutral', 'bad', 'terrible')),
  trigger_notes TEXT,
  coping_strategy TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create streaks table
CREATE TABLE IF NOT EXISTS streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resolution_id UUID REFERENCES resolutions(id) ON DELETE CASCADE NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  current_count INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create emergency_contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  is_notified_on_relapse BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Add RLS policies for habit_logs
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own habit logs"
  ON habit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM resolutions
      WHERE resolutions.id = habit_logs.resolution_id
      AND resolutions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create habit logs for own resolutions"
  ON habit_logs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM resolutions
      WHERE resolutions.id = habit_logs.resolution_id
      AND resolutions.user_id = auth.uid()
    )
  );

-- Add RLS policies for streaks
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streaks"
  ON streaks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM resolutions
      WHERE resolutions.id = streaks.resolution_id
      AND resolutions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own streaks"
  ON streaks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM resolutions
      WHERE resolutions.id = streaks.resolution_id
      AND resolutions.user_id = auth.uid()
    )
  );

-- Add RLS policies for emergency_contacts
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own emergency contacts"
  ON emergency_contacts FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own emergency contacts"
  ON emergency_contacts FOR ALL
  USING (user_id = auth.uid());
