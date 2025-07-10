import BlogPost from "../components/BlogPost";
import RelatedPosts from "../components/RelatedPosts";
import BlogNewsletter from "../components/BlogNewsletter";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <>
      <BlogPost slug={(await params).slug} />
      <RelatedPosts />
      <BlogNewsletter />
    </>
  );
}
