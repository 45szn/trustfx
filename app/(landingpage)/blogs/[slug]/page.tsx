import BlogPost from "../components/BlogPost";
import RelatedPosts from "../components/RelatedPosts";
import BlogNewsletter from "../components/BlogNewsletter";

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <>
      <BlogPost slug={params.slug} />
      <RelatedPosts />
      <BlogNewsletter />
    </>
  )
}
