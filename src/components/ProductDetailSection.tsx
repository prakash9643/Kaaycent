import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";
import { Product, Review } from "../types";
import { useCart } from "../context/CartContext";

interface ProductDetailSectionProps {
  selectedProduct: Product;
}

export const ProductDetailSection = ({ selectedProduct }: ProductDetailSectionProps) => {
  const { addToCart } = useCart();
  const [allReviews, setAllReviews] = useState<Record<string, Review[]>>({
    "1": [
      { id: "r1", userName: "Sophia Loren", rating: 5, comment: "Bold and mysterious. Perfectly named.", date: "Oct 12, 2023" }
    ],
    "2": [
      { id: "r2", userName: "Aravind K.", rating: 5, comment: "Most authentic sandalwood I've found.", date: "Nov 02, 2023" }
    ],
  });

  const reviews = allReviews[selectedProduct.id] || [];
  const [newReview, setNewReview] = useState({ userName: "", rating: 5, comment: "" });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;

    const review: Review = {
      id: Date.now().toString(),
      ...newReview,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };

    setAllReviews(prev => ({
      ...prev,
      [selectedProduct.id]: [review, ...(prev[selectedProduct.id] || [])]
    }));
    setNewReview({ userName: "", rating: 5, comment: "" });
    setShowReviewForm(false);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <section id="product-detail" className="py-24 bg-white overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            key={selectedProduct.id + "-img"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-[60px] overflow-hidden aspect-[4/5] shadow-2xl"
          >
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div 
            key={selectedProduct.id + "-info"}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-6xl font-display font-medium leading-tight mb-6">
                The <span className="text-rose-500">Essence</span> of <br /> {selectedProduct.name}
              </h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(Number(averageRating)) ? "fill-orange-400" : ""}`} />
                  ))}
                </div>
                <span className="text-lg font-semibold">{averageRating}</span>
                <span className="text-gray-400">({reviews.length} reviews)</span>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold border-b border-gray-200 pb-2">Product Overview</h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description} - A premium choice for sensory splendor.
                </p>
                <ul className="space-y-3">
                  <li className="text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400" /> <strong>Category:</strong> {selectedProduct.category}</li>
                  <li className="text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400" /> <strong>Quality:</strong> Artisanal & Hand-crafted</li>
                  <li className="text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-400" /> <strong>Sustainability:</strong> Eco-friendly ingredients</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-display font-bold">Price: <span className="text-rose-500">{selectedProduct.price}.00 Rs</span></span>
                <span className="text-xl text-gray-500 font-medium">Standard Size</span>
              </div>
              
              <div className="flex gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(selectedProduct)}
                  className="px-12 py-4 bg-brand-dark text-white rounded-full font-bold tracking-widest uppercase hover:bg-black transition-all shadow-xl"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="pt-12 border-t border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-2xl font-display font-medium">Customer Reviews</h4>
                <button 
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors"
                >
                  {showReviewForm ? "Cancel" : "Write a Review"}
                </button>
              </div>

              <AnimatePresence>
                {showReviewForm && (
                  <motion.form
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleSubmitReview}
                    className="mb-12 space-y-4 overflow-hidden bg-gray-50 p-6 rounded-3xl"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                        value={newReview.userName}
                        onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                      />
                      <select 
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>
                    <textarea 
                      placeholder="Share your experience..."
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 h-32 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    />
                    <button 
                      type="submit"
                      className="bg-brand-dark text-white px-8 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase transition-all hover:bg-black"
                    >
                      Post Review
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="space-y-8">
                {reviews.length === 0 ? (
                  <p className="text-gray-400 italic">No reviews yet. Be the first to share your experience!</p>
                ) : (
                  reviews.map((review) => (
                    <motion.div 
                      layout
                      key={review.id} 
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">{review.userName}</span>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex text-orange-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-orange-400" : ""}`} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
