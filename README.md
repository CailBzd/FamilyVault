# FamilyVault 🛡️

**Votre réseau social familial privé**

FamilyVault est une alternative sécurisée à WhatsApp et Instagram, conçue spécifiquement pour les familles qui souhaitent partager leurs moments précieux dans un environnement totalement privé et sécurisé.

## 🌟 Caractéristiques Principales

- **🔒 Chiffrement de bout en bout** - Vos données sont protégées par un chiffrement militaire
- **🇪🇺 Hébergement européen** - Conformité RGPD garantie
- **👨‍👩‍👧‍👦 Multi-générations** - Connectez toute la famille dans un espace sûr
- **📱 Applications mobiles** - iOS et Android (à venir)
- **🚫 Zéro tracking** - Aucune publicité, aucun suivi
- **💾 Sauvegarde automatique** - Vos souvenirs sont en sécurité
- **💳 Paiements sécurisés** - Intégration Stripe avec conformité PCI DSS

## 🏗️ Architecture Technique

- **Framework**: Next.js 15 avec TypeScript
- **Base de données**: Supabase
- **Paiements**: Stripe
- **UI/UX**: Radix UI + Tailwind CSS
- **Gestionnaire de paquets**: Yarn
- **Déploiement**: Vercel (recommandé)

## 💰 Plans Tarifaires

### 📱 Personnel - 9€/mois
- 1 utilisateur
- 50 GB de stockage
- Partage avec 5 membres famille
- Historique 1 an

### 👨‍👩‍👧‍👦 Famille - 19€/mois ⭐ *Plus populaire*
- Jusqu'à 8 membres
- 200 GB de stockage partagé
- Albums photos illimités
- Historique 3 ans
- Sauvegarde automatique mobile

### 👑 Clan - 39€/mois
- Jusqu'à 20 membres (famille élargie)
- 500 GB de stockage
- Gestion multi-générations
- Historique illimité
- Support prioritaire

### 🏛️ Legacy - 99€/an
- Archivage permanent
- Transmission aux héritiers
- Coffre-fort numérique testamentaire
- Stockage illimité
- Support juridique

## 🚀 Installation et Développement

### Prérequis
- Node.js 18+ 
- Yarn
- Compte Supabase (pour la base de données)
- Compte Stripe (pour les paiements)

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/family-vault-app.git
cd family-vault-app

# Installer les dépendances
yarn install

# Configurer les variables d'environnement
cp env.example .env.local
# Éditer .env.local avec vos clés

# Lancer le serveur de développement
yarn dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

### Variables d'environnement

Créez un fichier `.env.local` avec :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_publique_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_supabase

# Stripe (Test)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Product IDs
STRIPE_PERSONAL_PRICE_ID=price_...
STRIPE_FAMILY_PRICE_ID=price_...
STRIPE_CLAN_PRICE_ID=price_...
STRIPE_LEGACY_PRICE_ID=price_...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 💳 Configuration Stripe

### Configuration automatique

```bash
# Configurer votre clé Stripe
export STRIPE_SECRET_KEY=sk_test_votre_cle_secrete

# Créer automatiquement les produits et prix
node scripts/setup-stripe-products.js
```

### Configuration manuelle

Voir le guide détaillé dans [`STRIPE_SETUP.md`](./STRIPE_SETUP.md) pour :
- Configuration des environnements test et production
- Création des produits et prix
- Configuration des webhooks
- Tests avec cartes de test

## 📁 Structure du Projet

```
family-vault-app/
├── src/
│   ├── app/                 # App Router (Next.js 13+)
│   │   ├── api/stripe/      # API routes Stripe
│   │   ├── globals.css      # Styles globaux
│   │   ├── layout.tsx       # Layout principal
│   │   └── page.tsx         # Page d'accueil
│   ├── components/          # Composants React
│   │   ├── ui/              # Composants UI de base
│   │   ├── hero-section.tsx # Section hero
│   │   └── pricing-grid.tsx # Grille tarifaire
│   ├── hooks/               # Hooks personnalisés
│   │   └── use-stripe.ts    # Hook Stripe
│   └── lib/                 # Utilitaires
│       ├── stripe.ts        # Configuration Stripe client
│       ├── stripe-server.ts # Configuration Stripe serveur
│       └── utils.ts         # Fonctions utilitaires
├── scripts/                 # Scripts d'automatisation
│   └── setup-stripe-products.js
├── public/                  # Assets statiques
├── STRIPE_SETUP.md         # Guide configuration Stripe
├── package.json
└── README.md
```

## 🛠️ Scripts Disponibles

```bash
# Développement
yarn dev

# Build de production
yarn build

# Démarrer en production
yarn start

# Linting
yarn lint

# Configuration Stripe
node scripts/setup-stripe-products.js
```

## 🎨 Design System

FamilyVault utilise un design system cohérent basé sur :

- **Couleurs principales** : Bleu (#3b82f6) et Violet (#8b5cf6)
- **Typographie** : System fonts pour une performance optimale
- **Composants** : Radix UI pour l'accessibilité
- **Responsive** : Mobile-first avec Tailwind CSS

## 🔐 Sécurité et Confidentialité

- **Chiffrement E2E** : Toutes les communications sont chiffrées
- **RGPD Compliant** : Hébergement européen et respect de la vie privée
- **Zéro tracking** : Aucune donnée personnelle n'est collectée à des fins publicitaires
- **PCI DSS** : Conformité des paiements via Stripe
- **Audit de sécurité** : Audits réguliers par des experts en cybersécurité

## 🚀 Roadmap

### Phase 1 (Actuelle)
- [x] Page de présentation
- [x] Grille tarifaire
- [x] Design system
- [x] Intégration Stripe
- [ ] Authentification Supabase
- [ ] Dashboard utilisateur

### Phase 2
- [ ] Partage de photos/vidéos
- [ ] Chat familial
- [ ] Albums collaboratifs
- [ ] Notifications push
- [ ] Gestion des abonnements

### Phase 3
- [ ] Applications mobiles iOS/Android
- [ ] Sauvegarde automatique
- [ ] Gestion multi-générations
- [ ] API publique

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- **Email** : support@familyvault.eu
- **Documentation** : [docs.familyvault.eu](https://docs.familyvault.eu)
- **Status** : [status.familyvault.eu](https://status.familyvault.eu)

---

**FamilyVault** - *Protégez ce qui compte vraiment* 💙
