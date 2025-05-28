import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Car } from "@/lib/types"

export async function getFeaturedCars(): Promise<Car[]> {
  try {
    const { db } = await connectToDatabase()

    const cars = await db.collection("cars").find({}).sort({ createdAt: -1 }).limit(6).toArray()

    // Migrar carros antigos automaticamente
    const migratedCars = cars.map((car) => {
      if (car.imagem && !car.imagens) {
        return {
          ...car,
          _id: car._id.toString(),
          imagens: [car.imagem],
          imagemPrincipal: car.imagem,
        }
      }
      return {
        ...car,
        _id: car._id.toString(),
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
    const { db } = await connectToDatabase()

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
      if (car.imagem && !car.imagens) {
        return {
          ...car,
          _id: car._id.toString(),
          imagens: [car.imagem],
          imagemPrincipal: car.imagem,
        }
      }
      return {
        ...car,
        _id: car._id.toString(),
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
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(id)) {
      return null
    }

    const car = await db.collection("cars").findOne({ _id: new ObjectId(id) })

    if (!car) {
      return null
    }

    // Migrar carro antigo automaticamente
    if (car.imagem && !car.imagens) {
      return {
        ...car,
        _id: car._id.toString(),
        imagens: [car.imagem],
        imagemPrincipal: car.imagem,
      } as Car
    }

    return {
      ...car,
      _id: car._id.toString(),
    } as Car
  } catch (error) {
    console.error("Erro ao buscar carro:", error)
    return null
  }
}
