import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Search, Truck, CheckCircle2, Clock, MapPin, ExternalLink, Calendar, Smartphone, ShoppingCart } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const TrackOrderPage = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setOrderId(id);
      handleTrack(null, id);
    }
  }, [location]);

  const handleTrack = (e: React.FormEvent | null, manualId?: string) => {
    if (e) e.preventDefault();
    const idToTrack = manualId || orderId;
    if (idToTrack) {
      setIsSearching(true);
      setTracking(false); // Reset tracking view while searching
      setTimeout(() => {
        setIsSearching(false);
        setTracking(true);
        setActiveOrderId(idToTrack);
      }, 1500);
    }
  };

  const getStatusDetails = (id: string) => {
    if (!id) return null;
    // Determine a random but consistent status based on order ID for demo
    const lastDigit = parseInt(id.slice(-1)) || 0;
    
    const events = [
      { time: '10:45 AM', location: 'Regional Hub, Mumbai', status: 'In Transit', desc: 'Arrived at sorting facility' },
      { time: '09:20 AM', location: 'Warehouse, Mumbai', status: 'Shipped', desc: 'Picked up by courier' },
      { time: 'Yesterday', location: 'Warehouse, Mumbai', status: 'Processing', desc: 'Quality check completed' },
      { time: 'Yesterday', location: 'Online', status: 'Confirmed', desc: 'Order received successfully' },
    ];

    if (lastDigit % 3 === 0) return { 
      status: 'Delivered', 
      step: 4, 
      date: 'Completed',
      events: [
        { time: '02:30 PM', location: 'Home Delivery', status: 'Delivered', desc: 'Handed over to customer' },
        ...events
      ]
    };
    if (lastDigit % 3 === 1) return { 
      status: 'In Transit', 
      step: 3, 
      date: 'Estimated: 2 days',
      events: events
    };
    return { 
      status: 'Processing', 
      step: 2, 
      date: 'Estimated: 5 days',
      events: events.slice(2)
    };
  };

  const currentStatus = getStatusDetails(activeOrderId);
  const [recentOrders, setRecentOrders] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('kaycent_orders') || '[]');
    setRecentOrders(saved);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF8EE] pt-40 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full border border-rose-100"
            >
               <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-500">Live Sensory Journey</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-medium tracking-tight text-brand-dark"
            >
              Order <span className="text-rose-500 italic font-light">Status</span>
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden"
          >
            <div className="p-8 md:p-16 space-y-12">
              <form onSubmit={(e) => handleTrack(e)} className="flex flex-col md:flex-row gap-4 relative z-10">
                <div className="flex-1 relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Order ID (e.g. KC-123456)" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full bg-[#f8f6f2] rounded-[2rem] py-8 px-20 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-bold text-brand-dark placeholder-gray-300 text-lg shadow-inner"
                    required
                  />
                </div>
                <button 
                  disabled={isSearching}
                  className="bg-brand-dark text-white px-12 py-8 rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 shadow-2xl hover:shadow-brand-dark/20"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  {isSearching ? 'Connecting...' : 'Fetch Status'}
                </button>
              </form>

              {recentOrders.length > 0 && !tracking && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-4 pt-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Recently Placed Orders</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {recentOrders.map(id => (
                      <button 
                        key={id}
                        onClick={() => {
                          setOrderId(id);
                          handleTrack(null, id);
                        }}
                        className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold text-brand-dark hover:bg-rose-50 hover:border-rose-200 transition-all"
                      >
                        {id}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {tracking && !isSearching && currentStatus ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-16"
                  >
                    {/* Status Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-gray-50 rounded-[3rem] p-10 border border-gray-100">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <h3 className="text-4xl font-display font-medium text-brand-dark">#{activeOrderId}</h3>
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                            currentStatus.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-rose-500 text-white'
                          }`}>
                            {currentStatus.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm font-medium">
                          <div className="flex items-center gap-2">
                             <Calendar className="w-4 h-4 text-brand-secondary" />
                             {currentStatus.status === 'Delivered' ? 'Delivered On' : 'Expected By'}: <span className="text-brand-dark font-bold">May 12, 2024</span>
                          </div>
                          <div className="w-1 h-1 bg-gray-200 rounded-full" />
                          <div className="flex items-center gap-2">
                             <MapPin className="w-4 h-4 text-brand-secondary" />
                             Latest Point: <span className="text-brand-dark font-bold">Mumbai Hub</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <button className="p-4 bg-white rounded-2xl border border-gray-100 hover:border-brand-secondary transition-all shadow-sm group">
                            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-brand-secondary" />
                         </button>
                         <button className="flex items-center gap-2 px-6 py-4 bg-white rounded-2xl border border-gray-100 hover:border-brand-secondary transition-all shadow-sm group font-bold uppercase tracking-widest text-[10px]">
                            <Smartphone className="w-4 h-4 text-gray-400 group-hover:text-brand-secondary" />
                            Help Desk
                         </button>
                      </div>
                    </div>

                    {/* Visual Journey */}
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 ml-4">Shipment Progress</h4>
                        <div className="space-y-4">
                          {currentStatus.events.map((event, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="relative pl-12 pb-8 group last:pb-0"
                            >
                              {/* Line */}
                              {idx !== currentStatus.events.length - 1 && (
                                <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-gray-100 group-hover:bg-rose-100 transition-colors" />
                              )}
                              
                              {/* Dot */}
                              <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 ${
                                idx === 0 ? 'bg-rose-500 scale-110 shadow-lg' : 'bg-gray-100'
                              }`}>
                                <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-white' : 'bg-gray-300'}`} />
                              </div>

                              <div className="bg-gray-50/50 p-6 rounded-3xl border border-transparent group-hover:border-gray-100 group-hover:bg-white transition-all group-hover:shadow-xl">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-bold text-brand-dark">{event.status}</h5>
                                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{event.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{event.location}</p>
                                <p className="text-[10px] italic text-rose-400 font-medium">{event.desc}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-8">
                         <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 ml-4">Live Hub Feed</h4>
                         <div className="bg-brand-dark rounded-[3rem] p-1 text-white overflow-hidden shadow-2xl h-full min-h-[400px] relative">
                            {/* Simulated Digital Map/Grid */}
                            <div className="absolute inset-0 opacity-20" 
                                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '24px 24px' }} 
                            />
                            
                            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                               <motion.div 
                                 animate={{ 
                                   scale: [1, 1.1, 1],
                                   opacity: [0.5, 0.8, 0.5]
                                 }}
                                 transition={{ duration: 4, repeat: Infinity }}
                                 className="absolute w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]"
                               />
                               
                               <div className="relative z-10">
                                  <div className="w-20 h-20 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 flex items-center justify-center mx-auto mb-8 animate-pulse">
                                     <Truck className="w-10 h-10 text-rose-500" />
                                  </div>
                                  <h5 className="text-2xl font-display font-medium mb-4">Navigating Scents</h5>
                                  <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-12">Carrier: BlueDart Premium</p>
                                  
                                  <div className="space-y-6">
                                     <div className="flex flex-col items-center gap-2">
                                        <div className="w-1 h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                        <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-lg">
                                           <p className="text-[10px] font-bold text-rose-500 mb-1">LAT: 19.0760° N</p>
                                           <p className="text-[10px] font-bold text-white uppercase tracking-widest">Mumbai Transit Hub</p>
                                        </div>
                                        <div className="w-1 h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                    </div>

                      {/* Support Panel */}
                    <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center border border-gray-100">
                             <CheckCircle2 className="w-8 h-8 text-green-500" />
                          </div>
                          <div>
                             <h5 className="font-bold text-brand-dark mb-1">Delivery Assurance</h5>
                             <p className="text-xs text-gray-400">Insured by Kaycent Signature logistics</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <button 
                            onClick={() => alert("Our concierge will assist you shortly via email/phone.")}
                            className="px-8 py-4 bg-gray-50 text-brand-dark rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all"
                          >
                            Support Center
                          </button>
                          <button 
                            onClick={() => alert("Address modification is available within 2 hours of order placement. Please contact support.")}
                            className="px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-lg"
                          >
                            Modify Delivery
                          </button>
                       </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-8"
                  >
                    <div className="relative">
                       <div className="absolute inset-0 bg-rose-500/5 rounded-full blur-3xl animate-pulse" />
                       <ShoppingCart className="w-24 h-24 text-gray-100 relative z-10" />
                    </div>
                    <div>
                       <p className="text-xl font-display text-gray-300">Ready to trace your heritage?</p>
                       <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mt-2">Enter your Order ID above to begin</p>
                    </div>
                    
                    <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
                       {[
                         { title: 'Processing', desc: 'Curating your selection' },
                         { title: 'In Transit', desc: 'Journey through hubs' },
                         { title: 'Delivered', desc: 'Essence arrives home' }
                       ].map(hint => (
                         <div key={hint.title} className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100/50">
                            <h6 className="text-[10px] font-bold uppercase tracking-widest text-brand-dark mb-1">{hint.title}</h6>
                            <p className="text-[10px] text-gray-400 italic">{hint.desc}</p>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Footer Hint */}
          <div className="mt-16 text-center space-y-4">
             <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Experiencing issues?</p>
             <p className="text-xs text-brand-dark/60 italic">Reach out to our concierge at <span className="font-bold text-brand-secondary">+91 7489777988</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
