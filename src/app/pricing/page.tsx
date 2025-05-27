import { PricingGrid } from "@/components/pricing-grid"

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <div className="py-16 bg-gradient-to-b from-blue-200 to-purple-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Tarifs FamilyVault
          </h1>
          <p className="text-xl text-slate-700 mb-8">
            Choisissez le plan qui convient le mieux à votre famille. 
            Commencez gratuitement, passez à un plan payant quand vous le souhaitez.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Hébergement européen
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Conforme RGPD
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Annulation à tout moment
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-purple-100">
        <PricingGrid />
      </div>
      
      <div className="py-16 bg-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Questions fréquentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Puis-je changer de plan à tout moment ?
              </h3>
              <p className="text-slate-600">
                Oui, vous pouvez passer d'un plan à l'autre à tout moment. 
                Les changements prennent effet immédiatement et nous ajustons la facturation au prorata.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Que se passe-t-il si j'annule mon abonnement ?
              </h3>
              <p className="text-slate-600">
                Vous gardez l'accès à vos données jusqu'à la fin de votre période de facturation. 
                Après cela, votre compte passe automatiquement au plan gratuit.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Mes données sont-elles vraiment sécurisées ?
              </h3>
              <p className="text-slate-600">
                Absolument. Nous utilisons un chiffrement de bout en bout, 
                vos données sont hébergées en Europe et nous sommes conformes au RGPD.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Y a-t-il une période d'essai ?
              </h3>
              <p className="text-slate-600">
                Le plan gratuit vous permet de tester toutes les fonctionnalités de base. 
                Pour les plans payants, vous bénéficiez d'une garantie satisfait ou remboursé de 30 jours.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Vous avez d'autres questions ?
            </p>
            <a 
              href="mailto:support@familyvault.eu"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Contactez notre support
            </a>
          </div>
        </div>
      </div>
    </main>
  )
} 