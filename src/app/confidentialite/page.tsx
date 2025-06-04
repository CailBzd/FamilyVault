import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de Confidentialité - Treeb",
  description: "Politique de confidentialité et protection des données personnelles sur Treeb",
}

export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-8">Politique de Confidentialité</h1>
          
          <div className="prose prose-stone max-w-none">
            <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-emerald-800 font-medium">
                🛡️ Chez Treeb, la protection de votre vie privée n'est pas négociable. Vos données familiales restent privées, point final.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">1. Notre engagement</h2>
            <div className="mb-6">
              <p>Treeb SAS s'engage fermement à :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Zéro publicité ciblée</strong> : Nous n'analysons jamais vos photos ou messages à des fins commerciales</li>
                <li><strong>Zéro vente de données</strong> : Vos informations ne sont jamais vendues à des tiers</li>
                <li><strong>Chiffrement bout en bout</strong> : Vos contenus sont chiffrés avant même d'atteindre nos serveurs</li>
                <li><strong>Hébergement européen</strong> : Toutes vos données restent en Union Européenne</li>
                <li><strong>Transparence totale</strong> : Cette politique explique exactement ce que nous faisons de vos données</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">2. Responsable du traitement</h2>
            <div className="mb-6">
              <p><strong>Treeb SAS</strong><br />
              123 Rue de la Famille<br />
              75001 Paris, France<br />
              Email DPO : dpo@treeb.eu</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">3. Données collectées</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">3.1 Données d'inscription</h3>
              <p>Lors de votre inscription, nous collectons :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Adresse email (identifiant unique)</li>
                <li>Nom et prénom</li>
                <li>Date de naissance (pour vérifier l'âge minimum)</li>
                <li>Mot de passe (chiffré et jamais stocké en clair)</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">3.2 Contenus partagés</h3>
              <p>Vous contrôlez entièrement ce que vous partagez :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Photos et vidéos (chiffrées avant stockage)</li>
                <li>Documents familiaux (accès restreint à vos groupes)</li>
                <li>Messages et commentaires</li>
                <li>Informations généalogiques</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">3.3 Données techniques</h3>
              <p>Pour assurer le bon fonctionnement :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Adresse IP (anonymisée après 30 jours)</li>
                <li>Type de navigateur et appareil</li>
                <li>Logs de connexion (sécurité uniquement)</li>
                <li>Cookies strictement nécessaires</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">4. Utilisation des données</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">4.1 Finalités autorisées</h3>
              <p>Vos données sont utilisées uniquement pour :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Fonctionnement du service</strong> : Stockage sécurisé, synchronisation entre appareils</li>
                <li><strong>Sécurité</strong> : Détection de connexions suspectes, protection contre les intrusions</li>
                <li><strong>Support technique</strong> : Résolution de problèmes sur votre demande explicite</li>
                <li><strong>Facturation</strong> : Gestion des abonnements premium</li>
                <li><strong>Obligation légale</strong> : Réponse aux demandes judiciaires validées</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">4.2 Ce que nous ne faisons JAMAIS</h3>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200 mt-2">
                <ul className="list-disc pl-6 text-red-800">
                  <li>Analyser vos photos pour vous proposer des publicités</li>
                  <li>Lire vos messages privés (techniquement impossible avec le chiffrement)</li>
                  <li>Vendre ou louer vos données à des tiers</li>
                  <li>Créer des profils publicitaires</li>
                  <li>Partager vos informations avec les réseaux sociaux</li>
                  <li>Utiliser vos données pour entraîner des IA commerciales</li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">5. Sécurité technique</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">5.1 Chiffrement</h3>
              <p>Toutes vos données sont protégées par :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>AES-256</strong> : Chiffrement de niveau militaire pour vos contenus</li>
                <li><strong>TLS 1.3</strong> : Chiffrement des connexions</li>
                <li><strong>Clés personnelles</strong> : Vous seul pouvez déchiffrer vos données</li>
                <li><strong>Zero-knowledge</strong> : Même Treeb ne peut pas voir vos contenus déchiffrés</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">5.2 Infrastructure</h3>
              <p>Vos données sont hébergées :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>En France (OVHcloud, certifié ISO 27001)</li>
                <li>Avec sauvegarde géographiquement distribuée en UE</li>
                <li>Sur des serveurs dédiés (pas de mutualisation)</li>
                <li>Avec surveillance 24/7 des accès</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">6. Partage et groupes privés</h2>
            <div className="mb-6">
              <p>Vos contenus ne sont visibles que par :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Vous-même</li>
                <li>Les membres des groupes que vous avez explicitement rejoints</li>
                <li>Les personnes que vous avez spécifiquement invitées</li>
              </ul>
              <p className="mt-2"><strong>Important :</strong> Treeb ne peut jamais accéder au contenu de vos groupes privés, même pour maintenance technique.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">7. Conservation des données</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">7.1 Durées de conservation</h3>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Compte actif</strong> : Tant que vous utilisez Treeb</li>
                <li><strong>Compte inactif</strong> : 3 ans puis suppression automatique</li>
                <li><strong>Logs techniques</strong> : 30 jours maximum</li>
                <li><strong>Données de facturation</strong> : 10 ans (obligation légale)</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">7.2 Suppression</h3>
              <p>Vous pouvez supprimer vos données à tout moment :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Suppression immédiate et irréversible</li>
                <li>Export préalable possible</li>
                <li>Notification de suppression par email</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">8. Vos droits RGPD</h2>
            <div className="mb-6">
              <p>Vous disposez des droits suivants :</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">🔍 Droit d'accès</h4>
                  <p className="text-sm text-blue-700">Consulter toutes vos données via votre espace personnel</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">✏️ Droit de rectification</h4>
                  <p className="text-sm text-green-700">Modifier vos informations directement</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800">🗑️ Droit à l'effacement</h4>
                  <p className="text-sm text-red-700">Supprimer définitivement votre compte</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">📦 Droit à la portabilité</h4>
                  <p className="text-sm text-purple-700">Exporter vos données en formats standards</p>
                </div>
              </div>
              <p className="mt-4">Pour exercer ces droits : <a href="mailto:dpo@treeb.eu" className="text-emerald-600 hover:text-emerald-700">dpo@treeb.eu</a></p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">9. Cookies et traceurs</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">9.1 Cookies essentiels uniquement</h3>
              <p>Treeb utilise uniquement des cookies strictement nécessaires :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Session de connexion (sécurité)</li>
                <li>Préférences d'affichage</li>
                <li>Protection CSRF</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">9.2 Pas de tracking</h3>
              <p>Nous n'utilisons AUCUN :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Google Analytics ou équivalent</li>
                <li>Pixel de suivi publicitaire</li>
                <li>Cookie de profilage</li>
                <li>Réseau social intégré</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">10. Transferts internationaux</h2>
            <div className="mb-6">
              <p><strong>Aucun transfert hors UE.</strong> Toutes vos données restent physiquement en Union Européenne. Nous ne travaillons avec aucun prestataire américain ou extra-européen ayant accès à vos données personnelles.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">11. Données des mineurs</h2>
            <div className="mb-6">
              <p>L'utilisation de Treeb par des mineurs de 13-16 ans requiert l'autorisation parentale explicite. Les parents peuvent à tout moment demander la suppression du compte de leur enfant via dpo@treeb.eu.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">12. Modifications de cette politique</h2>
            <div className="mb-6">
              <p>Toute modification substantielle vous sera notifiée par email avec un préavis de 30 jours. Les modifications mineures (corrections, clarifications) seront indiquées par la date de mise à jour.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">13. Contact et réclamations</h2>
            <div className="mb-6">
              <p>Pour toute question sur cette politique :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>DPO Treeb :</strong> dpo@treeb.eu</li>
                <li><strong>CNIL :</strong> En cas de litige, vous pouvez saisir la CNIL</li>
                <li><strong>Délai de réponse :</strong> 30 jours maximum</li>
              </ul>
            </div>

            <div className="mt-8 p-4 bg-emerald-100 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-2">🏆 Notre différence</h3>
              <p className="text-sm text-emerald-700">
                Contrairement aux géants du web, Treeb a été conçu dès le départ pour protéger votre vie privée. 
                Nous gagnons de l'argent grâce à vos abonnements, pas en vendant vos données. 
                C'est notre modèle économique : vous êtes notre client, pas notre produit.
              </p>
            </div>

            <div className="mt-8 p-4 bg-stone-100 rounded-lg">
              <p className="text-sm text-stone-600">
                <strong>Dernière mise à jour :</strong> Décembre 2024<br />
                <strong>Contact DPO :</strong> dpo@treeb.eu<br />
                <strong>Autorité de contrôle :</strong> CNIL (www.cnil.fr)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 