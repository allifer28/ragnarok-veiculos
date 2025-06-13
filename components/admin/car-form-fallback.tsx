"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { X, Upload, AlertCircle } from "lucide-react"
import type { Car } from "@/lib/types"

const carSchema = z.object({
  nome: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  marca: z.string().min(2, {
    message: "A marca deve ter pelo menos 2 caracteres.",
  }),
  modelo: z.string().optional(),
  ano: z.string().optional(),
  km: z.string().optional(),
  combustivel: z.string().optional(),
  cor: z.string().optional(),
  preco: z.string().min(1, {
    message: "O preço é obrigatório.",
  }),
  descricao: z.string().optional(),
})

interface CarFormProps {
  initialData?: Car
}

export default function CarFormFallback({ initialData }: CarFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>(["/placeholder.svg?height=400&width=600"])
  const [uploadingFiles, setUploadingFiles] = useState<boolean>(false)
  const [isDemo, setIsDemo] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      nome: initialData?.nome || "",
      marca: initialData?.marca || "",
      modelo: initialData?.modelo || "",
      ano: initialData?.ano || "",
      km: initialData?.km || "",
      combustivel: initialData?.combustivel || "",
      cor: initialData?.cor || "",
      preco: initialData?.preco ? initialData.preco.toString() : "",
      descricao: initialData?.descricao || "",
    },
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files

    if (selectedFiles && selectedFiles.length > 0) {
      setUploadingFiles(true)

      try {
        // Tentar upload real primeiro
        let uploadSuccess = false

        try {
          const formData = new FormData()
          formData.append("file", selectedFiles[0])

          const response = await fetch("/api/upload-blob", {
            method: "POST",
            body: formData,
          })

          if (response.ok) {
            const data = await response.json()
            setImages([...images, data.url])
            uploadSuccess = true
          }
        } catch (error) {
          console.log("Upload real falhou, usando fallback")
        }

        if (!uploadSuccess) {
          // Usar fallback
          setIsDemo(true)
          const mockUrls = Array.from(selectedFiles).map(
            (_, index) => `/placeholder.svg?height=400&width=600&text=Imagem+${images.length + index + 1}`,
          )
          setImages([...images, ...mockUrls])
        }

        toast({
          title: isDemo ? "Upload Simulado" : "Sucesso",
          description: `${selectedFiles.length} imagem(ns) ${isDemo ? "simulada(s)" : "adicionada(s)"} com sucesso`,
        })
      } catch (error) {
        console.error("Erro no upload:", error)
        toast({
          title: "Erro",
          description: "Erro ao fazer upload das imagens",
          variant: "destructive",
        })
      } finally {
        setUploadingFiles(false)
        e.target.value = ""
      }
    }
  }

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove)
    setImages(updatedImages)
  }

  async function onSubmit(values: z.infer<typeof carSchema>) {
    setIsSubmitting(true)

    try {
      const carData = {
        ...values,
        preco: Number.parseFloat(values.preco),
        imagens: images,
        imagemPrincipal: images[0],
      }

      // Tentar API real primeiro
      let success = false

      try {
        const url = initialData ? `/api/cars-serverless/${initialData._id}` : "/api/cars-serverless"
        const method = initialData ? "PUT" : "POST"

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carData),
        })

        if (response.ok) {
          success = true
        }
      } catch (error) {
        console.log("API real falhou, usando fallback")
      }

      if (!success) {
        // Usar fallback
        await fetch("/api/cars-fallback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carData),
        })
        setIsDemo(true)
      }

      toast({
        title: "Sucesso",
        description: `Veículo ${initialData ? "atualizado" : "adicionado"} ${isDemo ? "(modo demo)" : "com sucesso"}`,
      })

      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error("Erro ao salvar veículo:", error)
      toast({
        title: "Erro",
        description: `Não foi possível ${initialData ? "atualizar" : "adicionar"} o veículo`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {isDemo && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Modo Demonstração:</strong> Configure MONGODB_URI e BLOB_READ_WRITE_TOKEN para funcionalidade
            completa.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Veículo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Honda Civic EXL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Honda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Civic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 2022/2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="km"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quilometragem</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 15000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="combustivel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Combustível</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Flex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Preto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 120000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva o veículo, seus opcionais e características..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Seção de Imagens Simplificada */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Imagens do Veículo</label>

            <div className="flex flex-col space-y-2">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="images-upload"
                disabled={uploadingFiles}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("images-upload")?.click()}
                disabled={uploadingFiles}
                className="w-full sm:w-auto"
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploadingFiles ? "Fazendo upload..." : "Adicionar Imagens"}
              </Button>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-border">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`Imagem ${index + 1}`}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => removeImage(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || uploadingFiles}>
              {isSubmitting ? "Salvando..." : initialData ? "Atualizar Veículo" : "Adicionar Veículo"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
