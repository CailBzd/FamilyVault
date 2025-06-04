import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales - Treeb",
  description: "Mentions légales de Treeb, votre réseau social familial privé",
}

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-8">Mentions légales</h1>
          
          <div className="prose prose-stone max-w-none">
            <h2 className="text-xl font-semibold text-stone-800 mb-4">1. Informations légales</h2>
            <div className="mb-6">
              <p><strong>Raison sociale :</strong> Treeb SAS</p>
              <p><strong>Forme juridique :</strong> Société par Actions Simplifiée</p>
              <p><strong>Capital social :</strong> 50 000 euros</p>
              <p><strong>SIRET :</strong> 123 456 789 00012</p>
              <p><strong>Code APE :</strong> 6201Z (Programmation informatique)</p>
              <p><strong>N° TVA intracommunautaire :</strong> FR12345678901</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">2. Siège social</h2>
            <div className="mb-6">
              <p>123 Rue de la Famille<br />
              75001 Paris<br />
              France</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">3. Contact</h2>
            <div className="mb-6">
              <p><strong>Email :</strong> contact@treeb.eu</p>
              <p><strong>Téléphone :</strong> 01 42 12 34 56</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">4. Représentant légal</h2>
            <div className="mb-6">
              <p><strong>Président :</strong> [Nom du Président]</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">5. Hébergement</h2>
            <div className="mb-6">
              <p><strong>Hébergeur :</strong> OVHcloud SAS</p>
              <p><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</p>
              <p><strong>Téléphone :</strong> 09 72 10 10 07</p>
              <p><strong>Site web :</strong> <a href="https://www.ovhcloud.com" className="text-emerald-600 hover:text-emerald-700">www.ovhcloud.com</a></p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">6. Directeur de la publication</h2>
            <div className="mb-6">
              <p><strong>Directeur de la publication :</strong> [Nom du Directeur]</p>
              <p><strong>Email :</strong> legal@treeb.eu</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">7. Protection des données personnelles</h2>
            <div className="mb-6">
              <p>Treeb SAS accorde une importance particulière à la protection de vos données personnelles. Pour plus d'informations, consultez notre <a href="/confidentialite" className="text-emerald-600 hover:text-emerald-700">Politique de confidentialité</a>.</p>
              <p><strong>Délégué à la Protection des Données :</strong> dpo@treeb.eu</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">8. Propriété intellectuelle</h2>
            <div className="mb-6">
              <p>L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est protégé par le droit d'auteur et appartient à Treeb SAS ou à ses partenaires. Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces éléments est strictement interdite sans l'accord exprès écrit de Treeb SAS.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">9. Responsabilité</h2>
            <div className="mb-6">
              <p>Treeb SAS met tout en œuvre pour offrir aux utilisateurs des informations et/ou des outils disponibles et vérifiés, mais ne saurait être tenue pour responsable des erreurs, d'une absence de disponibilité des informations et/ou de la présence de virus sur son site.</p>
            </div>

            <h2 className="text-xl font-semibold text-stone-800 mb-4">10. Droit applicable</h2>
            <div className="mb-6">
              <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
            </div>

            <div className="mt-8 p-4 bg-stone-100 rounded-lg">
              <p className="text-sm text-stone-600">
                <strong>Dernière mise à jour :</strong> Décembre 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 