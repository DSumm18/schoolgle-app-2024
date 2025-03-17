-- This is a sample schema for Supabase that includes a test table
-- and the necessary authentication setup

-- Create a test table
CREATE TABLE IF NOT EXISTS public.test (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert some test data
INSERT INTO public.test (name, description) VALUES
  ('Test Item 1', 'This is a test item for database connectivity'),
  ('Test Item 2', 'Another test item to verify queries are working'),
  ('Test Item 3', 'A third test entry for our database tests');

-- Set up Row Level Security (RLS)
ALTER TABLE public.test ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read test data
CREATE POLICY "Allow public read access to test data" 
  ON public.test FOR SELECT USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" 
  ON public.test FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own data
CREATE POLICY "Allow authenticated update" 
  ON public.test FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow users to delete their own data
CREATE POLICY "Allow authenticated delete" 
  ON public.test FOR DELETE USING (auth.role() = 'authenticated');

-- Profiles table for user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT,
  department TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Set up RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read all profiles
CREATE POLICY "Allow public read access to profiles" 
  ON public.profiles FOR SELECT USING (true);

-- Allow users to update only their own profile
CREATE POLICY "Allow users to update their own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create a trigger to create a new profile when a user is created
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER update_test_updated_at
  BEFORE UPDATE ON public.test
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();