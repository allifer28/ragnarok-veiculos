import { connectToDatabase } from './mongodb'
import { Car } from './types'

// Dados de fallback para quando o MongoDB não estiver disponível
const fallbackCars: Car[] = [
  {
    _id: '1',
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: 2020,
    preco: 85000,
    quilometragem: 45000,
    combustivel: 'Flex',
    cambio: 'Automático',
    cor: 'Prata',
    descricao: 'Veículo em excelente estado de conservação, revisões em dia.',
    imagens: ['/placeholder.jpg'],
    destaque: true,
    vendido: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    marca: 'Honda',
    modelo: 'Civic',
    ano: 2019,
    preco: 78000,
    quilometragem: 52000,
    combustivel: 'Flex',
    cambio: 'Manual',
    cor: 'Preto',
    descricao: 'Carro muito bem cuidado, único dono.',
    imagens: ['/placeholder.jpg'],
    destaque: true,
    vendido: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    marca: 'Volkswagen',
    modelo: 'Jetta',
    ano: 2021,
    preco: 95000,
    quilometragem: 28000,
    combustivel: 'Flex',
    cambio: 'Automático',
    cor: 'Branco',
    descricao: 'Seminovo com garantia de fábrica.',
    imagens: ['/placeholder.jpg'],
    destaque: false,
    vendido: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export async function getFeaturedCars(): Promise<Car[]> {
  try {
    const connection = await connectToDatabase()
    
    if (!connection) {
      console.log("Usando dados de fallback para carros em destaque")
      return fallbackCars.filter(car => car.destaque)
    }

    const { db } = connection
    const cars = await db
      .collection('cars')
      .find({ destaque: true, vendido: false })
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray()

    return cars.map(car => ({
      ...car,
      _id: car._id.toString()
    })) as Car[]
  } catch (error) {
    console.error('Erro ao buscar carros em destaque:', error)
    console.log("Usando dados de fallback para carros em destaque")
    return fallbackCars.filter(car => car.destaque)
  }
}

export async function getCars(filters?: {
  marca?: string
  anoMin?: number
  anoMax?: number
  precoMin?: number
  precoMax?: number
  combustivel?: string
  cambio?: string
  search?: string
}): Promise<Car[]> {
  try {
    const connection = await connectToDatabase()
    
    if (!connection) {
      console.log("Usando dados de fallback para catálogo")
      let filteredCars = [...fallbackCars]
      
      if (filters) {
        if (filters.marca) {
          filteredCars = filteredCars.filter(car => 
            car.marca.toLowerCase().includes(filters.marca!.toLowerCase())
          )
        }
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase()
          filteredCars = filteredCars.filter(car =>
            car.marca.toLowerCase().includes(searchTerm) ||
            car.modelo.toLowerCase().includes(searchTerm)
          )
        }
        if (filters.anoMin) {
          filteredCars = filteredCars.filter(car => car.ano >= filters.anoMin!)
        }
        if (filters.anoMax) {
          filteredCars = filteredCars.filter(car => car.ano <= filters.anoMax!)
        }
        if (filters.precoMin) {
          filteredCars = filteredCars.filter(car => car.preco >= filters.precoMin!)
        }
        if (filters.precoMax) {
          filteredCars = filteredCars.filter(car => car.preco <= filters.precoMax!)
        }
        if (filters.combustivel) {
          filteredCars = filteredCars.filter(car => car.combustivel === filters.combustivel)
        }
        if (filters.cambio) {
          filteredCars = filteredCars.filter(car => car.cambio === filters.cambio)
        }
      }
      
      return filteredCars
    }

    const { db } = connection
    const query: any = { vendido: false }

    if (filters) {
      if (filters.marca) {
        query.marca = { $regex: filters.marca, $options: 'i' }
      }
      if (filters.anoMin || filters.anoMax) {
        query.ano = {}
        if (filters.anoMin) query.ano.$gte = filters.anoMin
        if (filters.anoMax) query.ano.$lte = filters.anoMax
      }
      if (filters.precoMin || filters.precoMax) {
        query.preco = {}
        if (filters.precoMin) query.preco.$gte = filters.precoMin
        if (filters.precoMax) query.preco.$lte = filters.precoMax
      }
      if (filters.combustivel) {
        query.combustivel = filters.combustivel
      }
      if (filters.cambio) {
        query.cambio = filters.cambio
      }
      if (filters.search) {
        query.$or = [
          { marca: { $regex: filters.search, $options: 'i' } },
          { modelo: { $regex: filters.search, $options: 'i' } }
        ]
      }
    }

    const cars = await db
      .collection('cars')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    return cars.map(car => ({
      ...car,
      _id: car._id.toString()
    })) as Car[]
  } catch (error) {
    console.error('Erro ao buscar carros:', error)
    console.log("Usando dados de fallback para catálogo")
    return fallbackCars
  }
}

export async function getCarById(id: string): Promise<Car | null> {
  try {
    const connection = await connectToDatabase()
    
    if (!connection) {
      console.log("Usando dados de fallback para buscar carro por ID")
      return fallbackCars.find(car => car._id === id) || null
    }

    const { db } = connection
    const { ObjectId } = require('mongodb')
    
    const car = await db
      .collection('cars')
      .findOne({ _id: new ObjectId(id) })

    if (!car) return null

    return {
      ...car,
      _id: car._id.toString()
    } as Car
  } catch (error) {
    console.error('Erro ao buscar carro por ID:', error)
    console.log("Usando dados de fallback para buscar carro por ID")
    return fallbackCars.find(car => car._id === id) || null
  }
}

export async function getMarcas(): Promise<string[]> {
  try {
    const connection = await connectToDatabase()
    
    if (!connection) {
      console.log("Usando dados de fallback para marcas")
      return [...new Set(fallbackCars.map(car => car.marca))]
    }

    const { db } = connection
    const marcas = await db
      .collection('cars')
      .distinct('marca', { vendido: false })

    return marcas.sort()
  } catch (error) {
    console.error('Erro ao buscar marcas:', error)
    console.log("Usando dados de fallback para marcas")
    return [...new Set(fallbackCars.map(car => car.marca))]
  }
}