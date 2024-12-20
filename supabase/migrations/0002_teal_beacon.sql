/*
  # Add completed lessons tracking

  1. New Tables
    - `completed_lessons`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `lesson_id` (text)
      - `completed_at` (timestamp)

  2. Security
    - Enable RLS on `completed_lessons` table
    - Add policies for users to manage their completed lessons
*/

CREATE TABLE IF NOT EXISTS completed_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE completed_lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own completed lessons"
  ON completed_lessons
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completed lessons"
  ON completed_lessons
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to update tokens when starting lesson or asking questions
CREATE OR REPLACE FUNCTION deduct_tokens(user_uuid uuid, amount int)
RETURNS boolean AS $$
DECLARE
  current_tokens int;
BEGIN
  SELECT tokens INTO current_tokens
  FROM profiles
  WHERE id = user_uuid;

  IF current_tokens >= amount THEN
    UPDATE profiles
    SET tokens = tokens - amount
    WHERE id = user_uuid;
    RETURN true;
  END IF;

  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;