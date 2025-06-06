import { NextResponse } from "next/server"

// Esta é uma API simulada para obter posts do Instagram
// Em produção, você usaria a API oficial do Instagram ou um serviço como Curator.io

export async function GET() {
  try {
    // Simular dados do Instagram
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

    // Em produção, você faria uma chamada para a API do Instagram aqui
    // const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    // const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${accessToken}`);
    // const data = await response.json();
    // return NextResponse.json(data.data);

    return NextResponse.json(mockPosts)
  } catch (error) {
    console.error("Erro ao buscar posts do Instagram:", error)
    return NextResponse.json({ error: "Erro ao buscar posts do Instagram" }, { status: 500 })
  }
}
