import BlogHero from "./components/BlogHero";
import FeaturedPosts from "./components/FeaturedPosts";
import BlogGrid from "./components/BlogGrid";
// import BlogCategories from "./components/BlogCategories";
import BlogNewsletter from "./components/BlogNewsletter";

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <FeaturedPosts />
      {/* <BlogCategories /> */}
      <BlogGrid />
      <BlogNewsletter />
    </>
  );
}
