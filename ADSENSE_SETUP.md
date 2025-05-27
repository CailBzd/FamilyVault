# Configuration Google AdSense pour FamilyVault

## Vue d'ensemble

FamilyVault propose un plan gratuit financé par la publicité. Ce guide explique comment configurer Google AdSense pour monétiser le plan gratuit.

## Prérequis

1. **Compte Google AdSense approuvé**
   - Créer un compte sur [Google AdSense](https://www.google.com/adsense/)
   - Soumettre votre site pour approbation
   - Attendre l'approbation (peut prendre plusieurs jours)

2. **Domaine vérifié**
   - Votre site doit être accessible publiquement
   - Domaine vérifié dans AdSense

## Configuration

### 1. Variables d'environnement

Ajoutez ces variables dans votre `.env.local` :

```bash
# Google AdSense Configuration
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-votre-id-adsense
NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED=true
```

### 2. Obtenir votre ID AdSense

1. Connectez-vous à votre compte [Google AdSense](https://www.google.com/adsense/)
2. Allez dans **Comptes** → **Informations sur le compte**
3. Copiez votre **ID éditeur** (format : `ca-pub-1234567890123456`)

### 3. Créer des unités publicitaires

Dans votre tableau de bord AdSense :

1. **Annonces** → **Par site** → **Ajouter des annonces**
2. Créez 3 unités publicitaires :

#### Bannière supérieure
- **Nom** : FamilyVault - Bannière Top
- **Type** : Bannière display
- **Taille** : Responsive
- **Emplacement** : Haut de page

#### Bannière latérale
- **Nom** : FamilyVault - Sidebar
- **Type** : Bannière display
- **Taille** : 300x600 ou Responsive
- **Emplacement** : Barre latérale

#### Bannière inline
- **Nom** : FamilyVault - Inline
- **Type** : Bannière display
- **Taille** : 728x90 ou Responsive
- **Emplacement** : Dans le contenu

### 4. Configurer les slots publicitaires

Mettez à jour le fichier `src/components/ads/ad-banner.tsx` avec vos vrais slots :

```typescript
// Remplacez les slots d'exemple par vos vrais slots AdSense
export function AdBannerTop({ className }: { className?: string }) {
  return (
    <AdBanner
      slot="1234567890" // ← Remplacez par votre slot
      format="horizontal"
      className={`mb-6 ${className}`}
    />
  )
}
```

## Emplacements des publicités

### Plan gratuit uniquement

Les publicités ne s'affichent que pour les utilisateurs du plan gratuit :

1. **Bannière supérieure** : En haut du dashboard
2. **Bannière inline** : Au milieu du contenu
3. **Sidebar** : Barre latérale droite (desktop uniquement)

### Logique d'affichage

```typescript
// Les pubs s'affichent seulement si :
const isFreePlan = userProfile.currentPlan === 'free'
const adsEnabled = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ENABLED === 'true'

if (isFreePlan && adsEnabled) {
  // Afficher les publicités
}
```

## Optimisation des revenus

### 1. Placement stratégique

- **Above the fold** : Bannière visible sans scroll
- **In-content** : Intégrée naturellement dans le contenu
- **Sidebar** : Visible pendant la navigation

### 2. Formats recommandés

- **Mobile** : 320x50, 300x250
- **Desktop** : 728x90, 300x600, 970x250
- **Responsive** : S'adapte automatiquement

### 3. Optimisation UX

- Publicités clairement identifiées ("Publicité")
- Pas de pop-ups intrusifs
- Chargement asynchrone pour ne pas ralentir le site

## Conformité et bonnes pratiques

### 1. Politique AdSense

- Respecter les [politiques Google AdSense](https://support.google.com/adsense/answer/48182)
- Pas de clics artificiels
- Contenu de qualité

### 2. RGPD et cookies

- Implémenter un banner de consentement
- Respecter les choix utilisateur
- Politique de confidentialité mise à jour

### 3. Performance

- Chargement lazy des publicités
- Optimisation Core Web Vitals
- Monitoring des revenus

## Monitoring et analytics

### 1. Métriques importantes

- **RPM** (Revenue Per Mille) : Revenus pour 1000 impressions
- **CTR** (Click Through Rate) : Taux de clic
- **CPC** (Cost Per Click) : Coût par clic

### 2. Outils de suivi

- Google AdSense Dashboard
- Google Analytics 4
- Search Console

## Dépannage

### Publicités ne s'affichent pas

1. Vérifiez les variables d'environnement
2. Contrôlez la console pour les erreurs JavaScript
3. Vérifiez que le plan utilisateur est "free"
4. Testez avec les outils de développement AdSense

### Revenus faibles

1. Optimisez le placement des annonces
2. Améliorez le contenu pour un meilleur ciblage
3. Testez différents formats
4. Analysez les métriques dans AdSense

## Support

- [Centre d'aide Google AdSense](https://support.google.com/adsense/)
- [Communauté AdSense](https://support.google.com/adsense/community)
- [Politiques du programme](https://support.google.com/adsense/answer/48182)

---

**Note** : Les revenus publicitaires peuvent prendre 24-48h pour apparaître dans votre compte AdSense après les premières impressions. 