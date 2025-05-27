# Configuration Stripe pour FamilyVault 💳

Ce guide vous explique comment configurer Stripe pour les environnements de test et de production.

## 🏗️ Prérequis

1. Créer un compte Stripe sur [https://stripe.com](https://stripe.com)
2. Vérifier votre compte (requis pour la production)

## 🧪 Configuration Environnement de Test

### 1. Récupérer les clés de test

Dans votre dashboard Stripe :
1. Allez dans **Développeurs** > **Clés API**
2. Assurez-vous que le mode **Test** est activé
3. Copiez :
   - **Clé publique** : `pk_test_...`
   - **Clé secrète** : `sk_test_...`

### 2. Créer les produits et prix

```bash
# Installer Stripe CLI
npm install -g stripe-cli

# Se connecter à Stripe
stripe login

# Créer les produits FamilyVault
stripe products create \
  --name="FamilyVault Personnel" \
  --description="Plan personnel - 1 utilisateur, 50GB"

stripe products create \
  --name="FamilyVault Famille" \
  --description="Plan famille - 8 membres, 200GB"

stripe products create \
  --name="FamilyVault Clan" \
  --description="Plan clan - 20 membres, 500GB"

stripe products create \
  --name="FamilyVault Legacy" \
  --description="Plan legacy - Archivage permanent"
```

### 3. Créer les prix

```bash
# Plan Personnel - 9€/mois
stripe prices create \
  --product=prod_XXXXXXXXXX \
  --unit-amount=900 \
  --currency=eur \
  --recurring-interval=month

# Plan Famille - 19€/mois
stripe prices create \
  --product=prod_XXXXXXXXXX \
  --unit-amount=1900 \
  --currency=eur \
  --recurring-interval=month

# Plan Clan - 39€/mois
stripe prices create \
  --product=prod_XXXXXXXXXX \
  --unit-amount=3900 \
  --currency=eur \
  --recurring-interval=month

# Plan Legacy - 99€/an
stripe prices create \
  --product=prod_XXXXXXXXXX \
  --unit-amount=9900 \
  --currency=eur \
  --recurring-interval=year
```

### 4. Configurer les webhooks

1. Dans le dashboard Stripe : **Développeurs** > **Webhooks**
2. Cliquer sur **Ajouter un endpoint**
3. URL : `https://votre-domaine.com/api/stripe/webhook`
4. Événements à écouter :
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### 5. Variables d'environnement de test

Créer `.env.local` :

```env
# Stripe Test Environment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Product Price IDs (remplacer par vos IDs)
STRIPE_PERSONAL_PRICE_ID=price_...
STRIPE_FAMILY_PRICE_ID=price_...
STRIPE_CLAN_PRICE_ID=price_...
STRIPE_LEGACY_PRICE_ID=price_...
```

## 🚀 Configuration Environnement de Production

### 1. Activer le mode Live

1. Dans le dashboard Stripe, basculer vers le mode **Live**
2. Compléter la vérification du compte
3. Configurer les informations bancaires

### 2. Récupérer les clés de production

1. **Développeurs** > **Clés API** (mode Live)
2. Copiez :
   - **Clé publique** : `pk_live_...`
   - **Clé secrète** : `sk_live_...`

### 3. Recréer les produits en production

Répéter les étapes de création des produits et prix en mode Live.

### 4. Configurer les webhooks de production

1. Créer un nouvel endpoint webhook pour la production
2. URL : `https://familyvault.eu/api/stripe/webhook`
3. Mêmes événements que pour le test

### 5. Variables d'environnement de production

```env
# Stripe Production Environment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Product Price IDs (production)
STRIPE_PERSONAL_PRICE_ID=price_...
STRIPE_FAMILY_PRICE_ID=price_...
STRIPE_CLAN_PRICE_ID=price_...
STRIPE_LEGACY_PRICE_ID=price_...
```

## 🧪 Tests avec Stripe CLI

### Installation et configuration

```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# ou télécharger depuis https://github.com/stripe/stripe-cli

# Se connecter
stripe login

# Écouter les webhooks localement
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Cartes de test

```
# Carte valide
4242 4242 4242 4242

# Carte déclinée
4000 0000 0000 0002

# Carte nécessitant 3D Secure
4000 0025 0000 3155

# Expiration : n'importe quelle date future
# CVC : n'importe quel code à 3 chiffres
```

## 📊 Monitoring et Analytics

### Dashboard Stripe

- **Paiements** : Suivi des transactions
- **Abonnements** : Gestion des souscriptions
- **Clients** : Base de données clients
- **Revenus** : Analytics financières

### Webhooks

- Vérifier que tous les webhooks sont reçus
- Monitorer les erreurs dans les logs
- Tester les scénarios d'échec

## 🔒 Sécurité

### Bonnes pratiques

1. **Clés secrètes** : Jamais dans le code client
2. **Webhooks** : Toujours vérifier les signatures
3. **HTTPS** : Obligatoire en production
4. **Logs** : Ne jamais logger les données sensibles

### Conformité

- **PCI DSS** : Stripe gère la conformité
- **RGPD** : Configurer la rétention des données
- **SCA** : Strong Customer Authentication (3D Secure)

## 🚨 Dépannage

### Erreurs communes

1. **Clé publique invalide** : Vérifier l'environnement (test/live)
2. **Webhook non reçu** : Vérifier l'URL et les événements
3. **Paiement décliné** : Utiliser les cartes de test appropriées

### Support

- **Documentation** : [https://stripe.com/docs](https://stripe.com/docs)
- **Support Stripe** : Via le dashboard
- **Communauté** : [https://github.com/stripe](https://github.com/stripe)

---

**Note** : Toujours tester en mode test avant de passer en production ! 🧪➡️🚀 