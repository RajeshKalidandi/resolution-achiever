-- Add missing columns to milestones table
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed', 'abandoned')) DEFAULT 'not_started';
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- Update existing rows to have default values if they don't have them
UPDATE milestones SET status = 'not_started' WHERE status IS NULL;
UPDATE milestones SET created_at = timezone('utc'::text, now()) WHERE created_at IS NULL;
UPDATE milestones SET updated_at = timezone('utc'::text, now()) WHERE updated_at IS NULL;
