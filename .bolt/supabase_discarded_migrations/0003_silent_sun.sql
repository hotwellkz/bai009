/*
  # Add email confirmation policies

  1. Changes
    - Add RLS policy to check email confirmation for lesson access
    - Add RLS policy to check email confirmation for token deduction
  
  2. Security
    - Ensure users can only access lessons after email confirmation
    - Protect token operations with email confirmation check
*/

-- Update the policy for completed_lessons to check email confirmation
DROP POLICY IF EXISTS "Users can insert own completed lessons" ON completed_lessons;
CREATE POLICY "Users can insert own completed lessons"
  ON completed_lessons
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND email_confirmed_at IS NOT NULL
    )
  );

-- Update the deduct_tokens function to check email confirmation
CREATE OR REPLACE FUNCTION deduct_tokens(user_uuid uuid, amount int)
RETURNS boolean AS $$
DECLARE
  current_tokens int;
  is_email_confirmed boolean;
BEGIN
  -- Check if email is confirmed
  SELECT (email_confirmed_at IS NOT NULL) INTO is_email_confirmed
  FROM auth.users
  WHERE id = user_uuid;

  IF NOT is_email_confirmed THEN
    RETURN false;
  END IF;

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