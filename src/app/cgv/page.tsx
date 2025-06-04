import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente - Treeb",
  description: "Conditions Générales de Vente des abonnements Treeb",
}

export default function CGV() {
  return (
    <main className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-8">Conditions Générales de Vente</h1>
          
          <div className="prose prose-stone max-w-none">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">
                Ces CGV régissent la vente des abonnements premium Treeb. Le plan Découverte gratuit n'est pas concerné par ces conditions.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">1. Objet</h2>
            <div className="mb-6">
              <p>Les présentes Conditions Générales de Vente (CGV) s'appliquent exclusivement aux abonnements payants proposés par Treeb SAS sur la plateforme treeb.eu.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">2. Plans d'abonnement</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">2.1 Plans disponibles</h3>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800">Petits Groupes</h4>
                  <p className="text-blue-700 text-sm">9€/mois ou 90€/an</p>
                  <ul className="text-xs text-blue-600 mt-2">
                    <li>• 2 Go de stockage</li>
                    <li>• 3 crédits de groupes</li>
                    <li>• Photos haute qualité</li>
                    <li>• Arbre généalogique</li>
                  </ul>
                </div>
                <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                  <h4 className="font-semibold text-violet-800">Grands Groupes</h4>
                  <p className="text-violet-700 text-sm">19€/mois ou 190€/an</p>
                  <ul className="text-xs text-violet-600 mt-2">
                    <li>• 50 Go de stockage</li>
                    <li>• 10 crédits de groupes</li>
                    <li>• Vidéos haute qualité</li>
                    <li>• Recherche intelligente</li>
                  </ul>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-800">Clans</h4>
                  <p className="text-amber-700 text-sm">49€/mois ou 490€/an</p>
                  <ul className="text-xs text-amber-600 mt-2">
                    <li>• 500 Go de stockage</li>
                    <li>• Crédits illimités</li>
                    <li>• API d'intégration</li>
                    <li>• Support prioritaire</li>
                  </ul>
                </div>
              </div>

              <h3 className="font-semibold text-stone-700 mb-2 mt-6">2.2 Économies annuelles</h3>
              <p>Les abonnements annuels bénéficient d'une réduction de 17% par rapport au tarif mensuel équivalent.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">3. Commande et paiement</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">3.1 Processus de commande</h3>
              <p>La souscription d'un abonnement s'effectue en ligne via :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Sélection du plan souhaité</li>
                <li>Choix de la périodicité (mensuelle/annuelle)</li>
                <li>Validation du panier</li>
                <li>Paiement sécurisé via Stripe</li>
                <li>Confirmation par email</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">3.2 Moyens de paiement</h3>
              <p>Les paiements sont acceptés par :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Carte bancaire (Visa, Mastercard, American Express)</li>
                <li>Virement SEPA (abonnements annuels uniquement)</li>
                <li>PayPal</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">3.3 Facturation</h3>
              <p>Les abonnements sont facturés :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Mensuels</strong> : Le même jour chaque mois</li>
                <li><strong>Annuels</strong> : Chaque année à la date d'anniversaire</li>
                <li>Facturation automatique sauf résiliation</li>
                <li>TVA française (20%) incluse dans les prix affichés</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">4. Activation et accès</h2>
            <div className="mb-6">
              <p>L'abonnement est activé immédiatement après confirmation du paiement. Vous recevez :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Email de confirmation avec facture</li>
                <li>Activation instantanée des fonctionnalités premium</li>
                <li>Accès à l'espace de gestion d'abonnement</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">5. Droit de rétractation</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">5.1 Délai légal</h3>
              <p>Conformément au Code de la consommation, vous disposez de 14 jours pour exercer votre droit de rétractation sans motif.</p>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">5.2 Modalités</h3>
              <p>Pour exercer ce droit :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Envoyez un email à billing@treeb.eu</li>
                <li>Ou utilisez le formulaire dans votre espace client</li>
                <li>Remboursement sous 14 jours sur le moyen de paiement utilisé</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">5.3 Exception</h3>
              <p>Le droit de rétractation ne s'applique pas si vous avez expressément demandé l'exécution immédiate du service et que vous avez utilisé les fonctionnalités premium.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">6. Modifications et résiliation</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">6.1 Changement de plan</h3>
              <p>Vous pouvez modifier votre abonnement à tout moment :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Upgrade</strong> : Prise d'effet immédiate avec facturation au prorata</li>
                <li><strong>Downgrade</strong> : Prise d'effet au prochain cycle de facturation</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">6.2 Résiliation</h3>
              <p>L'abonnement peut être résilié :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>À tout moment depuis votre espace client</li>
                <li>Prend effet à la fin de la période en cours</li>
                <li>Aucune interruption immédiate de service</li>
                <li>Retour automatique au plan Découverte gratuit</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">7. Défaut de paiement</h2>
            <div className="mb-6">
              <p>En cas d'échec de paiement :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Notification immédiate par email</li>
                <li>Nouvelle tentative après 3 jours</li>
                <li>Suspension de l'abonnement après 7 jours</li>
                <li>Résiliation définitive après 30 jours</li>
              </ul>
              <p className="mt-2">Les données restent accessibles en lecture seule pendant la période de suspension.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">8. Remboursements</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">8.1 Cas de remboursement</h3>
              <p>Treeb peut procéder à un remboursement en cas de :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Dysfonctionnement majeur de nos services</li>
                <li>Interruption prolongée non planifiée</li>
                <li>Erreur de facturation de notre fait</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">8.2 Calcul du remboursement</h3>
              <p>Le remboursement est calculé au prorata de la période non utilisée.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">9. Données et contenu</h2>
            <div className="mb-6">
              <p>En cas de résiliation ou de défaut de paiement :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Vos données restent votre propriété</li>
                <li>Export possible avant la suppression définitive</li>
                <li>Délai de grâce de 30 jours pour récupérer vos données</li>
                <li>Suppression définitive après cette période</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">10. Prix et révisions tarifaires</h2>
            <div className="mb-6">
              <p>Treeb se réserve le droit de modifier ses tarifs avec un préavis de 30 jours. Les clients existants bénéficient du tarif en vigueur lors de leur souscription jusqu'à la fin de leur période d'engagement en cours.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">11. Service client</h2>
            <div className="mb-6">
              <p>Pour toute question relative à votre abonnement :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Email :</strong> billing@treeb.eu</li>
                <li><strong>Horaires :</strong> Lundi-Vendredi, 9h-18h</li>
                <li><strong>Délai de réponse :</strong> 24h en moyenne</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">12. Droit applicable</h2>
            <div className="mb-6">
              <p>Les présentes CGV sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux de Paris seront compétents.</p>
            </div>

            <div className="mt-8 p-4 bg-stone-100 rounded-lg">
              <p className="text-sm text-stone-600">
                <strong>Dernière mise à jour :</strong> Décembre 2024<br />
                <strong>Contact facturation :</strong> billing@treeb.eu
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 