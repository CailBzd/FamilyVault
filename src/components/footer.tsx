import Link from "next/link"
import { TreePine, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <TreePine className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Treeb</h3>
            </div>
            <p className="text-stone-400 text-sm mb-4">
              Votre réseau social familial privé. Partagez vos souvenirs en toute sécurité, sans publicité ni tracking.
            </p>
            <div className="text-xs text-stone-500">
              © 2024 Treeb SAS. Tous droits réservés.
            </div>
          </div>

          {/* Produit */}
          <div>
            <h4 className="font-semibold text-stone-200 mb-4">Produit</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="text-stone-400 hover:text-stone-200 transition-colors">Fonctionnalités</Link></li>
              <li><Link href="/#pricing" className="text-stone-400 hover:text-stone-200 transition-colors">Tarifs</Link></li>
              <li><Link href="/demo" className="text-stone-400 hover:text-stone-200 transition-colors">Démo</Link></li>
              <li><Link href="/faq" className="text-stone-400 hover:text-stone-200 transition-colors">FAQ</Link></li>
              <li><Link href="/roadmap" className="text-stone-400 hover:text-stone-200 transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="font-semibold text-stone-200 mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="text-stone-400 hover:text-stone-200 transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgu" className="text-stone-400 hover:text-stone-200 transition-colors">CGU</Link></li>
              <li><Link href="/cgv" className="text-stone-400 hover:text-stone-200 transition-colors">CGV</Link></li>
              <li><Link href="/confidentialite" className="text-stone-400 hover:text-stone-200 transition-colors">Confidentialité</Link></li>
              <li><Link href="/cookies" className="text-stone-400 hover:text-stone-200 transition-colors">Cookies</Link></li>
              <li><Link href="/rgpd" className="text-stone-400 hover:text-stone-200 transition-colors">RGPD</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-stone-200 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2 text-stone-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@treeb.eu" className="hover:text-stone-200 transition-colors">contact@treeb.eu</a>
              </li>
              <li className="flex items-center space-x-2 text-stone-400">
                <Phone className="w-4 h-4" />
                <a href="tel:+33142123456" className="hover:text-stone-200 transition-colors">01 42 12 34 56</a>
              </li>
              <li className="flex items-start space-x-2 text-stone-400">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <div>Treeb SAS</div>
                  <div>123 Rue de la Famille</div>
                  <div>75001 Paris, France</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-stone-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
            <div className="mb-4 md:mb-0">
              Treeb SAS • SIRET: 123 456 789 00012 • Capital social: 50 000€
            </div>
            <div className="flex space-x-4">
              <span>Hébergé en France 🇫🇷</span>
              <span>•</span>
              <span>Conforme RGPD</span>
              <span>•</span>
              <span>Zéro tracking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 