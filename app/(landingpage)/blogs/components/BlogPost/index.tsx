"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Share2, Bookmark, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogPostProps {
  slug: string
}

// This would typically come from a CMS or API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBlogPost = (slug: string) => {
  return {
    id: 1,
    title: "The Future of AI in Investment Management: What Investors Need to Know",
    content: `
      <p>Artificial Intelligence is fundamentally transforming the investment management landscape, offering unprecedented opportunities for both institutional and individual investors. As we move deeper into 2024, understanding how AI impacts investment decisions has become crucial for anyone looking to optimize their portfolio performance.</p>

      <h2>The AI Revolution in Finance</h2>
      <p>Machine learning algorithms can now process vast amounts of market data in real-time, identifying patterns and opportunities that would be impossible for human analysts to detect. This technological advancement has led to more sophisticated risk management strategies and improved return predictions.</p>

      <h2>Key Benefits of AI-Powered Investment Strategies</h2>
      <ul>
        <li><strong>Enhanced Risk Assessment:</strong> AI models can analyze thousands of risk factors simultaneously, providing more accurate risk profiles for investments.</li>
        <li><strong>Real-time Market Analysis:</strong> Continuous monitoring of market conditions allows for immediate strategy adjustments.</li>
        <li><strong>Emotion-free Decision Making:</strong> AI eliminates emotional biases that often lead to poor investment decisions.</li>
        <li><strong>Portfolio Optimization:</strong> Advanced algorithms can optimize asset allocation based on individual risk tolerance and goals.</li>
      </ul>

      <h2>How TrustFx Leverages AI Technology</h2>
      <p>At TrustFx, we've integrated cutting-edge AI systems into our investment platform to deliver superior results for our clients. Our proprietary algorithms analyze market trends, economic indicators, and global events to make informed investment decisions on behalf of our users.</p>

      <p>Our AI-powered approach has consistently outperformed traditional investment methods, delivering average returns of 15-25% while maintaining strict risk management protocols.</p>

      <h2>The Future Outlook</h2>
      <p>As AI technology continues to evolve, we expect even more sophisticated investment strategies to emerge. The integration of natural language processing, sentiment analysis, and predictive modeling will further enhance our ability to generate consistent returns for investors.</p>

      <p>For investors looking to capitalize on these technological advances, partnering with a platform that embraces AI innovation is essential for long-term success.</p>
    `,
    category: "Technology",
    author: "Dr. Sarah Chen",
    authorRole: "Chief Investment Officer",
    authorBio:
      "Dr. Sarah Chen is TrustFx's Chief Investment Officer with over 15 years of experience in quantitative finance and AI applications in investment management.",
    publishDate: "Dec 15, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=500&width=800",
    tags: ["AI", "Investment Management", "Technology", "Portfolio Optimization"],
  }
}

export default function BlogPost({ slug }: BlogPostProps) {
  const post = getBlogPost(slug)

  return (
    <article className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="outline" className="mb-8 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">{post.category}</Badge>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

          {/* Author Info */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-500">{post.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={500}
              className="w-full h-96 object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Tags */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author}</h3>
              <p className="text-gray-600 leading-relaxed">{post.authorBio}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
