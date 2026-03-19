"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink, Heart, MessageCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CustomBadge from '../shared/custom-badge';

interface InstaPost {
  id: string;
  image: string;
  caption: string;
  link: string;
  timestamp: string;
}

function PostSkeleton() {
  return (
    <div className="aspect-square rounded-2xl bg-white/5 border border-white/5 animate-pulse" />
  );
}

export default function InstagramFeed() {
  const t = useTranslations('Home.Instagram');
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/instagram')
      .then((r) => {
        if (!r.ok) throw new Error('Failed');
        return r.json();
      })
      .then((data) => {
        setPosts(data.posts ?? []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-[#060609]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <CustomBadge title="Instagram" />
            <h2
              className="text-4xl md:text-5xl  tracking-tight text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {t('title')}
            </h2>
            <p className="text-neutral-400 max-w-lg text-sm">{t('description')}</p>
          </div>

          <a
            href="https://www.instagram.com/thewalkingjumbo/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-fit"
          >
            <span className="text-sm font-semibold">@thewalkingjumbo</span>
            <ExternalLink
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
            <Instagram size={32} />
            <p className="text-sm">Could not load Instagram posts. Check your access token.</p>
            <a
              href="https://www.instagram.com/thewalkingjumbo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 text-sm hover:underline"
            >
              Visit on Instagram →
            </a>
          </div>
        )}

        {/* Grid */}
        {!error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <PostSkeleton key={i} />)
              : posts.map((post, index) => (
                <motion.a
                  key={post.id}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  viewport={{ once: true }}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                >
                  <Image
                    src={post.image}
                    alt={post.caption ? post.caption.slice(0, 80) : `Instagram post ${post.id}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-4">
                    <div className="flex items-center gap-6 text-white">
                      <div className="flex items-center gap-1.5">
                        <Heart size={18} className="fill-white" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle size={18} className="fill-white" />
                      </div>
                    </div>
                    {post.caption && (
                      <p className="text-white/80 text-xs text-center line-clamp-3 leading-relaxed">
                        {post.caption}
                      </p>
                    )}
                  </div>
                </motion.a>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}