import React from 'react';
import { ArrowRight, PlayCircle, Globe } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen pt-20 flex flex-col md:flex-row">
      {/* Left Content (Text) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 order-2 md:order-1">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-soxy-green/20 rounded-full text-xs font-semibold tracking-wider text-soxy-green uppercase">
            <Globe size={12} />
            <span>Now Shipping Worldwide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black leading-[1.15] mb-4">
            简单的舒适，<br />
            四季的陪伴。
          </h1>
          <h2 className="text-2xl md:text-3xl font-sans font-medium text-gray-800 mb-6">
            Simplicity for Your Feet.
          </h2>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed font-sans font-light">
            为您和家人定制的棉袜订阅服务。<br />
            全球配送，告别起球与异味，每季自动焕新。<br />
            <span className="text-sm text-gray-500 mt-2 block italic">Premium Cotton Subscription. Delivering globally.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-terracotta text-white font-medium rounded-sm shadow-lg hover:bg-terracotta-hover transition-all flex items-center justify-center gap-2 group">
              开启订阅
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-soxy-green text-soxy-green font-medium rounded-sm hover:bg-soxy-green hover:text-white transition-all flex items-center justify-center gap-2">
              <PlayCircle size={18} />
              了解模式
            </button>
          </div>
        </div>
      </div>

      {/* Right Content (Visual) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative order-1 md:order-2 overflow-hidden group">
        <img 
          src="https://picsum.photos/id/103/1200/1600" 
          alt="Cozy socks lifestyle" 
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-orange-100/10 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-md px-6 py-3 rounded-sm shadow-sm hidden md:block">
           <p className="text-xs font-serif text-soxy-green italic">"Feels like Sunday morning."</p>
        </div>
      </div>
    </section>
  );
};