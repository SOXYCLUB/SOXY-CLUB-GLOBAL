import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProductCardProps } from '../types';

const ProductCard: React.FC<ProductCardProps> = ({ title, description, image, buttonText, variant }) => {
  return (
    <div className="group relative flex flex-col h-full bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden rounded-sm">
      <div className="relative h-80 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
        
        {/* Variant Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold tracking-widest uppercase text-soxy-green">
          {variant}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow bg-white border-t border-gray-100">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6 font-light leading-relaxed flex-grow">{description}</p>
        
        <button className="flex items-center justify-between w-full py-3 border-b border-gray-200 group-hover:border-terracotta text-left transition-colors">
          <span className="font-medium text-soxy-green group-hover:text-terracotta transition-colors">{buttonText}</span>
          <ArrowUpRight size={18} className="text-gray-400 group-hover:text-terracotta group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </button>
      </div>
    </div>
  );
};

export const ProductHighlights: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-soxy-green mb-4">
          For Him, For Her, For Us.
        </h2>
        <div className="w-16 h-1 bg-terracotta mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProductCard 
          variant="men"
          title="The Gentlemen's Box"
          description="深色木纹般的沉稳。吸汗透气，专为商务与休闲切换设计。"
          image="https://picsum.photos/id/175/800/1000" 
          buttonText="Shop Men"
        />
        
        <ProductCard 
          variant="women"
          title="The Gentle Lady"
          description="如拿铁般温润的燕麦色系。亲肤柔软，居家外穿皆宜。"
          image="https://picsum.photos/id/338/800/1000" 
          buttonText="Shop Women"
        />
        
        <ProductCard 
          variant="family"
          title="Couple Bundle"
          description="混合礼盒，共享舒适。一起订阅，立省 20%。"
          image="https://picsum.photos/id/445/800/1000" 
          buttonText="Bundle & Save 20%"
        />
      </div>
    </section>
  );
};