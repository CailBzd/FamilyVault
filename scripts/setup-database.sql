-- =============================================
-- FamilyVault Database Setup Script
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. ENUM TYPES
-- =============================================

-- User roles
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'user', 'guest');

-- Subscription status
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'unpaid', 'trialing');

-- Plan types
CREATE TYPE plan_type AS ENUM ('free', 'personal', 'family', 'clan', 'legacy');

-- =============================================
-- 2. PROFILES TABLE (extends auth.users)
-- =============================================

CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_sign_in_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- =============================================
-- 3. SUBSCRIPTIONS TABLE
-- =============================================

CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,
    plan_type plan_type NOT NULL DEFAULT 'free',
    status subscription_status NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- =============================================
-- 4. FAMILY_VAULTS TABLE
-- =============================================

CREATE TABLE public.family_vaults (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    settings JSONB DEFAULT '{}'::jsonb
);

-- =============================================
-- 5. VAULT_MEMBERS TABLE
-- =============================================

CREATE TABLE public.vault_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vault_id UUID REFERENCES public.family_vaults(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    invited_by UUID REFERENCES public.profiles(id),
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    joined_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(vault_id, user_id)
);

-- =============================================
-- 6. MEDIA_FILES TABLE
-- =============================================

CREATE TABLE public.media_files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vault_id UUID REFERENCES public.family_vaults(id) ON DELETE CASCADE NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT,
    mime_type TEXT,
    file_type TEXT CHECK (file_type IN ('image', 'video', 'document', 'audio')),
    title TEXT,
    description TEXT,
    tags TEXT[],
    taken_at TIMESTAMP WITH TIME ZONE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_public BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- =============================================
-- 7. AUDIT_LOGS TABLE
-- =============================================

CREATE TABLE public.audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 8. INDEXES
-- =============================================

-- Profiles indexes
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at);

-- Subscriptions indexes
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON public.subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);

-- Family vaults indexes
CREATE INDEX idx_family_vaults_owner_id ON public.family_vaults(owner_id);
CREATE INDEX idx_family_vaults_created_at ON public.family_vaults(created_at);

-- Vault members indexes
CREATE INDEX idx_vault_members_vault_id ON public.vault_members(vault_id);
CREATE INDEX idx_vault_members_user_id ON public.vault_members(user_id);

-- Media files indexes
CREATE INDEX idx_media_files_vault_id ON public.media_files(vault_id);
CREATE INDEX idx_media_files_uploaded_by ON public.media_files(uploaded_by);
CREATE INDEX idx_media_files_file_type ON public.media_files(file_type);
CREATE INDEX idx_media_files_taken_at ON public.media_files(taken_at);

-- Audit logs indexes
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);

-- =============================================
-- 9. ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_vaults ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 10. RLS POLICIES
-- =============================================

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Super admins can view all profiles" ON public.profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Subscriptions policies
CREATE POLICY "Users can view their own subscription" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" ON public.subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

-- Family vaults policies
CREATE POLICY "Vault members can view their vaults" ON public.family_vaults
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.vault_members 
            WHERE vault_id = id AND user_id = auth.uid() AND is_active = true
        )
    );

-- Vault members policies
CREATE POLICY "Vault members can view vault membership" ON public.vault_members
    FOR SELECT USING (
        user_id = auth.uid() OR 
        EXISTS (
            SELECT 1 FROM public.vault_members vm 
            WHERE vm.vault_id = vault_id AND vm.user_id = auth.uid() AND vm.is_active = true
        )
    );

-- Media files policies
CREATE POLICY "Vault members can view vault media" ON public.media_files
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.vault_members 
            WHERE vault_id = media_files.vault_id AND user_id = auth.uid() AND is_active = true
        )
    );

-- =============================================
-- 11. FUNCTIONS
-- =============================================

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, created_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NOW()
    );
    
    -- Create default subscription (free plan)
    INSERT INTO public.subscriptions (user_id, plan_type, status)
    VALUES (NEW.id, 'free', 'active');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 12. TRIGGERS
-- =============================================

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_family_vaults_updated_at
    BEFORE UPDATE ON public.family_vaults
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- 13. INITIAL DATA
-- =============================================

-- This will be populated after the super admin user is created
-- The super admin user needs to be created through Supabase Auth first

COMMENT ON TABLE public.profiles IS 'User profiles extending Supabase auth.users';
COMMENT ON TABLE public.subscriptions IS 'User subscription information';
COMMENT ON TABLE public.family_vaults IS 'Family vault containers';
COMMENT ON TABLE public.vault_members IS 'Vault membership and permissions';
COMMENT ON TABLE public.media_files IS 'Uploaded media files and documents';
COMMENT ON TABLE public.audit_logs IS 'System audit trail'; 