import { MongoClient } from "mongodb"

// Definir a tipagem para o objeto global
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ragnarok_veiculos"

const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  connectTimeoutMS: 10000, // Give up initial connection after 10s
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Em desenvolvimento, use uma variável global para que a conexão
// seja reutilizada entre recarregamentos de página
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // Em produção, é melhor não usar uma variável global
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise
    const db = client.db()
    
    // Test the connection
    await db.admin().ping()
    
    return { client, db }
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error)
    
    // Provide more helpful error message
    if (error.message?.includes('ECONNREFUSED')) {
      console.warn("MongoDB não está disponível. Usando dados de fallback.")
      // Return null to indicate no database connection
      return null
    }
    
    throw new Error("Não foi possível conectar ao banco de dados: " + error.message)
  }
}

// Exportar clientPromise para ser usado em outros lugares
export { clientPromise }