-- Disable the trigger that interferes with manual role assignment
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Keep the function for potential future use, but don't use it
-- The app handles profile creation manually with correct roles