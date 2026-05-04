import React from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, Box, PackageCheck, AlertCircle } from 'lucide-react';

export const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#F2EDE1] pt-40 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <motion.div 
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-xl text-brand-dark mb-8"
            >
              <RefreshCcw className="w-8 h-8" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display font-medium tracking-tight"
            >
              Return <span className="text-rose-500 italic font-light">Promise</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-medium uppercase tracking-[0.3em] text-[10px]"
            >
              Fairness in every exchange
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl space-y-20"
          >
            <div className="grid md:grid-cols-2 gap-16">
              <section className="space-y-6">
                <Box className="w-10 h-10 text-rose-500 opacity-20" />
                <h2 className="text-4xl font-display leading-none">Returns Window</h2>
                <p className="text-gray-500 leading-relaxed font-light">
                  Within 7 days of receiving your item, you may request an exchange or refund if the product remains in its original, unopened condition.
                </p>
              </section>

              <section className="space-y-6">
                <PackageCheck className="w-10 h-10 text-rose-500 opacity-20" />
                <h2 className="text-4xl font-display leading-none">Inspection</h2>
                <p className="text-gray-500 leading-relaxed font-light">
                  Every artisanal product is carefully inspected upon return. Refunds are issued to the original payment method within 14 business days.
                </p>
              </section>
            </div>

            <div className="bg-[#F2EDE1] p-12 rounded-[3rem] space-y-8">
              <div className="flex items-center gap-4">
                <AlertCircle className="w-6 h-6 text-rose-500" />
                <h3 className="text-2xl font-display">Special Considerations</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-4 text-sm text-gray-600 font-medium tracking-wide border-b border-white pb-4">
                  <span className="text-rose-500 font-bold">01.</span>
                  Fragrances that have been unwrapped or sprayed cannot be returned due to hygiene and safety standards.
                </li>
                <li className="flex gap-4 text-sm text-gray-600 font-medium tracking-wide border-b border-white pb-4">
                  <span className="text-rose-500 font-bold">02.</span>
                  Gift cards are considered non-refundable artistic credits.
                </li>
                <li className="flex gap-4 text-sm text-gray-600 font-medium tracking-wide">
                  <span className="text-rose-500 font-bold">03.</span>
                  In the rare event of transit damage, we provide immediate replacement at no additional cost.
                </li>
              </ul>
            </div>

            <div className="pt-12 text-center">
              <p className="text-gray-400 text-sm italic mb-8">Ready to begin a return?</p>
              <button className="bg-brand-dark text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-rose-500 transition-all shadow-xl">
                Initiate Return Process
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
