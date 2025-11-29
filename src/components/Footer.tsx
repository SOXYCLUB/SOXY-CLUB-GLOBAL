import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-soxy-green text-white/80 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold text-white mb-4 font-serif">soxy.</h3>
          <p className="max-w-xs text-sm font-light mb-6">
            Bringing simplicity and comfort to homes around the world, one pair at a time.
          </p>
          
          {/* Region Selector Mockup */}
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-sm px-3 py-2 text-xs hover:border-white/50 cursor-pointer transition-colors">
            <Globe size={14} />
            <span>Global (USD)</span>
            <ChevronDown size={14} className="ml-2 opacity-50" />
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">Shop</h4>
          <ul className="space-y-2 text-sm font-light">
            <li><a href="#" className="hover:text-terracotta transition-colors">Men's Collection</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Women's Collection</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Family Bundles</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Gift Cards</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">Support</h4>
          <ul className="space-y-2 text-sm font-light">
            <li><a href="#" className="hover:text-terracotta transition-colors">International Shipping</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Returns & Exchange</a></li>
            <li><a href="#" className="hover:text-terracotta transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-xs text-center md:text-left text-white/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© 2024 SOXY Global. All rights reserved.</span>
        <div className="flex gap-4">
           <span>Privacy Policy</span>
           <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};