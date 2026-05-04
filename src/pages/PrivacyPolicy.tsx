import React from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, Lock, FileText } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#F2EDE1] pt-40 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-xl text-rose-500 mb-8"
            >
              <Shield className="w-8 h-8" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display font-medium tracking-tight"
            >
              Privacy <span className="text-rose-500 italic font-light">Charter</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-medium uppercase tracking-[0.3em] text-[10px]"
            >
              Last Updated: April 2024
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl space-y-16"
          >
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-brand-dark">
                <Eye className="w-6 h-6 opacity-30" />
                <h2 className="text-3xl font-display">Information We Collect</h2>
              </div>
              <p className="text-gray-500 leading-relaxed text-lg font-light">
                At Kaycent, we respect the sanctity of your personal data. We collect information only 
                when you engage with our sensory world—be it through a purchase, a newsletter subscription, 
                or a direct inquiry. This includes your name, contact details, and olfactory preferences.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-brand-dark">
                <Lock className="w-6 h-6 opacity-30" />
                <h2 className="text-3xl font-display">How We Use Your Data</h2>
              </div>
              <p className="text-gray-500 leading-relaxed text-lg font-light">
                Your data serves one purpose: to enhance your experience. We use it to process your 
                artisanal orders, provide tailored fragrance recommendations, and keep you informed of 
                our latest botanical discoveries. We never sell your essence to third parties.
              </p>
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="p-8 bg-[#F2EDE1] rounded-3xl space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-brand-dark">Personalization</h4>
                  <p className="text-sm text-gray-400 font-light">Tailoring the journey to your unique palette.</p>
                </div>
                <div className="p-8 bg-[#F2EDE1] rounded-3xl space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-brand-dark">Security</h4>
                  <p className="text-sm text-gray-400 font-light">Ensuring your digital home remains a sanctuary.</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-brand-dark">
                <FileText className="w-6 h-6 opacity-30" />
                <h2 className="text-3xl font-display">Your Rights</h2>
              </div>
              <p className="text-gray-500 leading-relaxed text-lg font-light">
                You retain complete control over your information. You may request to view, modify, or 
                delete your data at any time. Our commitment to your privacy is as enduring as our fragrances.
              </p>
            </section>

            <div className="pt-12 border-t border-gray-100 flex flex-col items-center text-center space-y-4">
              <p className="text-gray-400 text-sm italic">Questions regarding our privacy philosophy?</p>
              <button className="text-rose-500 font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-transform">
                Contact Legal Counsel
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
