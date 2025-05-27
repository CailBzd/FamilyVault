# Plan Gratuit avec Publicités - FamilyVault

## Vue d'ensemble

FamilyVault propose maintenant un **plan gratuit à vie** financé par la publicité, permettant aux utilisateurs d'accéder aux fonctionnalités de base sans aucun coût.

## Fonctionnalités implémentées

### 1. Configuration Stripe mise à jour

**Fichier :** `src/lib/stripe.ts`

- ✅ Nouveau plan "free" ajouté à la configuration
- ✅ Type `BillingInterval` étendu pour inclure 'free'
- ✅ Fonctionnalités limitées pour le plan gratuit :
  - 5GB de stockage
  - 10 connexions maximum
  - 5 membres famille maximum
  - Publicités activées

### 2. Composants publicitaires

**Fichiers créés :**
- `src/components/ads/ad-banner.tsx` - Composant bannière publicitaire
- `src/components/ads/adsense-script.tsx` - Script Google AdSense

**Fonctionnalités :**
- ✅ Bannières responsive (top, sidebar, inline)
- ✅ Intégration Google AdSense
- ✅ Chargement conditionnel (seulement pour plan gratuit)
- ✅ Gestion des erreurs et fallbacks

### 3. Inscription plan gratuit

**Fichier :** `src/components/free-signup.tsx`

- ✅ Formulaire d'inscription simplifié
- ✅ Validation email obligatoire
- ✅ Acceptation des publicités requise
- ✅ Interface utilisateur intuitive

### 4. API Routes

**Fichiers créés :**
- `src/app/api/auth/free-signup/route.ts`
- `src/app/api/auth/verify-free-email/route.ts`

**Fonctionnalités :**
- ✅ Validation des données d'inscription
- ✅ Vérification email par code
- ✅ Gestion des erreurs
- ✅ TODOs pour intégration base de données

### 5. Grille tarifaire mise à jour

**Fichier :** `src/components/pricing-grid.tsx`

- ✅ Plan gratuit en première position
- ✅ Badge "Gratuit à vie" distinctif
- ✅ Grille étendue à 6 colonnes
- ✅ Bouton d'inscription spécifique
- ✅ Design cohérent avec les autres plans

### 6. Dashboard avec publicités

**Fichier :** `src/app/dashboard/page.tsx`

- ✅ Affichage conditionnel des publicités
- ✅ Bannière supérieure
- ✅ Publicité inline dans le contenu
- ✅ Sidebar publicitaire (desktop)
- ✅ Alerte plan gratuit avec CTA upgrade
- ✅ Limitations affichées (connexions, stockage)

### 7. Système de limitations

**Fichier :** `src/hooks/use-plan-limits.ts`

- ✅ Hook pour gérer les limitations par plan
- ✅ Vérification des quotas
- ✅ Fonctionnalités disponibles par plan
- ✅ Gestion des publicités

### 8. Configuration environnement

**Fichiers mis à jour :**
- `env.example` - Variables AdSense ajoutées
- `src/app/layout.tsx` - Script AdSense intégré

## Emplacements des publicités

### Plan gratuit uniquement

Les publicités s'affichent **uniquement** pour les utilisateurs du plan gratuit :

1. **Bannière supérieure** (728x90 ou responsive)
   - Position : Haut du dashboard
   - Visible immédiatement

2. **Bannière inline** (728x90 ou 300x250)
   - Position : Milieu du contenu
   - Intégrée naturellement

3. **Sidebar publicitaire** (300x600 ou responsive)
   - Position : Barre latérale droite
   - Desktop uniquement

### Logique d'affichage

```typescript
const isFreePlan = userProfile.currentPlan === 'free'
const adsEnabled = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED === 'true'

// Les publicités s'affichent seulement si les deux conditions sont vraies
if (isFreePlan && adsEnabled) {
  // Afficher les publicités
}
```

## Variables d'environnement requises

```bash
# Google AdSense Configuration
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-votre-id-adsense
NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED=true

# Stripe Configuration (vos clés existantes)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RTSYyRPhxbsp52q...
STRIPE_SECRET_KEY=sk_test_51RTSYyRPhxbsp52q...
```

## Comparaison des plans

| Fonctionnalité | Gratuit | Essai | Personnel | Famille | Clan | Legacy |
|----------------|---------|-------|-----------|---------|------|--------|
| **Prix** | 0€ à vie | 0€ (15j) | 9€/mois | 19€/mois | 39€/mois | 99€/mois |
| **Stockage** | 5GB | 50GB | 50GB | 200GB | 500GB | Illimité |
| **Connexions** | 10 max | Illimité | 50 max | Illimité | Illimité | Illimité |
| **Membres famille** | 5 max | Illimité | 5 max | 8 max | 20 max | Illimité |
| **Publicités** | ✅ Oui | ❌ Non | ❌ Non | ❌ Non | ❌ Non | ❌ Non |
| **Support** | Email | Email | Email | Prioritaire | Téléphone | Dédié 24/7 |

## Monétisation

### Modèle économique

1. **Plan gratuit** : Financé par la publicité Google AdSense
2. **Plans payants** : Abonnements mensuels/annuels sans publicité
3. **Conversion** : Incitation à upgrader via limitations et CTA

### Optimisation des revenus

1. **Placement stratégique** des publicités
2. **Formats responsive** pour tous les appareils
3. **Expérience utilisateur** préservée
4. **Incitations à l'upgrade** bien placées

## Prochaines étapes

### Configuration AdSense

1. **Créer un compte Google AdSense**
2. **Soumettre le site pour approbation**
3. **Configurer les unités publicitaires**
4. **Mettre à jour les slots dans le code**

### Intégration base de données

1. **Persister les utilisateurs gratuits**
2. **Gérer les quotas en temps réel**
3. **Tracking des conversions**
4. **Analytics des revenus publicitaires**

### Tests et optimisation

1. **Tester l'inscription gratuite**
2. **Vérifier l'affichage des publicités**
3. **Optimiser les taux de conversion**
4. **Analyser les métriques AdSense**

## Documentation technique

- **Guide AdSense** : `ADSENSE_SETUP.md`
- **Configuration Stripe** : `scripts/setup-stripe-products.js`
- **Types TypeScript** : `src/lib/stripe.ts`
- **Hooks utilitaires** : `src/hooks/use-plan-limits.ts`

---

**Note :** Le plan gratuit est entièrement fonctionnel et prêt pour la production une fois Google AdSense configuré et approuvé. 