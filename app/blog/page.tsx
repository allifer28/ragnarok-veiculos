import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock } from "lucide-react"
import Footer from "@/components/footer"
import { getBlogPosts } from "@/lib/blog"
import ScrollReveal from "@/components/scroll-reveal"

export const metadata = {
  title: "Blog | Ragnarok Veículos",
  description: "Confira as últimas notícias, dicas e novidades sobre o mundo automotivo.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Automotivo</h1>
        <p className="text-lg text-muted-foreground">
          Confira as últimas notícias, dicas e novidades sobre o mundo automotivo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Suspense fallback={<BlogSkeleton />}>
          {posts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.1} width="100%">
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 w-full">
                    <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex gap-2 mb-3">
                      {post.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readingTime} min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </Suspense>
      </div>

      <Footer />
    </div>
  )
}

function BlogSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-5">
            <div className="flex gap-2 mb-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-7 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
