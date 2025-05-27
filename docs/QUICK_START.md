# 🚀 Guide de Démarrage Rapide - FamilyVault

Ce guide vous aide à configurer rapidement votre application FamilyVault et résoudre l'erreur `Missing SUPABASE_SERVICE_ROLE_KEY`.

## ⚡ Configuration Express (5 minutes)

### 1. Configurer Supabase automatiquement

**Exécutez le script de configuration :**

```powershell
# Windows PowerShell
.\scripts\setup-env.ps1
```

Le script vous demandera :
- Votre URL Supabase
- Votre clé anonyme Supabase  
- (Optionnel) Votre clé de service pour la création automatique du super admin

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

### 4. Lancer l'application

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

# Configuration automatique du super admin
NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=true
```

## 🎯 Résolution de l'erreur "Missing SUPABASE_SERVICE_ROLE_KEY"

### Option 1 : Configuration complète (recommandée)

1. **Ajoutez la clé de service** dans `.env.local`
2. **Le compte super admin sera créé automatiquement**
3. **Email :** `pitou.software@gmail.com`
4. **Mot de passe :** `Family44330!`

### Option 2 : Sans clé de service

1. **L'application fonctionnera** mais sans création automatique du super admin
2. **Créez le compte manuellement :**
   - Inscrivez-vous avec `pitou.software@gmail.com`
   - Utilisez le mot de passe `Family44330!`
   - Le système le promouvra automatiquement en super admin

## 📊 Vérification du Statut

### Indicateurs visuels (en développement)

- 🔄 **Bleu** : Configuration en cours
- ✅ **Vert** : Configuration réussie  
- ⚠️ **Jaune** : Configuration automatique désactivée
- ❌ **Rouge** : Erreur de configuration

### Logs de la console

Surveillez ces messages dans la console :

```
🔍 Vérification simple du compte super admin...
✅ Super admin déjà configuré
```

ou

```
⚠️ SUPABASE_SERVICE_ROLE_KEY non configurée - création automatique désactivée
```

## 🛠️ Dépannage

### Erreur : "Variables Supabase non configurées"

**Solution :** Vérifiez que ces variables sont dans `.env.local` :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Erreur : "The result contains 0 rows"

**Solution :** Normal si aucun profil n'existe encore. L'application va :
1. Créer le compte automatiquement (si clé de service configurée)
2. Ou vous demander de le créer manuellement

### Erreur : "Insufficient permissions"

**Solution :** Vérifiez que :
1. La base de données est initialisée (`scripts/setup-database.sql`)
2. Les politiques RLS sont correctement configurées
3. La clé de service a les bonnes permissions

## 📋 Checklist de Configuration

- [ ] Projet Supabase créé
- [ ] Variables d'environnement configurées dans `.env.local`
- [ ] Script `setup-database.sql` exécuté dans Supabase
- [ ] Application lancée avec `npm run dev`
- [ ] Compte super admin créé (automatiquement ou manuellement)

## 🆘 Besoin d'aide ?

1. **Vérifiez les logs** de la console navigateur
2. **Vérifiez les logs** Supabase Dashboard > Logs
3. **Testez la connexion** Supabase avec les variables d'environnement
4. **Consultez** `docs/SUPER_ADMIN_SETUP.md` pour plus de détails

## 🎉 Prêt !

Une fois configuré, vous pouvez :
- Vous connecter avec `pitou.software@gmail.com` / `Family44330!`
- Accéder aux fonctionnalités d'administration
- Créer d'autres utilisateurs et gérer les rôles 