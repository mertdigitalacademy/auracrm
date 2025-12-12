import React from 'react';
import { LayoutGrid, Kanban, Table, CheckSquare, CreditCard, Settings, Command, List } from 'lucide-react';
import { ViewState, UserList } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  userLists: UserList[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, userLists }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'pipeline', label: 'Pipeline', icon: Kanban },
    { id: 'lists', label: 'All Leads', icon: Table },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-16 md:w-64 flex-shrink-0 border-r border-mist dark:border-charcoal bg-white/80 dark:bg-carbon/80 backdrop-blur-md flex flex-col h-full z-20">
      <div className="h-14 flex items-center px-4 md:px-6 border-b border-mist dark:border-charcoal">
        <Command className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
        <span className="ml-3 font-semibold text-xs hidden md:block tracking-wider uppercase text-zinc-900 dark:text-zinc-100">Aura</span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewState)}
              className={`w-full flex items-center px-3 py-2 rounded-md transition-all duration-150 group ${
                isActive 
                  ? 'bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10' 
                  : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-70'}`} strokeWidth={1.5} />
              <span className={`ml-3 text-sm font-medium hidden md:block ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* User Lists Section */}
        {userLists.length > 0 && (
          <div className="pt-6 mt-6 border-t border-mist dark:border-charcoal/50">
             <div className="px-3 mb-2 flex items-center justify-between">
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider hidden md:block">Your Lists</span>
             </div>
             {userLists.map(list => (
               <button
                  key={list.id}
                  onClick={() => setView('lists')} // In real app, this would filter the list view
                  className="w-full flex items-center px-3 py-2 rounded-md text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 transition-all duration-150 group"
               >
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-500 transition-colors" />
                  <span className="ml-3 text-sm hidden md:block opacity-80">{list.name}</span>
                  <span className="ml-auto text-[10px] text-zinc-400 hidden md:block">{list.leadIds.length}</span>
               </button>
             ))}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-mist dark:border-charcoal hidden md:flex items-center gap-3">
        <div className="w-8 h-8 bg-zinc-100 dark:bg-white/5 rounded-md flex items-center justify-center border border-zinc-200 dark:border-white/10">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">JD</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-200">Jane Doe</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Workspace</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;