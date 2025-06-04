import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation - Treeb",
  description: "Conditions Générales d'Utilisation de Treeb, votre réseau social familial privé",
}

export default function CGU() {
  return (
    <main className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-8">Conditions Générales d'Utilisation</h1>
          
          <div className="prose prose-stone max-w-none">
            <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-emerald-800 font-medium">
                Bienvenue sur Treeb ! Ces conditions régissent votre utilisation de notre plateforme de partage familial privé.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">1. Objet et acceptation</h2>
            <div className="mb-6">
              <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la plateforme Treeb, un réseau social familial privé édité par Treeb SAS.</p>
              <p>L'utilisation de Treeb implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">2. Description du service</h2>
            <div className="mb-6">
              <p>Treeb est une plateforme permettant de :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Créer des groupes familiaux et communautaires privés</li>
                <li>Partager photos, vidéos et documents en toute sécurité</li>
                <li>Construire et gérer son arbre généalogique</li>
                <li>Communiquer avec ses proches dans un environnement sécurisé</li>
                <li>Préserver ses souvenirs familiaux</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">3. Inscription et compte utilisateur</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">3.1 Conditions d'inscription</h3>
              <p>L'inscription est ouverte à toute personne physique :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Âgée de 16 ans révolus (ou avec autorisation parentale)</li>
                <li>Disposant d'une adresse email valide</li>
                <li>Acceptant les présentes CGU</li>
              </ul>
              
              <h3 className="font-semibold text-stone-700 mb-2 mt-4">3.2 Responsabilité du compte</h3>
              <p>Vous êtes responsable de :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>La confidentialité de vos identifiants</li>
                <li>Toutes les activités effectuées depuis votre compte</li>
                <li>La véracité des informations communiquées</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">4. Utilisation de la plateforme</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">4.1 Usage autorisé</h3>
              <p>Treeb est destiné exclusivement à un usage personnel et familial. Il est interdit d'utiliser la plateforme à des fins :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Commerciales sans autorisation expresse</li>
                <li>Illégales ou contraires aux bonnes mœurs</li>
                <li>De diffusion de contenus haineux, discriminatoires ou offensants</li>
                <li>De harcèlement ou d'intimidation</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">4.2 Contenus partagés</h3>
              <p>En partageant du contenu sur Treeb, vous déclarez et garantissez :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Être titulaire des droits sur le contenu partagé</li>
                <li>Respecter les droits à l'image des personnes présentes</li>
                <li>Ne pas partager de contenu illégal ou inapproprié</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">5. Respect de la vie privée</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">5.1 Engagement de Treeb</h3>
              <p>Treeb s'engage à :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Ne jamais analyser vos contenus à des fins publicitaires</li>
                <li>Ne pas vendre vos données personnelles</li>
                <li>Chiffrer vos données de bout en bout</li>
                <li>Héberger vos données en Europe</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">5.2 Groupes privés</h3>
              <p>Chaque groupe est privé par défaut. Seuls les membres invités peuvent accéder au contenu. Vous contrôlez entièrement qui peut voir vos contenus.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">6. Abonnements et facturation</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">6.1 Plans disponibles</h3>
              <p>Treeb propose plusieurs plans d'abonnement :</p>
              <ul className="list-disc pl-6 mt-2">
                <li><strong>Découverte</strong> : Gratuit avec limitations</li>
                <li><strong>Petits Groupes</strong> : 9€/mois</li>
                <li><strong>Grands Groupes</strong> : 19€/mois</li>
                <li><strong>Clans</strong> : 49€/mois</li>
              </ul>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">6.2 Système de crédits</h3>
              <p>Les abonnements incluent des crédits de groupes permettant de créer des groupes ou de rejoindre des groupes existants selon votre plan.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">7. Propriété intellectuelle</h2>
            <div className="mb-6">
              <p>Vous conservez tous vos droits sur les contenus que vous partagez. Treeb ne revendique aucun droit de propriété sur vos photos, vidéos ou documents.</p>
              <p>En revanche, la plateforme Treeb, son design, ses fonctionnalités et sa technologie restent la propriété exclusive de Treeb SAS.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">8. Modération et sanctions</h2>
            <div className="mb-6">
              <p>En cas de non-respect des présentes CGU, Treeb se réserve le droit de :</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Supprimer le contenu concerné</li>
                <li>Suspendre temporairement l'accès au compte</li>
                <li>Résilier définitivement le compte en cas de manquement grave</li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">9. Résiliation</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-stone-700 mb-2">9.1 Par l'utilisateur</h3>
              <p>Vous pouvez supprimer votre compte à tout moment depuis les paramètres. Cette action est irréversible et entraîne la suppression définitive de toutes vos données.</p>

              <h3 className="font-semibold text-stone-700 mb-2 mt-4">9.2 Récupération des données</h3>
              <p>Avant suppression, vous pouvez exporter vos données via les outils mis à disposition dans votre espace personnel.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">10. Responsabilité et garanties</h2>
            <div className="mb-6">
              <p>Treeb s'efforce d'assurer la disponibilité et la sécurité de ses services mais ne peut garantir un fonctionnement sans interruption. Notre responsabilité est limitée aux dommages directs et ne peut excéder le montant des sommes versées au cours des 12 derniers mois.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">11. Modifications des CGU</h2>
            <div className="mb-6">
              <p>Treeb peut modifier les présentes CGU à tout moment. Les utilisateurs seront informés par email des modifications substantielles avec un préavis de 30 jours.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">12. Droit applicable et juridiction</h2>
            <div className="mb-6">
              <p>Les présentes CGU sont soumises au droit français. Tout litige sera de la compétence exclusive des tribunaux de Paris.</p>
            </div>

            <div className="mt-8 p-4 bg-stone-100 rounded-lg">
              <p className="text-sm text-stone-600">
                <strong>Dernière mise à jour :</strong> Décembre 2024<br />
                <strong>Contact :</strong> Pour toute question concernant ces CGU, contactez-nous à legal@treeb.eu
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 