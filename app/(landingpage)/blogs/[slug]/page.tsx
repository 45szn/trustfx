// app/(landingpage)/blogs/[slug]/page.tsx
import BlogPost from "../components/BlogPost";
import RelatedPosts from "../components/RelatedPosts";
import BlogNewsletter from "../components/BlogNewsletter";

export const dynamic = "force-static"; // Optional: if you use static generation

const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <BlogPost slug={params.slug} />
      <RelatedPosts />
      <BlogNewsletter />
    </>
  );
};

export default BlogPostPage;





// // app/(landingpage)/blogs/[slug]/page.tsx
// import BlogPost from "../components/BlogPost";
// import RelatedPosts from "../components/RelatedPosts";
// import BlogNewsletter from "../components/BlogNewsletter";

// interface PageProps {
//   params: { slug: string };
// }

// export default async function BlogPostPage({ params }: PageProps) {
//   return (
//     <>
//       <BlogPost slug={params.slug} />
//       <RelatedPosts />
//       <BlogNewsletter />
//     </>
//   );
// }
