import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { HERO_SLIDES } from "../constants";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleShopNow = () => {
    // Slide 0: Nomad Obsidian -> /product/1
    // Slide 1: Artisanal Candles -> /category/candle
    if (currentSlide === 0) {
      navigate('/product/1');
    } else {
      navigate('/category/candle');
    }
  };

  const currentHero = HERO_SLIDES[currentSlide];
  const imageSrc = isMobile && currentHero.mobileImage ? currentHero.mobileImage : currentHero.image;

  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentSlide}-${isMobile}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Use a soft gradient instead of a solid overlay to keep most of the image's original brightness */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/20 md:to-transparent z-10" />
          
          {/* Enhanced motion for image with brightness and contrast pop */}
          <motion.img 
            initial={{ scale: 1.15, filter: "brightness(0.9) contrast(0.9)" }}
            animate={{ scale: 1, filter: "brightness(1) contrast(1.1)" }}
            transition={{ 
              duration: 10, 
              ease: "easeOut",
              filter: { duration: 2.5 } 
            }}
            src={imageSrc} 
            alt="Hero Background" 
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-end md:items-center pb-12 md:pb-0">
            <div className="container mx-auto px-6 md:px-12 md:pt-20">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="max-w-2xl text-center md:text-left mx-auto md:mx-0"
              >
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4 md:mb-6">
                  <div className="w-8 md:w-12 h-[1px] bg-brand-secondary" />
                  <span className="text-white text-sm md:text-lg font-light tracking-wide uppercase">{HERO_SLIDES[currentSlide].subtitle}</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-medium text-white leading-[1.1] mb-2 md:mb-4">
                  {HERO_SLIDES[currentSlide].title.split(" ").map((word, i) => (
                    <span key={i} className="inline-block md:block mr-2 md:mr-0">{word}</span>
                  ))}
                </h1>
                
                <p className="text-base md:text-xl text-white/80 font-light mb-6 md:mb-10 max-w-xs md:max-w-none mx-auto md:mx-0">{HERO_SLIDES[currentSlide].tagline}</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShopNow}
                  className="px-8 md:px-10 py-3 md:py-3.5 border border-white text-white rounded-full text-sm md:text-base font-medium hover:bg-white hover:text-black transition-all"
                >
                  Shop Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
