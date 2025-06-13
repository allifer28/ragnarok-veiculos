"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import ScrollReveal from "@/components/scroll-reveal"

interface InstagramPost {
  id: string
  mediaUrl: string
  permalink: string
  caption: string
  timestamp: string
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulação de dados do Instagram
    // Em produção, você usaria a API do Instagram ou um serviço como o Curator.io
    const mockPosts = [
      {
        id: "1",
        mediaUrl: "/placeholder.svg?height=600&width=600",
        permalink: "https://instagram.com",
        caption: "Novo Honda Civic na Ragnarok Veículos! Venha conferir esse modelo incrível. #carros #honda #civic",
        timestamp: "2023-05-15T10:00:00",
      },
      {
        id: "2",
        mediaUrl: "/placeholder.svg?height=600&width=600",
        permalink: "https://instagram.com",
        caption: "Toyota Corolla 2023 disponível para test drive. Agende o seu! #toyota #corolla #testdrive",
        timestamp: "2023-05-10T14:30:00",
      },
      {
        id: "3",
        mediaUrl: "/placeholder.svg?height=600&width=600",
        permalink: "https://instagram.com",
        caption:
          "Promoção especial de financiamento este mês! Taxas a partir de 0,99%. #financiamento #carros #promocao",
        timestamp: "2023-05-05T09:15:00",
      },
      {
        id: "4",
        mediaUrl: "/placeholder.svg?height=600&width=600",
        permalink: "https://instagram.com",
        caption: "Novo lote de veículos acabou de chegar! Venha conferir as novidades. #novidades #carros #ragnarok",
        timestamp: "2023-04-28T16:45:00",
      },
    ]

    // Simular carregamento da API
    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)

    // Para implementação real com a API do Instagram:
    // async function fetchInstagramPosts() {
    //   try {
    //     const response = await fetch('/api/instagram');
    //     const data = await response.json();
    //     setPosts(data);
    //   } catch (error) {
    //     console.error('Erro ao buscar posts do Instagram:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    //
    // fetchInstagramPosts();
  }, [])

  // Função para truncar o texto da legenda
  const truncateCaption = (caption: string, maxLength = 100) => {
    if (caption.length <= maxLength) return caption
    return caption.substring(0, maxLength) + "..."
  }

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="flex items-center gap-2 mb-4">
              <Instagram className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Siga-nos no Instagram</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Acompanhe as novidades, promoções e os bastidores da Ragnarok Veículos em nosso Instagram.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1} width="100%">
                <Link href={post.permalink} target="_blank" rel="noopener noreferrer" className="group">
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={post.mediaUrl || "/placeholder.svg"}
                        alt={truncateCaption(post.caption, 30)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-sm font-medium">Ver no Instagram</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">{formatDate(post.timestamp)}</p>
                      <p className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {truncateCaption(post.caption)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal delay={0.4}>
          <div className="flex justify-center mt-8">
            <Link
              href="https://www.instagram.com/ragnarokveiculos/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
            >
              <Instagram className="h-5 w-5" />
              <span>@ragnarokveiculos</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
