import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  const diagnostico = {
    timestamp: new Date().toISOString(),
    status: "iniciando",
    testes: {
      mongodb: {
        status: "pendente",
        detalhes: null as any,
      },
      colecoes: {
        cars: {
          status: "pendente",
          contagem: 0,
          amostra: null as any,
        },
        messages: {
          status: "pendente",
          contagem: 0,
          amostra: null as any,
        },
      },
    },
    erros: [] as string[],
  }

  try {
    // Teste de conexão com MongoDB
    diagnostico.status = "testando_mongodb"
    try {
      const { client, db } = await connectToDatabase()
      const adminDb = db.admin()
      const ping = await adminDb.ping()

      diagnostico.testes.mongodb.status = "ok"
      diagnostico.testes.mongodb.detalhes = {
        ping: ping,
        versao: await adminDb.serverInfo().then((info) => info.version),
      }
    } catch (error) {
      diagnostico.testes.mongodb.status = "erro"
      diagnostico.testes.mongodb.detalhes = error instanceof Error ? error.message : String(error)
      diagnostico.erros.push("Falha na conexão com MongoDB")
    }

    // Teste da coleção cars
    diagnostico.status = "testando_colecao_cars"
    try {
      const { db } = await connectToDatabase()
      const count = await db.collection("cars").countDocuments()
      const sample = await db.collection("cars").find().limit(1).toArray()

      diagnostico.testes.colecoes.cars.status = "ok"
      diagnostico.testes.colecoes.cars.contagem = count
      diagnostico.testes.colecoes.cars.amostra =
        sample.length > 0
          ? {
              _id: sample[0]._id.toString(),
              nome: sample[0].nome,
              marca: sample[0].marca,
              temImagem: !!sample[0].imagem || (sample[0].imagens && sample[0].imagens.length > 0),
            }
          : null
    } catch (error) {
      diagnostico.testes.colecoes.cars.status = "erro"
      diagnostico.erros.push("Falha ao acessar coleção cars")
    }

    // Teste da coleção messages
    diagnostico.status = "testando_colecao_messages"
    try {
      const { db } = await connectToDatabase()
      const count = await db.collection("messages").countDocuments()
      const sample = await db.collection("messages").find().limit(1).toArray()

      diagnostico.testes.colecoes.messages.status = "ok"
      diagnostico.testes.colecoes.messages.contagem = count
      diagnostico.testes.colecoes.messages.amostra =
        sample.length > 0
          ? {
              _id: sample[0]._id.toString(),
              assunto: sample[0].assunto,
              status: sample[0].status,
            }
          : null
    } catch (error) {
      diagnostico.testes.colecoes.messages.status = "erro"
      diagnostico.erros.push("Falha ao acessar coleção messages")
    }

    // Finalização
    diagnostico.status = diagnostico.erros.length > 0 ? "com_erros" : "ok"

    return NextResponse.json(diagnostico)
  } catch (error) {
    diagnostico.status = "erro_fatal"
    diagnostico.erros.push(error instanceof Error ? error.message : String(error))
    return NextResponse.json(diagnostico, { status: 500 })
  }
}
