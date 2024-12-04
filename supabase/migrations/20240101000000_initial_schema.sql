-- Create initial tables
CREATE TABLE IF NOT EXISTS resolutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('health', 'career', 'personal', 'addiction', 'other')) NOT NULL,
  target_date TIMESTAMP WITH TIME ZONE,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed', 'abandoned')) DEFAULT 'not_started',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resolution_id UUID REFERENCES resolutions(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_date TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE resolutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own resolutions" ON resolutions;
DROP POLICY IF EXISTS "Users can create own resolutions" ON resolutions;
DROP POLICY IF EXISTS "Users can update own resolutions" ON resolutions;
DROP POLICY IF EXISTS "Users can delete own resolutions" ON resolutions;

DROP POLICY IF EXISTS "Users can view own milestones" ON milestones;
DROP POLICY IF EXISTS "Users can create own milestones" ON milestones;
DROP POLICY IF EXISTS "Users can update own milestones" ON milestones;
DROP POLICY IF EXISTS "Users can delete own milestones" ON milestones;

-- Create policies for resolutions
CREATE POLICY "Users can view own resolutions"
  ON resolutions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own resolutions"
  ON resolutions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resolutions"
  ON resolutions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resolutions"
  ON resolutions FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for milestones
CREATE POLICY "Users can view own milestones"
  ON milestones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM resolutions
      WHERE resolutions.id = milestones.resolution_id
      AND resolutions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own milestones"
  ON milestones FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM resolutions
      WHERE resolutions.id = milestones.resolution_id
      AND resolutions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own milestones"
  ON milestones FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM resolutions
      WHERE resolutions.id = milestones.resolution_id
      AND resolutions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own milestones"
  ON milestones FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM resolutions
      WHERE resolutions.id = milestones.resolution_id
      AND resolutions.user_id = auth.uid()
    )
  );
