-- Database Update Script
-- Run this in your Supabase SQL Editor to add missing columns

-- Add missing columns to progress_updates table
ALTER TABLE progress_updates 
ADD COLUMN IF NOT EXISTS revenue_forecast_confidence VARCHAR(50),
ADD COLUMN IF NOT EXISTS job_descriptions_clarity VARCHAR(50);

-- Update the week_number constraint to allow week 7 (Final Review)
ALTER TABLE progress_updates 
DROP CONSTRAINT IF EXISTS progress_updates_week_number_check;

ALTER TABLE progress_updates 
ADD CONSTRAINT progress_updates_week_number_check 
CHECK (week_number >= 1 AND week_number <= 7);

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'progress_updates' 
ORDER BY ordinal_position; 