# Script de configuration des variables d'environnement Supabase

Write-Host "🔧 Configuration des variables d'environnement Supabase" -ForegroundColor Cyan
Write-Host ""

# Vérifier si .env.local existe
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Création du fichier .env.local..." -ForegroundColor Yellow
    if (Test-Path "env.example") {
        Copy-Item "env.example" ".env.local"
        Write-Host "✅ Fichier .env.local créé à partir de env.example" -ForegroundColor Green
    } else {
        New-Item ".env.local" -ItemType File
        Write-Host "✅ Fichier .env.local créé" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🔑 Configuration des clés Supabase" -ForegroundColor Yellow
Write-Host ""
Write-Host "Pour obtenir vos clés Supabase :" -ForegroundColor White
Write-Host "1. Allez sur https://supabase.com/dashboard" -ForegroundColor Gray
Write-Host "2. Sélectionnez votre projet (ou créez-en un nouveau)" -ForegroundColor Gray
Write-Host "3. Allez dans Settings > API" -ForegroundColor Gray
Write-Host "4. Copiez les valeurs demandées ci-dessous" -ForegroundColor Gray
Write-Host ""

# Demander les variables Supabase
$supabaseUrl = Read-Host "Entrez votre NEXT_PUBLIC_SUPABASE_URL (ex: https://xxx.supabase.co)"
$supabaseAnonKey = Read-Host "Entrez votre NEXT_PUBLIC_SUPABASE_ANON_KEY (clé anon public)"

Write-Host ""
Write-Host "⚠️  OPTIONNEL: Clé de service pour la création automatique du super admin" -ForegroundColor Yellow
$includeServiceKey = Read-Host "Voulez-vous configurer la clé de service maintenant ? (y/N)"

$supabaseServiceKey = ""
if ($includeServiceKey -eq "y" -or $includeServiceKey -eq "Y") {
    $supabaseServiceKey = Read-Host "Entrez votre SUPABASE_SERVICE_ROLE_KEY (clé service_role secret)"
}

# Lire le contenu actuel du fichier .env.local
$envContent = Get-Content ".env.local" -Raw -ErrorAction SilentlyContinue
if (-not $envContent) { $envContent = "" }

# Fonction pour mettre à jour ou ajouter une variable
function Update-EnvVariable {
    param($content, $key, $value)
    
    if ($content -match "$key=.*") {
        return $content -replace "$key=.*", "$key=$value"
    } else {
        return $content + "`n$key=$value"
    }
}

# Mettre à jour les variables
if ($supabaseUrl) {
    $envContent = Update-EnvVariable $envContent "NEXT_PUBLIC_SUPABASE_URL" $supabaseUrl
}

if ($supabaseAnonKey) {
    $envContent = Update-EnvVariable $envContent "NEXT_PUBLIC_SUPABASE_ANON_KEY" $supabaseAnonKey
}

if ($supabaseServiceKey) {
    $envContent = Update-EnvVariable $envContent "SUPABASE_SERVICE_ROLE_KEY" $supabaseServiceKey
}

# Ajouter la variable pour activer la création automatique du super admin
$envContent = Update-EnvVariable $envContent "NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP" "true"

# Sauvegarder le fichier
Set-Content ".env.local" $envContent.Trim()

Write-Host ""
Write-Host "✅ Configuration terminée!" -ForegroundColor Green
Write-Host ""

# Vérifier les variables configurées
Write-Host "📋 Variables configurées :" -ForegroundColor Cyan
if ($supabaseUrl) { Write-Host "  ✅ NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Green }
if ($supabaseAnonKey) { Write-Host "  ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Green }
if ($supabaseServiceKey) { 
    Write-Host "  ✅ SUPABASE_SERVICE_ROLE_KEY" -ForegroundColor Green 
} else {
    Write-Host "  ⚠️  SUPABASE_SERVICE_ROLE_KEY (non configurée - création automatique désactivée)" -ForegroundColor Yellow
}
Write-Host "  ✅ NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=true" -ForegroundColor Green

Write-Host ""
Write-Host "🚀 Prochaines étapes :" -ForegroundColor Cyan
Write-Host "1. Initialisez votre base de données Supabase :" -ForegroundColor White
Write-Host "   - Ouvrez Supabase Dashboard > SQL Editor" -ForegroundColor Gray
Write-Host "   - Exécutez le script scripts/setup-database.sql" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Lancez l'application :" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""

if ($supabaseServiceKey) {
    Write-Host "3. Le compte super admin sera créé automatiquement :" -ForegroundColor White
    Write-Host "   📧 Email: pitou.software@gmail.com" -ForegroundColor Magenta
    Write-Host "   🔑 Mot de passe: Family44330!" -ForegroundColor Magenta
} else {
    Write-Host "3. Créez le compte super admin manuellement :" -ForegroundColor White
    Write-Host "   - Inscrivez-vous avec l'email: pitou.software@gmail.com" -ForegroundColor Gray
    Write-Host "   - Utilisez le mot de passe: Family44330!" -ForegroundColor Gray
    Write-Host "   - Ou configurez SUPABASE_SERVICE_ROLE_KEY pour la création automatique" -ForegroundColor Gray
}

Write-Host "" 