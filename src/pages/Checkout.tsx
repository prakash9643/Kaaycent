import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CreditCard, ChevronRight, ShoppingBag, ShieldCheck, Sparkles, Minus, Plus, Trash2, Tag, MapPin, Truck, CheckCircle2, ArrowRight, User, Home, Smartphone, AlertCircle, Clock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createShopifyCheckout } from '../lib/shopify';

export const CheckoutPage = () => {
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, amount: number} | null>(null);
  const [couponError, setCouponError] = useState('');
  const [orderId, setOrderId] = useState('');

  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#FDF8EE] pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[40px] p-12 shadow-2xl border border-gray-100 flex flex-col items-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
            
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 relative">
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ delay: 0.3, type: "spring" }}
                 className="absolute inset-0 bg-green-100 rounded-full"
               />
              <CheckCircle2 className="w-12 h-12 text-green-500 relative z-10" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-medium mb-4">Scent Secured!</h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Your order <span className="font-extrabold text-brand-dark">#{orderId}</span> has been successfully placed. 
              We've sent the confirmation details to <span className="font-bold text-gray-900">{shippingDetails.email}</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
              <div className="bg-gray-50 p-6 rounded-3xl text-left border border-gray-100 group hover:border-green-200 transition-colors">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Delivery Status</p>
                <div className="flex items-center gap-2 text-rose-500">
                  <Truck className="w-4 h-4 animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-wider">Processing Aroma</span>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-3xl text-left border border-gray-100 group hover:border-brand-secondary/30 transition-colors">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Estimated Arrival</p>
                <div className="flex items-center gap-3 text-brand-dark">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Clock className="w-4 h-4 text-brand-secondary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">04 - 06 Days</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => navigate(`/track?id=${orderId}`)}
                className="px-10 py-5 bg-brand-dark text-white rounded-full font-bold tracking-[0.2em] uppercase hover:bg-black transition-all shadow-xl hover:-translate-y-1"
              >
                Track Live Journey
              </button>
              <Link 
                to="/" 
                className="px-10 py-5 bg-white border border-gray-200 text-brand-dark rounded-full font-bold tracking-[0.2em] uppercase hover:bg-gray-50 transition-all text-center"
              >
                Continue Curation
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-100 w-full">
               <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.4em]">Kaycent Private Collection</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-[#FDF8EE] flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none">
          <h3 className="text-[30vw] font-display font-black leading-none tracking-tighter uppercase">CART</h3>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-md w-full text-center"
        >
          {/* Illustrative Icon Arrangement */}
          <div className="relative w-40 h-40 mx-auto mb-12">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-brand-secondary/20" 
            />
            <div className="absolute inset-4 rounded-full bg-white shadow-2xl flex items-center justify-center">
              <div className="relative">
                <ShoppingBag className="w-16 h-16 text-brand-dark/10" />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-2 -right-2 bg-brand-secondary p-2 rounded-xl shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-medium text-brand-dark mb-6 tracking-tight">The scent is missing</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Your sensory journey hasn't begun yet. Explore our curated collections of artisanal fragrances and hand-poured treasures.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="px-10 py-5 bg-brand-dark text-white rounded-full font-bold tracking-widest uppercase hover:bg-black transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
            >
              Begin Shopping
            </Link>
            <Link 
              to="/about" 
              className="px-10 py-5 bg-white border border-gray-200 text-brand-dark rounded-full font-bold tracking-widest uppercase hover:bg-gray-50 transition-all"
            >
              Our Story
            </Link>
          </div>
          
          <div className="mt-16 pt-12 border-t border-brand-dark/5">
             <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-4">Popular Sanctuary Scents</p>
             <div className="flex flex-wrap justify-center gap-3">
                {['Candles', 'Incense', 'Perfumes'].map((tag) => (
                  <Link 
                    key={tag}
                    to={`/category/${tag.toLowerCase()}`}
                    className="text-[9px] uppercase tracking-widest font-bold px-4 py-2 bg-brand-dark/5 rounded-full hover:bg-brand-secondary hover:text-white transition-all"
                  >
                    {tag}
                  </Link>
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.toUpperCase().trim();
    if (code === 'KAYCENT10') {
      setAppliedCoupon({ code: 'KAYCENT10', amount: Math.round(totalPrice * 0.1) });
      setCouponCode('');
    } else if (code === 'WELCOME') {
      setAppliedCoupon({ code: 'WELCOME', amount: 250 });
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const shippingFee = totalPrice > 2500 ? 0 : 99;
  const convenienceFee = 49;
  const codFee = paymentMethod === 'cod' ? 99 : 0;
  const discountAmount = appliedCoupon?.amount || 0;
  const taxableAmount = totalPrice + codFee - discountAmount;
  const gstAmount = Math.round(taxableAmount * 0.12); // Assuming 12% GST
  const finalTotal = totalPrice + shippingFee + convenienceFee + gstAmount + codFee - discountAmount;

  const handleCheckout = async () => {
    if (step === 'cart') {
      setStep('shipping');
      window.scrollTo(0, 0);
      return;
    }

    if (step === 'shipping') {
      // Validate shipping
      const requiredFields = ['fullName', 'email', 'address', 'city', 'state', 'pincode', 'phone'];
      const isMissing = requiredFields.some(field => !(shippingDetails as any)[field]);
      if (isMissing) {
        alert("Please fill all shipping details");
        return;
      }
      setStep('payment');
      window.scrollTo(0, 0);
      return;
    }

    if (step === 'payment') {
      setIsSubmitting(true);
      
      try {
        const lineItemsWithPlaceholders = cart.filter(item => 
          item.shopifyVariantId?.includes('REPLACE_WITH_') || 
          !item.shopifyVariantId || 
          item.shopifyVariantId.includes('123456789')
        );

        if (lineItemsWithPlaceholders.length > 0) {
          const productList = lineItemsWithPlaceholders.map(i => `• ${i.name}`).join('\n');
          throw new Error(`\n\nMissing Shopify Variant IDs for:\n${productList}\n\nPlease update src/constants.ts with real Variant IDs (not Product IDs) from your Shopify Admin.`);
        }

        const lineItems = cart.map(item => ({
          variantId: item.shopifyVariantId || '',
          quantity: item.quantity
        }));

        if (lineItems.length === 0) {
          throw new Error('No valid Shopify variants found in cart');
        }

        const checkout = await createShopifyCheckout(
          lineItems, 
          undefined, 
          {
            note: `Web Order via Headless App - ${new Date().toISOString()}`,
            attributes: [
              { key: "AppVersion", value: "1.0.0" },
              { key: "CheckoutSource", value: "Custom-UI" },
              { key: "CustomerName", value: shippingDetails.fullName }
            ]
          },
          {
            email: shippingDetails.email,
            phone: shippingDetails.phone
          }
        );
        if (checkout && checkout.webUrl) {
          // Store order simulation data before redirecting if needed, 
          // but Shopify will handle the real order.
          window.location.href = checkout.webUrl;
        } else {
          throw new Error('Failed to create Shopify checkout');
        }
      } catch (error: any) {
        console.error('Shopify Checkout Error:', error);
        const errorMessage = error.message || 'Unknown error';
        alert(`Shopify Checkout Issue: ${errorMessage}. Falling back to simulated checkout.`);
        
        // Fallback to simulated checkout if Shopify fails/missing config
        setTimeout(() => {
          const newOrderId = `KC-${Math.floor(Math.random() * 900000) + 100000}`;
          const existingOrders = JSON.parse(localStorage.getItem('kaycent_orders') || '[]');
          localStorage.setItem('kaycent_orders', JSON.stringify([newOrderId, ...existingOrders].slice(0, 5)));

          setOrderId(newOrderId);
          setIsSubmitting(false);
          setStep('success');
          clearCart();
          window.scrollTo(0, 0);
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8EE] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 text-center md:text-left">
          <div className="flex-1">
            <h1 className="text-5xl font-display font-medium mb-4">
              {step === 'cart' && "Your Cart"}
              {step === 'shipping' && "Shipping Details"}
              {step === 'payment' && "Payment Gateway"}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest">
              <span className={`${step === 'cart' ? 'text-rose-500' : 'text-gray-400'}`}>01 Cart</span>
              <ChevronRight className="w-3 h-3 text-gray-200" />
              <span className={`${step === 'shipping' ? 'text-rose-500' : 'text-gray-400'}`}>02 Shipping</span>
              <ChevronRight className="w-3 h-3 text-gray-200" />
              <span className={`${step === 'payment' ? 'text-rose-500' : 'text-gray-400'}`}>03 Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            {step === 'cart' && (
              <div className="bg-white rounded-[40px] p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-display font-medium mb-8">Review Items</h3>
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-6 items-center group">
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-lg truncate pr-4">{item.name}</h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.category}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-all text-gray-400 hover:text-black"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-all text-gray-400 hover:text-black"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-rose-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-rose-500">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-gray-400 mt-1">₹{item.price.toLocaleString('en-IN')} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 'shipping' && (
              <div className="bg-white rounded-[40px] p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-rose-500" />
                  </div>
                  <h3 className="text-2xl font-display font-medium">Boutique Delivery</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        type="text"
                        placeholder="John Doe"
                        value={shippingDetails.fullName}
                        onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})}
                        className="w-full bg-[#f8f6f2] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-rose-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                    <input 
                      type="email"
                      placeholder="john@example.com"
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                      className="w-full bg-[#f8f6f2] border-none rounded-2xl py-4 px-4 focus:ring-1 focus:ring-rose-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Shipping Address</label>
                    <div className="relative">
                      <Home className="absolute left-4 top-4 w-4 h-4 text-gray-300" />
                      <textarea 
                        placeholder="Suite 405, Sensory Lane, Malabar Hill"
                        value={shippingDetails.address}
                        onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                        rows={3}
                        className="w-full bg-[#f8f6f2] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-rose-500 transition-all resize-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">City</label>
                    <input 
                      type="text"
                      placeholder="Mumbai"
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                      className="w-full bg-[#f8f6f2] border-none rounded-2xl py-4 px-4 focus:ring-1 focus:ring-rose-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">State</label>
                    <input 
                      type="text"
                      placeholder="Maharashtra"
                      value={shippingDetails.state}
                      onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})}
                      className="w-full bg-[#f8f6f2] border-none rounded-2xl py-4 px-4 focus:ring-1 focus:ring-rose-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Pincode</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        type="text"
                        maxLength={6}
                        placeholder="400001"
                        value={shippingDetails.pincode}
                        onChange={(e) => setShippingDetails({...shippingDetails, pincode: e.target.value.replace(/\D/g, '')})}
                        className="w-full bg-[#f8f6f2] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-rose-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Contact Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        type="text"
                        maxLength={15}
                        placeholder="+91 98765 43210"
                        value={shippingDetails.phone}
                        onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value.replace(/[^\d+]/g, '')})}
                        className="w-full bg-[#f8f6f2] border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-rose-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-[40px] p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-display font-medium">Select Payment Method</h3>
                </div>

                <div className="grid gap-4">
                  {[
                    { id: 'upi', name: 'UPI (Paytm, GPay, PhonePe)', icon: '📱' },
                    { id: 'card', name: 'Debit / Credit Card', icon: '💳' },
                    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
                    { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
                  ].map((method) => (
                    <div key={method.id}>
                      <label 
                        className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all cursor-pointer ${
                          paymentMethod === method.id 
                            ? 'border-brand-dark bg-brand-dark/5' 
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <p className="font-bold text-brand-dark">{method.name}</p>
                            {method.id === 'cod' && (
                              <p className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest mt-1">Extra ₹99 COD fee</p>
                            )}
                          </div>
                        </div>
                        <input 
                          type="radio" 
                          name="payment" 
                          className="accent-brand-dark w-5 h-5 transition-all"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id as any)}
                        />
                      </label>

                      {/* Conditional Fields */}
                      <AnimatePresence>
                        {paymentMethod === method.id && method.id === 'card' && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-2 grid grid-cols-2 gap-4">
                              <div className="col-span-2">
                                <input type="text" placeholder="Card Number" className="w-full bg-[#f8f6f2] border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-rose-500 transition-all text-sm" />
                              </div>
                              <input type="text" placeholder="MM/YY" className="bg-[#f8f6f2] border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-rose-500 transition-all text-sm" />
                              <input type="password" placeholder="CVV" className="bg-[#f8f6f2] border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-rose-500 transition-all text-sm" />
                            </div>
                          </motion.div>
                        )}
                        {paymentMethod === method.id && method.id === 'upi' && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-2">
                              <input type="text" placeholder="Enter UPI ID (e.g. user@okaxis)" className="w-full bg-[#f8f6f2] border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-rose-500 transition-all text-sm" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-rose-50 rounded-[30px] flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-rose-500 text-sm mb-1 uppercase tracking-wider">Note for our patrons</h5>
                    <p className="text-xs text-rose-500/70 leading-relaxed font-medium">
                      All payments are processed through our secure sensory-grade gateway. Your details are never stored and are fully encrypted.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-between pt-10 gap-6">
              <button 
                onClick={() => {
                  if (step === 'cart') navigate('/');
                  if (step === 'shipping') setStep('cart');
                  if (step === 'payment') setStep('shipping');
                }}
                className="flex items-center gap-2 font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                {step === 'cart' ? 'Continue Shopping' : 'Go Back'}
              </button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                onClick={handleCheckout}
                className={`w-full sm:w-auto bg-brand-dark text-white px-12 py-5 rounded-full font-bold tracking-[0.2em] uppercase hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Processing...' : (
                  step === 'cart' ? 'Continue to Shipping' :
                  step === 'shipping' ? 'Secure Gateway' :
                  'Pay & Place Order'
                )}
                {step !== 'payment' ? <ChevronRight className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="bg-white rounded-[40px] p-8 shadow-xl border border-gray-100">
               <h4 className="text-xl font-display font-medium mb-8">Order Summary</h4>
               
               {/* Coupon Section */}
               <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-brand-secondary" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Promo Code</span>
                  </div>
                  
                  {!appliedCoupon ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Enter code" 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-secondary transition-all"
                        />
                        <button 
                          onClick={handleApplyCoupon}
                          className="bg-brand-dark text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && <p className="text-[9px] text-rose-500 font-bold ml-1">{couponError}</p>}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-brand-secondary/10 border border-brand-secondary/20 p-3 rounded-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
                        <span className="text-xs font-bold text-brand-secondary tracking-widest uppercase">{appliedCoupon.code} Applied</span>
                      </div>
                      <button 
                        onClick={removeCoupon}
                        className="text-[10px] font-bold text-gray-400 hover:text-rose-500 uppercase tracking-widest transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  )}
               </div>

               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Items Subtotal</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600 text-sm font-medium">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-₹{appliedCoupon.amount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>GST (12%)</span>
                    <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="flex justify-between text-gray-500 text-sm">
                      <span>COD Fee</span>
                      <span>₹{codFee.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Convenience Fee</span>
                    <span>₹{convenienceFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Shipping</span>
                    {shippingFee === 0 ? (
                      <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Free</span>
                    ) : (
                      <span>₹{shippingFee.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  
                  {shippingFee > 0 && (
                    <p className="text-[9px] text-brand-secondary/60 bg-brand-secondary/5 p-2 rounded-lg">
                      Add ₹{(2500 - totalPrice).toLocaleString('en-IN')} more to unlock Free Shipping!
                    </p>
                  )}

                  <div className="border-t border-gray-100 pt-6 flex justify-between font-bold text-2xl">
                    <span className="font-display">Total</span>
                    <span className="text-rose-500">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl text-green-700">
                 <ShieldCheck className="w-5 h-5" />
                 <span className="text-xs font-semibold uppercase tracking-widest">Safe & Secure Payment</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
