import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';
import AnimatedGlobeLogo from './AnimatedGlobeLogo';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const [authModalRole, setAuthModalRole] = useState<'business' | 'expert'>('business');
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Customers', href: '/customers' },
    { name: 'Experts', href: '/experts' },
    { name: 'Pricing', href: '/pricing' },
  ];

  const resourceLinks = [
    { name: 'About Us', href: '/about', description: 'Our mission and story' },
    { name: 'Blog', href: '/blog', description: 'SEO & growth tips' },
    { name: 'Resources Library', href: '/resources', description: 'Guides, templates, eBooks' },
    { name: 'Partner Page', href: '/partners', description: 'For chambers & co-working hubs' },
  ];

  return (
    <>
      {/* Announcement Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white py-3 px-6 text-center font-semibold shadow-lg">
        🎉 Free Listings for All Users — Join Now! Free access until September 2025, no credit card required.
      </div>

      {/* Main Navigation */}
      <nav className={`fixed top-12 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <AnimatedGlobeLogo size="md" />
              <span className="text-2xl font-bold text-gray-900">Thriv</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-semibold text-lg transition-colors hover:text-blue-600 ${
                    location.pathname === link.href ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  className={`flex items-center space-x-2 font-semibold text-lg transition-colors ${
                    ['/about', '/blog', '/resources', '/partners'].includes(location.pathname) 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onMouseEnter={() => setIsResourcesOpen(true)}
                >
                  <span>Resources</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                
                {isResourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border py-4 z-50"
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                  >
                    {resourceLinks.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-6 py-4 hover:bg-gray-50 transition-colors ${
                          location.pathname === item.href ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                        onClick={() => setIsResourcesOpen(false)}
                      >
                        <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            {user ? (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to="/search"
                  className="px-6 py-3 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Find Experts
                </Link>
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.user_metadata?.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border py-2 z-50"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <button
                  onClick={() => {
                    setAuthModalTab('signup');
                    setAuthModalRole('expert');
                    setShowAuthModal(true);
                  }}
                  className="px-6 py-3 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  Join as Expert
                </button>
                <button
                  onClick={() => {
                    setAuthModalTab('signup');
                    setAuthModalRole('business');
                    setShowAuthModal(true);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Join as Business
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-6 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block font-semibold text-lg text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="space-y-4">
                <span className="block font-semibold text-lg text-gray-700">Resources</span>
                {resourceLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block pl-4 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="pt-6 space-y-4">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block w-full px-6 py-3 text-center text-blue-600 font-semibold border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full px-6 py-3 text-center bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setAuthModalTab('signup');
                        setAuthModalRole('expert');
                        setShowAuthModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full px-6 py-3 text-center text-blue-600 font-semibold border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      Join as Expert
                    </button>
                    <button
                      onClick={() => {
                        setAuthModalTab('signup');
                        setAuthModalRole('business');
                        setShowAuthModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full px-6 py-3 text-center bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Join as Business
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultTab={authModalTab}
          defaultRole={authModalRole}
        />
      </nav>
    </>
  );
};

export default Navigation;