import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, ShoppingBag, ArrowLeft, Shield, Truck, RefreshCcw, Minus, Plus, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

export const ProductDetailPage = ({ onToggleWishlist, wishlist }: { onToggleWishlist: (p: Product) => void, wishlist: Product[] }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products, error, loading: productsLoading } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;
    const decodedId = decodeURIComponent(id);
    const found = products.find(p => p.id === decodedId);
    if (found) {
      setProduct(found);
    }
  }, [id, products]);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) return;
    
    setPincodeStatus('checking');
    setTimeout(() => {
      // Pan India availability: all 6-digit pincodes are now accepted
      setPincodeStatus('available');
    }, 800);
  };

  const adjustQuantity = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2EDE1]">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EDE1] pt-32 pb-24">
      <div className="container mx-auto px-6">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 bg-rose-50 border border-rose-200 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-semibold text-rose-900 text-sm">Shopify Configuration Issue</h3>
                <p className="text-[10px] text-rose-700/80 leading-tight">{error}</p>
              </div>
            </div>
            <a 
              href="https://vercel.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 bg-rose-500 text-white rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-rose-600 transition-colors whitespace-nowrap"
            >
              Verify Env Variables
            </a>
          </motion.div>
        )}

        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Back</span>
        </button>

        {(!product) ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 px-6">
            <h2 className="text-4xl font-display mb-4">Product Not Found</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">We couldn't find the product you're looking for or it's currently unavailable.</p>
            <button onClick={() => navigate('/')} className="px-8 py-3 bg-brand-dark text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-rose-500 transition-all shadow-xl">Back to Gallery</button>
          </motion.div>
        ) : (() => {
          const isWishlisted = wishlist.some(p => p.id === product.id);
          const handleAddToCart = () => {
            addItem(product, quantity);
            setQuantity(1);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          };
          const images = product.images && product.images.length > 0 ? product.images : [product.image];
          
          return (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
              {/* Left: Images */}
              <div className="lg:w-1/2 space-y-4 md:space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white shadow-2xl relative"
                >
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImg}
                      src={images[activeImg]} 
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      fetchPriority="high"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  <AnimatePresence>
                    {added && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20"
                      >
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-white p-6 rounded-full shadow-2xl"
                        >
                          <ShoppingBag className="w-8 h-8 text-rose-500" />
                        </motion.div>
                        <motion.span 
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="mt-4 font-display font-medium uppercase tracking-[0.3em] text-sm"
                        >
                          Added To Casket
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={() => onToggleWishlist(product)}
                    className="absolute top-8 right-8 p-4 bg-white/20 backdrop-blur-xl rounded-full text-white hover:bg-rose-500 transition-all border border-white/30 z-30"
                  >
                    <Heart className={`w-6 h-6 ${isWishlisted ? "fill-white" : ""}`} />
                  </button>
                </motion.div>
                
                <div className="flex gap-4">
                  {images.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImg === i ? "border-rose-500 shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img 
                        src={img} 
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Info */}
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-brand-dark text-white text-[10px] font-bold uppercase tracking-widest rounded-full">New Arrival</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Handmade In India</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-medium tracking-tighter leading-[1.1] md:leading-none">
                      {product.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 py-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 md:w-4 h-4 ${i < Math.floor(product.rating) ? "fill-orange-400 text-orange-400" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-gray-400 font-medium">({product.rating} / 5.0) Review • 2.4k Orders</span>
                    </div>
                  </div>

                  <div className="text-4xl md:text-5xl font-display font-light text-rose-500">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>

                  <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-lg">
                    Our signature formulation, {product.name} is a masterclass in olfactory balance. 
                    {product.description} Crafted with precision and passion, this {product.category} 
                    embodies the spirit of Kaycent’s artisanal heritage.
                  </p>

                  <div className="space-y-6 pt-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Selection</h4>
                      <div className="flex flex-wrap gap-3">
                        {['Standard', 'Premium Collection', 'Gift Box'].map((size) => (
                          <button 
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-all ${selectedSize === size ? "bg-brand-dark text-white" : "border border-gray-200 text-gray-400 hover:border-gray-800 hover:text-gray-800"}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Quantity</h4>
                      <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 max-w-[180px] justify-between">
                        <button 
                          onClick={() => adjustQuantity(-1)}
                          className="p-3 hover:bg-gray-50 rounded-full transition-colors text-brand-dark disabled:opacity-30"
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="text-lg font-display font-medium w-8 text-center">{quantity}</span>
                        <button 
                          onClick={() => adjustQuantity(1)}
                          className="p-3 hover:bg-gray-50 rounded-full transition-colors text-brand-dark"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <button 
                      onClick={handleAddToCart}
                      disabled={added}
                      className={`flex-1 py-5 rounded-full font-bold tracking-[0.3em] uppercase transition-all duration-700 shadow-2xl flex items-center justify-center gap-4 group relative overflow-hidden ${
                        added 
                        ? "bg-rose-600 text-white shadow-rose-200" 
                        : "bg-brand-dark text-white hover:bg-rose-600 hover:shadow-rose-100 active:scale-[0.98]"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {added ? (
                          <motion.div
                            key="added"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -30, opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <CheckCircle2 className="w-6 h-6" />
                            <span className="text-xs">Added to collection</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="add"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -30, opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                            <span className="text-xs">Add to Casket</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Subtle shine effect */}
                      {!added && (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />
                      )}
                    </button>
                    <button 
                      onClick={() => {
                        handleAddToCart();
                        navigate('/checkout');
                      }}
                      className="px-12 py-5 border border-brand-dark rounded-full font-bold tracking-[0.3em] uppercase hover:bg-brand-dark hover:text-white transition-all duration-500 text-xs"
                    >
                      Instant Buy
                    </button>
                  </div>

                  {/* Pincode Checker */}
                  <div className="pt-8 border-t border-gray-100">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      Delivery Check
                    </h4>
                    <form onSubmit={checkPincode} className="flex gap-2">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          maxLength={6}
                          placeholder="Enter Pincode (e.g. 400001)"
                          value={pincode}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setPincode(val);
                            if (pincodeStatus !== 'idle') setPincodeStatus('idle');
                          }}
                          className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-brand-dark transition-colors"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {pincodeStatus === 'checking' && (
                            <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                          )}
                        </div>
                      </div>
                      <button 
                        type="submit"
                        disabled={pincode.length !== 6 || pincodeStatus === 'checking'}
                        className="bg-brand-dark text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-rose-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-dark"
                      >
                        Check
                      </button>
                    </form>
                    
                    <AnimatePresence mode="wait">
                      {pincodeStatus === 'available' && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-3 text-[10px] font-bold text-green-600 flex items-center gap-1.5 uppercase tracking-wider"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          Delivery available at this pin code — Estimated 4-6 days
                        </motion.p>
                      )}
                      {pincodeStatus === 'unavailable' && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-3 text-[10px] font-bold text-rose-500 flex items-center gap-1.5 uppercase tracking-wider"
                        >
                          <AlertCircle className="w-3 h-3" />
                          Currently unavailable at {pincode}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-3 gap-4 md:gap-8 pt-12 border-t border-gray-200">
                    <div className="text-center space-y-1 md:space-y-2">
                      <Shield className="w-5 h-5 md:w-6 h-6 mx-auto text-rose-500 opacity-60" />
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Pure Quality</p>
                    </div>
                    <div className="text-center space-y-1 md:space-y-2">
                      <Truck className="w-5 h-5 md:w-6 h-6 mx-auto text-rose-500 opacity-60" />
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Pan India Delivery</p>
                    </div>
                    <div className="text-center space-y-1 md:space-y-2">
                      <RefreshCcw className="w-5 h-5 md:w-6 h-6 mx-auto text-rose-500 opacity-60" />
                      <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Easy Returns</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })()}

        {product && (
          <section className="mt-16 md:mt-32 pt-16 md:pt-32 border-t border-gray-200">
             <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">
                <div className="text-center">
                  <h2 className="text-3xl md:text-5xl font-display mb-6 md:mb-8">The Sensory Journey</h2>
                  <p className="text-base md:text-xl text-gray-500 font-light leading-relaxed">
                    Every note in {product.name} has been selected to evoke a specific memory. 
                    We believe that scent is the most direct path to the soul, 
                    cutting through the noise of the everyday to deliver a moment of pure clarity.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                   <div className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-xl space-y-6">
                      <h3 className="text-xl md:text-2xl font-display">Olfactory Notes</h3>
                      <ul className="space-y-4">
                        <li className="flex justify-between border-b pb-2 text-xs md:text-sm"><span className="text-gray-400">Top</span> <span className="font-medium tracking-widest uppercase text-[10px] md:text-xs">Bergamot & Pink Pepper</span></li>
                        <li className="flex justify-between border-b pb-2 text-xs md:text-sm"><span className="text-gray-400">Heart</span> <span className="font-medium tracking-widest uppercase text-[10px] md:text-xs">Damask Rose & Jasmine</span></li>
                        <li className="flex justify-between border-b pb-2 text-xs md:text-sm"><span className="text-gray-400">Base</span> <span className="font-medium tracking-widest uppercase text-[10px] md:text-xs">Ambergris & Sandalwood</span></li>
                      </ul>
                   </div>
                   <div className="bg-brand-dark p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-xl text-white space-y-6">
                      <h3 className="text-xl md:text-2xl font-display text-rose-500">The Ritual</h3>
                      <p className="text-sm md:text-base text-white/60 font-light italic">
                        "Apply to pulse points or light in a draft-free space. 
                        Allow the first burn to reach the edges. 
                        Breathe deep. Re-center."
                      </p>
                   </div>
                </div>
             </div>
          </section>
        )}
      </div>
    </div>
  );
};
