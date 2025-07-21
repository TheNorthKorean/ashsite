-- Coaching Assessment System Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Assessment Submissions Table
CREATE TABLE assessment_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant_name VARCHAR(255) NOT NULL,
  practice_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  sales_confidence_before INTEGER NOT NULL CHECK (sales_confidence_before >= 1 AND sales_confidence_before <= 5),
  selected_kpis JSONB NOT NULL,
  non_financial_metrics TEXT,
  revenue_forecast_confidence VARCHAR(50),
  job_descriptions_clarity VARCHAR(50),
  success_definition TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress Updates Table
CREATE TABLE progress_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES assessment_submissions(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL CHECK (week_number >= 1 AND week_number <= 7),
  sales_confidence_after INTEGER NOT NULL CHECK (sales_confidence_after >= 1 AND sales_confidence_after <= 5),
  kpi_updates JSONB DEFAULT '[]',
  revenue_forecast_confidence VARCHAR(50),
  job_descriptions_clarity VARCHAR(50),
  new_improvements TEXT[] DEFAULT '{}',
  new_achievements TEXT[] DEFAULT '{}',
  notes TEXT,
  current_score INTEGER NOT NULL CHECK (current_score >= 0 AND current_score <= 100),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coaching Results Table
CREATE TABLE coaching_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES assessment_submissions(id) ON DELETE CASCADE,
  sales_confidence_after INTEGER NOT NULL CHECK (sales_confidence_after >= 1 AND sales_confidence_after <= 5),
  kpi_progress JSONB NOT NULL,
  non_financial_improvements TEXT[],
  success_achievements TEXT[],
  coaching_score INTEGER NOT NULL CHECK (coaching_score >= 0 AND coaching_score <= 100),
  completion_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_assessment_submissions_email ON assessment_submissions(email);
CREATE INDEX idx_assessment_submissions_created_at ON assessment_submissions(created_at);
CREATE INDEX idx_progress_updates_assessment_id ON progress_updates(assessment_id);
CREATE INDEX idx_progress_updates_week_number ON progress_updates(week_number);
CREATE INDEX idx_progress_updates_updated_at ON progress_updates(updated_at);
CREATE INDEX idx_coaching_results_assessment_id ON coaching_results(assessment_id);
CREATE INDEX idx_coaching_results_completion_date ON coaching_results(completion_date);

-- Enable Row Level Security (RLS)
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public read/write access (you can modify these based on your security needs)
CREATE POLICY "Allow public insert on assessment_submissions" ON assessment_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on assessment_submissions" ON assessment_submissions
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on progress_updates" ON progress_updates
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on progress_updates" ON progress_updates
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on coaching_results" ON coaching_results
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on coaching_results" ON coaching_results
  FOR SELECT USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_assessment_submissions_updated_at
  BEFORE UPDATE ON assessment_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO assessment_submissions (
  participant_name,
  practice_name,
  email,
  sales_confidence_before,
  selected_kpis,
  non_financial_metrics,
  revenue_forecast_confidence,
  job_descriptions_clarity,
  success_definition
) VALUES (
  'Dr. Sarah Johnson',
  'Radiant Aesthetics Med Spa',
  'sarah@radiantaesthetics.com',
  2,
  '[
    {"kpi": "monthly_revenue", "currentValue": "65000", "goalValue": "85000"},
    {"kpi": "conversion_rate", "currentValue": "32", "goalValue": "50"},
    {"kpi": "average_transaction", "currentValue": "850", "goalValue": "1200"}
  ]'::jsonb,
  'Team confidence, patient satisfaction, consultation quality',
  'somewhat-confident',
  'mostly-yes',
  'Increase monthly revenue by 30%, improve team confidence, and establish systematic sales processes'
);

-- Insert sample coaching results
INSERT INTO coaching_results (
  assessment_id,
  sales_confidence_after,
  kpi_progress,
  non_financial_improvements,
  success_achievements,
  coaching_score,
  completion_date
) VALUES (
  (SELECT id FROM assessment_submissions WHERE email = 'sarah@radiantaesthetics.com' LIMIT 1),
  5,
  '[
    {"kpi": "monthly_revenue", "label": "Monthly Revenue", "beforeValue": "65000", "afterValue": "89000", "unit": "", "percentageChange": 37, "trend": "up", "isPositive": true},
    {"kpi": "conversion_rate", "label": "Conversion Rate", "beforeValue": "32", "afterValue": "57", "unit": "%", "percentageChange": 78, "trend": "up", "isPositive": true},
    {"kpi": "average_transaction", "label": "Average Transaction", "beforeValue": "850", "afterValue": "1240", "unit": "", "percentageChange": 46, "trend": "up", "isPositive": true}
  ]'::jsonb,
  ARRAY[
    'Increased team confidence in sales conversations',
    'Enhanced patient consultation experience',
    'Improved treatment recommendation clarity',
    'Better objection handling techniques'
  ],
  ARRAY[
    'Exceeded monthly revenue goal by 15%',
    'Achieved highest conversion rate in practice history',
    'Implemented systematic sales process',
    'Trained entire team on new consultation framework'
  ],
  94,
  '2024-03-15'
); 