import BlogPost from "../components/BlogPost";
import RelatedPosts from "../components/RelatedPosts";
import BlogNewsletter from "../components/BlogNewsletter";

interface PageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: PageProps) {
  return (
    <>
      <BlogPost slug={params.slug} />
      <RelatedPosts />
      <BlogNewsletter />
    </>
  );
}

