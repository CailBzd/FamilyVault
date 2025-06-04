# 🎭 Simulateur de Plans - Super Admin

## Vue d'ensemble

Le simulateur de plans permet au super admin de voir l'interface utilisateur depuis la perspective de chaque formule d'abonnement, permettant de :
- Tester l'expérience utilisateur pour chaque plan
- Vérifier les limitations et fonctionnalités selon l'abonnement
- Valider les éléments d'conversion (CTA, limitations visuelles)

## 🚀 Comment utiliser

### 1. Accès Super Admin

1. **Page d'accueil** : Cliquez sur "👑 Connexion super admin"
2. **Interface** : Le simulateur apparaît en haut à droite avec un badge rose "Super Admin"

### 2. Simulation des Plans

Le simulateur propose 4 formules :

#### ⚡ Plan Découverte (Gratuit)
- **Stockage** : 150/500 Mo
- **Groupes** : 1 seul groupe
- **Photos** : Qualité réduite avec badge visible
- **Documents** : Floutés avec overlay
- **Arbre généalogique** : Aperçu flouté
- **Vidéos** : Désactivées
- **CTA** : "Upgrader le plan" omniprésent

#### 👥 Petits Groupes (9€/mois)
- **Stockage** : 800 Mo/2 Go  
- **Groupes** : 3 groupes max (affiche "Club Tennis")
- **Photos** : Haute qualité
- **Documents** : Accès complet
- **Arbre généalogique** : Complet avec option export
- **Vidéos** : Activées
- **CTA** : Suggestions pour "Grands Groupes"

#### 🌳 Grands Groupes (19€/mois)
- **Stockage** : 12/50 Go
- **Groupes** : 10 groupes max (affiche "Club Tennis" + "Voisins")
- **Photos/Vidéos** : Haute qualité
- **Arbre généalogique** : Avancé avec exports multiples
- **CTA** : Suggestions pour "Clans"

#### 👑 Clans (49€/mois)
- **Stockage** : 120/500 Go
- **Groupes** : Illimités (tous les groupes visibles)
- **Media** : Qualité originale préservée
- **Arbre généalogique** : Multi-familles + API
- **CTA** : Message de félicitation "Vous profitez du meilleur plan"

## 🎨 Palette de Couleurs Harmonisée

### Couleurs Principales
- **Base** : Stone (tons naturels) pour l'harmonie générale
- **Découverte** : Émeraude (nature, croissance)
- **Petits Groupes** : Bleu (confiance, familial)  
- **Grands Groupes** : Violet (premium, sophistication)
- **Clans** : Ambre (prestige, excellence)

### Améliorations UX
- **Espacement** : Plus aéré et respirable
- **Bordures** : Arrondies (rounded-xl vs rounded-lg)
- **Ombres** : Subtiles avec shadow-sm
- **Transitions** : Fluides sur hover/focus
- **Contraste** : Amélioré pour la lisibilité

## 🔧 Architecture Technique

### Composants Clés

```typescript
// Simulateur principal
<PlanSimulator 
  currentPlan={currentPlan}
  onPlanChange={setCurrentPlan}
  isSuperAdmin={isSuperAdmin}
/>

// Props passées aux composants
<Sidebar currentPlan={currentPlan} />
<Feed currentPlan={currentPlan} />
<ActivityPanel currentPlan={currentPlan} />
```

### Types

```typescript
type PlanType = 'discovery' | 'small' | 'large' | 'clan'
type ColorTheme = 'emerald' | 'blue' | 'violet' | 'amber'
```

## 📱 Adaptations par Plan

### Sidebar
- **Plan affiché** avec icône et couleur thématique
- **Barre de stockage** dynamique
- **Groupes** : Nombre variable selon le plan
- **Bouton création** : Activé/désactivé selon les crédits
- **Arbre généalogique** : État adaptatif

### Feed Central
- **Zone de création** : Boutons adaptatifs avec limitations
- **Posts** : Qualité d'image et accès documents selon plan
- **Suggestions premium** : Contextuelles et ciblées
- **CTA** : Messages d'upgrade personnalisés

### Panel d'Activité
- **Potentiel Triib** : Couleur thématique du plan
- **Arbre généalogique** : Flouté ou complet selon plan
- **Connexions cachées** : Nombre adaptatif
- **CTA Upgrade** : Prix et bénéfices du plan supérieur

## 🎯 Points de Conversion Testables

1. **Limitations visuelles** : Photos réduites, documents floutés
2. **Compteurs** : Stockage, crédits de groupes
3. **Fonctionnalités premium** : Arbre généalogique, vidéos
4. **CTA placement** : Omniprésence sans être invasif
5. **Messages d'upgrade** : Contextuels et ciblés

## 🔍 Utilisation pour Tests

### Scénarios de Test
1. **Parcours découverte** : Vérifier frustrations et motivations
2. **Upgrade flow** : Tester les points de friction
3. **Retention** : Valider la valeur perçue de chaque plan
4. **Upselling** : Efficacité des suggestions premium

### Métriques UX
- Clarté des limitations
- Attractivité des upgrades  
- Cohérence visuelle
- Fluidité de navigation

---

**Note** : Ce simulateur est uniquement visible pour les super admins et sera supprimé en production. Les boutons de simulation sur la page d'accueil sont temporaires pour les tests de développement. 