import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe, Heart, ShieldCheck, Quote, Sprout, Droplets, Calendar, Rocket, Smartphone } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#FDF8EE]">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark/20 z-10" />
        <img 
          src="/brand/about-header.png" 
          alt="Our Story" 
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.5em] mb-6 block drop-shadow-lg">Established 2023</span>
            <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tighter mb-8 shadow-text">
              The <span className="italic text-brand-secondary">Kaycent</span> Legacy
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-display font-medium mb-10 leading-tight">
                Crafting <span className="text-rose-500 italic">Moments</span> <br /> 
                Through Scent
              </h2>
              <div className="space-y-6 text-gray-500 text-lg font-light leading-relaxed">
                <p>
                  Kaycent was born from the vision of Swati Naidu: to transform the ephemeral into the eternal. A dedicated educator and entrepreneur, Swati sought to bridge the gap between soulful traditions and modern daily luxury.
                </p>
                <p>
                  Every fragrance we create is a narrative. Whether it's the bold, obsidian notes of our signature perfume or the soft, floral whisper of our artisanal candles, Kaycent is an invitation to explore the depths of your own senses.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-16">
                <div className="space-y-2">
                  <h4 className="text-3xl font-display font-bold text-rose-500">100+</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Artisanal Blends</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-3xl font-display font-bold text-rose-500">22</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Global Awards</p>
                </div>
              </div>
            </motion.div>

            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
                whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-[60px] overflow-hidden shadow-2xl relative z-10 aspect-[4/5]"
              >
                <img 
                  src="/brand/about-philosophy.png" 
                  alt="Process" 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-rose-200/50 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-yellow-200/50 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Story Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Introductory Header */}
            <div className="mb-24 text-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold tracking-[0.4em] uppercase text-rose-500 mb-6 block"
              >
                Visionary & Heart
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-display font-medium"
              >
                Meet <span className="italic text-rose-500 underline decoration-rose-200 underline-offset-8">Swati Naidu</span>
              </motion.h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Image Column */}
              <div className="relative group">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800" 
                    alt="Swati Naidu" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                {/* Decorative blobs */}
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-rose-100/50 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl -z-10" />
                
                {/* Badge component */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-10 -right-10 bg-brand-dark text-white p-10 rounded-[3rem] shadow-2xl max-w-[280px] hidden md:block"
                >
                  <Quote className="w-10 h-10 text-rose-500 mb-6" />
                  <p className="text-xl font-display italic leading-snug">
                    "Kaycent is not just a business—it's a shared journey of resonance."
                  </p>
                </motion.div>
              </div>

              {/* Text Column */}
              <div className="space-y-12">
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h3 className="text-3xl font-display font-medium text-brand-dark">The Balancing Act</h3>
                    <p className="text-lg text-gray-500 font-light leading-relaxed">
                      "I am Swati Naidu—an educator, homemaker, and entrepreneur, balancing each role with dedication and heart. As a teacher, I believe in shaping young minds with the right values and discipline, and this same belief has guided me in my journey beyond the classroom."
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl font-display font-medium text-brand-dark">From a Small Room to India</h3>
                    <p className="text-lg text-gray-500 font-light leading-relaxed">
                      "Kaycent began with just a few bottles of perfume and a simple thought—to create fragrances that make people feel something real and memorable. What started in a small room has today grown into a brand reaching homes across India."
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl font-display font-medium text-brand-dark">More than a Product</h3>
                    <p className="text-lg text-gray-500 font-light leading-relaxed">
                      "At Kaycent, we don’t see our products as just products. For us, they are a way to bring comfort, confidence, and positivity into everyday life. Every product is made with care, quality, and attention to detail."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Vision Quote Section */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 p-16 bg-[#FDF8EE] rounded-[4rem] border border-rose-100 flex flex-col md:flex-row items-center gap-12 text-center md:text-left"
            >
              <div className="flex-1 space-y-6 text-brand-dark">
                <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-rose-500">The Vision</h4>
                <p className="text-2xl md:text-3xl font-display font-medium leading-tight">
                  "Our vision is simple—we want to show that Indian-made products can stand proudly in quality and experience."
                </p>
              </div>
              <div className="h-24 w-px bg-rose-200 hidden md:block" />
              <div className="flex-1">
                <p className="text-gray-500 font-light italic leading-relaxed">
                  "Kaycent is not just my business—it is my passion. And today, it is not just our story anymore but a journey shared with everyone who chooses to express themselves through fragrance."
                </p>
                <div className="mt-8">
                  <p className="font-display text-2xl text-brand-dark">Swati Naidu</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500">Founder & Creative Director</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transformation Highlight Section - Unique Brand Statement */}
      <section className="py-40 bg-white relative overflow-hidden flex items-center justify-center border-y border-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Visual Arc of Growth Concept */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full opacity-[0.03] pointer-events-none">
              <svg viewBox="0 0 1000 400" className="w-full h-full">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d="M0,400 Q500,0 1000,400" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                />
              </svg>
            </div>

            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold uppercase tracking-[0.8em] text-rose-500 mb-14 block"
            >
              A Journey of Expansion
            </motion.span>

            <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-medium leading-[1.05] tracking-tighter">
              <span className="block text-gray-300 font-light mb-4">From a small room in</span>
              <span className="relative inline-block text-brand-dark px-6">
                Madhya Pradesh
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
                  className="absolute bottom-2 left-0 h-1/3 bg-rose-500/10 -z-10"
                />
              </span>
              <br />
              <span className="block mt-6">to a <span className="text-rose-500 italic decoration-rose-500/20 underline underline-offset-[20px] decoration-4">national fragrance house</span>.</span>
            </h2>

            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 1 }}
              className="w-32 h-[2px] bg-rose-500 mx-auto mt-28 origin-center" 
            />
          </motion.div>
        </div>
      </section>

      {/* Our Our Story Infographic */}
      <section className="py-32 bg-[#F2EDE1]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-rose-500 bg-rose-50 px-4 py-1 rounded-full">Chapter 0.1 — Timeline</span>
              <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tighter relative inline-block">
                The Chapters of <span className="text-rose-500 italic">Our Evolution</span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1.2, ease: "circOut" }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-rose-500/10 rounded-full"
                />
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Infographic Cards */}
            {[
              {
                icon: Sprout,
                title: "The Roots of Our Dream",
                desc: "Kaycent is a growing brand from Madhya Pradesh, offering a wide range of products including perfumes, candles, pooja samagri, and more. since our beginning, we have focused on quality and consistency.",
                color: "bg-green-500/10 text-green-600"
              },
              {
                icon: Droplets,
                title: "Trust in Every Drop",
                desc: "Our customers return not just for the fragrance, but for the trust and honesty behind every product we create.",
                color: "bg-blue-500/10 text-blue-600"
              },
              {
                icon: Calendar,
                title: "A Name to Remember",
                desc: "The year 2025 marked a new beginning for Kaycent—with better products, improved packaging, and a clear vision of building a strong and recognized brand.",
                color: "bg-rose-500/10 text-rose-600"
              },
              {
                icon: Smartphone,
                title: "Going Digital, Thinking Global",
                desc: "From factory floors to digital platforms, Kaycent is growing with time. Customers can now connect with us online, making our journey more accessible.",
                color: "bg-purple-500/10 text-purple-600"
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-6 leading-tight">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{step.desc}</p>
                
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                    <Rocket className="w-6 h-6 text-gray-200" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-brand-dark rounded-[80px] text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-display font-medium mb-4">Our Core Pillars</h2>
            <div className="w-24 h-1 bg-brand-secondary mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "Pure Alchemy", desc: "We use only the finest natural extracts and synthetic molecules." },
              { icon: Globe, title: "Sustainable", desc: "Eco-friendly packaging and ethical sourcing at every step." },
              { icon: Heart, title: "Artisan First", desc: "Each product is hand-crafted and inspected for perfection." },
              { icon: ShieldCheck, title: "Zero Toxin", desc: "No harmful phthalates or synthetic preservatives." }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all group"
              >
                <value.icon className="w-10 h-10 mb-8 text-brand-secondary group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-display font-semibold mb-4 uppercase tracking-widest">{value.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-display font-medium mb-12">Experience the Sublime</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-5 bg-brand-dark text-white rounded-full font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-black"
          >
            Visit Our Atelier
          </motion.button>
        </div>
      </section>
    </div>
  );
};

