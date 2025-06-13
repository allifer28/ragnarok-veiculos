import { remark } from "remark"
import html from "remark-html"

// Tipos
export interface BlogPost {
  slug: string
  title: string
  date: string
  coverImage: string
  excerpt: string
  categories: string[]
  readingTime: number
  author: {
    name: string
    avatar: string
    role: string
  }
  content: string
}

// Posts de exemplo para desenvolvimento
const samplePosts: Omit<BlogPost, "content">[] = [
  {
    slug: "como-escolher-seu-primeiro-carro",
    title: "Como escolher seu primeiro carro: Guia completo para iniciantes",
    date: "10 de Junho, 2023",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Primeiro+Carro",
    excerpt:
      "Escolher o primeiro carro pode ser uma tarefa desafiadora. Neste guia, apresentamos dicas essenciais para ajudar você a tomar a melhor decisão.",
    categories: ["Dicas", "Iniciantes"],
    readingTime: 5,
    author: {
      name: "Carlos Silva",
      avatar: "/placeholder.svg?height=100&width=100&text=CS",
      role: "Especialista Automotivo",
    },
  },
  {
    slug: "manutencao-preventiva-economize-dinheiro",
    title: "Manutenção preventiva: Como economizar dinheiro a longo prazo",
    date: "25 de Maio, 2023",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Manutenção",
    excerpt:
      "A manutenção preventiva é essencial para prolongar a vida útil do seu veículo e evitar gastos desnecessários. Confira nossas dicas!",
    categories: ["Manutenção", "Economia"],
    readingTime: 7,
    author: {
      name: "Ana Oliveira",
      avatar: "/placeholder.svg?height=100&width=100&text=AO",
      role: "Engenheira Mecânica",
    },
  },
  {
    slug: "carros-eletricos-vale-a-pena",
    title: "Carros elétricos: Vale a pena investir em 2023?",
    date: "12 de Abril, 2023",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Carros+Elétricos",
    excerpt:
      "Com o aumento da oferta de carros elétricos no Brasil, muitos consumidores se perguntam se já é hora de fazer a transição. Analisamos os prós e contras.",
    categories: ["Elétricos", "Tecnologia"],
    readingTime: 8,
    author: {
      name: "Roberto Mendes",
      avatar: "/placeholder.svg?height=100&width=100&text=RM",
      role: "Consultor Automotivo",
    },
  },
  {
    slug: "financiamento-ou-consorcio",
    title: "Financiamento ou consórcio: Qual a melhor opção para comprar seu carro?",
    date: "03 de Março, 2023",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Financiamento",
    excerpt:
      "Entenda as diferenças entre financiamento e consórcio, e descubra qual opção se encaixa melhor no seu perfil financeiro.",
    categories: ["Finanças", "Compra"],
    readingTime: 6,
    author: {
      name: "Juliana Costa",
      avatar: "/placeholder.svg?height=100&width=100&text=JC",
      role: "Consultora Financeira",
    },
  },
  {
    slug: "seguro-auto-como-economizar",
    title: "Seguro auto: Como economizar sem perder a cobertura",
    date: "18 de Fevereiro, 2023",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Seguro+Auto",
    excerpt:
      "O seguro automotivo é essencial, mas pode pesar no orçamento. Descubra como reduzir o valor sem comprometer sua proteção.",
    categories: ["Seguros", "Economia"],
    readingTime: 5,
    author: {
      name: "Paulo Ribeiro",
      avatar: "/placeholder.svg?height=100&width=100&text=PR",
      role: "Corretor de Seguros",
    },
  },
  {
    slug: "carros-usados-checklist",
    title: "Checklist completo para comprar carros usados sem dor de cabeça",
    date: "05 de Janeiro, 2023",
    coverImage: "/placeholder.svg?height=600&width=1200&text=Carros+Usados",
    excerpt:
      "Comprar um carro usado pode ser arriscado. Confira nosso checklist completo para evitar surpresas desagradáveis.",
    categories: ["Usados", "Compra"],
    readingTime: 9,
    author: {
      name: "Marcos Almeida",
      avatar: "/placeholder.svg?height=100&width=100&text=MA",
      role: "Inspetor Veicular",
    },
  },
]

// Conteúdo de exemplo para um post
const sampleContent = `
# Como escolher seu primeiro carro: Guia completo para iniciantes

Escolher o primeiro carro é uma decisão importante que envolve diversos fatores. Neste guia, vamos ajudar você a tomar a melhor decisão possível.

## Defina seu orçamento

Antes de começar a pesquisar modelos, é fundamental estabelecer quanto você pode gastar. Lembre-se de considerar:

- Valor do carro
- Custos de documentação
- Seguro
- Manutenção
- Combustível

## Novo ou usado?

### Carros novos:
- Garantia de fábrica
- Tecnologia mais recente
- Menor custo de manutenção inicial
- Desvalorização mais acentuada nos primeiros anos

### Carros usados:
- Menor custo inicial
- Desvalorização mais lenta
- Possibilidade de encontrar modelos bem conservados
- Necessidade de verificação mais cuidadosa

## Considere suas necessidades reais

Pense no seu dia a dia e em como o carro será utilizado:

- Quantas pessoas normalmente andarão no veículo?
- Você precisa de espaço para bagagem?
- Qual tipo de trajeto você faz com mais frequência?
- Você estaciona na rua ou em garagem?

## Consumo de combustível

O consumo de combustível pode impactar significativamente seu orçamento mensal. Verifique:

1. Consumo na cidade e na estrada
2. Tipo de combustível (gasolina, etanol, flex)
3. Capacidade do tanque

## Custo-benefício da manutenção

Alguns carros são mais caros para manter do que outros. Pesquise sobre:

- Preço das peças de reposição
- Intervalos de revisão
- Disponibilidade de oficinas especializadas
- Histórico de problemas comuns do modelo

## Faça um test drive

Nunca compre um carro sem antes testá-lo. Durante o test drive, observe:

- Conforto ao dirigir
- Visibilidade
- Ruídos estranhos
- Comportamento do motor e câmbio
- Funcionamento dos equipamentos

## Segurança em primeiro lugar

Verifique os itens de segurança disponíveis:

- Airbags
- Freios ABS
- Controle de estabilidade
- Assistentes de condução
- Estrutura do veículo

## Conclusão

Escolher o primeiro carro é uma decisão que combina aspectos práticos e emocionais. Com as dicas acima, você estará mais preparado para fazer uma escolha consciente e que atenda às suas necessidades.

Lembre-se: o carro ideal é aquele que se encaixa no seu orçamento e estilo de vida, não necessariamente o mais bonito ou potente do mercado.
`

// Função para obter todos os posts do blog
export async function getBlogPosts(): Promise<Omit<BlogPost, "content">[]> {
  // Em um ambiente de produção, você buscaria os posts de um CMS ou banco de dados
  // Para este exemplo, estamos usando dados estáticos
  return samplePosts
}

// Função para obter um post específico pelo slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Em um ambiente de produção, você buscaria o post de um CMS ou banco de dados
  const post = samplePosts.find((post) => post.slug === slug)

  if (!post) {
    return null
  }

  // Processar o conteúdo markdown para HTML
  const processedContent = await remark().use(html).process(sampleContent)

  const contentHtml = processedContent.toString()

  return {
    ...post,
    content: contentHtml,
  }
}

// Função para obter posts relacionados
export async function getRelatedPosts(currentSlug: string, category: string): Promise<Omit<BlogPost, "content">[]> {
  // Filtrar posts da mesma categoria, excluindo o post atual
  const related = samplePosts
    .filter((post) => post.slug !== currentSlug && post.categories.includes(category))
    .slice(0, 3) // Limitar a 3 posts relacionados

  return related
}

// Função para obter categorias
export async function getBlogCategories(): Promise<string[]> {
  const categories = new Set<string>()

  samplePosts.forEach((post) => {
    post.categories.forEach((category) => {
      categories.add(category)
    })
  })

  return Array.from(categories)
}
