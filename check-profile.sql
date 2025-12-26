-- Check if your profile exists and create it if missing
-- Replace 'your-user-id-here' with your actual user ID from auth.users

-- First, find your user ID:
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Then check if profile exists:
SELECT * FROM profiles WHERE id = 'your-user-id-here';

-- If profile doesn't exist, create it:
INSERT INTO profiles (id, email, role)
SELECT id, email, 'user'  -- Change 'user' to 'verifier' if you want verifier role
FROM auth.users
WHERE id = 'your-user-id-here'
ON CONFLICT (id) DO NOTHING;