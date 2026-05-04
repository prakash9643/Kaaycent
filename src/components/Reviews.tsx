import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../constants';

export const Reviews: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 mb-16 md:mb-24 text-center lg:text-left">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-rose-500 mb-4 md:mb-6 block"
            >
              Testimonials
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl sm:text-6xl md:text-8xl font-display font-medium leading-[1.1] md:leading-[0.9] tracking-tighter"
            >
              Whispers of <br /> <span className="text-rose-500 italic font-light">Elegance</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 text-sm md:text-lg font-light max-w-xs text-center lg:text-right leading-relaxed mx-auto lg:mx-0"
          >
            Real stories from our community of connoisseurs and curators.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-10 rounded-[40px] flex flex-col justify-between group transition-all duration-500 ${
                idx % 2 === 0 ? 'bg-[#F2EDE1] text-brand-dark' : 'bg-brand-dark text-white'
              } ${idx === 1 ? 'lg:translate-y-12' : ''} ${idx === 3 ? 'lg:translate-y-12' : ''}`}
            >
              <div>
                <Quote className={`w-10 h-10 mb-8 opacity-20 ${idx % 2 === 0 ? 'text-brand-dark' : 'text-white'}`} />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < review.rating ? 'fill-current text-rose-500' : 'text-gray-300'} opacity-80`} 
                    />
                  ))}
                </div>
                <p className="text-xl font-light italic leading-snug mb-12">"{review.text}"</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                  <img 
                    src={review.avatar} 
                    alt={review.author} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-widest uppercase">{review.author}</h4>
                  <p className="text-[10px] opacity-50 uppercase tracking-[0.2em]">{review.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative text */}
      <div className="absolute -bottom-24 -left-24 opacity-[0.03] pointer-events-none select-none">
        <span className="text-[30rem] font-display font-black leading-none">Vibe</span>
      </div>
    </section>
  );
};
