import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Car } from "@/lib/types"

export async function getFeaturedCars(): Promise<Car[]> {
  try {
    const connection = await connectToDatabase()
    
    if (!connection) {
      console.error("Falha ao conectar ao banco de dados")
      return []
    }
    
    const { db } = connection

    const cars = await db.collection("cars").find({}).sort({ createdAt: -1 }).limit(6).toArray()

    // Migrar carros antigos automaticamente e garantir compatibilidade
    const migratedCars = cars.map((car) => {
      const baseData = {
        ...car,
        _id: car._id.toString(),
      }

      // Garantir que sempre temos arrays de imagens
      if (car.imagens && Array.isArray(car.imagens)) {
        return {
          ...baseData,
          imagens: car.imagens,
          imagemPrincipal: car.imagemPrincipal || car.imagens[0] || "",
        }
      } else if (car.imagem) {
        return {
          ...baseData,
          imagens: [car.imagem],
          imagemPrincipal: car.imagem,
        }
      } else {
        return {
          ...baseData,
          imagens: [],
          imagemPrincipal: "",
        }
      }
    })

    return migratedCars as Car[]
  } catch (error) {
    console.error("Erro ao buscar carros em destaque:", error)
    return []
  }
}

export async function getCars({
  page = 1,
  limit = 9,
  marca,
  minPrice,
  maxPrice,
}: {
  page?: number
  limit?: number
  marca?: string
  minPrice?: number
  maxPrice?: number
}) {
  try {
    const connection = await connectToDatabase()
    
    if (!connection) {
      console.error("Falha ao conectar ao banco de dados")
      return {
        cars: [],
        pagination: {
          total: 0,
          page,
          limit,
          totalPages: 0,
        },
      }
    }
    
    const { db } = connection

    const filter: any = {}
    if (marca && marca !== "all") filter.marca = marca
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.preco = {}
      if (minPrice !== undefined) filter.preco.$gte = minPrice
      if (maxPrice !== undefined) filter.preco.$lte = maxPrice
    }

    const skip = (page - 1) * limit

    const cars = await db.collection("cars").find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    const total = await db.collection("cars").countDocuments(filter)

    // Migrar carros antigos automaticamente
    const migratedCars = cars.map((car) => {
      const baseData = {
        ...car,
        _id: car._id.toString(),
      }

      if (car.imagens && Array.isArray(car.imagens)) {
        return {
          ...baseData,
          imagens: car.imagens,
          imagemPrincipal: car.imagemPrincipal || car.imagens[0] || "",
        }
      } else if (car.imagem) {
        return {
          ...baseData,
          imagens: [car.imagem],
          imagemPrincipal: car.imagem,
        }
      } else {
        return {
          ...baseData,
          imagens: [],
          imagemPrincipal: "",
        }
      }
    })

    return {
      cars: migratedCars as Car[],
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("Erro ao buscar carros:", error)
    return {
      cars: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    }
  }
}

export async function getCar(id: string): Promise<Car | null> {
  try {
    const connection = await connectToDatabase()
    
    if (!connection) {
      console.error("Falha ao conectar ao banco de dados")
      return null
    }
    
    const { db } = connection

    if (!ObjectId.isValid(id)) {
      return null
    }

    const car = await db.collection("cars").findOne({ _id: new ObjectId(id) })

    if (!car) {
      return null
    }

    const baseData = {
      ...car,
      _id: car._id.toString(),
    }

    // Migrar carro antigo automaticamente
    if (car.imagens && Array.isArray(car.imagens)) {
      return {
        ...baseData,
        imagens: car.imagens,
        imagemPrincipal: car.imagemPrincipal || car.imagens[0] || "",
      } as Car
    } else if (car.imagem) {
      return {
        ...baseData,
        imagens: [car.imagem],
        imagemPrincipal: car.imagem,
      } as Car
    } else {
      return {
        ...baseData,
        imagens: [],
        imagemPrincipal: "",
      } as Car
    }
  } catch (error) {
    console.error("Erro ao buscar carro:", error)
    return null
  }
}