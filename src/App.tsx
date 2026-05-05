import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WishlistOverlay } from "./components/WishlistOverlay";
import ScrollToTop from "./components/ScrollToTop";
import { HomePage } from "./pages/Home";
import { AuthPage } from "./pages/Auth";
import { CheckoutPage } from "./pages/Checkout";
import { CategoryPage } from "./pages/CategoryPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { TrackOrderPage } from "./pages/TrackOrder";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicy";
import { RefundPolicyPage } from "./pages/RefundPolicy";
import { BlogPage } from "./pages/BlogPage";
import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import { ProductProvider } from "./context/ProductContext";
import { Product } from "./types";

const AppContent = () => {
  const location = useLocation();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <main className="min-h-screen relative font-sans">
      <Navbar 
        wishlistCount={wishlist.length} 
        onOpenWishlist={() => setIsWishlistOpen(true)} 
        cartCount={totalItems}
      />
      <WishlistOverlay 
        isOpen={isWishlistOpen} 
        items={wishlist} 
        onClose={() => setIsWishlistOpen(false)}
        onToggle={toggleWishlist}
      />
      
      <Routes>
        <Route path="/" element={<HomePage onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
        <Route path="/product/:id" element={<ProductDetailPage onToggleWishlist={toggleWishlist} wishlist={wishlist} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/track" element={<TrackOrderPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
      
      <Footer />
    </main>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <SearchProvider>
            <BrowserRouter>
              <ScrollToTop />
              <AppContent />
            </BrowserRouter>
          </SearchProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}
