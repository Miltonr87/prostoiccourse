-- Add philosophical fields to journal_entries table
-- Run this migration to add the new columns for philosophical journaling

ALTER TABLE journal_entries 
ADD COLUMN IF NOT EXISTS philosopher TEXT,
ADD COLUMN IF NOT EXISTS philosophical_school TEXT,
ADD COLUMN IF NOT EXISTS key_concept TEXT,
ADD COLUMN IF NOT EXISTS personal_reflection TEXT,
ADD COLUMN IF NOT EXISTS mood TEXT;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'journal_entries' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
