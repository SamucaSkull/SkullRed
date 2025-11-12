"use client"

import { useState } from "react"
import { Search, Download, Languages, BookOpen, Play, Globe, Star, Eye, Filter, Heart, Bookmark, Share2, Volume2, Subtitles, Crown, Gift, Zap, Users, Shield, Infinity, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Content {
  id: string
  title: string
  type: "manga" | "manhwa" | "manhua" | "anime"
  originalLanguage: string
  chapters?: number
  episodes?: number
  rating: number
  views: string
  description: string
  image: string
  genre: string[]
  status: "ongoing" | "completed" | "hiatus"
  year: number
}

const mockContent: Content[] = [
  {
    id: "1",
    title: "Solo Leveling",
    type: "manhwa",
    originalLanguage: "Korean",
    chapters: 179,
    rating: 9.5,
    views: "15.2M",
    description: "Sung Jin-Woo é o caçador mais fraco, mas após um evento misterioso, ele ganha a habilidade de subir de nível como em um jogo.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    genre: ["Ação", "Fantasia", "Sobrenatural"],
    status: "completed",
    year: 2018
  },
  {
    id: "2",
    title: "Tower of God",
    type: "manhwa",
    originalLanguage: "Korean", 
    chapters: 590,
    rating: 9.1,
    views: "12.8M",
    description: "Bam entra na Torre de Deus para seguir Rachel, enfrentando desafios mortais em cada andar.",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
    genre: ["Aventura", "Fantasia", "Mistério"],
    status: "ongoing",
    year: 2010
  },
  {
    id: "3",
    title: "The God of High School",
    type: "manhwa",
    originalLanguage: "Korean",
    chapters: 569,
    rating: 8.9,
    views: "8.5M", 
    description: "Um torneio de artes marciais que revela poderes sobrenaturais e segredos antigos.",
    image: "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400&h=600&fit=crop",
    genre: ["Ação", "Artes Marciais", "Sobrenatural"],
    status: "completed",
    year: 2011
  },
  {
    id: "4",
    title: "Demon Slayer",
    type: "anime",
    originalLanguage: "Japanese",
    episodes: 44,
    rating: 8.7,
    views: "25.3M",
    description: "Tanjiro se torna um caçador de demônios para salvar sua irmã transformada em demônio.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    genre: ["Ação", "Sobrenatural", "Drama"],
    status: "ongoing",
    year: 2019
  },
  {
    id: "5",
    title: "Noblesse",
    type: "manhwa",
    originalLanguage: "Korean",
    chapters: 544,
    rating: 9.0,
    views: "7.2M",
    description: "Cadis Etrama Di Raizel desperta após 820 anos de sono em um mundo moderno.",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
    genre: ["Ação", "Sobrenatural", "Escola"],
    status: "completed",
    year: 2007
  },
  {
    id: "6",
    title: "The Beginning After The End",
    type: "manhwa",
    originalLanguage: "Korean",
    chapters: 180,
    rating: 9.3,
    views: "11.5M",
    description: "Um rei reencarna em um mundo de magia e aventura, mantendo suas memórias passadas.",
    image: "https://images.unsplash.com/photo-1606918801925-e2c914c4b503?w=400&h=600&fit=crop",
    genre: ["Fantasia", "Aventura", "Magia"],
    status: "ongoing",
    year: 2018
  },
  {
    id: "7",
    title: "Battle Through The Heavens",
    type: "manhua",
    originalLanguage: "Chinese",
    chapters: 1648,
    rating: 8.6,
    views: "9.8M",
    description: "Xiao Yan busca recuperar seus poderes perdidos e se vingar daqueles que o humilharam.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    genre: ["Ação", "Fantasia", "Cultivo"],
    status: "ongoing",
    year: 2015
  },
  {
    id: "8",
    title: "One Piece",
    type: "manga",
    originalLanguage: "Japanese",
    chapters: 1095,
    rating: 9.2,
    views: "45.8M",
    description: "Monkey D. Luffy e sua tripulação buscam o tesouro lendário One Piece.",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=600&fit=crop",
    genre: ["Aventura", "Comédia", "Ação"],
    status: "ongoing",
    year: 1997
  }
]

const languages = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" }
]

const genres = ["Ação", "Aventura", "Comédia", "Drama", "Fantasia", "Romance", "Sobrenatural", "Mistério", "Horror", "Slice of Life", "Esportes", "Mecha", "Histórico", "Militar", "Psicológico"]

const plans = [
  {
    id: "free",
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    color: "from-gray-600 to-gray-800",
    features: [
      "5 traduções por dia",
      "2 downloads por dia",
      "Qualidade padrão",
      "Anúncios inclusos",
      "Suporte por email"
    ],
    limitations: [
      "Sem downloads em lote",
      "Sem tradução offline",
      "Sem prioridade no suporte"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 19,90",
    period: "/mês",
    color: "from-purple-600 to-pink-600",
    popular: true,
    features: [
      "50 traduções por dia",
      "20 downloads por dia",
      "Qualidade HD/4K",
      "Sem anúncios",
      "Downloads em lote",
      "Tradução offline",
      "Suporte prioritário",
      "Acesso antecipado"
    ],
    limitations: []
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: "R$ 39,90",
    period: "/mês",
    color: "from-yellow-500 to-orange-600",
    features: [
      "Traduções ilimitadas",
      "Downloads ilimitados",
      "Qualidade máxima 8K",
      "Sem anúncios",
      "Downloads em lote ilimitados",
      "Tradução offline avançada",
      "Suporte VIP 24/7",
      "Acesso beta exclusivo",
      "API personalizada",
      "Backup na nuvem"
    ],
    limitations: []
  }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [targetLanguage, setTargetLanguage] = useState("pt")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState("search")
  const [filterType, setFilterType] = useState("all")
  const [filterGenre, setFilterGenre] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [favorites, setFavorites] = useState<string[]>([])
  const [downloadHistory, setDownloadHistory] = useState<Content[]>([])
  const [includeSubtitles, setIncludeSubtitles] = useState(true)
  const [audioDub, setAudioDub] = useState(false)
  const [showBonusModal, setShowBonusModal] = useState(false)
  const [showPlansModal, setShowPlansModal] = useState(false)
  const [currentPlan, setCurrentPlan] = useState("free")
  const [bonusClaimed, setBonusClaimed] = useState(false)

  const filteredContent = mockContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = filterType === "all" || content.type === filterType
    const matchesGenre = filterGenre === "all" || content.genre.includes(filterGenre)
    const matchesStatus = filterStatus === "all" || content.status === filterStatus
    
    return matchesSearch && matchesType && matchesGenre && matchesStatus
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "year":
        return b.year - a.year
      case "title":
        return a.title.localeCompare(b.title)
      default: // popularity
        return parseFloat(b.views.replace("M", "")) - parseFloat(a.views.replace("M", ""))
    }
  })

  const handleTranslate = async (content: Content) => {
    setIsTranslating(true)
    setSelectedContent(content)
    setActiveTab("translate")
    
    // Simulação de tradução avançada
    setTimeout(() => {
      const translations: Record<string, string> = {
        "pt": `📖 ${content.title} - Tradução Completa para Português\n\n📝 Sinopse:\n${content.description}\n\n🎭 Gêneros: ${content.genre.join(", ")}\n📊 Status: ${content.status === "ongoing" ? "Em Andamento" : content.status === "completed" ? "Completo" : "Em Hiato"}\n⭐ Avaliação: ${content.rating}/10\n👁️ Visualizações: ${content.views}\n📅 Ano: ${content.year}\n\n🌟 Esta tradução inclui:\n• Texto principal traduzido\n• Nomes e termos culturais adaptados\n• Notas explicativas quando necessário\n• Formatação preservada`,
        
        "en": `📖 ${content.title} - Complete English Translation\n\n📝 Synopsis:\n${content.description}\n\n🎭 Genres: ${content.genre.join(", ")}\n📊 Status: ${content.status}\n⭐ Rating: ${content.rating}/10\n👁️ Views: ${content.views}\n📅 Year: ${content.year}\n\n🌟 This translation includes:\n• Main text translated\n• Cultural terms adapted\n• Explanatory notes when needed\n• Preserved formatting`,
        
        "es": `📖 ${content.title} - Traducción Completa al Español\n\n📝 Sinopsis:\n${content.description.replace("Sung Jin-Woo é o caçador mais fraco", "Sung Jin-Woo es el cazador más débil").replace("mas após um evento misterioso", "pero después de un evento misterioso")}\n\n🎭 Géneros: ${content.genre.join(", ")}\n📊 Estado: ${content.status === "ongoing" ? "En Curso" : content.status === "completed" ? "Completado" : "En Pausa"}\n⭐ Calificación: ${content.rating}/10\n👁️ Vistas: ${content.views}\n📅 Año: ${content.year}\n\n🌟 Esta traducción incluye:\n• Texto principal traducido\n• Términos culturales adaptados\n• Notas explicativas cuando sea necesario\n• Formato preservado`,
        
        "ko": `📖 ${content.title} - 한국어 완전 번역\n\n📝 시놉시스:\n${content.description}\n\n🎭 장르: ${content.genre.join(", ")}\n📊 상태: ${content.status}\n⭐ 평점: ${content.rating}/10\n👁️ 조회수: ${content.views}\n📅 연도: ${content.year}\n\n🌟 이 번역에는 다음이 포함됩니다:\n• 본문 번역\n• 문화적 용어 적응\n• 필요시 설명 노트\n• 형식 보존`,
        
        "ja": `📖 ${content.title} - 日本語完全翻訳\n\n📝 あらすじ:\n${content.description}\n\n🎭 ジャンル: ${content.genre.join("、")}\n📊 ステータス: ${content.status}\n⭐ 評価: ${content.rating}/10\n👁️ 視聴数: ${content.views}\n📅 年: ${content.year}\n\n🌟 この翻訳には以下が含まれます:\n• メインテキストの翻訳\n• 文化的用語の適応\n• 必要に応じた説明ノート\n• フォーマットの保持`
      }
      
      setTranslatedText(translations[targetLanguage] || translations["en"])
      setIsTranslating(false)
    }, 2500)
  }

  const handleDownload = async (content: Content) => {
    setIsDownloading(true)
    
    setTimeout(() => {
      const langName = languages.find(l => l.code === targetLanguage)?.name || "English"
      const fileExtension = content.type === "anime" ? "mp4" : "pdf"
      const fileName = `${content.title.replace(/\s+/g, '_')}_${langName}.${fileExtension}`
      
      // Adicionar aos downloads
      if (!downloadHistory.find(item => item.id === content.id)) {
        setDownloadHistory(prev => [content, ...prev])
      }
      
      // Simular download
      const downloadContent = `🎉 ${content.title} - Baixado com Sucesso!\n\n📱 Aplicativo: ManhwaTranslator Pro\n🌍 Idioma: ${langName}\n📁 Formato: ${fileExtension.toUpperCase()}\n📊 Qualidade: ${content.type === "anime" ? "1080p HD" : "Alta Resolução"}\n\n${content.type === "anime" ? "🎬 Recursos inclusos:" : "📚 Recursos inclusos:"}\n• Tradução completa para ${langName}\n${content.type === "anime" ? `• Legendas: ${includeSubtitles ? "Incluídas" : "Não incluídas"}\n• Áudio: ${audioDub ? "Dublado" : "Original com legendas"}` : "• Formatação otimizada para leitura\n• Imagens em alta qualidade"}\n• Metadados preservados\n\n✅ Download concluído com sucesso!\n📂 Arquivo salvo como: ${fileName}\n\n⭐ Avalie nossa tradução e compartilhe com amigos!`
      
      const element = document.createElement('a')
      const file = new Blob([downloadContent], {type: 'text/plain'})
      element.href = URL.createObjectURL(file)
      element.download = fileName
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      
      setIsDownloading(false)
    }, 3500)
  }

  const toggleFavorite = (contentId: string) => {
    setFavorites(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    )
  }

  const claimBonus = () => {
    setBonusClaimed(true)
    setShowBonusModal(false)
    // Aqui você adicionaria a lógica para aplicar o bônus
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "manhwa": return "bg-gradient-to-r from-red-500 to-pink-500"
      case "manga": return "bg-gradient-to-r from-blue-500 to-cyan-500" 
      case "manhua": return "bg-gradient-to-r from-yellow-500 to-orange-500"
      case "anime": return "bg-gradient-to-r from-purple-500 to-indigo-500"
      default: return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing": return "text-emerald-400"
      case "completed": return "text-cyan-400"
      case "hiatus": return "text-amber-400"
      default: return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-3 rounded-2xl animate-pulse">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ManhwaTranslator Pro
                </h1>
                <p className="text-purple-200 text-sm">Traduza e baixe Manhwas, Mangas, Manhuas e Animes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Bônus Button */}
              <Dialog open={showBonusModal} onOpenChange={setShowBonusModal}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold animate-bounce">
                    <Gift className="w-4 h-4 mr-2" />
                    {bonusClaimed ? "Bônus Ativo!" : "Bônus Grátis!"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-br from-yellow-500 to-orange-600 border-none text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                      <Gift className="w-8 h-8" />
                      Bônus de Boas-Vindas!
                    </DialogTitle>
                  </DialogHeader>
                  <div className="text-center space-y-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <h3 className="text-xl font-bold mb-2">🎉 OFERTA ESPECIAL!</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <Zap className="w-5 h-5 text-yellow-300" />
                          <span className="font-semibold">+20 Traduções Grátis</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Download className="w-5 h-5 text-blue-300" />
                          <span className="font-semibold">+10 Downloads Premium</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Star className="w-5 h-5 text-purple-300" />
                          <span className="font-semibold">7 Dias Premium Grátis</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm opacity-90">
                      Válido apenas para novos usuários! Aproveite agora e explore todo o potencial do ManhwaTranslator Pro.
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        onClick={claimBonus}
                        className="flex-1 bg-white text-orange-600 hover:bg-gray-100 font-bold"
                        disabled={bonusClaimed}
                      >
                        {bonusClaimed ? "Bônus Ativado!" : "Resgatar Bônus"}
                      </Button>
                      <Button 
                        onClick={() => setShowBonusModal(false)}
                        variant="outline"
                        className="border-white text-white hover:bg-white/20"
                      >
                        Depois
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Plans Button */}
              <Dialog open={showPlansModal} onOpenChange={setShowPlansModal}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold">
                    <Crown className="w-4 h-4 mr-2" />
                    Planos
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-br from-slate-900 to-purple-900 border-purple-500/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Escolha Seu Plano
                    </DialogTitle>
                    <p className="text-center text-purple-200">Desbloqueie todo o potencial do ManhwaTranslator Pro</p>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {plans.map((plan) => (
                      <Card 
                        key={plan.id} 
                        className={`relative bg-gradient-to-br ${plan.color} border-none text-white transform hover:scale-105 transition-all duration-300 ${plan.popular ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-yellow-500 text-black font-bold px-3 py-1">
                              MAIS POPULAR
                            </Badge>
                          </div>
                        )}
                        
                        <CardHeader className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            {plan.id === "free" && <Users className="w-8 h-8" />}
                            {plan.id === "premium" && <Crown className="w-8 h-8" />}
                            {plan.id === "ultimate" && <Infinity className="w-8 h-8" />}
                          </div>
                          <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                          <div className="text-4xl font-bold">
                            {plan.price}
                            <span className="text-lg font-normal opacity-80">{plan.period}</span>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-lg">✅ Incluído:</h4>
                            {plan.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          {plan.limitations.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-semibold text-lg opacity-80">❌ Limitações:</h4>
                              {plan.limitations.map((limitation, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                                  <span className="text-sm opacity-80">{limitation}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <Button 
                            className={`w-full font-bold ${
                              currentPlan === plan.id 
                                ? 'bg-white/20 cursor-not-allowed' 
                                : 'bg-white text-gray-900 hover:bg-gray-100'
                            }`}
                            disabled={currentPlan === plan.id}
                            onClick={() => setCurrentPlan(plan.id)}
                          >
                            {currentPlan === plan.id ? 'Plano Atual' : 
                             plan.id === "free" ? 'Continuar Grátis' : 'Assinar Agora'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center space-y-2">
                    <p className="text-purple-200 text-sm">
                      🔒 Pagamento seguro • ❌ Sem compromisso • 🔄 Cancele a qualquer momento
                    </p>
                    <p className="text-xs text-purple-300">
                      Todos os planos incluem suporte técnico e atualizações gratuitas
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                <Globe className="w-4 h-4 text-cyan-300" />
                <span className="text-cyan-200 text-sm font-medium">{languages.length} idiomas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                <BookOpen className="w-4 h-4 text-purple-300" />
                <span className="text-purple-200 text-sm font-medium">{mockContent.length} títulos</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="search" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500">
              <Search className="w-4 h-4 mr-2" />
              Explorar
            </TabsTrigger>
            <TabsTrigger value="translate" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              <Languages className="w-4 h-4 mr-2" />
              Traduzir
            </TabsTrigger>
            <TabsTrigger value="downloads" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500">
              <Download className="w-4 h-4 mr-2" />
              Downloads
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500">
              <Heart className="w-4 h-4 mr-2" />
              Favoritos
            </TabsTrigger>
          </TabsList>

          {/* Aba de Exploração */}
          <TabsContent value="search" className="space-y-6">
            {/* Filtros e Busca */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Busque por título, gênero ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-purple-400">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    <SelectItem value="manhwa">Manhwa (🇰🇷)</SelectItem>
                    <SelectItem value="manga">Manga (🇯🇵)</SelectItem>
                    <SelectItem value="manhua">Manhua (🇨🇳)</SelectItem>
                    <SelectItem value="anime">Anime (📺)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <Select value={filterGenre} onValueChange={setFilterGenre}>
                  <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-purple-400">
                    <SelectValue placeholder="Gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Gêneros</SelectItem>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-purple-400">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="ongoing">Em Andamento</SelectItem>
                    <SelectItem value="completed">Completo</SelectItem>
                    <SelectItem value="hiatus">Em Hiato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-purple-400">
                    <SelectValue placeholder="Ordenar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularidade</SelectItem>
                    <SelectItem value="rating">Avaliação</SelectItem>
                    <SelectItem value="year">Ano</SelectItem>
                    <SelectItem value="title">Título</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Seletor de Idioma */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Languages className="w-5 h-5 text-cyan-400" />
                  Idioma de Tradução
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-cyan-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Grid de Conteúdo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredContent.map((content) => (
                <Card key={content.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badges superiores */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <Badge className={`${getTypeColor(content.type)} text-white text-xs font-bold border-none`}>
                        {content.type === "anime" ? <Play className="w-3 h-3 mr-1" /> : <BookOpen className="w-3 h-3 mr-1" />}
                        {content.type.toUpperCase()}
                      </Badge>
                      <Badge variant="secondary" className={`text-xs ${getStatusColor(content.status)} bg-black/60 font-semibold`}>
                        {content.status === "ongoing" ? "Em Andamento" : content.status === "completed" ? "Completo" : "Hiato"}
                      </Badge>
                    </div>
                    
                    {/* Rating e Views */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-white text-xs font-bold">{content.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span className="text-white text-xs font-medium">{content.views}</span>
                      </div>
                    </div>

                    {/* Botão Favorito */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm hover:bg-black/90 p-2 hover:scale-110 transition-all duration-200"
                      onClick={() => toggleFavorite(content.id)}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(content.id) ? "fill-red-500 text-red-500" : "text-white"}`} />
                    </Button>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-base line-clamp-2 leading-tight">{content.title}</CardTitle>
                    <div className="flex flex-wrap gap-1">
                      {content.genre.slice(0, 2).map(genre => (
                        <Badge key={genre} variant="outline" className="text-xs border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white transition-colors">
                          {genre}
                        </Badge>
                      ))}
                      {content.genre.length > 2 && (
                        <Badge variant="outline" className="text-xs border-gray-400 text-gray-300">
                          +{content.genre.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{content.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-purple-200 mb-4">
                      <span className="font-medium">{content.year}</span>
                      <span className="font-medium">
                        {content.type === "anime" ? `${content.episodes} eps` : `${content.chapters} caps`}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleTranslate(content)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs font-bold hover:scale-105 transition-all duration-200"
                        disabled={isTranslating}
                      >
                        <Languages className="w-3 h-3 mr-1" />
                        {isTranslating ? "Traduzindo..." : "Traduzir"}
                      </Button>
                      <Button
                        onClick={() => handleDownload(content)}
                        variant="outline"
                        size="sm"
                        className="border-cyan-400 text-cyan-300 hover:bg-cyan-600 hover:text-white hover:scale-110 transition-all duration-200"
                        disabled={isDownloading}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-200"
                      >
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredContent.length === 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Search className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <p className="text-white text-lg mb-2">Nenhum resultado encontrado</p>
                    <p className="text-gray-400">Tente ajustar os filtros ou termos de busca</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Aba de Tradução */}
          <TabsContent value="translate" className="space-y-6">
            {selectedContent ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      Conteúdo Original
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={selectedContent.image}
                          alt={selectedContent.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={`${getTypeColor(selectedContent.type)} text-white font-bold border-none`}>
                            {selectedContent.type.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{selectedContent.title}</h3>
                        <p className="text-gray-300 mb-3">{selectedContent.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-purple-200">Idioma Original:</span>
                            <p className="text-white font-medium">{selectedContent.originalLanguage}</p>
                          </div>
                          <div>
                            <span className="text-purple-200">Status:</span>
                            <p className={`${getStatusColor(selectedContent.status)} font-medium`}>
                              {selectedContent.status === "ongoing" ? "Em Andamento" : 
                               selectedContent.status === "completed" ? "Completo" : "Em Hiato"}
                            </p>
                          </div>
                          <div>
                            <span className="text-purple-200">Avaliação:</span>
                            <p className="text-white flex items-center gap-1 font-medium">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              {selectedContent.rating}/10
                            </p>
                          </div>
                          <div>
                            <span className="text-purple-200">
                              {selectedContent.type === "anime" ? "Episódios:" : "Capítulos:"}
                            </span>
                            <p className="text-white font-medium">
                              {selectedContent.type === "anime" ? selectedContent.episodes : selectedContent.chapters}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <span className="text-purple-200 text-sm">Gêneros:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedContent.genre.map(genre => (
                              <Badge key={genre} variant="outline" className="text-xs border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white transition-colors">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Languages className="w-5 h-5 text-cyan-400" />
                      Tradução para {languages.find(l => l.code === targetLanguage)?.flag} {languages.find(l => l.code === targetLanguage)?.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isTranslating ? (
                      <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                          <p className="text-cyan-200 text-lg font-medium">Traduzindo conteúdo...</p>
                          <p className="text-gray-400 text-sm mt-2">Processando texto e metadados</p>
                        </div>
                      </div>
                    ) : translatedText ? (
                      <div className="space-y-4">
                        <Textarea
                          value={translatedText}
                          onChange={(e) => setTranslatedText(e.target.value)}
                          className="min-h-96 bg-white/5 border-white/20 text-white resize-none focus:border-cyan-400"
                          placeholder="Tradução aparecerá aqui..."
                        />
                        
                        {/* Opções de Download para Anime */}
                        {selectedContent.type === "anime" && (
                          <div className="bg-white/5 rounded-lg p-4 space-y-3 border border-white/10">
                            <h4 className="text-white font-medium flex items-center gap-2">
                              <Volume2 className="w-4 h-4 text-purple-400" />
                              Opções de Áudio e Legenda
                            </h4>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="subtitles"
                                checked={includeSubtitles}
                                onCheckedChange={setIncludeSubtitles}
                              />
                              <label htmlFor="subtitles" className="text-sm text-purple-200 flex items-center gap-2 cursor-pointer">
                                <Subtitles className="w-4 h-4" />
                                Incluir legendas traduzidas
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="audiodub"
                                checked={audioDub}
                                onCheckedChange={setAudioDub}
                              />
                              <label htmlFor="audiodub" className="text-sm text-purple-200 flex items-center gap-2 cursor-pointer">
                                <Volume2 className="w-4 h-4" />
                                Áudio dublado (quando disponível)
                              </label>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleDownload(selectedContent)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold hover:scale-105 transition-all duration-200"
                            disabled={isDownloading}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {isDownloading ? "Baixando..." : "Baixar Traduzido"}
                          </Button>
                          <Button
                            variant="outline"
                            className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white hover:scale-105 transition-all duration-200"
                            onClick={() => {
                              navigator.clipboard.writeText(translatedText)
                            }}
                          >
                            Copiar Texto
                          </Button>
                          <Button
                            variant="outline"
                            className="border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-200"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Compartilhar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                          <Languages className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                          <p className="text-white text-lg mb-2">Pronto para traduzir</p>
                          <p className="text-gray-400">Clique em "Traduzir" para começar</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Languages className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                    <p className="text-white text-xl mb-2">Nenhum conteúdo selecionado</p>
                    <p className="text-gray-400 mb-4">Vá para a aba "Explorar" e selecione um título para traduzir</p>
                    <Button onClick={() => setActiveTab("search")} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold">
                      <Search className="w-4 h-4 mr-2" />
                      Explorar Conteúdo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Aba de Downloads */}
          <TabsContent value="downloads" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-green-400" />
                  Histórico de Downloads ({downloadHistory.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {downloadHistory.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {downloadHistory.map((content) => (
                      <Card key={content.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center gap-3 p-4">
                          <img
                            src={content.image}
                            alt={content.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-medium line-clamp-1">{content.title}</h4>
                            <p className="text-gray-400 text-sm">{content.type.toUpperCase()}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={`${getTypeColor(content.type)} text-white text-xs font-bold border-none`}>
                                {languages.find(l => l.code === targetLanguage)?.flag}
                              </Badge>
                              <span className="text-xs text-purple-300 font-medium">
                                {content.type === "anime" ? "MP4" : "PDF"}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-400 text-green-300 hover:bg-green-600 hover:text-white hover:scale-110 transition-all duration-200"
                            onClick={() => handleDownload(content)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Download className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Nenhum download ainda</h3>
                    <p className="text-gray-400 mb-6">
                      Traduza e baixe conteúdos para vê-los aqui
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <BookOpen className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        <p className="text-white font-medium text-sm">Manhwas</p>
                        <p className="text-gray-400 text-xs">PDF Alta Qualidade</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-white font-medium text-sm">Mangás</p>
                        <p className="text-gray-400 text-xs">PDF Otimizado</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <BookOpen className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-white font-medium text-sm">Manhuas</p>
                        <p className="text-gray-400 text-xs">PDF Colorido</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <Play className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-white font-medium text-sm">Animes</p>
                        <p className="text-gray-400 text-xs">MP4 1080p HD</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Favoritos */}
          <TabsContent value="favorites" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Meus Favoritos ({favorites.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockContent.filter(content => favorites.includes(content.id)).map((content) => (
                      <Card key={content.id} className="bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={content.image}
                            alt={content.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className={`absolute top-2 left-2 ${getTypeColor(content.type)} text-white text-xs font-bold border-none`}>
                            {content.type.toUpperCase()}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm hover:bg-black/90 p-2 hover:scale-110 transition-all duration-200"
                            onClick={() => toggleFavorite(content.id)}
                          >
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        
                        <CardHeader className="pb-2">
                          <CardTitle className="text-white text-base line-clamp-1">{content.title}</CardTitle>
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white font-medium">{content.rating}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-purple-200 font-medium">{content.views}</span>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleTranslate(content)}
                              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm font-bold hover:scale-105 transition-all duration-200"
                              disabled={isTranslating}
                            >
                              <Languages className="w-4 h-4 mr-2" />
                              Traduzir
                            </Button>
                            <Button
                              onClick={() => handleDownload(content)}
                              variant="outline"
                              size="sm"
                              className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-200"
                              disabled={isDownloading}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-20 h-20 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Nenhum favorito ainda</h3>
                    <p className="text-gray-400 mb-6">
                      Adicione títulos aos favoritos clicando no ❤️
                    </p>
                    <Button onClick={() => setActiveTab("search")} className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 font-bold">
                      <Heart className="w-4 h-4 mr-2" />
                      Explorar e Favoritar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}