import React from 'react';
import { Check } from 'lucide-react';

const PlanCard: React.FC<{ 
  name: string; 
  price: string; 
  features: string[]; 
  isCurrent?: boolean; 
  isPopular?: boolean;
}> = ({ name, price, features, isCurrent, isPopular }) => (
  <div className={`relative flex flex-col p-6 rounded-xl border transition-all duration-300 ${
    isCurrent 
      ? 'bg-white dark:bg-carbon border-zinc-900 dark:border-zinc-100 shadow-lg ring-1 ring-zinc-900/5' 
      : 'bg-white/50 dark:bg-carbon/50 border-mist dark:border-charcoal hover:border-zinc-300 dark:hover:border-zinc-600'
  }`}>
    {isPopular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-medium uppercase tracking-wider rounded-full shadow-sm">
        Most Popular
      </div>
    )}
    
    <div className="mb-5">
      <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">{name}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-light text-zinc-900 dark:text-white">{price}</span>
        <span className="text-zinc-400 text-sm">/mo</span>
      </div>
    </div>

    <ul className="flex-1 space-y-3 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
          <Check className="w-4 h-4 text-zinc-900 dark:text-white flex-shrink-0 mt-0.5" />
          <span className="leading-tight">{feature}</span>
        </li>
      ))}
    </ul>

    <button className={`w-full py-2.5 rounded-lg text-xs font-medium transition-all ${
      isCurrent
        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white cursor-default'
        : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90 shadow-sm'
    }`}>
      {isCurrent ? 'Current Plan' : 'Upgrade'}
    </button>
  </div>
);

const Billing: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 overflow-y-auto">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
            <h1 className="text-2xl font-light text-zinc-900 dark:text-white tracking-tight mb-2">Subscription & Billing</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage your workspace plan and payment methods.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PlanCard 
            name="Starter" 
            price="$0" 
            features={['Up to 500 leads', 'Basic Analytics', '1 User Seat', 'Community Support']} 
          />
          <PlanCard 
            name="Pro" 
            price="$29" 
            features={['Unlimited leads', 'Advanced Analytics', '5 User Seats', 'Email Integration', 'Priority Support']} 
            isCurrent={true}
            isPopular={true}
          />
          <PlanCard 
            name="Enterprise" 
            price="$99" 
            features={['Unlimited Everything', 'Custom API Access', 'SSO & Audit Logs', 'Dedicated Success Manager', '24/7 Phone Support']} 
          />
        </div>

        <div className="mt-12 p-6 glass-panel rounded-lg border border-mist dark:border-charcoal bg-white dark:bg-carbon flex justify-between items-center">
            <div>
                <h4 className="text-sm font-medium text-zinc-900 dark:text-white">Payment Method</h4>
                <p className="text-xs text-zinc-500 mt-1">Visa ending in 4242 • Expires 12/25</p>
            </div>
            <button className="text-xs font-medium text-zinc-900 dark:text-white border border-mist dark:border-charcoal px-3 py-1.5 rounded hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                Update
            </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;