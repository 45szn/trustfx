// // app/(landingpage)/blogs/[slug]/page.tsx
// import BlogPost from "../components/BlogPost";
// import RelatedPosts from "../components/RelatedPosts";
// import BlogNewsletter from "../components/BlogNewsletter";

// // ✅ DO NOT type 'params' manually at the function level
// export default function BlogPostPage({ params }: { params: { slug: string } }) {
//   return (
//     <>
//       <BlogPost slug={params.slug} />
//       <RelatedPosts />
//       <BlogNewsletter />
//     </>
//   );
// }





// app/(landingpage)/blogs/[slug]/page.tsx
import BlogPost from "../components/BlogPost";
import RelatedPosts from "../components/RelatedPosts";
import BlogNewsletter from "../components/BlogNewsletter";

interface PageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: PageProps) {
  return (
    <>
      {/* <BlogPost slug={params.slug} /> */}
      <RelatedPosts />
      <BlogNewsletter />
    </>
  );
}
