import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Pipeline from './components/Pipeline';
import LeadList from './components/LeadList';
import Tasks from './components/Tasks';
import Billing from './components/Billing';
import Settings from './components/Settings';
import AddLeadModal from './components/AddLeadModal';
import CsvImporter from './components/CsvImporter';
import LandingPage from './components/LandingPage';
import { ViewState, Theme, Lead, LeadStatus, Task, UserList } from './types';
import { INITIAL_LEADS, INITIAL_TASKS } from './constants';
import { Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [userLists, setUserLists] = useState<UserList[]>([]);
  
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isImporterOpen, setIsImporterOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(Theme.LIGHT, Theme.DARK);
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, status } : lead
    ));
  };

  const handleAddLead = (leadData: any) => {
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      ...leadData,
      createdAt: new Date().toISOString(),
      tags: ['New'],
    };
    setLeads([...leads, newLead]);
  };

  const handleImportLeads = (newLeads: Partial<Lead>[]) => {
      const formatted: Lead[] = newLeads.map(l => ({
          id: Math.random().toString(36).substr(2, 9),
          name: l.name || 'Unknown',
          company: l.company || '',
          email: l.email || '',
          value: l.value || 0,
          status: (l.status as LeadStatus) || 'New',
          tags: ['Imported'],
          createdAt: new Date().toISOString()
      }));
      setLeads([...leads, ...formatted]);
  };

  // Task Management
  const addTask = (task: Partial<Task>) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: task.title!,
      isComplete: false,
      priority: task.priority || 'Medium',
      dueDate: task.dueDate,
      description: task.description,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, isComplete: !t.isComplete } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // List Management
  const handleCreateList = (name: string, leadIds: string[]) => {
      const newList: UserList = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          leadIds
      };
      setUserLists([...userLists, newList]);
  };

  const handleAddLeadsToList = (listId: string, leadIds: string[]) => {
      setUserLists(prev => prev.map(list => {
          if (list.id !== listId) return list;
          // Avoid duplicates
          const newIds = Array.from(new Set([...list.leadIds, ...leadIds]));
          return { ...list, leadIds: newIds };
      }));
  };

  const handleDeleteLeads = (ids: string[]) => {
      setLeads(prev => prev.filter(l => !ids.includes(l.id)));
      // Also cleanup tasks linked to these leads if we had that link fully implemented
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'pipeline':
        return (
          <Pipeline 
            leads={leads} 
            updateLeadStatus={updateLeadStatus} 
            onAddClick={() => setIsAddLeadModalOpen(true)}
          />
        );
      case 'lists':
        return (
          <LeadList 
            leads={leads}
            userLists={userLists}
            onAddClick={() => setIsAddLeadModalOpen(true)} 
            onImportClick={() => setIsImporterOpen(true)}
            onDeleteLeads={handleDeleteLeads}
            onAddLeadsToList={handleAddLeadsToList}
            onCreateList={handleCreateList}
          />
        );
      case 'tasks':
        return (
          <Tasks 
            tasks={tasks} 
            addTask={addTask} 
            toggleTask={toggleTask} 
            deleteTask={deleteTask}
          />
        );
      case 'billing':
        return <Billing />;
      case 'settings':
        return <Settings theme={theme} toggleTheme={toggleTheme} />;
      default:
        return <Dashboard />;
    }
  };

  if (showLanding) {
    return (
      <LandingPage 
        onEnter={() => setShowLanding(false)} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-obsidian transition-colors duration-200 selection:bg-zinc-200 selection:text-zinc-900 dark:selection:bg-zinc-800 dark:selection:text-white">
        
      {/* Technical Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid opacity-100" />

      <div className="z-10 h-full flex w-full">
        <Sidebar 
            currentView={currentView} 
            setView={setCurrentView} 
            userLists={userLists}
        />
        
        <main className="flex-1 h-full relative flex flex-col">
          {/* Top Bar / Theme Toggle */}
          {currentView !== 'settings' && (
            <div className="absolute top-6 right-8 z-50 flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              >
                  {theme === Theme.DARK ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          )}

          <div className="flex-1 h-full overflow-hidden">
             {renderContent()}
          </div>
        </main>
      </div>

      <AddLeadModal 
        isOpen={isAddLeadModalOpen} 
        onClose={() => setIsAddLeadModalOpen(false)} 
        onAdd={handleAddLead}
      />

      <CsvImporter 
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        onImport={handleImportLeads}
      />
    </div>
  );
};

export default App;