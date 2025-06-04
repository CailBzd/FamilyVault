import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de Cookies - Treeb",
  description: "Politique de gestion des cookies sur Treeb - Zéro tracking",
}

export default function Cookies() {
  return (
    <main className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-8">Politique de Cookies</h1>
          
          <div className="prose prose-stone max-w-none">
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">
                🍪 Bonne nouvelle ! Treeb utilise le minimum de cookies possible. Pas de tracking, pas de profilage, pas de publicité.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">1. Notre approche minimaliste</h2>
            <div className="mb-6">
              <p>Chez Treeb, nous avons fait le choix radical de <strong>ne pas vous pister</strong>. Contrairement à la plupart des sites web, nous utilisons uniquement les cookies strictement nécessaires au fonctionnement de la plateforme.</p>
              <p className="mt-2"><strong>Aucun consentement requis</strong> : Tous nos cookies étant essentiels, aucune bannière de cookies envahissante ne perturbe votre navigation.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">2. Qu'est-ce qu'un cookie ?</h2>
            <div className="mb-6">
              <p>Un cookie est un petit fichier texte stocké par votre navigateur lorsque vous visitez un site web. Il permet au site de "se souvenir" de certaines informations lors de vos visites.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">3. Cookies utilisés par Treeb</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">3.1 Cookies essentiels (obligatoires)</h3>
              <p>Ces cookies sont indispensables au fonctionnement de Treeb :</p>
              
              <div className="overflow-x-auto mt-4">
                <table className="w-full border border-stone-200 rounded-lg">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-stone-800">Cookie</th>
                      <th className="px-4 py-2 text-left font-semibold text-stone-800">Finalité</th>
                      <th className="px-4 py-2 text-left font-semibold text-stone-800">Durée</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-t border-stone-200">
                      <td className="px-4 py-2 font-mono text-stone-600">treeb_session</td>
                      <td className="px-4 py-2">Maintien de votre session de connexion sécurisée</td>
                      <td className="px-4 py-2">24 heures</td>
                    </tr>
                    <tr className="border-t border-stone-200">
                      <td className="px-4 py-2 font-mono text-stone-600">csrf_token</td>
                      <td className="px-4 py-2">Protection contre les attaques CSRF</td>
                      <td className="px-4 py-2">Session</td>
                    </tr>
                    <tr className="border-t border-stone-200">
                      <td className="px-4 py-2 font-mono text-stone-600">theme_pref</td>
                      <td className="px-4 py-2">Mémorisation de votre préférence d'affichage</td>
                      <td className="px-4 py-2">1 an</td>
                    </tr>
                    <tr className="border-t border-stone-200">
                      <td className="px-4 py-2 font-mono text-stone-600">lang_pref</td>
                      <td className="px-4 py-2">Mémorisation de votre langue préférée</td>
                      <td className="px-4 py-2">1 an</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">4. Ce que nous N'utilisons PAS</h2>
            <div className="mb-6">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">❌ Cookies bannis de Treeb</h3>
                <ul className="list-disc pl-6 text-red-700">
                  <li><strong>Google Analytics</strong> : Aucun suivi de votre comportement</li>
                  <li><strong>Facebook Pixel</strong> : Aucune connexion avec les réseaux sociaux</li>
                  <li><strong>Cookies publicitaires</strong> : Nous ne vendons pas d'espace publicitaire</li>
                  <li><strong>Cookies de profilage</strong> : Nous ne créons pas de profil de consommateur</li>
                  <li><strong>Cookies tiers</strong> : Aucun partenaire externe ne peut vous pister via Treeb</li>
                  <li><strong>Cookies de géolocalisation</strong> : Nous ne suivons pas vos déplacements</li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">5. Gestion de vos cookies</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">5.1 Via votre navigateur</h3>
              <p>Vous pouvez configurer votre navigateur pour :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Bloquer tous les cookies (attention : Treeb ne fonctionnera plus)</li>
                <li>Supprimer les cookies existants</li>
                <li>Être averti avant l'installation de nouveaux cookies</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">5.2 Instructions par navigateur</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Chrome</h4>
                  <p className="text-sm text-blue-700">Paramètres → Confidentialité et sécurité → Cookies</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Firefox</h4>
                  <p className="text-sm text-orange-700">Paramètres → Vie privée et sécurité → Cookies</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Safari</h4>
                  <p className="text-sm text-gray-700">Préférences → Confidentialité → Cookies</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-teal-800 mb-2">Edge</h4>
                  <p className="text-sm text-teal-700">Paramètres → Cookies et autorisations de site</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">6. Impact de la suppression des cookies</h2>
            <div className="mb-6">
              <p>Si vous supprimez nos cookies essentiels :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Déconnexion automatique</strong> : Vous devrez vous reconnecter</li>
                <li><strong>Préférences perdues</strong> : Thème et langue par défaut</li>
                <li><strong>Sécurité réduite</strong> : Protection CSRF désactivée</li>
                <li><strong>Aucune donnée perdue</strong> : Vos photos et groupes restent intacts</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">7. Cookies et applications mobiles</h2>
            <div className="mb-6">
              <p>Les applications mobiles Treeb (iOS/Android) n'utilisent pas de cookies au sens traditionnel. Elles stockent localement :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Token de connexion sécurisé</li>
                <li>Préférences d'affichage</li>
                <li>Cache temporaire des images (pour les performances)</li>
              </ul>
              <p className="mt-2">Ces données restent sur votre appareil et peuvent être supprimées en désinstallant l'application.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">8. Cookies et connexions externes</h2>
            <div className="mb-6">
              <p>Treeb ne charge aucune ressource externe susceptible de déposer des cookies :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Pas de polices Google Fonts (auto-hébergées)</li>
                <li>Pas de CDN externes pour les bibliothèques</li>
                <li>Pas de widgets de réseaux sociaux</li>
                <li>Pas de chat en ligne tiers</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">9. Cookies et paiements</h2>
            <div className="mb-6">
              <p>Pour les paiements d'abonnements, nous utilisons Stripe qui peut déposer ses propres cookies durant le processus de paiement. Ces cookies :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Sont gérés directement par Stripe (pas par Treeb)</li>
                <li>Servent uniquement à sécuriser la transaction</li>
                <li>Sont supprimés après le paiement</li>
                <li>Ne sont pas utilisés pour du tracking publicitaire</li>
              </ul>
              <p className="mt-2">Consultez la <a href="https://stripe.com/privacy" className="text-emerald-600 hover:text-emerald-700" target="_blank" rel="noopener noreferrer">politique de Stripe</a> pour plus de détails.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">10. Évolution de cette politique</h2>
            <div className="mb-6">
              <p>Si nous devions un jour ajouter de nouveaux cookies (peu probable), nous :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Mettrions à jour cette page</li>
                <li>Vous informerions par email si c'est substantiel</li>
                <li>Demanderions votre consentement si requis par la loi</li>
                <li>Expliquerions clairement la finalité</li>
              </ul>
            </div>

            <div className="mt-8 p-4 bg-emerald-100 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-2">🎯 Pourquoi si peu de cookies ?</h3>
              <p className="text-sm text-emerald-700">
                Notre modèle économique repose sur vos abonnements, pas sur la vente de données. 
                Nous n'avons donc aucun intérêt à vous pister. Au contraire, moins nous en savons sur votre navigation, 
                mieux c'est pour votre vie privée et notre crédibilité.
              </p>
            </div>

            <div className="mt-8 p-4 bg-stone-100 rounded-lg">
              <p className="text-sm text-stone-600">
                <strong>Dernière mise à jour :</strong> Décembre 2024<br />
                <strong>Contact :</strong> privacy@treeb.eu<br />
                <strong>Audit cookies :</strong> Vous pouvez inspecter tous nos cookies via les outils développeur de votre navigateur
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 