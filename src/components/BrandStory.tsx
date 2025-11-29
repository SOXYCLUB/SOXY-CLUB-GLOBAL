import React from 'react';
import { Heart, ShieldCheck, RefreshCw, Feather } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-terracotta font-bold tracking-widest text-xs uppercase mb-2 block">Our Philosophy</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-soxy-green mb-6">
            Simplicity for Your Feet.
          </h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            我们不仅仅是在卖袜子，我们是在贩卖<span className="text-soxy-green font-medium">“不需要思考的舒适”</span>。
            像周日早晨洒在地板上的阳光，手里捧着一杯热拿铁的感觉。
          </p>
        </div>

        {/* 3 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          
          {/* Value 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-oatmeal rounded-full flex items-center justify-center text-soxy-green mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">No Pilling Promise</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              告别起球与尴尬。我们采用高品质长绒棉，经久耐穿，洗涤多次依然如新。
            </p>
          </div>

          {/* Value 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-oatmeal rounded-full flex items-center justify-center text-soxy-green mb-6">
              <Feather size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Premium Comfort</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              触感如云端般包裹。透气抑菌的银离子技术，适应从热带到寒带的各种气候。
            </p>
          </div>

          {/* Value 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-oatmeal rounded-full flex items-center justify-center text-soxy-green mb-6">
              <RefreshCw size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Seasonal Refresh</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              一种健康的生活仪式。每三个月自动发货，为您省去挑选和下单的繁琐时间。
            </p>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-20 bg-soxy-green rounded-sm p-8 md:p-12 text-center relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
           
           <div className="relative z-10">
             <Heart size={32} className="text-terracotta mx-auto mb-4" />
             <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
               "Subscription is Self-Care"
             </h3>
             <p className="text-white/70 max-w-2xl mx-auto font-light mb-8">
               订阅不仅是购买，更是对自己生活品质的投资。加入 SOXY Club，找回生活的掌控感。
             </p>
             <button className="px-8 py-3 bg-white text-soxy-green font-bold rounded-sm hover:bg-oatmeal transition-colors">
               Join the Club
             </button>
           </div>
        </div>

      </div>
    </section>
  );
};