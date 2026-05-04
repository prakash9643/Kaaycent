import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export const ArtOfFragrance = () => (
  <section id="about" className="py-24 relative overflow-hidden bg-[#FDF8EE]">
    <div className="absolute bottom-0 left-0 w-full select-none pointer-events-none opacity-5">
      <div className="overflow-hidden whitespace-nowrap flex py-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex"
        >
          <span className="text-[20vw] font-display font-bold leading-none tracking-tighter">KAYCENT &nbsp;</span>
          <span className="text-[20vw] font-display font-bold leading-none tracking-tighter">KAYCENT &nbsp;</span>
        </motion.div>
      </div>
    </div>
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-3 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight mb-8">
            The Art of <br />
            <span className="text-rose-500 italic">Fragrance</span>
          </h2>
          
          <div className="relative p-8 bg-white rounded-3xl shadow-xl overflow-hidden mb-8 max-w-[340px] mx-auto md:mx-0">
             <Sparkles className="absolute top-4 right-4 text-black w-6 h-6" />
             <p className="text-lg text-gray-700 leading-relaxed pt-6 font-medium">
               Elevate your personal presence with our curated collection of Eau de Parfum.
             </p>
             <div className="mt-8 rounded-2xl overflow-hidden aspect-square">
               <img 
                 src="/perfume-section-2.png" 
                 alt="Product" 
                 loading="lazy"
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover" 
               />
             </div>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-sm md:max-w-md aspect-[4/5] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl scale-105"
          >
            <img 
              src="/candle-section-2.png" 
              alt="Candles" 
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center md:text-left"
        >
          <h3 className="text-2xl md:text-3xl font-display font-medium mb-6">
            Artisanal <br /> Aroma <span className="text-rose-500">Candles</span>
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Experience a symphony of light and scent with our decorative candles.
          </p>
          <ul className="space-y-4 inline-block text-left">
            {[
              "Each candle features unique & hand-crafted designs",
              "Formulated with premium wax for a long-lasting, clean burn"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-black rounded-full mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);
