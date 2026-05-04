import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd use createUserWithEmailAndPassword or signInWithEmailAndPassword
    // For this prototype, I'll focus on Google Login which is pre-configured
    alert("Email/Password login is currently simulated. Please use Google Login.");
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FDF8EE] pt-32 pb-20 px-6">
      <div className="max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-100"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-display font-medium mb-3">
              {isLogin ? 'Welcome Back' : 'Join Kaycent'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin 
                ? 'Sign in to access your sensory collection' 
                : 'Create an account to start your exquisite journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    required
                    className="w-full bg-gray-50 border border-transparent focus:border-rose-500/20 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  required
                  className="w-full bg-gray-50 border border-transparent focus:border-rose-500/20 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between px-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
                {isLogin && <button type="button" className="text-xs text-rose-500 hover:underline">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-50 border border-transparent focus:border-rose-500/20 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brand-dark text-white rounded-2xl py-4 font-bold tracking-widest uppercase hover:bg-black transition-all shadow-lg flex items-center justify-center gap-3"
              type="submit"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <span className="relative bg-white px-4 text-xs font-bold uppercase text-gray-300">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all">
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub</span>
              </button>
              <button 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all"
              >
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-bold text-rose-500 hover:underline"
              >
                {isLogin ? 'Sign up now' : 'Log in here'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
