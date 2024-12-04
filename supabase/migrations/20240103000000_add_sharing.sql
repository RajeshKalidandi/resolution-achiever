-- Create resolution_shares table if it doesn't exist
CREATE TABLE IF NOT EXISTS resolution_shares (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resolution_id UUID REFERENCES resolutions(id) ON DELETE CASCADE NOT NULL,
    shared_with_email TEXT NOT NULL,
    shared_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    permission TEXT NOT NULL CHECK (permission IN ('view', 'edit')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on resolution_shares
ALTER TABLE resolution_shares ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own resolutions" ON resolutions;
DROP POLICY IF EXISTS "Users can create own resolutions" ON resolutions;
DROP POLICY IF EXISTS "Users can update own resolutions" ON resolutions;
DROP POLICY IF EXISTS "Users can delete own resolutions" ON resolutions;

-- Create updated policies for resolutions
CREATE POLICY "Users can view own and shared resolutions"
    ON resolutions FOR SELECT
    USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM resolution_shares
            WHERE resolution_id = resolutions.id
            AND shared_with_email = auth.jwt()->>'email'
        )
    );

CREATE POLICY "Users can create own resolutions"
    ON resolutions FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own and editable shared resolutions"
    ON resolutions FOR UPDATE
    USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM resolution_shares
            WHERE resolution_id = resolutions.id
            AND shared_with_email = auth.jwt()->>'email'
            AND permission = 'edit'
        )
    );

CREATE POLICY "Users can delete own resolutions"
    ON resolutions FOR DELETE
    USING (user_id = auth.uid());

-- Create policies for resolution_shares
CREATE POLICY "Users can view shares they created or received"
    ON resolution_shares FOR SELECT
    USING (
        shared_by = auth.uid() OR
        shared_with_email = auth.jwt()->>'email'
    );

CREATE POLICY "Users can create shares for own resolutions"
    ON resolution_shares FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM resolutions
            WHERE id = resolution_shares.resolution_id
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update shares they created"
    ON resolution_shares FOR UPDATE
    USING (shared_by = auth.uid());

CREATE POLICY "Users can delete shares they created"
    ON resolution_shares FOR DELETE
    USING (shared_by = auth.uid());

-- Update milestone policies to include shared resolutions
DROP POLICY IF EXISTS "Users can view own milestones" ON milestones;
DROP POLICY IF EXISTS "Users can create milestones for own resolutions" ON milestones;
DROP POLICY IF EXISTS "Users can update own milestones" ON milestones;
DROP POLICY IF EXISTS "Users can delete own milestones" ON milestones;

CREATE POLICY "Users can view milestones of own and shared resolutions"
    ON milestones FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM resolutions
            WHERE id = milestones.resolution_id
            AND (
                user_id = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM resolution_shares
                    WHERE resolution_id = resolutions.id
                    AND shared_with_email = auth.jwt()->>'email'
                )
            )
        )
    );

CREATE POLICY "Users can create milestones for own and editable shared resolutions"
    ON milestones FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM resolutions
            WHERE id = milestones.resolution_id
            AND (
                user_id = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM resolution_shares
                    WHERE resolution_id = resolutions.id
                    AND shared_with_email = auth.jwt()->>'email'
                    AND permission = 'edit'
                )
            )
        )
    );

CREATE POLICY "Users can update milestones of own and editable shared resolutions"
    ON milestones FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM resolutions
            WHERE id = milestones.resolution_id
            AND (
                user_id = auth.uid() OR
                EXISTS (
                    SELECT 1 FROM resolution_shares
                    WHERE resolution_id = resolutions.id
                    AND shared_with_email = auth.jwt()->>'email'
                    AND permission = 'edit'
                )
            )
        )
    );

CREATE POLICY "Users can delete milestones of own resolutions"
    ON milestones FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM resolutions
            WHERE id = milestones.resolution_id
            AND user_id = auth.uid()
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS resolution_shares_resolution_id_idx ON resolution_shares(resolution_id);
CREATE INDEX IF NOT EXISTS resolution_shares_shared_with_email_idx ON resolution_shares(shared_with_email);
CREATE INDEX IF NOT EXISTS resolution_shares_shared_by_idx ON resolution_shares(shared_by);
