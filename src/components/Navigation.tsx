import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();

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
      <div className="bg-blue-600 text-white py-3 px-6 text-center font-semibold">
        🎉 Free listings for all users until September 2025 — Join now!
      </div>

      {/* Main Navigation */}
      <nav className={`fixed top-12 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Thethriv</span>
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
                  className="flex items-center space-x-2 font-semibold text-lg text-gray-700 hover:text-blue-600 transition-colors"
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <span>Resources</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
                
                {isResourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border py-4"
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                  >
                    {resourceLinks.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-6 py-4 hover:bg-gray-50 transition-colors"
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
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/join-expert"
                className="px-6 py-3 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Join as Expert
              </Link>
              <Link
                to="/join-business"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Join as Business
              </Link>
            </div>

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
                <Link
                  to="/join-expert"
                  className="block w-full px-6 py-3 text-center text-blue-600 font-semibold border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Join as Expert
                </Link>
                <Link
                  to="/join-business"
                  className="block w-full px-6 py-3 text-center bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Join as Business
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navigation;