import { Metadata } from "next"

export const metadata: Metadata = {
  title: "RGPD - Vos droits sur vos données - Treeb",
  description: "Exercez vos droits RGPD sur Treeb : accès, rectification, suppression, portabilité",
}

export default function RGPD() {
  return (
    <main className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-8">RGPD - Vos droits sur vos données</h1>
          
          <div className="prose prose-stone max-w-none">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">
                🇪🇺 Le RGPD vous donne un contrôle total sur vos données personnelles. Chez Treeb, exercer ces droits est simple et rapide.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">1. Qu'est-ce que le RGPD ?</h2>
            <div className="mb-6">
              <p>Le <strong>Règlement Général sur la Protection des Données</strong> (RGPD) est une loi européenne entrée en vigueur le 25 mai 2018. Elle vous donne des droits puissants sur vos données personnelles et oblige les entreprises à les protéger.</p>
              <p className="mt-2">Chez Treeb, nous allons au-delà des exigences minimales du RGPD car la protection de votre vie privée est notre priorité absolue.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">2. Vos droits en détail</h2>
            <div className="mb-6">
              <div className="grid gap-6">
                <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">🔍</span>
                    Droit d'accès (Article 15)
                  </h3>
                  <p className="text-green-700 mb-3">Vous pouvez consulter toutes les données que nous avons sur vous.</p>
                  <div className="text-sm text-green-600">
                    <p><strong>Comment l'exercer :</strong></p>
                    <ul className="list-disc pl-4 mt-1">
                      <li>Connectez-vous à votre compte → Paramètres → "Mes données"</li>
                      <li>Ou envoyez un email à dpo@treeb.eu</li>
                    </ul>
                    <p className="mt-2"><strong>Délai :</strong> Immédiat via votre compte, 30 jours par email</p>
                  </div>
                </div>

                <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">✏️</span>
                    Droit de rectification (Article 16)
                  </h3>
                  <p className="text-blue-700 mb-3">Vous pouvez corriger ou mettre à jour vos informations.</p>
                  <div className="text-sm text-blue-600">
                    <p><strong>Comment l'exercer :</strong></p>
                    <ul className="list-disc pl-4 mt-1">
                      <li>Connectez-vous → Profil → Modifier directement</li>
                      <li>Pour les corrections complexes : dpo@treeb.eu</li>
                    </ul>
                    <p className="mt-2"><strong>Délai :</strong> Immédiat pour la plupart des données</p>
                  </div>
                </div>

                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">🗑️</span>
                    Droit à l'effacement (Article 17)
                  </h3>
                  <p className="text-red-700 mb-3">Vous pouvez supprimer définitivement votre compte et toutes vos données.</p>
                  <div className="text-sm text-red-600">
                    <p><strong>Comment l'exercer :</strong></p>
                    <ul className="list-disc pl-4 mt-1">
                      <li>Paramètres → Compte → "Supprimer mon compte"</li>
                      <li>Ou demande par email à dpo@treeb.eu</li>
                    </ul>
                    <p className="mt-2"><strong>⚠️ Attention :</strong> Cette action est irréversible</p>
                  </div>
                </div>

                <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">📦</span>
                    Droit à la portabilité (Article 20)
                  </h3>
                  <p className="text-purple-700 mb-3">Vous pouvez récupérer vos données dans un format exploitable.</p>
                  <div className="text-sm text-purple-600">
                    <p><strong>Comment l'exercer :</strong></p>
                    <ul className="list-disc pl-4 mt-1">
                      <li>Paramètres → "Exporter mes données"</li>
                      <li>Formats disponibles : JSON, ZIP (photos/vidéos), GEDCOM (généalogie)</li>
                    </ul>
                    <p className="mt-2"><strong>Délai :</strong> Génération immédiate, téléchargement en quelques minutes</p>
                  </div>
                </div>

                <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">⏸️</span>
                    Droit à la limitation (Article 18)
                  </h3>
                  <p className="text-yellow-700 mb-3">Vous pouvez suspendre temporairement l'utilisation de vos données.</p>
                  <div className="text-sm text-yellow-600">
                    <p><strong>Comment l'exercer :</strong> Email à dpo@treeb.eu avec motif</p>
                    <p className="mt-2"><strong>Cas d'usage :</strong> Contestation de données, traitement illicite</p>
                  </div>
                </div>

                <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">🚫</span>
                    Droit d'opposition (Article 21)
                  </h3>
                  <p className="text-orange-700 mb-3">Vous pouvez vous opposer à certains traitements de vos données.</p>
                  <div className="text-sm text-orange-600">
                    <p><strong>Note :</strong> Chez Triib, nous ne faisons pas de marketing direct ni de profilage, ce droit est donc rarement applicable.</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">3. Comment exercer vos droits</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-3">🚀 Méthode rapide (recommandée)</h3>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mb-4">
                <p className="text-emerald-800">La plupart de vos droits peuvent être exercés directement depuis votre compte Triib :</p>
                <ol className="list-decimal pl-4 mt-2 text-emerald-700">
                  <li>Connectez-vous à votre compte</li>
                  <li>Allez dans Paramètres → Vie privée et données</li>
                  <li>Choisissez l'action souhaitée</li>
                  <li>Confirmez votre demande</li>
                </ol>
              </div>

              <h3 className="font-semibold text-stone-700 mb-3">📧 Méthode par email</h3>
              <p>Pour les demandes complexes ou si vous n'avez plus accès à votre compte :</p>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-2">
                <p><strong>Email :</strong> dpo@triib.eu</p>
                <p><strong>Objet :</strong> [RGPD] Exercice du droit de [préciser le droit]</p>
                <p><strong>Contenu minimum :</strong></p>
                <ul className="list-disc pl-4 mt-1">
                  <li>Votre nom et email associé au compte</li>
                  <li>Droit que vous souhaitez exercer</li>
                  <li>Motif de votre demande (optionnel mais utile)</li>
                  <li>Copie d'une pièce d'identité (pour vérification)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">4. Délais de traitement</h2>
            <div className="mb-6">
              <div className="overflow-x-auto">
                <table className="w-full border border-stone-200 rounded-lg">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-stone-800">Type de demande</th>
                      <th className="px-4 py-3 text-left font-semibold text-stone-800">Via le compte</th>
                      <th className="px-4 py-3 text-left font-semibold text-stone-800">Par email</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-t border-stone-200">
                      <td className="px-4 py-3 font-medium">Consultation de données</td>
                      <td className="px-4 py-3 text-green-700">Immédiat</td>
                      <td className="px-4 py-3 text-blue-700">48h</td>
                    </tr>
                    <tr className="border-t border-stone-200">
                      <td className="px-4 py-3 font-medium">Rectification simple</td>
                      <td className="px-4 py-3 text-green-700">Immédiat</td>
                      <td className="px-4 py-3 text-blue-700">7 jours</td>
                    </tr>
                    <tr className="border-t border-stone-200">
                      <td className="px-4 py-3 font-medium">Export de données</td>
                      <td className="px-4 py-3 text-green-700">5-30 min</td>
                      <td className="px-4 py-3 text-blue-700">48h</td>
                    </tr>
                    <tr className="border-t border-stone-200">
                      <td className="px-4 py-3 font-medium">Suppression de compte</td>
                      <td className="px-4 py-3 text-green-700">Immédiat</td>
                      <td className="px-4 py-3 text-blue-700">24h</td>
                    </tr>
                    <tr className="border-t border-stone-200">
                      <td className="px-4 py-3 font-medium">Demandes complexes</td>
                      <td className="px-4 py-3 text-gray-500">N/A</td>
                      <td className="px-4 py-3 text-blue-700">30 jours max</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">5. Vérification d'identité</h2>
            <div className="mb-6">
              <p>Pour protéger vos données, nous devons vérifier votre identité avant de traiter certaines demandes :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Via votre compte :</strong> Aucune vérification supplémentaire requise</li>
                <li><strong>Par email :</strong> Copie d'une pièce d'identité peut être demandée</li>
                <li><strong>Cas sensibles :</strong> Verification renforcée (suppression de compte, export complet)</li>
              </ul>
              <p className="mt-2 text-sm text-stone-600">📄 Les pièces d'identité envoyées sont supprimées immédiatement après vérification.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">6. Limites et exceptions</h2>
            <div className="mb-6">
              <p>Dans de rares cas, nous pouvons limiter l'exercice de vos droits :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Sécurité :</strong> Si la demande compromet la sécurité d'autres utilisateurs</li>
                <li><strong>Obligations légales :</strong> Conservation imposée par la loi (données de facturation)</li>
                <li><strong>Demandes abusives :</strong> Demandes répétitives ou manifestement infondées</li>
                <li><strong>Droits de tiers :</strong> Photos où d'autres personnes sont identifiables</li>
              </ul>
              <p className="mt-2">🔍 Dans tous les cas, nous vous expliquerons clairement les raisons et vos recours possibles.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">7. Réclamations et recours</h2>
            <div className="mb-6">
              <p>Si vous n'êtes pas satisfait de notre réponse :</p>
              
              <h3 className="font-semibold text-stone-700 mb-2 mt-4">🤝 Médiation amiable</h3>
              <p>Contactez d'abord notre DPO : dpo@triib.eu</p>
              
              <h3 className="font-semibold text-stone-700 mb-2 mt-4">🏛️ Autorité de contrôle</h3>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p><strong>CNIL (Commission Nationale de l'Informatique et des Libertés)</strong></p>
                <p>3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</p>
                <p>Téléphone : 01 53 73 22 22</p>
                <p>Site web : <a href="https://www.cnil.fr" className="text-blue-600 hover:text-blue-700">www.cnil.fr</a></p>
                <p>Formulaire de plainte en ligne disponible</p>
              </div>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">⚖️ Recours judiciaire</h3>
              <p>Vous pouvez également saisir les tribunaux compétents.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">8. Notre engagement au-delà du RGPD</h2>
            <div className="mb-6">
              <div className="p-4 bg-emerald-100 rounded-lg border border-emerald-200">
                <h3 className="font-semibold text-emerald-800 mb-2">🏆 Triib va plus loin</h3>
                <p className="text-emerald-700 text-sm">
                  Le RGPD fixe des standards minimums. Chez Triib, nous avons choisi d'aller plus loin :
                </p>
                <ul className="list-disc pl-4 mt-2 text-emerald-700 text-sm">
                  <li>Pas de profilage commercial (autorisé par le RGPD)</li>
                  <li>Chiffrement bout en bout (non requis par le RGPD)</li>
                  <li>Pas de transferts hors UE (autorisés avec garanties)</li>
                  <li>Suppression immédiate vs 30 jours requis</li>
                  <li>Interface en français pour exercer vos droits</li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">9. Contact et assistance</h2>
            <div className="mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-lg">
                  <h4 className="font-semibold text-stone-800 mb-2">📧 Délégué à la Protection des Données</h4>
                  <p className="text-stone-600 text-sm">dpo@triib.eu</p>
                  <p className="text-stone-600 text-sm">Délai de réponse : 48h maximum</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-lg">
                  <h4 className="font-semibold text-stone-800 mb-2">💬 Support utilisateur</h4>
                  <p className="text-stone-600 text-sm">support@triib.eu</p>
                  <p className="text-stone-600 text-sm">Pour l'aide à l'utilisation</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-stone-100 rounded-lg">
              <p className="text-sm text-stone-600">
                <strong>Dernière mise à jour :</strong> Décembre 2024<br />
                <strong>Conformité RGPD :</strong> Triib SAS est conforme au règlement EU 2016/679<br />
                <strong>DPO :</strong> dpo@triib.eu | <strong>CNIL :</strong> www.cnil.fr
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 