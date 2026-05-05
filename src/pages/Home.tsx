import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Hero } from "../components/Hero";
import { ArtOfFragrance } from "../components/ArtOfFragrance";
import { ProductSelection } from "../components/ProductSelection";
import { Reviews } from "../components/Reviews";
import { BlogSection } from "../components/BlogSection";
import { Product } from "../types";
import { useProducts } from "../context/ProductContext";

export const HomePage = ({ onToggleWishlist, wishlist }: { onToggleWishlist: (p: Product) => void, wishlist: Product[] }) => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize selected product when products load
  React.useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [products, selectedProduct]);

  const onProductClick = (product: Product) => {
    setSelectedProduct(product);
    document.getElementById('product-detail')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero />
      <ArtOfFragrance />
      
      <section className="py-24 bg-brand-dark overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-white mb-12 md:mb-20"
          >
            Created To Be The Most <br />
            <span className="text-yellow-400 italic">Exquisite</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { imageUrl: '/section3-candle.png', productId: '11' },
              { imageUrl: '/section3-perfume.png', productId: '8744637366454' },
              { imageUrl: '/section3-puja.png', productId: '6' },
              { imageUrl: '/section3-candle-2.png', productId: '13' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -20, scale: 1.05 }}
                className="rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                onClick={() => navigate(`/product/${item.productId}`)}
              >
                <img 
                  src={(item as any).imageUrl || `https://images.unsplash.com/photo-${(item as any).unsplashId}?auto=format&fit=crop&q=75&w=600`} 
                  alt="Product Exhibit" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-[1.5s]"
                />
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-white/50 max-w-xl mx-auto text-sm">
            Hand-crafted details in every piece, from the wax toppers to the glass finishes.
          </p>
        </div>
      </section>

      <ProductSelection 
        onProductClick={onProductClick} 
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
      />

      <section id="artisanal-light" className="py-16 md:py-24 bg-brand-dark overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-rose-500/20 blur-[100px] rounded-full" />
              <img 
                src="/section5-banner.png" 
                alt="Artisanal Candle" 
                loading="lazy"
                referrerPolicy="no-referrer"
                className="relative z-10 w-full rounded-[60px] shadow-2xl"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 text-white space-y-6 md:space-y-8"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-medium leading-tight text-center lg:text-left">
                The <span className="text-rose-500">Glow</span> of <br /> Artisanal Light
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                Our candles are hand-poured using a proprietary blend of soy wax and rare botanicals, 
                designed to transform your space into a sanctuary of peace.
              </p>
              <div className="pt-4 flex justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/category/candle')}
                  className="px-8 md:px-10 py-3.5 md:py-4 bg-white text-brand-dark rounded-full font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-rose-500 hover:text-white transition-all shadow-xl"
                >
                  Explore Candles
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-32 bg-[#F2EDE1] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 mb-20">
              <div className="lg:w-1/2">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold tracking-[0.3em] uppercase text-rose-500 mb-6 block"
                >
                  Curated Collections
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  onClick={() => navigate('/category/aura')}
                  className="text-4xl sm:text-6xl md:text-8xl font-display font-medium leading-[1] md:leading-[0.9] tracking-tighter cursor-pointer hover:text-rose-500 transition-colors"
                >
                  The <span className="text-rose-500 italic font-light">Essence</span> of <br /> Sacred Rituals
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => navigate('/category/aura')}
                  className="mt-6 md:mt-8 text-gray-500 text-base md:text-lg leading-relaxed max-w-md font-light cursor-pointer hover:text-gray-700 transition-colors"
                >
                  Deeply rooted in tradition, our puja collection brings a sense of divine tranquility to your daily life. 
                  Sustainably sourced and crafted for moments of prayer, meditation, and peace.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: 1 }}
                onClick={() => navigate('/category/aura')}
                className="relative lg:w-1/3 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] group cursor-pointer"
              >
                <img 
                  src="/section6-puja.png" 
                  alt="Sacred Collection" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-1000 scale-110 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-display text-2xl uppercase tracking-widest">Divinity Within</span>
                </div>
              </motion.div>
           </div>
        </div>

        <div className="px-6 lg:px-20 hidden md:block">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => navigate('/category/aura')}
            className="rounded-[3rem] md:rounded-[4rem] overflow-hidden aspect-[4/3] md:aspect-[21/9] shadow-2xl relative group cursor-pointer"
          >
            <img 
              src="/section6-puja-2.png" 
              alt="Kaycent Collection" 
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-brand-dark/20 flex items-center justify-center">
               <motion.div 
                 initial={{ scale: 0 }}
                 whileInView={{ scale: 1 }}
                 className="w-32 h-32 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-white hover:text-brand-dark transition-colors"
               >
                 Discover
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="artisanal-candles" className="py-16 md:py-32 bg-white overflow-hidden relative">
        {/* Decorative text background */}
        <div className="absolute top-40 right-0 pointer-events-none opacity-[0.02] -mr-40 select-none hidden lg:block">
          <h3 className="text-[25rem] font-display font-bold leading-none tracking-tighter">AROMA</h3>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-0 md:mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 md:space-y-12"
            >
              <div className="space-y-6">
                <motion.div 
                  initial={{ width: 0 }} 
                  whileInView={{ width: "80px" }}
                  transition={{ duration: 1 }}
                  className="h-[2px] bg-rose-500" 
                />
                <h2 
                  onClick={() => navigate('/category/candle')}
                  className="text-5xl sm:text-7xl md:text-9xl font-display font-medium leading-[0.9] md:leading-[0.8] tracking-tighter cursor-pointer group/title"
                >
                  <span className="hover:text-rose-500 transition-colors">Artisanal</span> <br />
                  <span className="text-rose-500 italic font-light group-hover/title:text-brand-dark transition-colors">Candles</span>
                </h2>
              </div>
              
              <p 
                onClick={() => navigate('/category/candle')}
                className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-sm cursor-pointer hover:text-gray-600 transition-colors"
              >
                Infuse your space with the evocative power of scent. 
                Hand-poured using premium waxes and rare botanical essences for a cleaner, longer burn.
              </p>
              
              <motion.button
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group cursor-pointer"
                onClick={() => navigate('/category/candle')}
              >
                <span className="text-sm font-bold uppercase tracking-[0.3em] group-hover:text-rose-500 transition-colors">View Collection</span>
                <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-rose-500 group-hover:border-rose-500 transition-all shadow-lg group-hover:shadow-rose-500/20">
                  <ArrowRight className="w-5 h-5 group-hover:text-white transition-colors" />
                </div>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative cursor-pointer"
              onClick={() => navigate('/category/candle')}
            >
              <div className="absolute -top-12 -left-12 w-48 h-48 border-l border-t border-rose-500/20 rounded-tl-[4rem] hidden md:block" />
              <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl">
                <img 
                  src="/section7-silk-2.png" 
                  alt="Aroma Detail" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110" 
                />
              </div>
              
              {/* Floating badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 md:-bottom-8 -right-2 md:-right-8 bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100 z-20 max-w-[160px] md:max-w-[200px]"
              >
                 <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-2">Exquisite</p>
                 <p className="text-sm text-gray-800 font-medium leading-tight">Zero-Paraffin Hand Poured Wax</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Full width feature image */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative rounded-[3.5rem] md:rounded-[6rem] overflow-hidden group cursor-pointer shadow-2xl hidden md:block"
            onClick={() => navigate('/category/candle')}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-10" />
            <img 
              src="/section7-silk-1.png" 
              alt="Full Aroma Banner"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full aspect-[4/3] md:aspect-[21/9] object-cover scale-105 group-hover:scale-100 transition-transform duration-[4s]"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="bg-white/10 backdrop-blur-md border border-white/30 px-12 py-6 rounded-full">
                 <span className="text-white text-lg font-display tracking-[0.2em] uppercase">Experience The Atmosphere</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Reviews />
      <BlogSection />
    </>
  );
};
