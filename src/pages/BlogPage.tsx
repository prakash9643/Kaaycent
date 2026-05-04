import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export const BlogPage = () => {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-brand-dark py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595433707802-6806f3fc52b0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400 mb-6 block">The Journal</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium leading-tight mb-8">
              Reflections on <br />
              <span className="text-rose-400 italic">Scent & Soul</span>
            </h1>
            <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-xl">
              Exploring the invisible art of fragrance, the craftsmanship of light, and the rituals that elevate our daily existence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {BLOG_POSTS.map((post, index) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 shadow-lg shadow-black/5">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
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
                      
                      <p className="text-neutral-500 font-light leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark group-hover:gap-4 transition-all">
                        Read Story
                        <ArrowRight className="w-3 h-3 text-rose-500" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-16">
              {/* Search */}
              <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-black/5 border border-neutral-100">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Search Articles</h4>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search scent, ritual, art..." 
                    className="w-full pl-6 pr-12 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:border-rose-500 transition-colors"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-black/5 border border-neutral-100">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Categories</h4>
                <ul className="space-y-4">
                  {['Fragrance Guide', 'Craftsmanship', 'Wellness', 'Lifestyle', 'Education'].map((cat) => (
                    <li key={cat}>
                      <button className="w-full flex justify-between items-center text-sm text-neutral-500 hover:text-rose-500 transition-colors group">
                        <span className="font-light">{cat}</span>
                        <span className="text-[10px] font-bold text-neutral-300 group-hover:text-rose-300 transition-colors">12</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-rose-50 p-10 rounded-[2rem] relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Stay Inspired</h4>
                  <p className="text-sm text-neutral-600 font-light mb-8 leading-relaxed">
                    Join our inner circle for exclusive scent profiles and olfactory journeys.
                  </p>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full px-6 py-4 bg-white border border-rose-100 rounded-2xl text-sm mb-4 focus:outline-none shadow-sm"
                  />
                  <button className="w-full py-4 bg-brand-dark text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors shadow-lg shadow-black/10">
                    Subscribe
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
