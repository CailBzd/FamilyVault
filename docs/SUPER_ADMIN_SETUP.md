# 👑 Configuration Automatique du Super Admin

Ce guide explique comment configurer automatiquement le compte super admin `pitou.software@gmail.com` au démarrage de l'application.

## 🎯 Objectif

Le système vérifie automatiquement au démarrage si le compte super admin existe, et le crée si nécessaire avec :
- **Email** : `pitou.software@gmail.com`
- **Mot de passe** : `Family44330!`
- **Rôle** : `super_admin`
- **Plan** : `legacy` (le plus élevé)

## 🚀 Configuration Rapide

### 1. Exécuter le script de configuration

**Windows (PowerShell) :**
```powershell
.\scripts\setup-super-admin.ps1
```

**Linux/Mac (Bash) :**
```bash
chmod +x scripts/setup-super-admin.sh
./scripts/setup-super-admin.sh
```

### 2. Configurer Supabase

Modifiez votre fichier `.env.local` avec vos variables Supabase :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anonyme
SUPABASE_SERVICE_ROLE_KEY=votre-clé-service-role

# Configuration automatique du super admin
NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=true
```

### 3. Initialiser la base de données

1. Ouvrez **Supabase Dashboard > SQL Editor**
2. Exécutez le script `scripts/setup-database.sql`

### 4. Lancer l'application

```bash
npm run dev
```

Le compte super admin sera créé automatiquement au premier démarrage !

## 🔧 Fonctionnement Détaillé

### Processus de Vérification

Le système suit cette logique au démarrage :

1. **Vérification du profil existant**
   - Si le profil existe avec le rôle `super_admin` → ✅ Terminé
   - Si le profil existe avec un autre rôle → ⬆️ Promotion en super admin

2. **Vérification dans auth.users**
   - Si l'utilisateur existe dans auth mais pas dans profiles → 👤 Création du profil

3. **Création complète**
   - Si aucun utilisateur n'existe → 🆕 Création complète du compte

### Logs de Débogage

Surveillez la console pour voir le processus :

```
🔍 Vérification du compte super admin...
🆕 Création du compte super admin complet...
✅ Compte super admin créé avec succès
```

### Indicateur Visuel

En mode développement, un indicateur apparaît en bas à droite :

- 🔄 **Bleu** : Configuration en cours
- ✅ **Vert** : Configuration réussie
- ❌ **Rouge** : Erreur de configuration

## 🛡️ Sécurité

### Variables d'Environnement Requises

```env
# OBLIGATOIRE : URL de votre projet Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co

# OBLIGATOIRE : Clé anonyme Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OBLIGATOIRE : Clé de service Supabase (pour créer des utilisateurs)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OPTIONNEL : Activer la création automatique
NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=true

# OPTIONNEL : Clé de sécurité pour l'API
ADMIN_SETUP_KEY=votre-clé-secrète
```

### Restrictions de Sécurité

- ✅ **Développement** : Activation automatique
- ⚠️ **Production** : Nécessite `NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=true`
- 🔒 **API** : Protection par clé optionnelle

### Permissions Supabase

La clé de service doit avoir les permissions :
- `auth.users` : Lecture et écriture
- `public.profiles` : Lecture et écriture
- `public.subscriptions` : Écriture
- `public.audit_logs` : Écriture

## 🔄 Méthodes Alternatives

### 1. Via l'API REST

```bash
# Vérifier le statut
curl http://localhost:3000/api/admin/setup

# Déclencher la configuration
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Authorization: Bearer votre-clé-secrète"
```

### 2. Via le Script SQL Manuel

Si la création automatique échoue, utilisez le script manuel :

```sql
-- Dans Supabase SQL Editor
-- Remplacez 'pitou.software@gmail.com' par l'email du compte existant
UPDATE public.profiles 
SET 
    role = 'super_admin',
    updated_at = NOW()
WHERE email = 'pitou.software@gmail.com';
```

### 3. Via l'Interface Supabase

1. **Authentication > Users**
2. Créez l'utilisateur manuellement
3. **Database > profiles**
4. Mettez à jour le rôle vers `super_admin`

## 📊 Audit et Logs

### Logs d'Audit Automatiques

Toutes les actions sont enregistrées dans `audit_logs` :

```sql
SELECT * FROM audit_logs 
WHERE action IN ('ACCOUNT_CREATED', 'ROLE_UPDATED')
ORDER BY created_at DESC;
```

### Vérification du Compte

```sql
-- Vérifier le profil super admin
SELECT 
    id, email, full_name, role, 
    created_at, updated_at, last_sign_in_at
FROM profiles 
WHERE email = 'pitou.software@gmail.com';

-- Vérifier l'abonnement
SELECT 
    plan_type, status, created_at
FROM subscriptions s
JOIN profiles p ON s.user_id = p.id
WHERE p.email = 'pitou.software@gmail.com';
```

## 🐛 Dépannage

### Erreurs Courantes

#### "Missing SUPABASE_SERVICE_ROLE_KEY"
- Vérifiez que la variable est définie dans `.env.local`
- La clé doit commencer par `eyJhbGciOiJIUzI1NiI...`

#### "Insufficient permissions"
- Vérifiez les politiques RLS dans Supabase
- La clé de service doit avoir les bonnes permissions

#### "User already exists"
- Le compte existe déjà dans auth.users
- Le système va créer automatiquement le profil

#### "Profile creation failed"
- Vérifiez que les tables existent (script setup-database.sql)
- Vérifiez les contraintes de la table profiles

### Logs de Débogage

Activez les logs détaillés :

```typescript
// Dans src/lib/supabase.ts
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true // Activer en développement
  }
})
```

### Reset Complet

Pour recommencer à zéro :

```sql
-- ATTENTION : Supprime toutes les données !
DELETE FROM audit_logs WHERE user_id IN (
  SELECT id FROM profiles WHERE email = 'pitou.software@gmail.com'
);
DELETE FROM subscriptions WHERE user_id IN (
  SELECT id FROM profiles WHERE email = 'pitou.software@gmail.com'
);
DELETE FROM profiles WHERE email = 'pitou.software@gmail.com';
-- Puis supprimer l'utilisateur dans Authentication > Users
```

## 📚 Ressources

- [Documentation Supabase Auth Admin](https://supabase.com/docs/reference/javascript/auth-admin-api)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Variables d'environnement Next.js](https://nextjs.org/docs/basic-features/environment-variables)

## 🆘 Support

En cas de problème :

1. Vérifiez les logs de la console navigateur
2. Vérifiez les logs Supabase Dashboard
3. Testez la connexion avec les variables d'environnement
4. Vérifiez que la base de données est correctement initialisée 