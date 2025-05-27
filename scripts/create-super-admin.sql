-- =============================================
-- Create Super Admin Script
-- =============================================

-- INSTRUCTIONS:
-- 1. First, create your user account through the normal signup process
-- 2. Replace 'your-email@example.com' with your actual email
-- 3. Run this script in Supabase SQL Editor

-- Update user role to super_admin
UPDATE public.profiles 
SET 
    role = 'super_admin',
    updated_at = NOW()
WHERE email = 'your-email@example.com';

-- Verify the update
SELECT 
    id,
    email,
    full_name,
    role,
    created_at,
    updated_at
FROM public.profiles 
WHERE email = 'your-email@example.com';

-- Optional: Create an audit log entry
INSERT INTO public.audit_logs (
    user_id,
    action,
    resource_type,
    resource_id,
    details
)
SELECT 
    id,
    'ROLE_UPDATED',
    'USER',
    id,
    jsonb_build_object(
        'old_role', 'user',
        'new_role', 'super_admin',
        'updated_by', 'system'
    )
FROM public.profiles 
WHERE email = 'your-email@example.com'; 