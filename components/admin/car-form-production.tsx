"use client"

import React from "react"
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
import { X, Upload, Star, AlertCircle, CheckCircle } from "lucide-react"
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
  imagens: z.array(z.string()).min(1, {
    message: "Pelo menos uma imagem é obrigatória.",
  }),
  imagemPrincipal: z.string().optional(),
})

interface CarFormProps {
  initialData?: Car
}

export default function CarFormProduction({ initialData }: CarFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>(
    initialData?.imagens || (initialData?.imagem ? [initialData.imagem] : []),
  )
  const [imagemPrincipal, setImagemPrincipal] = useState<string>(
    initialData?.imagemPrincipal || initialData?.imagem || "",
  )
  const [uploadingFiles, setUploadingFiles] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [configStatus, setConfigStatus] = useState<"checking" | "ok" | "error">("checking")
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
      imagens: images,
      imagemPrincipal: imagemPrincipal,
    },
  })

  // Verificar configuração do ambiente
  React.useEffect(() => {
    async function checkConfig() {
      try {
        const response = await fetch("/api/config-check")
        if (response.ok) {
          setConfigStatus("ok")
        } else {
          setConfigStatus("error")
        }
      } catch (error) {
        setConfigStatus("error")
      }
    }
    checkConfig()
  }, [])

  const handleImageUpload = async (files: FileList): Promise<string[]> => {
    const uploadPromises = Array.from(files).map(async (file, index) => {
      const fileId = `${Date.now()}-${index}`
      setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }))

      try {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Erro ao fazer upload da imagem ${file.name}`)
        }

        const data = await response.json()
        setUploadProgress((prev) => ({ ...prev, [fileId]: 100 }))

        // Remover do progresso após um tempo
        setTimeout(() => {
          setUploadProgress((prev) => {
            const newProgress = { ...prev }
            delete newProgress[fileId]
            return newProgress
          })
        }, 2000)

        return data.url
      } catch (error) {
        setUploadProgress((prev) => {
          const newProgress = { ...prev }
          delete newProgress[fileId]
          return newProgress
        })
        throw error
      }
    })

    return Promise.all(uploadPromises)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files

    if (selectedFiles && selectedFiles.length > 0) {
      setUploadingFiles(true)

      try {
        const newImageUrls = await handleImageUpload(selectedFiles)
        const updatedImages = [...images, ...newImageUrls]

        setImages(updatedImages)
        form.setValue("imagens", updatedImages)

        // Se não há imagem principal, definir a primeira como principal
        if (!imagemPrincipal && updatedImages.length > 0) {
          setImagemPrincipal(updatedImages[0])
          form.setValue("imagemPrincipal", updatedImages[0])
        }

        toast({
          title: "Sucesso",
          description: `${newImageUrls.length} imagem(ns) enviada(s) com sucesso`,
        })
      } catch (error) {
        console.error("Erro no upload:", error)
        toast({
          title: "Erro no Upload",
          description: error instanceof Error ? error.message : "Erro ao fazer upload das imagens",
          variant: "destructive",
        })
      } finally {
        setUploadingFiles(false)
        // Limpar o input
        e.target.value = ""
      }
    }
  }

  const removeImage = (indexToRemove: number) => {
    const imageToRemove = images[indexToRemove]
    const updatedImages = images.filter((_, index) => index !== indexToRemove)

    setImages(updatedImages)
    form.setValue("imagens", updatedImages)

    // Se a imagem removida era a principal, definir uma nova
    if (imageToRemove === imagemPrincipal && updatedImages.length > 0) {
      setImagemPrincipal(updatedImages[0])
      form.setValue("imagemPrincipal", updatedImages[0])
    } else if (updatedImages.length === 0) {
      setImagemPrincipal("")
      form.setValue("imagemPrincipal", "")
    }
  }

  const setAsMainImage = (imageUrl: string) => {
    setImagemPrincipal(imageUrl)
    form.setValue("imagemPrincipal", imageUrl)

    toast({
      title: "Imagem principal definida",
      description: "Esta imagem será exibida nos cards do catálogo",
    })
  }

  async function onSubmit(values: z.infer<typeof carSchema>) {
    setIsSubmitting(true)

    try {
      const carData = {
        ...values,
        preco: Number.parseFloat(values.preco),
        imagens: images,
        imagemPrincipal: imagemPrincipal || images[0],
      }

      const url = initialData ? `/api/cars/${initialData._id}` : "/api/cars"
      const method = initialData ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Erro ao ${initialData ? "atualizar" : "adicionar"} veículo`)
      }

      toast({
        title: "Sucesso",
        description: `Veículo ${initialData ? "atualizado" : "adicionado"} com sucesso`,
      })

      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error("Erro ao salvar veículo:", error)
      toast({
        title: "Erro",
        description:
          error instanceof Error
            ? error.message
            : `Não foi possível ${initialData ? "atualizar" : "adicionar"} o veículo`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Status da Configuração */}
      {configStatus === "error" && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Configuração Incompleta:</strong> Configure as variáveis de ambiente MONGODB_URI e
            BLOB_READ_WRITE_TOKEN para usar todas as funcionalidades.
          </AlertDescription>
        </Alert>
      )}

      {configStatus === "ok" && (
        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Sistema Configurado:</strong> Todas as funcionalidades estão disponíveis.
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

          {/* Seção de Upload de Imagens */}
          <FormField
            control={form.control}
            name="imagens"
            render={() => (
              <FormItem>
                <FormLabel>Imagens do Veículo</FormLabel>
                <div className="space-y-4">
                  {/* Botão de Upload */}
                  <div className="flex flex-col space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="images-upload"
                      disabled={uploadingFiles || configStatus === "error"}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("images-upload")?.click()}
                      disabled={uploadingFiles || configStatus === "error"}
                      className="w-full sm:w-auto"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {uploadingFiles ? "Fazendo upload..." : "Adicionar Imagens"}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Você pode selecionar múltiplas imagens de uma vez. Formatos aceitos: JPG, PNG, WEBP (máx. 5MB
                      cada)
                    </p>
                  </div>

                  {/* Progresso do Upload */}
                  {Object.keys(uploadProgress).length > 0 && (
                    <div className="space-y-2">
                      {Object.entries(uploadProgress).map(([fileId, progress]) => (
                        <div key={fileId} className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Grid de Imagens */}
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

                            {/* Overlay com ações */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant={imagemPrincipal === imageUrl ? "default" : "secondary"}
                                onClick={() => setAsMainImage(imageUrl)}
                                className="h-8 w-8 p-0"
                              >
                                <Star className={`h-4 w-4 ${imagemPrincipal === imageUrl ? "fill-current" : ""}`} />
                              </Button>
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

                            {/* Indicador de imagem principal */}
                            {imagemPrincipal === imageUrl && (
                              <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                                Principal
                              </div>
                            )}

                            {/* Número da imagem */}
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {index + 1}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Instruções */}
                  {images.length > 0 && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Instruções:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Clique na estrela para definir como imagem principal</li>
                        <li>• Clique no X para remover uma imagem</li>
                        <li>• A imagem principal será exibida nos cards do catálogo</li>
                        <li>• Todas as imagens serão exibidas na página de detalhes</li>
                      </ul>
                    </div>
                  )}

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || uploadingFiles || configStatus === "error"}>
              {isSubmitting ? "Salvando..." : initialData ? "Atualizar Veículo" : "Adicionar Veículo"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
