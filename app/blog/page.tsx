import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { blogPosts } from '@/data/blogData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our blog',
  description: 'Browse our blog',
};

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen font-sans text-dark">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Our Journal</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Davici Blog</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Design ideas, furniture tips, and inspiration for your modern home.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
                <article key={post.id} className="group flex flex-col h-full">
                    {/* Image */}
                    <Link href={`/blog/${post.slug}`} className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 block">
                        <Image 
                            src={post.image} 
                            alt={post.title} 
                            fill 
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-dark">
                            {post.category}
                        </div>
                    </Link>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-gray-400 mb-3 gap-2">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.author}</span>
                        </div>
                        <h2 className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition">
                            <Link href={`/blog/${post.slug}`}>
                                {post.title}
                            </Link>
                        </h2>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                        </p>
                        <Link href={`/blog/${post.slug}`} className="text-dark font-bold text-sm underline decoration-gray-300 hover:decoration-primary underline-offset-4 transition self-start">
                            Read Article
                        </Link>
                    </div>
                </article>
            ))}
        </div>
      </main>
    </div>
  );
}