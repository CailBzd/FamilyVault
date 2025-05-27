# Script de configuration du super admin automatique (PowerShell)

Write-Host "Configuration du super admin automatique..." -ForegroundColor Cyan

# Verifier si .env.local existe
if (-not (Test-Path ".env.local")) {
    Write-Host "Creation du fichier .env.local..." -ForegroundColor Yellow
    Copy-Item "env.example" ".env.local"
}

# Lire le contenu du fichier .env.local
$envContent = Get-Content ".env.local" -Raw

# Verifier si la variable existe deja
if ($envContent -notmatch "NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP") {
    # Ajouter la variable
    $newContent = $envContent + "`n`n# Configuration automatique du super admin`nNEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=true"
    Set-Content ".env.local" $newContent
    Write-Host "Variable NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP ajoutee" -ForegroundColor Green
} else {
    # Mettre a jour la valeur si elle existe deja
    $updatedContent = $envContent -replace "NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=.*", "NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP=true"
    Set-Content ".env.local" $updatedContent
    Write-Host "Variable NEXT_PUBLIC_ENABLE_AUTO_ADMIN_SETUP mise a jour" -ForegroundColor Green
}

Write-Host ""
Write-Host "Configuration terminee!" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: Assurez-vous de configurer vos variables Supabase dans .env.local:" -ForegroundColor Yellow
Write-Host "   - NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor White
Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor White
Write-Host "   - SUPABASE_SERVICE_ROLE_KEY (necessaire pour creer des utilisateurs)" -ForegroundColor White
Write-Host ""
Write-Host "Prochaines etapes:" -ForegroundColor Cyan
Write-Host "1. Configurez vos variables Supabase dans .env.local" -ForegroundColor White
Write-Host "2. Executez le script setup-database.sql dans Supabase" -ForegroundColor White
Write-Host "3. Lancez l'application avec 'npm run dev'" -ForegroundColor White
Write-Host "4. Le compte super admin sera cree automatiquement au demarrage" -ForegroundColor White
Write-Host ""
Write-Host "Email du super admin: pitou.software@gmail.com" -ForegroundColor Magenta
Write-Host "Mot de passe: Family44330!" -ForegroundColor Magenta 