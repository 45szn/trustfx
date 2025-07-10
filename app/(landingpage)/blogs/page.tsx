"use client";

import BlogHero from "./components/BlogHero";
import FeaturedPosts from "./components/FeaturedPosts";
import BlogGrid from "./components/BlogGrid";
// import BlogCategories from "./components/BlogCategories";
import BlogNewsletter from "./components/BlogNewsletter";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/lib/firebase";
import { useState } from "react";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [posts, setPosts] = useState<any[]>([]);

  //   useEffect(() => {
  //   const fetchPosts = async () => {
  //     const snapshot = await getDocs(collection(db, "blogs"));
  //     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     setPosts(data);
  //   };

  //   fetchPosts();
  // }, []);

  // const filteredPosts = posts.filter((post) =>
  //   post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   post.category.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
      <BlogHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* <BlogHero /> */}
      <FeaturedPosts />
      {/* <BlogCategories /> */}
      <BlogGrid />
      <BlogNewsletter />
    </>
  );
}
