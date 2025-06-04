"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Camera, Video, FileText, Heart, MessageCircle, Share, Clock, Image, Crown } from "lucide-react"
import { PlanType } from "@/components/plan-simulator"

interface FeedProps {
  currentPlan?: PlanType
}

export function Feed({ currentPlan = 'discovery' }: FeedProps) {
  const planFeatures = {
    discovery: {
      canUploadHD: false,
      documentsBlurred: true,
      upgradeMessage: "Photos haute qualité et documents accessibles dès 9€/mois"
    },
    small: {
      canUploadHD: true,
      documentsBlurred: false,
      upgradeMessage: "Débloquez plus de groupes avec Grands Groupes"
    },
    large: {
      canUploadHD: true,
      documentsBlurred: false,
      upgradeMessage: "Stockage et groupes illimités avec Clans"
    },
    clan: {
      canUploadHD: true,
      documentsBlurred: false,
      upgradeMessage: "Vous profitez de toutes les fonctionnalités premium"
    }
  }

  const features = planFeatures[currentPlan]

  // Posts adaptés selon le plan
  const posts = [
    {
      id: 1,
      group: { name: "Ma Famille", icon: "🏠" },
      author: { name: "Maman", avatar: "M" },
      timestamp: "il y a 2h",
      type: "photos",
      content: {
        text: "Déjeuner en famille aujourd'hui !",
        photos: ["dejeuner1.jpg", "dejeuner2.jpg", "dejeuner3.jpg"]
      },
      stats: { likes: 5, comments: 2, shares: 0 },
      isQualityReduced: !features.canUploadHD
    },
    {
      id: 2,
      group: { name: "Ma Famille", icon: "🏠" },
      author: { name: "Papa", avatar: "P" },
      timestamp: "il y a 1j",
      type: "document",
      content: {
        text: "Documents famille retrouvés dans les archives",
        documents: ["Acte naissance Grand-père.pdf"]
      },
      stats: { likes: 3, comments: 1, shares: 0 },
      isBlurred: features.documentsBlurred
    }
  ]

  return (
    <div className="space-y-6">
      {/* Zone de création de post - palette naturelle */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="ring-2 ring-stone-100">
              <AvatarFallback className="bg-stone-100 text-stone-600">V</AvatarFallback>
            </Avatar>
            <div className="flex-1 p-3 bg-stone-50 rounded-full cursor-pointer hover:bg-stone-100 transition-colors">
              <span className="text-stone-500">Que voulez-vous partager avec votre tribu ?</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-stone-200 text-stone-600 hover:bg-stone-50"
            >
              <Camera className="w-4 h-4 mr-2" />
              Photo{!features.canUploadHD && ' *'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-stone-200 text-stone-600 hover:bg-stone-50"
              disabled={currentPlan === 'discovery'}
            >
              <Video className="w-4 h-4 mr-2" />
              Vidéo
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-stone-200 text-stone-600 hover:bg-stone-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              Document{features.documentsBlurred && ' *'}
            </Button>
          </div>
          
          {!features.canUploadHD && (
            <div className="mt-3 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
              * Qualité réduite en plan Découverte
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feed des posts */}
      <div className="space-y-6">
        {/* Divider avec date */}
        <div className="flex items-center">
          <div className="flex-1 h-px bg-stone-200"></div>
          <span className="px-4 text-sm text-stone-500 bg-stone-50 rounded-full">Aujourd'hui</span>
          <div className="flex-1 h-px bg-stone-200"></div>
        </div>

        {posts.map((post) => (
          <Card key={post.id} className="border-stone-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{post.group.icon}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm text-stone-800">{post.group.name}</span>
                      <span className="text-stone-400">•</span>
                      <span className="text-sm text-stone-500">{post.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="text-xs bg-stone-100 text-stone-600">{post.author.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-stone-600">{post.author.name} a partagé {post.type === 'photos' ? `${post.content.photos?.length} photos` : 'des documents'}</span>
                    </div>
                  </div>
                </div>
                <Clock className="w-4 h-4 text-stone-400" />
              </div>
            </CardHeader>

            <CardContent>
              {/* Contenu du post */}
              <p className="text-sm mb-4 text-stone-700">{post.content.text}</p>

              {/* Images/Documents */}
              {post.type === 'photos' && post.content.photos && (
                <div className="relative">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {post.content.photos.map((photo, index) => (
                      <div key={index} className="relative aspect-square bg-stone-100 rounded-xl overflow-hidden">
                        <Image className="w-full h-full object-cover text-stone-400" />
                        {post.isQualityReduced && (
                          <div className="absolute inset-0 bg-amber-500/10 flex items-center justify-center">
                            <span className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-full font-medium">
                              Qualité réduite
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {post.type === 'document' && post.content.documents && (
                <div className="relative">
                  {post.content.documents.map((doc, index) => (
                    <div key={index} className="p-4 bg-stone-50 rounded-xl relative overflow-hidden">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-stone-400" />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-stone-800">{doc}</div>
                          <div className="text-xs text-stone-500">Document PDF</div>
                        </div>
                      </div>
                      {post.isBlurred && (
                        <div className="absolute inset-0 backdrop-blur-sm bg-white/70 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm font-medium text-stone-700">Document flouté</div>
                            <div className="text-xs text-stone-500">Accessible dès le plan Petits Groupes</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800 hover:bg-stone-100">
                    <Heart className="w-4 h-4 mr-2" />
                    {post.stats.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800 hover:bg-stone-100">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {post.stats.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800 hover:bg-stone-100">
                    <Share className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Suggestion premium contextuelle */}
        {currentPlan !== 'clan' && (
          <Card className="border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-sm">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-violet-800 mb-1">💎 Suggestion Premium</div>
                  <div className="text-sm text-violet-700">{features.upgradeMessage}</div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-sm"
                >
                  Découvrir
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Divider hier */}
        <div className="flex items-center">
          <div className="flex-1 h-px bg-stone-200"></div>
          <span className="px-4 text-sm text-stone-500 bg-stone-50 rounded-full">Hier</span>
          <div className="flex-1 h-px bg-stone-200"></div>
        </div>
      </div>
    </div>
  )
} 