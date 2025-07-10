import BlogPost from "../components/BlogPost";
import RelatedPosts from "../components/RelatedPosts";
import BlogNewsletter from "../components/BlogNewsletter";
// import { use } from "react";

// interface PageProps {
//   params: { slug: string };
// }

export default async function BlogPostPage({ params }: {params: Promise<{ slug: string }>}) {
  return (
    <>
      <BlogPost slug={(await params).slug} />
      <RelatedPosts />
      <BlogNewsletter />
    </>
  );
}

