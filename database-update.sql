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

-- Database Update: Add selected_non_financial_kpis column
-- Run this in your Supabase SQL Editor

-- Add the new column for non-financial KPIs
ALTER TABLE assessment_submissions 
ADD COLUMN selected_non_financial_kpis JSONB DEFAULT '[]';

-- Add a comment to document the column
COMMENT ON COLUMN assessment_submissions.selected_non_financial_kpis IS 'Array of selected non-financial KPIs with current and goal values';

-- Create an index for better performance on the new column
CREATE INDEX idx_assessment_submissions_non_financial_kpis ON assessment_submissions USING GIN (selected_non_financial_kpis);

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'assessment_submissions' 
AND column_name = 'selected_non_financial_kpis'; 

-- Database Update: Add non_financial_kpi_updates field to progress_updates table
-- Run this in your Supabase SQL Editor

-- Add non_financial_kpi_updates column to progress_updates table
ALTER TABLE progress_updates 
ADD COLUMN non_financial_kpi_updates JSONB DEFAULT '[]';

-- Add comment to document the new field
COMMENT ON COLUMN progress_updates.non_financial_kpi_updates IS 'JSON array of non-financial KPI updates for this progress update';

-- Create index for better performance on the new field
CREATE INDEX idx_progress_updates_non_financial_kpi_updates ON progress_updates USING GIN (non_financial_kpi_updates); 