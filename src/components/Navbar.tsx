import React from 'react';
import { Menu, ShoppingBag, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-oatmeal/90 backdrop-blur-sm border-b border-soxy-green/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Mobile Menu Icon */}
        <button className="md:hidden text-soxy-green">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="text-2xl font-bold text-soxy-green tracking-tight font-sans cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          soxy<span className="text-terracotta">.</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-soxy-green/80">
          <a href="#" className="hover:text-soxy-green transition-colors">Men</a>
          <a href="#" className="hover:text-soxy-green transition-colors">Women</a>
          <a href="#" className="hover:text-soxy-green transition-colors">Family Bundle</a>
          <a href="#story" className="hover:text-soxy-green transition-colors">Our Story</a>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-soxy-green">
          <button className="hover:text-terracotta transition-colors">
            <User size={20} />
          </button>
          <button className="hover:text-terracotta transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-terracotta rounded-full"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};