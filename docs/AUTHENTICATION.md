# 🔐 Authentification FamilyVault

Ce guide vous explique comment configurer l'authentification et créer votre compte super admin.

## 📋 Prérequis

1. **Projet Supabase configuré**
2. **Variables d'environnement configurées**
3. **Base de données initialisée**

## 🚀 Installation

### 1. Installer les dépendances

```bash
# Exécuter le script d'installation
chmod +x scripts/install-auth-deps.sh
./scripts/install-auth-deps.sh

# Ou manuellement
npm install class-variance-authority @supabase/supabase-js
```

### 2. Configuration Supabase

#### Variables d'environnement

Créez/modifiez votre fichier `.env.local` :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anonyme
SUPABASE_SERVICE_ROLE_KEY=votre-clé-service-role
```

#### Configuration de l'authentification

Dans votre dashboard Supabase :

1. **Authentication > Settings**
2. **Site URL** : `http://localhost:3000` (développement)
3. **Redirect URLs** : 
   - `http://localhost:3000/auth/callback`
   - `https://votre-domaine.com/auth/callback` (production)

### 3. Initialisation de la base de données

#### Exécuter le script de setup

1. Ouvrez **Supabase Dashboard > SQL Editor**
2. Copiez le contenu de `scripts/setup-database.sql`
3. Exécutez le script

Ce script va créer :
- ✅ Tables : `profiles`, `subscriptions`, `family_vaults`, `vault_members`, `media_files`, `audit_logs`
- ✅ Types ENUM : `user_role`, `subscription_status`, `plan_type`
- ✅ Politiques RLS (Row Level Security)
- ✅ Triggers et fonctions
- ✅ Index pour les performances

## 👑 Création du compte Super Admin

### 1. Créer votre compte utilisateur

1. Lancez l'application : `npm run dev`
2. Cliquez sur "Se connecter" dans le header
3. Basculez vers "Créer un compte"
4. Remplissez le formulaire d'inscription
5. Confirmez votre email

### 2. Promouvoir en Super Admin

1. Ouvrez **Supabase Dashboard > SQL Editor**
2. Modifiez le script `scripts/create-super-admin.sql`
3. Remplacez `'your-email@example.com'` par votre email
4. Exécutez le script

```sql
-- Exemple
UPDATE public.profiles 
SET 
    role = 'super_admin',
    updated_at = NOW()
WHERE email = 'votre@email.com';
```

### 3. Vérification

Reconnectez-vous à l'application. Vous devriez voir :
- 👑 Icône de couronne dans le menu utilisateur
- 🛡️ Options d'administration disponibles
- ✅ Accès complet aux fonctionnalités

## 🔒 Système de rôles

### Hiérarchie des rôles

1. **Super Admin** 👑
   - Accès total au système
   - Gestion des utilisateurs
   - Configuration globale

2. **Admin** 🛡️
   - Gestion des vaults
   - Modération du contenu
   - Support utilisateurs

3. **User** 👤
   - Utilisation normale
   - Upload de médias
   - Gestion de ses vaults

4. **Guest** 👁️
   - Accès en lecture seule
   - Fonctionnalités limitées

### Permissions

| Action | Guest | User | Admin | Super Admin |
|--------|-------|------|-------|-------------|
| Voir le contenu | ✅ | ✅ | ✅ | ✅ |
| Upload médias | ❌ | ✅ | ✅ | ✅ |
| Gérer vaults | ❌ | Propriétaire | ✅ | ✅ |
| Gérer utilisateurs | ❌ | ❌ | ❌ | ✅ |
| Configuration système | ❌ | ❌ | ❌ | ✅ |

## 🔧 Hooks disponibles

### `useAuth()`

Hook principal pour l'authentification :

```typescript
const { 
  user,           // Utilisateur Supabase
  profile,        // Profil étendu
  loading,        // État de chargement
  signIn,         // Fonction de connexion
  signUp,         // Fonction d'inscription
  signOut,        // Fonction de déconnexion
  updateProfile,  // Mise à jour du profil
  isSuperAdmin,   // Vérification super admin
  isAdmin,        // Vérification admin
  isUser,         // Vérification utilisateur
  hasPermission,  // Vérification de permission
} = useAuth()
```

### `useRole()`

Hook spécialisé pour la gestion des rôles :

```typescript
const {
  profile,
  canManageUsers,
  canManageVaults,
  canUploadMedia,
  canViewContent,
  hasPermission,
} = useRole()
```

## 🎨 Composants d'authentification

### `SignInForm`

Formulaire de connexion avec validation :

```tsx
<SignInForm 
  onSuccess={() => console.log('Connecté!')}
  onSwitchToSignUp={() => setMode('signup')}
/>
```

### `SignUpForm`

Formulaire d'inscription avec validation avancée :

```tsx
<SignUpForm 
  onSuccess={() => console.log('Inscrit!')}
  onSwitchToSignIn={() => setMode('signin')}
/>
```

## 🛡️ Sécurité

### Row Level Security (RLS)

Toutes les tables utilisent RLS pour sécuriser les données :

- **Profiles** : Utilisateurs voient leur propre profil
- **Subscriptions** : Accès aux propres abonnements
- **Family Vaults** : Accès selon l'appartenance
- **Media Files** : Accès selon les permissions du vault

### Validation des mots de passe

Critères requis :
- ✅ Minimum 8 caractères
- ✅ Au moins une majuscule
- ✅ Au moins une minuscule  
- ✅ Au moins un chiffre
- ✅ Au moins un caractère spécial

### Audit Trail

Toutes les actions importantes sont enregistrées dans `audit_logs` :
- Connexions/déconnexions
- Changements de rôles
- Modifications de profils
- Actions administratives

## 🐛 Dépannage

### Erreurs courantes

#### "Invalid login credentials"
- Vérifiez email/mot de passe
- Confirmez l'email si nécessaire

#### "Email not confirmed"
- Vérifiez votre boîte email
- Cliquez sur le lien de confirmation

#### "Too many requests"
- Attendez quelques minutes
- Vérifiez les limites Supabase

#### Profil non trouvé
- Vérifiez que le trigger `on_auth_user_created` fonctionne
- Exécutez manuellement la création du profil

### Logs utiles

```bash
# Logs de l'application
npm run dev

# Logs Supabase (dans la console navigateur)
# Activez les logs détaillés dans lib/supabase.ts
```

## 📚 Ressources

- [Documentation Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Triggers et fonctions](https://supabase.com/docs/guides/database/functions)

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs de la console
2. Consultez la documentation Supabase
3. Vérifiez la configuration des variables d'environnement
4. Testez la connexion à la base de données 