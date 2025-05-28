export interface Car {
  _id: string
  nome: string
  marca: string
  modelo?: string
  ano?: string
  km?: string
  combustivel?: string
  cor?: string
  preco: number
  descricao?: string
  // Compatibilidade: manter campo antigo e adicionar novos
  imagem?: string // Campo antigo (para compatibilidade)
  imagens?: string[] // Novo campo para múltiplas imagens
  imagemPrincipal?: string // Imagem principal
  createdAt?: Date
  updatedAt?: Date
}
