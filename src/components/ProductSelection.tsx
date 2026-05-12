import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Star, ArrowRight, Minus, Plus, ShoppingBag, Search, SlidersHorizontal, ChevronDown, ChevronUp, X, Check } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../constants";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useProducts } from "../context/ProductContext";

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
      <div className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 cursor-pointer" onClick={() => navigate(`/product/${encodeURIComponent(product.id)}`)}>
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
            <Star key={i} className={`w-2.5 h-2.5 md:w-3 md:h-3 ${i < product.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}`} />
          ))}
          <span className="text-[9px] md:text-[10px] text-gray-400 font-medium ml-1">({product.rating})</span>
        </div>
        
        <div className="text-rose-500 font-display text-lg md:text-xl mb-4">
          ₹{product.price.toLocaleString('en-IN')}
        </div>

        <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-gray-50">
          <div className="flex items-center justify-between gap-4 px-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Quantity</span>
            <div className="flex items-center bg-[#F2EDE1] rounded-full p-1 w-28 justify-between">
              <button 
                onClick={() => adjustQuantity(-1)}
                className="p-1.5 hover:bg-white rounded-full transition-colors text-brand-dark disabled:opacity-30"
                disabled={quantity <= 1}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-[10px] font-bold w-4 text-center">{quantity}</span>
              <button 
                onClick={() => adjustQuantity(1)}
                className="p-1.5 hover:bg-white rounded-full transition-colors text-brand-dark"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 h-11">
            <button 
              onClick={() => navigate(`/product/${encodeURIComponent(product.id)}`)}
              className="flex-1 rounded-full border border-gray-200 text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
            >
              Details
            </button>
            <button 
              onClick={handleAdd}
              disabled={added}
              className={`flex-[1.5] rounded-full text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-2 group relative overflow-hidden ${
                added 
                ? "bg-rose-500 text-white" 
                : "bg-brand-dark text-white hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-100"
              }`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.div
                    key="added"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                    <span>Add to Casket</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
    </div>
  </motion.div>
  );
};

export const ProductSelection = ({ onProductClick, onToggleWishlist, wishlist }: ProductSelectionProps) => {
  const navigate = useNavigate();
  const { products, error, loading } = useProducts();
  const { searchQuery, setSearchQuery } = useSearch();
  const [activeCategory, setActiveCategory] = useState<"all" | "perfume" | "candle" | "aura" | "gift-set">("all");
  const [isMobile, setIsMobile] = useState(false);

  // New filter states
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000); // Increased range
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredAndSorted = React.useMemo(() => {
    let result = products.filter(p => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = searchLower === "" || 
        p.name.toLowerCase().includes(searchLower) || 
        p.description?.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower);
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      const matchesRating = p.rating >= minRating;
      
      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });

    // Apply sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, activeCategory, searchQuery, minPrice, maxPrice, minRating, sortBy]);

  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setMinRating(0);
    setSearchQuery("");
    setSortBy("featured");
    setActiveCategory("all");
  };

  const isFiltering = searchQuery.trim() !== "" || minPrice > 0 || maxPrice < 10000 || minRating > 0 || activeCategory !== "all";

  const displayCount = isFiltering ? filteredAndSorted.length : (isMobile ? 4 : 8);
  const displayedProducts = filteredAndSorted.slice(0, displayCount);

  return (
    <section id="shop" className="py-24 bg-[#F2EDE1]">
      <div className="container mx-auto px-6">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 bg-rose-50 border border-rose-200 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white shrink-0">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-rose-900">Shopify Sync Issue Detected</h3>
                <p className="text-sm text-rose-700/80">{error}</p>
              </div>
            </div>
            <a 
              href="https://vercel.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 bg-rose-500 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-rose-600 transition-colors"
            >
              Check Vercel Env
            </a>
          </motion.div>
        )}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-widest rounded-full">Available in India</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                {isFiltering ? `${filteredAndSorted.length} Results Found` : (isMobile ? "4 Curated Results" : "8 Curated Results")}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-medium mb-6 leading-[1.1]">
              {isFiltering ? "Your Refined" : "Experience"} <br />
              <span className="text-rose-500 italic">{isFiltering ? "Results" : "Sensory"}</span> {isFiltering ? "" : "Splendor"}
            </h2>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex overflow-x-auto no-scrollbar items-center gap-3 pb-2">
              {["all", "perfume", "candle", "aura"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-6 md:px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat 
                    ? "bg-brand-dark text-white shadow-xl scale-105" 
                    : "bg-white/50 text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-200"
                  }`}
                >
                  {cat === 'all' ? 'All' : cat === 'candle' ? 'Candles' : cat}
                </button>
              ))}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-full transition-all flex items-center gap-2 group shadow-lg ${
                  showFilters ? "bg-rose-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                title="Advanced Filters"
              >
                <SlidersHorizontal className="w-5 h-5" />
                {isFiltering && !showFilters && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-[#F2EDE1] rounded-full"></span>
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white/40 backdrop-blur-md rounded-[30px] p-6 md:p-8 border border-white/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Price Range */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Price Range (₹)</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs text-[10px]">Min</span>
                        <input 
                          type="number" 
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          className="w-full bg-white/50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:ring-1 focus:ring-rose-500 transition-all outline-none"
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs text-[10px]">Max</span>
                        <input 
                          type="number" 
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="w-full bg-white/50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:ring-1 focus:ring-rose-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="10000" 
                      step="100"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                  </div>

                  {/* Minimum Rating */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Minimum Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setMinRating(star)}
                          className={`p-2 rounded-xl border transition-all ${
                            minRating >= star 
                            ? "bg-rose-500 border-rose-500 text-white" 
                            : "bg-white/50 border-gray-100 text-gray-400 hover:border-rose-300"
                          }`}
                        >
                          <Star className={`w-4 h-4 ${minRating >= star ? "fill-current" : ""}`} />
                        </button>
                      ))}
                      {minRating > 0 && (
                        <button 
                          onClick={() => setMinRating(0)}
                          className="ml-2 text-[10px] font-bold text-gray-400 hover:text-rose-500 uppercase tracking-widest"
                        >
                          Any
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sorting & Keywords */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Sort By</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'featured', label: 'Featured' },
                        { id: 'price-asc', label: 'Price: Low-High' },
                        { id: 'price-desc', label: 'Price: High-Low' },
                        { id: 'rating', label: 'Top Rated' }
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSortBy(option.id as any)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                            sortBy === option.id 
                            ? "bg-brand-dark text-white shadow-md" 
                            : "bg-white/50 text-gray-400 hover:text-gray-900 border border-gray-100"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Keywords Selection */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Search Keywords</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        type="text"
                        placeholder="Search scent notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-xs font-medium focus:ring-1 focus:ring-rose-500 transition-all outline-none"
                      />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                      <button 
                        onClick={resetFilters}
                        className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-rose-500 flex items-center gap-2"
                      >
                        <X className="w-3 h-3" /> Clear All
                      </button>
                      <button 
                        onClick={() => setShowFilters(false)}
                        className="text-[10px] font-bold uppercase tracking-widest text-brand-dark hover:text-rose-500 flex items-center gap-2"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isFiltering && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-2">Active Filters:</span>
              {activeCategory !== 'all' && (
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                  Category: {activeCategory}
                  <button onClick={() => setActiveCategory('all')}><X className="w-3 h-3 text-rose-500" /></button>
                </div>
              )}
              {minPrice > 0 || maxPrice < 10000 ? (
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                  ₹{minPrice} - ₹{maxPrice}
                  <button onClick={() => { setMinPrice(0); setMaxPrice(10000); }}><X className="w-3 h-3 text-rose-500" /></button>
                </div>
              ) : null}
              {minRating > 0 && (
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                  {minRating}+ Stars
                  <button onClick={() => setMinRating(0)}><X className="w-3 h-3 text-rose-500" /></button>
                </div>
              )}
              {searchQuery && (
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><X className="w-3 h-3 text-rose-500" /></button>
                </div>
              )}
              <button 
                onClick={resetFilters}
                className="text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-brand-dark ml-2 underline underline-offset-4"
              >
                Clear All
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
              <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any products matching your current filters. Try relaxing some criteria.</p>
              <button 
                onClick={resetFilters}
                className="mt-8 text-rose-500 font-bold uppercase tracking-widest text-xs border-b border-rose-500 pb-1 hover:text-brand-dark hover:border-brand-dark transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {!isFiltering && isMobile && filteredAndSorted.length > 4 && (
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
