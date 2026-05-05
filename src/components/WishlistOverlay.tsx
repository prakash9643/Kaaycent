import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types";

interface WishlistOverlayProps {
  isOpen: boolean;
  items: Product[];
  onClose: () => void;
  onToggle: (p: Product) => void;
}

export const WishlistOverlay = ({ isOpen, items, onClose, onToggle }: WishlistOverlayProps) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl p-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-display font-medium">My Wishlist</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-gray-400 font-medium">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-3xl border border-gray-100 group">
                    <div 
                      className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${encodeURIComponent(item.id)}`);
                        onClose();
                      }}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">{item.category}</p>
                      <h4 
                        className="text-lg font-display font-semibold mb-2 cursor-pointer hover:text-rose-500 transition-colors"
                        onClick={() => {
                          navigate(`/product/${encodeURIComponent(item.id)}`);
                          onClose();
                        }}
                      >
                        {item.name}
                      </h4>
                      <button 
                        onClick={() => onToggle(item)}
                        className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
