export default function FeaturesPage() {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités FamilyVault
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez toutes les fonctionnalités qui font de FamilyVault la solution idéale 
            pour protéger et partager vos souvenirs familiaux en toute sécurité.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Sécurité maximale
            </h3>
            <p className="text-gray-600 mb-4">
              Vos données sont chiffrées de bout en bout avec les dernières technologies de sécurité. 
              Hébergement européen conforme RGPD.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Chiffrement AES-256</li>
              <li>• Authentification à deux facteurs</li>
              <li>• Sauvegarde automatique</li>
              <li>• Conformité RGPD</li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Partage familial
            </h3>
            <p className="text-gray-600 mb-4">
              Partagez facilement vos souvenirs avec votre famille en toute sécurité. 
              Contrôlez qui peut voir quoi.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Invitations sécurisées</li>
              <li>• Permissions granulaires</li>
              <li>• Albums partagés</li>
              <li>• Notifications en temps réel</li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Stockage intelligent
            </h3>
            <p className="text-gray-600 mb-4">
              Stockez toutes vos photos, vidéos et documents avec une organisation automatique 
              et une recherche avancée.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Stockage illimité (selon plan)</li>
              <li>• Organisation automatique</li>
              <li>• Recherche par contenu</li>
              <li>• Formats multiples supportés</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Chronologie familiale
            </h3>
            <p className="text-gray-600 mb-4">
              Créez une chronologie de votre histoire familiale avec des événements, 
              photos et souvenirs organisés par date.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Ligne de temps interactive</li>
              <li>• Événements marquants</li>
              <li>• Annotations et commentaires</li>
              <li>• Export en livre photo</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Sauvegarde automatique
            </h3>
            <p className="text-gray-600 mb-4">
              Vos données sont automatiquement sauvegardées et synchronisées 
              sur tous vos appareils en temps réel.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Synchronisation multi-appareils</li>
              <li>• Sauvegarde incrémentale</li>
              <li>• Récupération de données</li>
              <li>• Historique des versions</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Recherche avancée
            </h3>
            <p className="text-gray-600 mb-4">
              Retrouvez instantanément vos souvenirs grâce à notre moteur de recherche 
              intelligent qui analyse le contenu de vos photos.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Reconnaissance faciale</li>
              <li>• Recherche par lieu</li>
              <li>• Filtres par date</li>
              <li>• Tags automatiques</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à protéger vos souvenirs familiaux ?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de familles qui font confiance à FamilyVault 
            pour préserver leurs moments précieux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#pricing"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Voir les tarifs
            </a>
            <a 
              href="/#hero"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </main>
  )
} 