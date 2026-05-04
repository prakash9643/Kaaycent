import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

export const BlogSection = () => {
  // Only show the first 3 posts in the section
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-bold tracking-[0.3em] uppercase text-rose-500 mb-6 block"
            >
              The Journal
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-display font-medium leading-tight"
            >
              Stories Behind <br />
              <span className="text-rose-500 italic">The Scents</span>
            </motion.h2>
          </div>
          <Link to="/blog">
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 group text-sm font-bold uppercase tracking-widest cursor-pointer"
            >
              Explore All Posts
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-rose-500 group-hover:border-rose-500 transition-all shadow-md group-hover:shadow-rose-500/20">
                <ArrowRight className="w-4 h-4 group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 shadow-xl">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-rose-500" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="w-3 h-3 text-rose-500" />
                    By {post.author}
                  </span>
                </div>
                
                <h3 className="text-2xl font-display font-medium leading-tight group-hover:text-rose-500 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-500 font-light leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="pt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark group-hover:gap-4 transition-all">
                  Read More
                  <ArrowRight className="w-3 h-3 text-rose-500" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
