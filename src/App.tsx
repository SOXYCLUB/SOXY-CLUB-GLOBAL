import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductHighlights } from './components/ProductHighlights';
import { BrandStory } from './components/BrandStory';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <ProductHighlights />
        <BrandStory />
        
        {/* Decorative Quote Section */}
        <section className="bg-oatmeal/30 py-20 px-6 text-center border-t border-soxy-green/5">
            <blockquote className="max-w-2xl mx-auto font-serif text-xl md:text-2xl italic text-gray-500">
              "Finally, socks that don't slide down or lose their softness after one wash. My husband loves the subscription model."
            </blockquote>
            <p className="mt-4 text-xs font-bold tracking-widest text-terracotta uppercase">— Sarah T., Kuala Lumpur</p>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;