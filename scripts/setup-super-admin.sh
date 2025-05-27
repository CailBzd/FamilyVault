#!/bin/bash

# Script de configuration du super admin automatique

echo "🔧 Configuration du super admin automatique..."

# Vérifier si .env.local existe
if [ ! -f .env.local ]; then
    echo "📝 Création du fichier .env.local..."
    cp env.example .env.local
fi

# Ajouter la variable pour activer la création automatique du super admin
if ! grep -q "NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP" .env.local; then
    echo "" >> .env.local
    echo "# Configuration automatique du super admin" >> .env.local
    echo "NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=true" >> .env.local
    echo "✅ Variable NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP ajoutée"
else
    # Mettre à jour la valeur si elle existe déjà
    sed -i 's/NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=.*/NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=true/' .env.local
    echo "✅ Variable NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP mise à jour"
fi

echo ""
echo "📋 Configuration terminée!"
echo ""
echo "⚠️  IMPORTANT: Assurez-vous de configurer vos variables Supabase dans .env.local:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - SUPABASE_SERVICE_ROLE_KEY (nécessaire pour créer des utilisateurs)"
echo ""
echo "🚀 Prochaines étapes:"
echo "1. Configurez vos variables Supabase dans .env.local"
echo "2. Exécutez le script setup-database.sql dans Supabase"
echo "3. Lancez l'application avec 'npm run dev'"
echo "4. Le compte super admin sera créé automatiquement au démarrage"
echo ""
echo "📧 Email du super admin: pitou.software@gmail.com"
echo "🔑 Mot de passe: Family44330!" 