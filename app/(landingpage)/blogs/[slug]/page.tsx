import { Metadata } from "next"
import BlogPost from "../components/BlogPost"
import RelatedPosts from "../components/RelatedPosts"
import BlogNewsletter from "../components/BlogNewsletter"

interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: PageProps) {
  return (
    <>
      <BlogPost slug={params.slug} />
      <RelatedPosts />
      <BlogNewsletter />
    </>
  )
}

// optional for SEO
export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `${params.slug.replace(/-/g, " ")} | Blog - TrustFx`,
  }
}

export async function generateStaticParams() {
  return [
    { slug: "market-volatility-2024-strategies" },
    { slug: "cryptocurrency-traditional-portfolios" },
    { slug: "risk-management-101" },
    { slug: "the-future-of-ai-in-investment-management" },
  ]
}




// import BlogPost from "../components/BlogPost";
// import RelatedPosts from "../components/RelatedPosts";
// import BlogNewsletter from "../components/BlogNewsletter";

// interface BlogPostPageProps {
//   params: {
//     slug: string
//   }
// }

// export default function BlogPostPage({ params }: BlogPostPageProps) {
//   return (
//     <>
//       <BlogPost slug={params.slug} />
//       <RelatedPosts />
//       <BlogNewsletter />
//     </>
//   )
// }
