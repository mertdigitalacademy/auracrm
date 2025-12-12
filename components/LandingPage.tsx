import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Check, Zap, Layers, BarChart3, Users, 
  ChevronDown, Command, Upload, FileText, Layout, 
  Moon, Sun, Star, Quote, Play
} from 'lucide-react';
import { Theme } from '../types';

interface LandingPageProps {
  onEnter: () => void;
  toggleTheme: () => void;
  theme: Theme;
}

const TESTIMONIALS = [
  { name: "Alex Rivera", role: "CTO at Nexus", text: "The speed is unmatched. It feels like an extension of my brain. Aura has completely replaced Salesforce for us.", handle: "@arivera" },
  { name: "Sarah Chen", role: "Founder at Bloom", text: "Finally, a CRM that respects my taste and my time. The glass UI is not just pretty, it's functional.", handle: "@schen_tech" },
  { name: "Marcus Johnson", role: "VP Sales at Linear", text: "Aura strips away the noise. It is pure focus. Our close rates increased by 20% in the first month.", handle: "@marcusj" },
  { name: "Emily Davis", role: "Product at Stripe", text: "Data ingestion used to be a nightmare. With Aura's auto-mapping, it's actually fun.", handle: "@emilyd" },
];

const FEATURES = [
  { icon: Zap, title: "Velocity First", desc: "Keyboard shortcuts for every action. Never touch the mouse." },
  { icon: Layers, title: "Glass Architecture", desc: "A calm, transparent layer over your chaotic data." },
  { icon: BarChart3, title: "Instant Insights", desc: "Real-time forecasting without the clunky SQL queries." },
  { icon: Users, title: "Real-time Sync", desc: "Collaborate on deals with zero latency state updates." },
];

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, toggleTheme, theme }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  return (
    <div className="min-h-screen w-full bg-white dark:bg-obsidian text-zinc-900 dark:text-zinc-100 overflow-x-hidden selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-200/50 dark:border-white/5 bg-white/70 dark:bg-obsidian/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
               <Command className="w-4 h-4 text-white dark:text-black" />
            </div>
            <span className="font-semibold text-lg tracking-tight">Aura</span>
          </div>
          <div className="flex items-center gap-4">
             <button 
               onClick={toggleTheme} 
               className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
             >
                {theme === Theme.DARK ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>
             <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors hidden md:block">
               Sign In
             </button>
             <button 
               onClick={onEnter} 
               className="text-sm font-medium bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:shadow-lg hover:shadow-zinc-500/20 dark:hover:shadow-white/20 hover:-translate-y-0.5 transition-all duration-300"
             >
                Get Started
             </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center mb-32 relative perspective-1000">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-8 shadow-sm hover:border-zinc-300 dark:hover:border-white/20 transition-colors cursor-default">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">Aura v1.0 is now available</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-8 text-zinc-900 dark:text-white">
              CRM as a <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-400 to-zinc-600 dark:from-zinc-200 dark:to-zinc-500">calm layer</span> <br />
              over chaos.
            </h1>

            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Experience the speed of a CLI with the elegance of a native app. 
              Designed for high-velocity teams who value clarity over clutter.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
              <button 
                onClick={onEnter}
                className="group relative px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-medium text-sm transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:-translate-y-1"
              >
                Create Workspace
                <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-50 dark:hover:bg-white/5 transition-all backdrop-blur-sm">
                Watch the film
                <Play className="inline-block w-3 h-3 ml-2 fill-current" />
              </button>
            </div>
          </motion.div>
          
          {/* Hero Image / Interface Preview */}
          <motion.div 
            style={{ y: y1, rotateX: 5 }}
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 5 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mx-auto max-w-6xl perspective-origin-center"
          >
            <div className="rounded-xl border border-zinc-200 dark:border-white/10 p-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm shadow-2xl">
               <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-obsidian aspect-[16/10] relative shadow-inner">
                  {/* Abstract UI Representation */}
                  <div className="absolute inset-0 bg-grid opacity-[0.02]" />
                  {/* Sidebar */}
                  <div className="absolute top-0 left-0 w-64 bottom-0 border-r border-zinc-200 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md hidden md:block" />
                  {/* Header */}
                  <div className="absolute top-0 left-0 md:left-64 right-0 h-16 border-b border-zinc-200 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md flex items-center px-8 gap-4">
                      <div className="h-2 w-24 bg-zinc-200 dark:bg-white/10 rounded-full" />
                      <div className="ml-auto h-8 w-8 rounded-full bg-zinc-200 dark:bg-white/10" />
                  </div>
                  {/* Kanban Content */}
                  <div className="absolute top-24 left-6 md:left-72 right-6 bottom-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                      {[1,2,3,4].map((col) => (
                          <div key={col} className="flex flex-col gap-4">
                              <div className="h-4 w-16 bg-zinc-200 dark:bg-white/10 rounded" />
                              <div className="h-32 rounded-lg border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/5 p-4 space-y-3 shadow-sm">
                                  <div className="h-3 w-3/4 bg-zinc-100 dark:bg-white/10 rounded" />
                                  <div className="h-2 w-1/2 bg-zinc-100 dark:bg-white/5 rounded" />
                                  <div className="mt-4 flex gap-2">
                                    <div className="h-5 w-12 rounded-full bg-zinc-100 dark:bg-white/5" />
                                  </div>
                              </div>
                              <div className="h-32 rounded-lg border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/5 p-4 space-y-3 shadow-sm opacity-60">
                                  <div className="h-3 w-3/4 bg-zinc-100 dark:bg-white/10 rounded" />
                              </div>
                          </div>
                      ))}
                  </div>
                  
                  {/* Floating Action Button simulation */}
                  <div className="absolute bottom-8 right-8 w-12 h-12 bg-zinc-900 dark:bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="w-4 h-4 text-white dark:text-black font-bold text-xl">+</div>
                  </div>
               </div>
            </div>
            {/* Glow under the image */}
            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl -z-10 rounded-[3rem] opacity-40" />
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative h-full p-8 rounded-2xl border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/5 backdrop-blur-sm transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-zinc-50 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <f.icon className="w-6 h-6 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium mb-3 text-zinc-900 dark:text-white">{f.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Animated Process Timeline */}
        <section className="max-w-7xl mx-auto px-6 mb-40 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="text-3xl md:text-5xl font-light mb-6">From chaos to clarity.</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Intelligent ingestion engine that does the heavy lifting.</p>
            </motion.div>
            
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 hidden md:block" />
                <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 -translate-y-1/2 hidden md:block origin-left"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                    {[
                        { icon: Upload, title: "Import", sub: "Drag & drop CSV ingestion" },
                        { icon: FileText, title: "Auto-Map", sub: "AI field matching" },
                        { icon: Layout, title: "Visualize", sub: "Instant pipeline generation" }
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + (i * 0.2) }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-obsidian border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 shadow-xl relative group">
                                <step.icon className="w-8 h-8 text-zinc-900 dark:text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={1} />
                                <div className="absolute -inset-px bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{step.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="mb-40 py-20 border-y border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
                <h2 className="text-3xl font-light">Loved by builders.</h2>
                <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-zinc-900 dark:fill-white text-zinc-900 dark:text-white" />)}
                </div>
            </div>
            
            <div className="relative w-full overflow-hidden">
                <div className="flex gap-6 animate-marquee whitespace-nowrap px-6">
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                        <div key={i} className="inline-block w-[350px] md:w-[450px] p-8 rounded-2xl bg-white dark:bg-obsidian border border-zinc-200 dark:border-white/5 whitespace-normal">
                           <Quote className="w-8 h-8 text-zinc-200 dark:text-zinc-800 mb-4" />
                           <p className="text-lg font-light leading-relaxed mb-6 text-zinc-700 dark:text-zinc-200">"{t.text}"</p>
                           <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-400 flex items-center justify-center text-sm font-bold text-white">
                                   {t.name[0]}
                               </div>
                               <div>
                                   <div className="font-medium text-sm">{t.name}</div>
                                   <div className="text-xs text-zinc-500">{t.role}</div>
                               </div>
                           </div>
                        </div>
                    ))}
                </div>
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-50 dark:from-obsidian to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-50 dark:from-obsidian to-transparent z-10" />
            </div>
        </section>

        {/* Pricing */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-light mb-4">Transparent pricing.</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Start for free, scale when you need to.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { name: "Starter", price: "$0", feats: ["500 Leads", "Basic Lists", "1 User"] },
                    { name: "Pro", price: "$29", feats: ["Unlimited Leads", "Advanced Pipeline", "5 Users", "CSV Import"], highlight: true },
                    { name: "Enterprise", price: "$99", feats: ["API Access", "SSO", "Dedicated Support", "Audit Logs"] }
                ].map((plan, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-8 rounded-3xl border flex flex-col h-full relative group transition-all duration-300 ${
                            plan.highlight 
                            ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white shadow-2xl scale-105 z-10' 
                            : 'bg-white dark:bg-carbon border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                Most Popular
                            </div>
                        )}
                        <div className="mb-8">
                            <h3 className={`text-sm font-medium uppercase tracking-wider mb-2 ${plan.highlight ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-500'}`}>{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-light tracking-tighter">{plan.price}</span>
                                <span className={`text-sm ${plan.highlight ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-400'}`}>/mo</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.feats.map((feat, j) => (
                                <li key={j} className="flex items-center gap-3 text-sm">
                                    <div className={`p-0.5 rounded-full ${plan.highlight ? 'bg-zinc-800 dark:bg-zinc-200' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                                        <Check className={`w-3 h-3 ${plan.highlight ? 'text-white dark:text-black' : 'text-zinc-900 dark:text-white'}`} strokeWidth={3} />
                                    </div>
                                    <span className={plan.highlight ? 'text-zinc-200 dark:text-zinc-800' : 'text-zinc-600 dark:text-zinc-300'}>{feat}</span>
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={onEnter}
                            className={`w-full py-4 rounded-2xl font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
                            plan.highlight 
                            ? 'bg-white text-black dark:bg-black dark:text-white shadow-lg' 
                            : 'bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10'
                        }`}>
                            Choose {plan.name}
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto px-6 mb-32">
            <h2 className="text-3xl font-light text-center mb-12">Common questions.</h2>
            <div className="space-y-4">
                {[
                    { q: "Is my data secure?", a: "Yes. Aura uses Supabase RLS policies to ensure your data is completely isolated and encrypted at rest." },
                    { q: "Can I import from Salesforce?", a: "Absolutely. Export your Salesforce leads to CSV and map them instantly with our ingestion engine." },
                    { q: "What makes Aura different?", a: "Most CRMs are databases with a UI. Aura is a workflow tool designed for speed and clarity." },
                    { q: "Do you offer a free trial?", a: "The Starter plan is free forever for up to 500 leads. No credit card required." }
                ].map((faq, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="border border-zinc-200 dark:border-white/5 rounded-xl overflow-hidden bg-white/50 dark:bg-white/[0.02]"
                    >
                        <button 
                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                            className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
                        >
                            <span className="font-medium text-sm md:text-base">{faq.q}</span>
                            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {activeFaq === i && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 pt-0 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-dashed border-zinc-200 dark:border-white/5">
                                        <div className="pt-4">{faq.a}</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-zinc-900 dark:bg-white rounded flex items-center justify-center">
                    <Command className="w-3 h-3 text-white dark:text-black" />
                </div>
                <span className="font-semibold text-sm tracking-tight">Aura CRM</span>
            </div>
            <div className="flex gap-8 text-xs text-zinc-500">
                <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">GitHub</a>
            </div>
            <p className="text-xs text-zinc-400">© 2024 Aura Inc.</p>
        </footer>

      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;