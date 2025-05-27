#!/bin/bash

# Script d'installation des dépendances pour l'authentification FamilyVault

echo "🚀 Installation des dépendances d'authentification..."

# Installer class-variance-authority si pas déjà installé
if ! npm list class-variance-authority > /dev/null 2>&1; then
    echo "📦 Installation de class-variance-authority..."
    npm install class-variance-authority
fi

# Vérifier que Supabase est installé
if ! npm list @supabase/supabase-js > /dev/null 2>&1; then
    echo "📦 Installation de Supabase..."
    npm install @supabase/supabase-js
fi

# Vérifier que les autres dépendances sont installées
echo "✅ Vérification des dépendances..."

# Créer le fichier .env.local s'il n'existe pas
if [ ! -f .env.local ]; then
    echo "📝 Création du fichier .env.local..."
    cp env.example .env.local
    echo "⚠️  IMPORTANT: Configurez vos variables d'environnement dans .env.local"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - SUPABASE_SERVICE_ROLE_KEY"
fi

echo "✅ Installation terminée!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Configurez vos variables d'environnement dans .env.local"
echo "2. Exécutez le script setup-database.sql dans Supabase"
echo "3. Créez votre compte super admin avec create-super-admin.sql"
echo "4. Lancez l'application avec 'npm run dev'" 