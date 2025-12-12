import React from 'react';
import { User, Bell, Shield, Moon, Sun, Monitor } from 'lucide-react';
import { Theme } from '../types';

interface SettingsProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, toggleTheme }) => {
  return (
    <div className="h-full p-8 flex justify-center overflow-y-auto">
      <div className="max-w-3xl w-full flex flex-col gap-10">
        
        <header className="pb-6 border-b border-mist dark:border-charcoal">
            <h1 className="text-2xl font-light text-zinc-900 dark:text-white tracking-tight mb-2">Settings</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage your workspace preferences.</p>
        </header>

        {/* Profile Section */}
        <section>
            <div className="flex items-center gap-2 mb-6">
                <User className="w-4 h-4 text-zinc-400" />
                <h2 className="text-sm font-medium text-zinc-900 dark:text-white uppercase tracking-wider">Profile</h2>
            </div>
            
            <div className="glass-panel p-6 rounded-lg bg-white dark:bg-carbon border border-mist dark:border-charcoal space-y-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl font-medium text-zinc-400">JD</div>
                    <button className="text-xs font-medium text-zinc-900 dark:text-white border border-mist dark:border-charcoal px-3 py-1.5 rounded hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                        Change Avatar
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-zinc-500">Full Name</label>
                        <input type="text" defaultValue="Jane Doe" className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900/50 border border-mist dark:border-charcoal rounded-md text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-zinc-500">Email Address</label>
                        <input type="email" defaultValue="jane@aura.com" className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900/50 border border-mist dark:border-charcoal rounded-md text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all" />
                    </div>
                </div>
            </div>
        </section>

        {/* Appearance Section */}
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Monitor className="w-4 h-4 text-zinc-400" />
                <h2 className="text-sm font-medium text-zinc-900 dark:text-white uppercase tracking-wider">Appearance</h2>
            </div>
            
            <div className="glass-panel p-6 rounded-lg bg-white dark:bg-carbon border border-mist dark:border-charcoal">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Interface Theme</h3>
                        <p className="text-xs text-zinc-500 mt-1">Select your preferred color scheme.</p>
                    </div>
                    
                    <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-mist dark:border-charcoal">
                        <button 
                            onClick={() => theme === Theme.DARK && toggleTheme()}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${theme === Theme.LIGHT ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
                        >
                            <Sun className="w-3 h-3" /> Light
                        </button>
                        <button 
                            onClick={() => theme === Theme.LIGHT && toggleTheme()}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${theme === Theme.DARK ? 'bg-zinc-800 shadow-sm text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            <Moon className="w-3 h-3" /> Dark
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <div className="pt-4 flex justify-end">
            <button className="px-6 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity shadow-sm">
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;