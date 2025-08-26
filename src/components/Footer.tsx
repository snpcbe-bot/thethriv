import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedGlobeLogo from './AnimatedGlobeLogo';

const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'For Business', href: '/business' },
        { name: 'For Experts', href: '/experts' },
        { name: 'Search Experts', href: '/search' },
        { name: 'Pricing', href: '/pricing' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Resource Library', href: '/resources' },
        { name: 'Blog', href: '/blog' },
        { name: 'Partner Program', href: '/partners' },
        { name: 'About Us', href: '/about' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'API Documentation', href: '#' },
        { name: 'Status Page', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'GDPR Compliance', href: '#' },
        { name: 'Cookie Policy', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container-width py-20">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <AnimatedGlobeLogo size="md" />
              <span className="text-2xl font-bold">Thriv</span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed text-large">
              Quality expertise made accessible: connecting small businesses with trusted, 
              verified professionals worldwide.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-400">
                <MapPin className="w-5 h-5" />
                <span>Registered in Germany</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Mail className="w-5 h-5" />
                <a href="mailto:hello@thriv.com" className="hover:text-white transition-colors">
                  hello@thriv.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Globe className="w-5 h-5" />
                <span>Available in 25+ countries</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h3 className="font-bold text-white mb-6 text-lg">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-slate-400 hover:text-white transition-colors flex items-center group"
                    >
                      {link.name}
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-slate-400">
              © 2025 Thriv. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <div className="text-sm text-slate-400">
                Made with ❤️ in Germany
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;