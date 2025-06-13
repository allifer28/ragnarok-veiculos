"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function CarFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [marcas, setMarcas] = useState<string[]>([])
  const [selectedMarca, setSelectedMarca] = useState<string>(searchParams.get("marca") || "all")
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 1000000,
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMarcas() {
      try {
        setLoading(true)
        // Usar a API correta e adicionar timestamp para evitar cache
        const response = await fetch(`/api/marcas?t=${Date.now()}`)

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`)
        }

        const data = await response.json()
        console.log("Dados da API de marcas:", data)

        if (Array.isArray(data) && data.length > 0) {
          setMarcas(data)
        } else {
          console.warn("API retornou array vazio ou formato inválido:", data)
        }
      } catch (error) {
        console.error("Erro ao buscar marcas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMarcas()
  }, [])

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedMarca && selectedMarca !== "all") {
      params.set("marca", selectedMarca)
    } else {
      params.delete("marca")
    }

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())
    params.set("page", "1") // Reset para primeira página ao filtrar

    router.push(`/catalogo?${params.toString()}`)
  }

  const handleMarcaChange = (value: string) => {
    setSelectedMarca(value)
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]])
  }

  return (
    <div className="space-y-6 p-6 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="marca">Marca</Label>
          <Select value={selectedMarca} onValueChange={handleMarcaChange}>
            <SelectTrigger id="marca">
              <SelectValue placeholder="Todas as marcas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as marcas</SelectItem>
              {marcas.map((marca) => (
                <SelectItem key={marca} value={marca}>
                  {marca}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {loading && <p className="text-sm text-muted-foreground">Carregando marcas...</p>}
          {!loading && marcas.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma marca encontrada</p>}
        </div>

        <div className="space-y-2">
          <Label>Faixa de Preço</Label>
          <div className="pt-6 px-2">
            <Slider
              defaultValue={priceRange}
              min={0}
              max={1000000}
              step={10000}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="my-6"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">R$ {priceRange[0].toLocaleString("pt-BR")}</span>
              <span className="text-sm">R$ {priceRange[1].toLocaleString("pt-BR")}</span>
            </div>
          </div>
        </div>

        <Button onClick={applyFilters} className="w-full">
          Aplicar Filtros
        </Button>
      </div>
    </div>
  )
}
