import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import { getBlogPost, getRelatedPosts } from "@/lib/blog"
import ScrollReveal from "@/components/scroll-reveal"
import ShareButtons from "@/components/share-buttons"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post não encontrado | Ragnarok Veículos",
      description: "O artigo que você está procurando não foi encontrado.",
    }
  }

  return {
    title: `${post.title} | Blog Ragnarok Veículos`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.categories[0])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Blog
          </Link>
        </Button>

        <ScrollReveal>
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {post.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-muted-foreground mb-6">
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readingTime} min de leitura</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-8">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row gap-8">
          <ScrollReveal delay={0.2} className="w-full md:w-2/3">
            <article className="prose prose-lg dark:prose-invert max-w-none blog-content">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Compartilhar este artigo</h3>
              <ShareButtons title={post.title} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="w-full md:w-1/3">
            <div className="sticky top-24">
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Autor</h3>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Artigos Relacionados</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="flex items-start group"
                      >
                        <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 mr-3">
                          <Image
                            src={relatedPost.coverImage || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">{relatedPost.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Footer />
    </div>
  )
}
