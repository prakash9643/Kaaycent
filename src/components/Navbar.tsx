import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingCart, Heart, User, LogOut, ChevronDown, Menu, X, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";

interface NavbarProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  cartCount: number;
}

export const Navbar = ({ wishlistCount, onOpenWishlist, cartCount }: NavbarProps) => {
  const { user, logOut } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
    // If we're not on the home page, searching should probably take us there to see results
    if (location.pathname !== '/' && e.target.value.trim() !== '') {
      navigate('/');
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const shopCategories = [
    { name: "Perfumes", id: "perfume" },
    { name: "Aroma Candles", id: "candle" },
    { name: "Pooja Fragrances", id: "aura" }
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <div className="w-9 h-9 bg-brand-secondary rounded-full flex items-center justify-center text-white font-display font-bold text-lg">K</div>
        <span className="font-display font-bold tracking-widest text-white uppercase text-xs sm:text-sm">Kaycent</span>
      </Link>
      
      <div className="hidden lg:flex items-center gap-8 text-white/80 text-[13px] font-medium tracking-wider">
        <Link to="/" className="hover:text-brand-secondary transition-colors uppercase">Home</Link>
        
        <div 
          className="relative group py-2"
          onMouseEnter={() => setShowShopDropdown(true)}
          onMouseLeave={() => setShowShopDropdown(false)}
        >
          <button className="flex items-center gap-1.5 hover:text-brand-secondary transition-colors uppercase">
            Shop <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showShopDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {showShopDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-56 bg-brand-dark border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-2"
              >
                {shopCategories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => {
                      setShowShopDropdown(false);
                      navigate(`/category/${cat.id}`);
                    }}
                    className="w-full text-left px-5 py-3.5 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded-2xl transition-all uppercase tracking-widest font-bold"
                  >
                    {cat.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to="/about" className="hover:text-brand-secondary transition-colors uppercase">About</Link>
        <Link to="/blog" className="hover:text-brand-secondary transition-colors uppercase">Blog</Link>
        <Link to="/track" className="hover:text-brand-secondary transition-colors uppercase">Track Order</Link>
        <Link to="/contact" className="hover:text-brand-secondary transition-colors uppercase">Contact Us</Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative hidden xl:block">
          <input 
            type="text" 
            placeholder="Search fragrances" 
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-white/5 text-white placeholder-white/30 border border-white/10 rounded-full py-2 px-10 text-xs w-44 focus:outline-none focus:ring-1 focus:ring-brand-secondary/50 focus:bg-white/10 transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {user ? (
            <div className="flex items-center gap-2 bg-white/5 p-1 pr-3 rounded-full border border-white/10">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full" />
              ) : (
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brand-secondary rounded-full flex items-center justify-center text-[10px] font-bold text-white uppercase">
                  {user.email?.[0] || 'U'}
                </div>
              )}
              <button 
                onClick={() => logOut()}
                className="p-1 hover:text-rose-400 transition-colors hidden sm:block"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5 text-white/50 hover:text-white" />
              </button>
            </div>
          ) : (
            <Link 
              to="/auth"
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group lg:flex hidden"
              title="Sign In"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white" />
            </Link>
          )}

          <button 
            onClick={onOpenWishlist}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all relative group"
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white ${wishlistCount > 0 ? "fill-white text-white" : ""}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-[10px] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold ring-2 ring-black">{wishlistCount}</span>
            )}
          </button>

          <Link 
            to="/checkout"
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all relative group"
            title="Cart"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-secondary text-[10px] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold ring-2 ring-black">{cartCount}</span>
            )}
          </Link>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all border border-white/20 ml-1"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-black/98 backdrop-blur-3xl z-[60] lg:hidden flex flex-col"
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden flex items-center justify-center">
              <span className="text-[60vw] font-display font-black leading-none tracking-tighter uppercase whitespace-nowrap rotate-12">
                Fragrance
              </span>
            </div>

            <div className="flex flex-col h-full relative z-10 px-8 py-24 overflow-y-auto no-scrollbar">
              {/* Menu Header with Back Button */}
              <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 group transition-transform active:scale-95"
                >
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-brand-secondary transition-all">
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-white font-bold uppercase tracking-[0.2em] text-[10px]">Back</span>
                    <span className="text-gray-500 text-[8px] uppercase tracking-widest font-medium">To Site</span>
                  </div>
                </button>

                <div className="flex flex-col items-end">
                   <div className="w-12 h-12 bg-brand-secondary rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-brand-secondary/20">K</div>
                </div>
              </div>

              <div className="mt-16 flex flex-col items-center text-center">
                <div className="mb-10 w-full max-w-sm relative">
                  <input 
                    type="text" 
                    placeholder="Search boutique..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-12 text-white text-sm focus:outline-none focus:border-brand-secondary transition-all"
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                </div>

                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[10px] font-bold uppercase tracking-[0.5em] text-rose-500 mb-12 block ring-1 ring-rose-500/30 px-3 py-1 rounded-full"
                >
                  The Atelier
                </motion.span>
                
                <nav className="flex flex-col gap-10 items-center">
                  {[
                    { name: "Discovery", path: "/", sub: "Return to Home" },
                    { name: "The Story", path: "/about", sub: "Our Heritage" },
                    { name: "Journal", path: "/blog", sub: "Latest Stories" },
                    { name: "Track Order", path: "/track", sub: "Live Journey" },
                    { name: "Boutique", path: "/category/perfume", sub: "Signature Scents" },
                    { name: "Inquiry", path: "/contact", sub: "Get in Touch" }
                  ].map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.2 + (idx * 0.1),
                        type: "spring",
                        stiffness: 100
                      }}
                      className="group"
                    >
                      <Link 
                        to={link.path} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-1"
                      >
                        <span className="text-5xl font-display font-medium text-white group-hover:text-brand-secondary transition-all group-hover:tracking-wider">
                          {link.name}
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                          {link.sub}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="mt-24 space-y-8">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-600">Curated Collections</span>
                  <div className="flex flex-wrap justify-center gap-3">
                    {shopCategories.map((cat, idx) => (
                      <motion.button 
                        key={cat.id}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + (idx * 0.1) }}
                        onClick={() => {
                          navigate(`/category/${cat.id}`);
                          setIsMobileMenuOpen(false);
                        }}
                        className="px-6 py-3 bg-white/5 border border-white/5 rounded-full text-[10px] uppercase tracking-[0.2em] text-white hover:bg-brand-secondary/20 hover:border-brand-secondary/40 transition-all font-bold"
                      >
                        {cat.name}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-8">
                  {user ? (
                    <button 
                      onClick={() => {
                        logOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-8 py-3 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold tracking-widest uppercase text-[10px] hover:bg-rose-500 hover:text-white transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  ) : (
                    <Link 
                      to="/auth" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-8 py-3 rounded-full bg-brand-secondary text-white font-bold tracking-widest uppercase text-[10px] shadow-lg shadow-brand-secondary/20"
                    >
                      <User className="w-4 h-4" /> My Account
                    </Link>
                  )}
                  
                  <div className="text-center space-y-2 opacity-40">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-white font-bold">Kaycent Private Collection</p>
                    <p className="text-[8px] uppercase tracking-widest text-gray-500">Saurastra • India • Since 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

