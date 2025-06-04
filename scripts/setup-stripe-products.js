#!/usr/bin/env node

/**
 * Script pour créer automatiquement les produits et prix Stripe pour Treeb
 * Crée les tarifs mensuels et annuels pour chaque plan
 * Usage: node scripts/setup-stripe-products.js
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

async function createProducts() {
  try {
    console.log('🚀 Configuration des produits Stripe pour Treeb...\n')

    // Configuration des plans avec prix mensuels et annuels
    const plans = [
      {
        name: 'Treeb Personnel',
        id: 'personal',
        description: 'Plan Personnel - Stockage limité pour usage personnel',
        monthlyPrice: 900, // 9€
        yearlyPrice: 9000, // 90€ (économie de 17%)
        features: [
          '500 MB de stockage',
          '1 crédit de groupe',
          'Photos haute qualité',
          'Support par email'
        ]
      },
      {
        name: 'Treeb Famille',
        id: 'family',
        description: 'Plan Famille - Idéal pour les petites familles',
        monthlyPrice: 1900, // 19€
        yearlyPrice: 19000, // 190€ (économie de 17%)
        features: [
          '2 GB de stockage',
          '3 crédits de groupes',
          'Photos haute qualité',
          'Arbre généalogique',
          'Support prioritaire'
        ]
      },
      {
        name: 'Treeb Clan',
        id: 'clan',
        description: 'Plan Clan - Pour les grandes familles et communautés',
        monthlyPrice: 3900, // 39€
        yearlyPrice: 39000, // 390€ (économie de 17%)
        features: [
          '50 GB de stockage',
          '10 crédits de groupes',
          'Photos et vidéos haute qualité',
          'Recherche intelligente',
          'Arbre généalogique avancé',
          'Support prioritaire'
        ]
      },
      {
        name: 'Treeb Legacy',
        id: 'legacy',
        description: 'Plan Legacy - Solution complète pour préserver l\'héritage familial',
        monthlyPrice: 9900, // 99€
        yearlyPrice: 99000, // 990€ (économie de 17%)
        features: [
          '500 GB de stockage',
          'Crédits de groupes illimités',
          'Toutes les fonctionnalités premium',
          'API d\'intégration',
          'Support dédié',
          'Sauvegarde géographique'
        ]
      }
    ]

    const createdProducts = []

    for (const plan of plans) {
      console.log(`📦 Création du produit: ${plan.name}`)
      
      // Créer le produit
      const product = await stripe.products.create({
        name: plan.name,
        description: plan.description,
        metadata: {
          plan_id: plan.id,
          genealogy_enabled: 'true',
          features: plan.features.join('|')
        }
      })

      // Créer le prix mensuel
      const monthlyPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: plan.monthlyPrice,
        currency: 'eur',
        recurring: {
          interval: 'month'
        },
        metadata: {
          billing_interval: 'monthly',
          plan_id: plan.id
        }
      })

      // Créer le prix annuel (avec réduction)
      const yearlyPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: plan.yearlyPrice,
        currency: 'eur',
        recurring: {
          interval: 'year'
        },
        metadata: {
          billing_interval: 'yearly',
          plan_id: plan.id,
          discount_percentage: '17'
        }
      })

      createdProducts.push({
        plan: plan.id,
        product: product.id,
        monthlyPrice: monthlyPrice.id,
        yearlyPrice: yearlyPrice.id
      })

      console.log(`✅ Produit créé: ${product.id}`)
      console.log(`   Prix mensuel: ${monthlyPrice.id}`)
      console.log(`   Prix annuel: ${yearlyPrice.id}\n`)
    }

    // Afficher les variables d'environnement
    console.log('🔧 Variables d\'environnement à ajouter dans votre .env.local:\n')
    console.log('# Stripe Product IDs - Plans Mensuels')
    createdProducts.forEach(p => {
      console.log(`STRIPE_${p.plan.toUpperCase()}_MONTHLY_PRICE_ID=${p.monthlyPrice}`)
    })
    
    console.log('\n# Stripe Product IDs - Plans Annuels (avec réduction)')
    createdProducts.forEach(p => {
      console.log(`STRIPE_${p.plan.toUpperCase()}_YEARLY_PRICE_ID=${p.yearlyPrice}`)
    })

    console.log('\n📋 Résumé des plans Treeb:')
    console.log('┌─────────────────────────────────────────────────────────────┐')
    console.log('│ PLAN GRATUIT (sans Stripe)                                 │')
    console.log('│ • Accès gratuit à vie avec publicités                      │')
    console.log('│ • 5GB de stockage                                          │')
    console.log('│ • Jusqu\'à 10 connexions                                    │')
    console.log('│ • Fonctionnalités de base                                  │')
    console.log('├─────────────────────────────────────────────────────────────┤')
    console.log('│ ESSAI GRATUIT (sans Stripe)                                │')
    console.log('│ • 15 jours gratuits sans carte bancaire                    │')
    console.log('│ • Toutes les fonctionnalités débloquées                    │')
    console.log('│ • Validation email + SMS obligatoire                       │')
    console.log('├─────────────────────────────────────────────────────────────┤')
    
    plans.forEach(plan => {
      const monthlyEur = (plan.monthlyPrice / 100).toFixed(0)
      const yearlyEur = (plan.yearlyPrice / 100).toFixed(0)
      const yearlySavings = (plan.monthlyPrice * 12 - plan.yearlyPrice) / 100
      
      console.log(`│ ${plan.name.toUpperCase().padEnd(55)} │`)
      console.log(`│ • ${monthlyEur}€/mois ou ${yearlyEur}€/an (économie: ${yearlySavings}€)${' '.repeat(Math.max(0, 23 - monthlyEur.length - yearlyEur.length - yearlySavings.toString().length))} │`)
      plan.features.slice(0, 2).forEach(feature => {
        console.log(`│ • ${feature}${' '.repeat(Math.max(0, 55 - feature.length))} │`)
      })
      console.log('├─────────────────────────────────────────────────────────────┤')
    })
    
    console.log('└─────────────────────────────────────────────────────────────┘')

    console.log('\n🎯 Prochaines étapes:')
    console.log('1. Copiez les variables d\'environnement ci-dessus dans votre .env.local')
    console.log('2. Configurez Google AdSense pour le plan gratuit (voir ADSENSE_SETUP.md)')
    console.log('3. Testez les paiements avec les clés de test Stripe')
    console.log('4. Configurez les webhooks Stripe pour la production')
    console.log('5. Implémentez la base de données pour persister les utilisateurs')

    console.log('\n✨ Configuration Stripe terminée avec succès!')

  } catch (error) {
    console.error('❌ Erreur lors de la création des produits:', error.message)
    process.exit(1)
  }
}

// Vérifier que la clé Stripe est configurée
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY n\'est pas définie')
  console.log('💡 Utilisez: export STRIPE_SECRET_KEY=sk_test_... && node scripts/setup-stripe-products.js')
  process.exit(1)
}

createProducts()

module.exports = { createProducts } 