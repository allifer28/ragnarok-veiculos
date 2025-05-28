"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { formatCurrency } from "@/lib/utils"

const filterSchema = z.object({
  marca: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
})

export default function CarFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [marcas, setMarcas] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000])

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      marca: searchParams.get("marca") || "",
      minPrice: searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined,
    },
  })

  useEffect(() => {
    async function fetchMarcas() {
      try {
        const response = await fetch("/api/marcas")
        if (response.ok) {
          const data = await response.json()
          setMarcas(data)
        }
      } catch (error) {
        console.error("Erro ao buscar marcas:", error)
      }
    }

    fetchMarcas()
  }, [])

  useEffect(() => {
    const minPrice = form.watch("minPrice") || 0
    const maxPrice = form.watch("maxPrice") || 500000
    setPriceRange([minPrice, maxPrice])
  }, [form.watch("minPrice"), form.watch("maxPrice")])

  function onSubmit(values: z.infer<typeof filterSchema>) {
    const params = new URLSearchParams()

    if (values.marca && values.marca !== "all") {
      params.set("marca", values.marca)
    }

    if (values.minPrice !== undefined) {
      params.set("minPrice", values.minPrice.toString())
    }

    if (values.maxPrice !== undefined) {
      params.set("maxPrice", values.maxPrice.toString())
    }

    router.push(`/catalogo?${params.toString()}`)
  }

  function clearFilters() {
    form.reset({
      marca: "",
      minPrice: undefined,
      maxPrice: undefined,
    })

    router.push("/catalogo")
  }

  return (
    <div className="bg-muted/50 p-6 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as marcas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">Todas as marcas</SelectItem>
                      {marcas.map((marca) => (
                        <SelectItem key={marca} value={marca}>
                          {marca}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Mínimo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="R$ 0"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Máximo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="R$ 500.000"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{formatCurrency(priceRange[0])}</span>
              <span>{formatCurrency(priceRange[1])}</span>
            </div>
            <Slider
              defaultValue={[0, 500000]}
              value={[priceRange[0], priceRange[1]]}
              min={0}
              max={500000}
              step={5000}
              onValueChange={(value) => {
                form.setValue("minPrice", value[0])
                form.setValue("maxPrice", value[1])
                setPriceRange(value as [number, number])
              }}
              className="my-4"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" className="flex-1">
              Aplicar Filtros
            </Button>
            <Button type="button" variant="outline" onClick={clearFilters} className="flex-1">
              Limpar Filtros
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
