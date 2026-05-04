import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { Star, Heart, ArrowLeft, SlidersHorizontal, ShoppingCart, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

const ProductItem = ({ product, onToggleWishlist, isWishlisted }: { product: Product, onToggleWishlist: (p: Product) => void, isWishlisted: boolean, key?: React.Key }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setQuantity(1);
  };

  const adjustQuantity = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden mb-6 bg-white shadow-sm border border-gray-100">
        <button 
          onClick={() => onToggleWishlist(product)}
          className="absolute top-6 left-6 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-rose-500 transition-all"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
        </button>
        
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10"
              >
                <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mb-4 shadow-2xl">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <span className="font-display font-medium uppercase tracking-[0.2em] text-sm">Added</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>
      
      <div className="text-center px-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-500 mb-2">{product.category}</p>
        <h3 className="text-xl font-display font-semibold mb-2 cursor-pointer hover:text-rose-500 transition-colors" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-orange-400 text-orange-400" : "text-gray-200 fill-gray-200"}`} />
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-4 mb-6 bg-gray-100/50 rounded-full py-2 px-4">
          <button 
            onClick={() => adjustQuantity(-1)}
            className="p-1 hover:text-rose-500 transition-colors disabled:opacity-20"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold w-6">{quantity}</span>
          <button 
            onClick={() => adjustQuantity(1)}
            className="p-1 hover:text-rose-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
          <button 
            onClick={handleAddToCart}
            className={`p-3 rounded-full transition-all shadow-lg group-hover:scale-110 active:scale-95 ${added ? "bg-rose-500 text-white" : "bg-brand-dark text-white hover:bg-rose-500"}`}
            title="Add to Cart"
          >
            {added ? <ShoppingBag className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const CategoryPage = ({ onToggleWishlist, wishlist }: { onToggleWishlist: (p: Product) => void, wishlist: Product[] }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { searchQuery } = useSearch();
  const navigate = useNavigate();

  const categoryInfo = useMemo(() => {
    // ... switch logic remains same
    switch (categoryId) {
      case 'perfume':
        return {
          title: 'Eau De Parfum',
          description: 'A collection of sophisticated scents designed for the modern connoisseur. Long-lasting, evocative, and uniquely you.',
          image: '/perfumes/perfume-category-header.png'
        };
      case 'candle':
        return {
          title: 'Aroma Candles',
          description: 'Transform your space with our hand-poured soy wax candles. A symphony of light and fragrance for your sanctuary.',
          image: '/candles/candle-category-header.png'
        };
      case 'aura':
        return {
          title: 'Pooja Fragrances',
          description: 'Sacred scents for your daily rituals. Traditional ingredients meets contemporary craftsmanship for a divine atmosphere.',
          image: '/pooja/pooja-category-header.png'
        };
      default:
        return {
          title: 'Our Collection',
          description: 'Discover the full range of Kaycent sensory treasures.',
          image: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=1200'
        };
    }
  }, [categoryId]);

  const filteredProducts = useMemo(() => {
    let base = categoryId && categoryId !== 'all' 
      ? PRODUCTS.filter(p => p.category === categoryId)
      : PRODUCTS;

    if (searchQuery.trim() !== "") {
      return base.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return base;
  }, [categoryId, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDF8EE]">
      {/* Category Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={categoryInfo.image} 
            alt={categoryInfo.title} 
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-xs font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
            <h1 className="text-6xl md:text-8xl font-display font-medium text-white mb-6 uppercase tracking-tighter">
              {categoryInfo.title}
            </h1>
            <p className="text-white/80 max-w-xl mx-auto font-light text-lg">
              {categoryInfo.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-display font-medium">{filteredProducts.length} Results</span>
              <div className="h-4 w-[1px] bg-gray-300" />
              <span className="text-xs font-bold uppercase text-gray-400 tracking-widest">Available in India</span>
            </div>
            
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 hover:border-black transition-all text-xs font-bold uppercase tracking-widest">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductItem 
                  key={product.id} 
                  product={product} 
                  onToggleWishlist={onToggleWishlist} 
                  isWishlisted={wishlist.some(p => p.id === product.id)} 
                />
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-white rounded-[40px] border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <div className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-lg" />
                </div>
                <h3 className="text-2xl font-display font-medium text-gray-900 mb-2">No fragrances match your search</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-8 font-light italic">"{searchQuery}" was not found in this collection.</p>
                <Link to="/" className="text-rose-500 font-bold uppercase tracking-widest text-[10px] bg-rose-500/5 px-6 py-3 rounded-full hover:bg-rose-500 hover:text-white transition-all">
                  Browse All Collections
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Aesthetic Banner */}
      <section className="py-24 bg-brand-dark overflow-hidden rounded-t-[100px]">
        <div className="container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-medium mb-8">
              A Blend of <span className="text-yellow-400 italic">Tradition</span> & Luxury
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-12">
              Every drop, every wick, every note is crafted with a deep respect for artisanal heritage and modern sensory science.
            </p>
            <div className="flex gap-4 justify-center">
              <div className="w-16 h-[1px] bg-white/20 self-center" />
              <img 
                src="https://images.unsplash.com/photo-1605651202774-98e3fd8fc7aa?auto=format&fit=crop&q=75&w=100" 
                className="w-12 h-12 rounded-full object-cover grayscale" 
                alt="Small asset" 
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="w-16 h-[1px] bg-white/20 self-center" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
