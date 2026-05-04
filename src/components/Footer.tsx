import { ArrowRight, Instagram, Facebook, Youtube, ArrowUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-40 pb-12 bg-black text-white relative overflow-hidden">
      {/* Architectural Background Text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
        <span className="text-[20vw] md:text-[25vw] font-display font-black leading-none tracking-tighter uppercase whitespace-nowrap">
          KAYCENT
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
          {/* Newsletter Section */}
          <div className="lg:col-span-5 space-y-8 md:space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-rose-500 justify-center lg:justify-start"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                </motion.div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Join the Inner Circle</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight leading-none text-center lg:text-left">
                Subscribe to get <br /> <span className="text-rose-500 italic font-light">10% OFF</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg font-light max-w-sm mx-auto lg:mx-0 text-center lg:text-left">
                Receive curated scents, early access, and artisanal insights.
              </p>
            </div>
            
            <div className="relative max-w-md group mx-auto lg:mx-0">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/10 border border-white/10 text-white rounded-3xl py-6 px-10 pr-20 focus:outline-none focus:border-rose-500/50 transition-all placeholder:text-gray-400 backdrop-blur-md"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xl group-hover:scale-105">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-[10px] text-gray-500 font-medium tracking-wide">
              By subscribing you agree to the <a href="#" className="underline hover:text-white transition-colors">Terms of Use</a> & <a href="#" className="underline hover:text-white transition-colors">Privacy Policy.</a>
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
            {/* About Section */}
            <div className="space-y-8">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">The House</h4>
              <nav className="flex flex-col gap-5">
                <p className="text-gray-400 text-sm leading-relaxed font-light mb-2">
                  Established in 2005, Gujarat. Over 200+ artisanal variants crafted with seasonal botanicals.
                </p>
                <Link to="/about" className="text-sm font-medium hover:text-rose-500 transition-all flex items-center gap-2 group">
                  Our Story <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </nav>
            </div>

            {/* Shop Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Collections</h4>
              <ul className="space-y-5 text-sm text-gray-400 font-light">
                <li><Link to="/category/perfume" className="hover:text-white hover:pl-2 transition-all duration-300">Perfumes</Link></li>
                <li><Link to="/category/candle" className="hover:text-white hover:pl-2 transition-all duration-300">Aroma Candles</Link></li>
                <li><Link to="/category/aura" className="hover:text-white hover:pl-2 transition-all duration-300">Pooja Fragrances</Link></li>
                <li><Link to="/category/perfume" className="hover:text-white hover:pl-2 transition-all duration-300">Best Sellers</Link></li>
              </ul>
            </motion.div>

            {/* Quick Links Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="space-y-8"
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Service</h4>
              <ul className="space-y-5 text-sm text-gray-400 font-light">
                <li><Link to="/track-order" className="hover:text-white hover:pl-2 transition-all duration-300">Track Order</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-white hover:pl-2 transition-all duration-300">Privacy Policy</Link></li>
                <li><Link to="/refund-policy" className="hover:text-white hover:pl-2 transition-all duration-300">Refund Policy</Link></li>
                <li><Link to="/contact" className="hover:text-white hover:pl-2 transition-all duration-300">Contact Us</Link></li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-16 border-t border-white/5 relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-8">
              <div className="flex gap-10">
                {[
                  { Icon: Facebook, color: "hover:text-blue-500" },
                  { Icon: Instagram, color: "hover:text-pink-500" },
                  { Icon: Youtube, color: "hover:text-red-500" }
                ].map(({ Icon, color }, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-gray-500 cursor-pointer transition-colors duration-300 ${color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>
              <div className="hidden md:block h-6 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 leading-none mb-1">Handcrafted in</span>
                <span className="text-xs font-display font-medium text-white">SAURASTRA, INDIA</span>
              </div>
            </div>

            <button 
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-4 text-center"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-rose-500 group-hover:bg-rose-500 transition-all duration-500">
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-600 group-hover:text-white transition-colors">Return to Top</span>
            </button>
            
            <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-700 text-center md:text-right">
              <p>© 2026 KAYCENT PERFUME <span className="mx-4 text-gray-800">/</span> BY ULTRAVUX</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
