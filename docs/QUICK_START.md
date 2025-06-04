# 🚀 Guide de Démarrage Rapide - FamilyVault

Ce guide vous aide à configurer rapidement votre application FamilyVault.

## ⚡ Configuration Express (5 minutes)

### 1. Configurer Supabase

**Exécutez le script de configuration :**

```powershell
# Windows PowerShell
.\scripts\setup-env.ps1
```

Le script vous demandera :
- Votre URL Supabase
- Votre clé anonyme Supabase  
- (Optionnel) Votre clé de service

### 2. Obtenir vos clés Supabase

1. **Allez sur** https://supabase.com/dashboard
2. **Créez un nouveau projet** ou sélectionnez un projet existant
3. **Allez dans Settings > API**
4. **Copiez ces valeurs :**
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY` (optionnel)

### 3. Initialiser la base de données

1. **Ouvrez Supabase Dashboard > SQL Editor**
2. **Copiez le contenu de** `scripts/setup-database.sql`
3. **Exécutez le script**

### 4. Créer le compte super admin

1. **Ouvrez Supabase Dashboard > SQL Editor**
2. **Copiez le contenu de** `scripts/create-super-admin.sql`
3. **Exécutez le script** pour créer le compte super admin

### 5. Lancer l'application

```bash
npm run dev
```

## 🔧 Configuration Manuelle

Si vous préférez configurer manuellement, modifiez `.env.local` :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🛠️ Dépannage

### Erreur : "Variables Supabase non configurées"

**Solution :** Vérifiez que ces variables sont dans `.env.local` :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Erreur : "Insufficient permissions"

**Solution :** Vérifiez que :
1. La base de données est initialisée (`scripts/setup-database.sql`)
2. Les politiques RLS sont correctement configurées
3. Le compte super admin est créé (`scripts/create-super-admin.sql`)

## 📋 Checklist de Configuration

- [ ] Projet Supabase créé
- [ ] Variables d'environnement configurées dans `.env.local`
- [ ] Script `setup-database.sql` exécuté dans Supabase
- [ ] Script `create-super-admin.sql` exécuté dans Supabase
- [ ] Application lancée avec `npm run dev`

## 🆘 Besoin d'aide ?

1. **Vérifiez les logs** de la console navigateur
2. **Vérifiez les logs** Supabase Dashboard > Logs
3. **Testez la connexion** Supabase avec les variables d'environnement

## 🎉 Prêt !

Une fois configuré, vous pouvez :
- Vous connecter avec `pitou.software@gmail.com` / `Family44330!`
- Accéder aux fonctionnalités d'administration
- Créer d'autres utilisateurs et gérer les rôles 