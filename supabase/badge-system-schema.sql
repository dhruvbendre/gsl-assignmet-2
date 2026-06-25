-- Badge System Database Schema for STEM Learning Platform
-- This schema creates the necessary tables for storing user badges in Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create badges table (defines all available badges)
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  lecture_id VARCHAR(100) NOT NULL,
  course_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create user_badges table (tracks which badges users have earned)
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  lecture_id VARCHAR(100) NOT NULL,
  course_id VARCHAR(100) NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, badge_id)
);

-- Create lectures table (defines all available lectures)
CREATE TABLE IF NOT EXISTS public.lectures (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  short_title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  estimated_time VARCHAR(50) NOT NULL,
  badge_icon VARCHAR(50) NOT NULL,
  color VARCHAR(50) NOT NULL,
  bg_color VARCHAR(50) NOT NULL,
  text_color VARCHAR(50) NOT NULL,
  course_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create user_progress table (tracks user progress per course)
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id VARCHAR(100) NOT NULL,
  lecture_id VARCHAR(100) NOT NULL,
  current_chapter INTEGER NOT NULL DEFAULT 1,
  completed_chapters INTEGER[] DEFAULT '{}',
  total_xp INTEGER NOT NULL DEFAULT 0,
  quiz_scores JSONB DEFAULT '{}',
  boss_fight_attempts INTEGER NOT NULL DEFAULT 0,
  boss_fight_passed BOOLEAN NOT NULL DEFAULT false,
  boss_fight_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, course_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge_id ON public.user_badges(badge_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id ON public.user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_badges_lecture_id ON public.badges(lecture_id);
CREATE INDEX IF NOT EXISTS idx_badges_course_id ON public.badges(course_id);

-- Insert default badges
INSERT INTO public.badges (id, name, description, icon, lecture_id, course_id) VALUES
  (uuid_generate_v4(), 'Water Guardian Badge', 'Awarded for mastering soil moisture detection and smart irrigation systems.', '💧', 'soil-moisture', 'arduino-soil-moisture'),
  (uuid_generate_v4(), 'Smart City Innovator Badge', 'Awarded for mastering smart street lighting and city automation systems.', '💡', 'smart-street-light', 'smart-street-light')
ON CONFLICT DO NOTHING;

-- Insert default lectures
INSERT INTO public.lectures (id, title, short_title, description, difficulty, estimated_time, badge_icon, color, bg_color, text_color, course_id) VALUES
  ('soil-moisture', 'Soil Moisture Detection Using Arduino', 'Soil Moisture Detection', 'Build a smart irrigation system that measures soil moisture and automatically waters plants at the perfect time!', 'Beginner', '2-3 hours', '💧', 'from-teal-500 to-cyan-500', 'bg-teal-50', 'text-teal-700', 'arduino-soil-moisture'),
  ('smart-street-light', 'Smart Street Light Using Arduino', 'Smart Street Light', 'Create an automatic street lighting system that responds to ambient light levels, saving energy and enabling smart city infrastructure!', 'Beginner', '2-3 hours', '💡', 'from-amber-500 to-orange-500', 'bg-amber-50', 'text-amber-700', 'smart-street-light')
ON CONFLICT DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_badges_updated_at BEFORE UPDATE ON public.badges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lectures_updated_at BEFORE UPDATE ON public.lectures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for badges (read-only for authenticated users)
CREATE POLICY "Anyone can view badges" ON public.badges
  FOR SELECT USING (true);

-- Create policies for user_badges
CREATE POLICY "Users can view their own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert user badges" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for lectures (read-only for authenticated users)
CREATE POLICY "Anyone can view lectures" ON public.lectures
  FOR SELECT USING (true);

-- Create policies for user_progress
CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Create a function to earn a badge
CREATE OR REPLACE FUNCTION earn_badge(
  p_user_id UUID,
  p_lecture_id VARCHAR,
  p_course_id VARCHAR
) RETURNS UUID AS $$
DECLARE
  v_badge_id UUID;
  v_badge_record RECORD;
BEGIN
  -- Find the badge for this lecture
  SELECT id INTO v_badge_id 
  FROM public.badges 
  WHERE lecture_id = p_lecture_id AND course_id = p_course_id
  LIMIT 1;
  
  IF v_badge_id IS NULL THEN
    RAISE EXCEPTION 'No badge found for lecture %', p_lecture_id;
  END IF;
  
  -- Check if user already has this badge
  IF EXISTS (SELECT 1 FROM public.user_badges WHERE user_id = p_user_id AND badge_id = v_badge_id) THEN
    RETURN v_badge_id;
  END IF;
  
  -- Award the badge
  INSERT INTO public.user_badges (user_id, badge_id, lecture_id, course_id, earned_at)
  VALUES (p_user_id, v_badge_id, p_lecture_id, p_course_id, NOW());
  
  RETURN v_badge_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get user's badges
CREATE OR REPLACE FUNCTION get_user_badges(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  description TEXT,
  icon VARCHAR,
  lecture_id VARCHAR,
  course_id VARCHAR,
  earned_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT ub.id, b.name, b.description, b.icon, b.lecture_id, b.course_id, ub.earned_at
  FROM public.user_badges ub
  JOIN public.badges b ON ub.badge_id = b.id
  WHERE ub.user_id = p_user_id
  ORDER BY ub.earned_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;