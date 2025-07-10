"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Share2, Bookmark, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPostProps {
  slug: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  authorBio: string;
  publishDate: Timestamp;
  readTime: string;
  img: string;
  tags: string[];
  formattedDate: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const q = query(collection(db, "blogs"), where("slug", "==", slug));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        router.push("/404");
        return;
      }

      const doc = snapshot.docs[0];
      const data = doc.data();
      const publishDate = (data.publishDate as Timestamp).toDate();

      setPost({
        id: doc.id,
        ...data,
        publishDate,
        formattedDate: publishDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      } as unknown as Post);
    };

    fetchPost();
  }, [router, slug]);

  if (!post) return <p className="text-center py-20">Loading blog post...</p>;

  return (
    <article className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/blog">
          <Button variant="outline" className="mb-8 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {post.category}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

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
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.img || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={500}
              className="w-full h-96 object-cover"
            />
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />

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

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                About {post.author}
              </h3>
              <p className="text-gray-600 leading-relaxed">{post.authorBio}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
