import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import AnimatedGlobeLogo from './AnimatedGlobeLogo';
import AuthModal from './auth/AuthModal';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Business', href: '/business' },
    { name: 'Experts', href: '/experts' },
    { name: 'Search', href: '/search' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Resources', href: '/resources' },
    { name: 'About', href: '/about' }
  ];

  const isActive = (href: string) => {
    if (href === '/business') {
      return location.pathname === '/business' || location.pathname === '/customers';
    }
    return location.pathname === href;
  };

  return (
    <>
      {/* Professional Banner */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-3 px-4 text-center z-50 shadow-lg"
      >
        <div className="container-width">
          <p className="text-sm font-medium">
            🚀 Free access until September 2025 — Join 10,000+ businesses growing with verified experts
          </p>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/50 sticky top-12 z-40">
        <div className="container-width">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <AnimatedGlobeLogo size="md" />
              <span className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Thriv
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/dashboard"
                    className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={signOut}
                    className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="btn-primary group"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-200"
            >
              <div className="px-6 py-6 space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {user ? (
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsOpen(false);
                      }}
                      className="w-full btn-primary"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultRole="business"
      />
    </>
  );
};

export default Navigation;