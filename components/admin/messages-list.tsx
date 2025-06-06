"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Calendar, User, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  _id: string
  nome: string
  email: string
  telefone?: string
  assunto: string
  mensagem: string
  destinatario: string
  status: "novo" | "lido" | "respondido"
  createdAt: string
}

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as mensagens",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (messageId: string, status: string) => {
    try {
      const response = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageId, status }),
      })

      if (response.ok) {
        setMessages(messages.map((msg) => (msg._id === messageId ? { ...msg, status: status as any } : msg)))
        toast({
          title: "Sucesso",
          description: "Status atualizado com sucesso",
        })
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "novo":
        return "bg-red-500"
      case "lido":
        return "bg-yellow-500"
      case "respondido":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "novo":
        return "Novo"
      case "lido":
        return "Lido"
      case "respondido":
        return "Respondido"
      default:
        return "Desconhecido"
    }
  }

  if (loading) {
    return <div>Carregando mensagens...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mensagens Recebidas</h2>
        <div className="text-sm text-muted-foreground">
          Destinatário: <strong>ragnarokveiculos@gmail.com</strong>
        </div>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma mensagem</h3>
            <p className="text-muted-foreground">
              Quando alguém entrar em contato pelo site, as mensagens aparecerão aqui.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message._id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {message.nome}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {message.email}
                      </div>
                      {message.telefone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {message.telefone}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(message.createdAt)}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(message.status)}>{getStatusText(message.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Assunto:</h4>
                  <p className="text-sm">{message.assunto}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Mensagem:</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">{message.mensagem}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  {message.status === "novo" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(message._id, "lido")}>
                      Marcar como Lido
                    </Button>
                  )}
                  {message.status === "lido" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(message._id, "respondido")}>
                      Marcar como Respondido
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.assunto}`)}
                  >
                    Responder por Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
