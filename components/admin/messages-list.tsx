"use client"

import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Mail, MailOpen } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface Message {
  _id: string
  nome: string
  email: string
  telefone?: string
  assunto: string
  mensagem: string
  read: boolean
  createdAt: string
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      setLoading(true)
      const response = await fetch("/api/contact")
      if (response.ok) {
        const data = await response.json()
        console.log("Mensagens carregadas:", data)
        setMessages(data)
      } else {
        throw new Error("Erro ao buscar mensagens")
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

  const handleDeleteClick = (message: Message) => {
    setMessageToDelete(message)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return

    try {
      const response = await fetch(`/api/contact/${messageToDelete._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMessages(messages.filter((msg) => msg._id !== messageToDelete._id))

        toast({
          title: "Sucesso",
          description: "Mensagem removida com sucesso",
        })
      } else {
        throw new Error("Erro ao excluir mensagem")
      }
    } catch (error) {
      console.error("Erro ao excluir mensagem:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a mensagem",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setMessageToDelete(null)
    }
  }

  const toggleReadStatus = async (message: Message) => {
    try {
      console.log(`Alterando status de leitura para mensagem ${message._id}: ${!message.read}`)

      const response = await fetch(`/api/contact/${message._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: !message.read }),
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()
      console.log("Resposta da API:", data)

      if (data.success) {
        // Atualizar o estado local
        setMessages(messages.map((msg) => (msg._id === message._id ? { ...msg, read: !msg.read } : msg)))

        toast({
          title: "Sucesso",
          description: message.read ? "Mensagem marcada como não lida" : "Mensagem marcada como lida",
        })
      } else {
        throw new Error(data.error || "Erro ao atualizar status da mensagem")
      }
    } catch (error) {
      console.error("Erro ao atualizar status da mensagem:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status da mensagem",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <p>Carregando mensagens...</p>
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h3 className="text-xl font-medium mb-2">Nenhuma mensagem recebida</h3>
        <p className="text-muted-foreground">As mensagens enviadas através do formulário de contato aparecerão aqui.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <Card key={message._id} className={message.read ? "bg-card" : "bg-muted/20 border-primary/20"}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{message.assunto}</h3>
                <p className="text-muted-foreground">
                  De: {message.nome} ({message.email}){message.telefone && ` • Tel: ${message.telefone}`}
                </p>
              </div>
              <Badge variant={message.read ? "outline" : "default"}>{message.read ? "Lida" : "Não lida"}</Badge>
            </div>
            <div className="mt-4 bg-muted/30 p-4 rounded-md">
              <p className="whitespace-pre-wrap">{message.mensagem}</p>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Recebida {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale: ptBR })}
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 bg-muted/10 flex justify-between">
            <Button variant="outline" size="sm" onClick={() => toggleReadStatus(message)}>
              {message.read ? (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Marcar como não lida
                </>
              ) : (
                <>
                  <MailOpen className="mr-2 h-4 w-4" />
                  Marcar como lida
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => handleDeleteClick(message)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </CardFooter>
        </Card>
      ))}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
