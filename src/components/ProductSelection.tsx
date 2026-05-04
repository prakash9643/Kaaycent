import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Star, ArrowRight, Minus, Plus, ShoppingBag, Search } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../constants";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

interface ProductSelectionProps {
  onProductClick: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlist: Product[];
}

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
}

const ProductCard = ({ 
  product, 
  isWishlisted, 
  onToggleWishlist 
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const [added, setAdded] = useState(false);

  const adjustQuantity = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAdd = () => {
    addItem(product, quantity);
    setQuantity(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      layout
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -12, 
        scale: 1.02, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        zIndex: 10
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-[30px] md:rounded-[40px] p-4 md:p-6 shadow-sm border border-gray-100 group relative flex flex-col h-full"
    >
      <div className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 left-3 md:top-4 md:left-4 p-2 md:p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-rose-500 transition-colors z-10"
        >
          <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <AnimatePresence>
          {added && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10"
            >
              <ShoppingBag className="w-12 h-12 mb-2 text-rose-500" />
              <span className="font-display font-medium uppercase tracking-widest text-sm">Added To Casket</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="text-center flex-grow flex flex-col">
        <h4 className="text-base md:text-lg font-display font-semibold mb-1 md:mb-2">{product.name}</h4>
        <div className="flex items-center justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-2.5 h-2.5 md:w-3 md:h-3 ${i < 4 ? "fill-orange-400 text-orange-400" : "text-gray-300"}`} />
          ))}
          <span className="text-[9px] md:text-[10px] text-gray-400 font-medium ml-1">(729)</span>
        </div>
        
        <div className="text-rose-500 font-display text-lg md:text-xl mb-4">
          ₹{product.price.toLocaleString('en-IN')}
        </div>

        <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Qty</span>
            <div className="flex items-center bg-[#F2EDE1] rounded-full p-1 flex-1 max-w-[120px] justify-between">
              <button 
                onClick={() => adjustQuantity(-1)}
                className="p-1.5 md:p-2 hover:bg-white rounded-full transition-colors text-brand-dark disabled:opacity-30"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5 md:w-3 md:h-3" />
              </button>
              <span className="text-[10px] md:text-xs font-bold w-4 text-center">{quantity}</span>
              <button 
                onClick={() => adjustQuantity(1)}
                className="p-1.5 md:p-2 hover:bg-white rounded-full transition-colors text-brand-dark"
              >
                <Plus className="w-3.5 h-3.5 md:w-3 md:h-3" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 md:gap-3">
          <button 
            onClick={() => navigate(`/product/${product.id}`)}
            className="py-2.5 md:py-3 rounded-xl md:rounded-2xl border border-gray-200 text-[9px] md:text-[10px] font-bold tracking-widest uppercase hover:border-black transition-all"
          >
            Details
          </button>
          <button 
            onClick={handleAdd}
            className={`py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
              added ? "bg-rose-500 text-white" : "bg-brand-dark text-white hover:bg-rose-500"
            }`}
          >
            <ShoppingBag className="w-3 h-3" />
            {added ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

export const ProductSelection = ({ onProductClick, onToggleWishlist, wishlist }: ProductSelectionProps) => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const [activeCategory, setActiveCategory] = useState<"all" | "perfume" | "candle" | "aura">("all");
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredByCategory = activeCategory === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
  
  const filteredFinal = searchQuery.trim() === "" 
    ? filteredByCategory 
    : filteredByCategory.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const displayCount = searchQuery.trim() !== "" ? filteredFinal.length : (isMobile ? 4 : 8);
  const displayedProducts = filteredFinal.slice(0, displayCount);

  return (
    <section id="shop" className="py-24 bg-[#F2EDE1]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-widest rounded-full">Available in India</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                {searchQuery.trim() !== "" ? `${filteredFinal.length} Matching Scents` : (isMobile ? "4 Curated Results" : "8 Curated Results")}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-medium mb-6 leading-[1.1]">
              {searchQuery.trim() !== "" ? "Found Your" : "Experience"} <br />
              <span className="text-rose-500 italic">{searchQuery.trim() !== "" ? "Scent" : "Sensory"}</span> {searchQuery.trim() !== "" ? "" : "Splendor"}
            </h2>
            <p className="text-gray-500 text-lg font-light leading-relaxed">
              Each Kaycent product is meticulously designed to deliver a premium sensory experience. 
              Our collection spans across fine fragrances, artisanal light, and sacred rituals.
            </p>
          </div>
          
          <div className="flex overflow-x-auto no-scrollbar items-center gap-3 pb-4">
            {["all", "perfume", "candle", "aura"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                  activeCategory === cat 
                  ? "bg-brand-dark text-white shadow-2xl scale-105" 
                  : "bg-white/50 text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-200"
                }`}
              >
                {cat === 'all' ? 'All Products' : cat === 'candle' ? 'Aroma Candles' : `${cat}s`}
              </button>
            ))}
            {activeCategory !== 'all' && (
              <button 
                onClick={() => navigate(`/category/${activeCategory}`)}
                className="ml-4 p-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-all flex items-center gap-2 group shadow-lg"
                title="View Full Collection"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                isWishlisted={wishlist.some(p => p.id === product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-2xl font-display font-medium text-gray-900 mb-2">No matching fragrances found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any products matching "{searchQuery}". Try a different scent or category.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-8 text-rose-500 font-bold uppercase tracking-widest text-xs border-b border-rose-500 pb-1 hover:text-brand-dark hover:border-brand-dark transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {isMobile && filteredFinal.length > 4 && searchQuery.trim() === "" && (
          <div className="mt-12 flex justify-center">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(activeCategory === 'all' ? '/category/perfume' : `/category/${activeCategory}`)}
              className="flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-md border border-gray-100 group"
            >
              <span className="text-brand-dark font-bold uppercase tracking-[0.2em] text-[10px]">Explore More</span>
              <div className="p-2 bg-rose-500 text-white rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};
