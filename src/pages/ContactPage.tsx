import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Twitter, CheckCircle2 } from 'lucide-react';

export const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FDF8EE] pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Info */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-7xl font-display font-medium tracking-tighter mb-8">
                Get <span className="text-rose-500 italic">In Touch</span>
              </h1>
              <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm">
                Have a question about our collections or interested in a bespoke sensory project? Our curators are here to assist.
              </p>
            </motion.div>

            <div className="space-y-10">
              {[
                { icon: Mail, label: 'Email Us', value: 'kaycentinfo@gmail.com' },
                { icon: Phone, label: 'Call Us', value: '+91 7489777988' },
                { icon: MapPin, label: 'Visit Atelier', value: '45 Sensory Lane, Mumbai, MH 400001' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-brand-dark group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{item.label}</h4>
                    <p className="text-lg font-display font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-12 border-t border-gray-100">
               <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Society Links</h4>
               <div className="flex gap-4">
                  {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                    <motion.a 
                      key={i}
                      whileHover={{ y: -5 }}
                      href="#"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-xl transition-all border border-gray-100"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[50px] p-10 md:p-14 shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24 space-y-6"
                >
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-display font-bold">Message Sent</h3>
                  <p className="text-gray-500">Your inquiry has been received. Our team will contact you within 24 standard business hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-rose-500 font-bold uppercase tracking-widest text-xs hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                       <input 
                         type="text" 
                         required
                         placeholder="John Doe"
                         className="w-full bg-gray-50 rounded-3xl py-4 px-8 border border-transparent focus:border-rose-500/20 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                       <input 
                         type="email" 
                         required
                         placeholder="name@example.com"
                         className="w-full bg-gray-50 rounded-3xl py-4 px-8 border border-transparent focus:border-rose-500/20 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Subject</label>
                     <select 
                       className="w-full bg-gray-50 rounded-3xl py-4 px-8 border border-transparent focus:border-rose-500/20 focus:bg-white outline-none transition-all"
                       value={formData.subject}
                       onChange={(e) => setFormData({...formData, subject: e.target.value})}
                     >
                        <option value="">Choose a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="bespoke">Bespoke Project</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="press">Press & Media</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Your Message</label>
                     <textarea 
                       required
                       placeholder="How can we help you?"
                       className="w-full bg-gray-50 rounded-3xl py-4 px-8 border border-transparent focus:border-rose-500/20 focus:bg-white min-h-[150px] outline-none transition-all placeholder:text-gray-300"
                       value={formData.message}
                       onChange={(e) => setFormData({...formData, message: e.target.value})}
                     />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-brand-dark text-white rounded-[30px] font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:shadow-2xl transition-all"
                    type="submit"
                  >
                    Send Inquiry
                    <Send className="w-4 h-4" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
