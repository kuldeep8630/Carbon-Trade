-- Enhanced trigger to ensure all users have profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Always ensure profile exists for new users
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user')
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW()
  WHERE profiles.role = 'user'; -- Only update if current role is 'user' (don't override verifiers)
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;