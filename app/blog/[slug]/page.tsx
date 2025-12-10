import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { blogPosts } from '@/data/blogData';
import { Metadata } from 'next';

// Definisikan params sebagai Promise (Next.js 15 Standard)
interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
      type: 'article',
      authors: [post.author],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="bg-white min-h-screen font-sans text-dark">
      <Navbar />

      <article>
        {/* Hero Image */}
        <div className="relative w-full h-[400px] md:h-[500px]">
            <Image 
                src={post.image}
                alt={post.title}
                fill
                className="object-cover brightness-75"
                priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center text-white max-w-4xl">
                    <span className="bg-primary px-3 py-1 rounded text-xs font-bold mb-4 inline-block">{post.category}</span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
                    <div className="flex items-center justify-center gap-4 text-sm opacity-90">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            {/* Kita render HTML string dari mock data */}
            <div 
                className="prose prose-lg prose-orange mx-auto text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                <Link href="/blog" className="flex items-center gap-2 text-dark font-bold hover:text-primary transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Blog
                </Link>
                
                {/* Share Dummy */}
                <div className="flex gap-2 text-sm text-gray-500">
                    <span>Share this:</span>
                    <button className="hover:text-primary font-bold">FB</button>
                    <button className="hover:text-primary font-bold">TW</button>
                    <button className="hover:text-primary font-bold">IG</button>
                </div>
            </div>
        </div>
      </article>
      
    </div>
  );
}