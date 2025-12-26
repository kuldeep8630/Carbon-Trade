-- Ensure all existing users have profiles
INSERT INTO profiles (id, email, role)
SELECT au.id, au.email, 'user'
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;