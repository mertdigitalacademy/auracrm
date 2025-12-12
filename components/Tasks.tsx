import React, { useState } from 'react';
import { Check, Plus, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { Task, Priority } from '../types';

interface TasksProps {
  tasks: Task[];
  addTask: (task: Partial<Task>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, addTask, toggleTask, deleteTask }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority>('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addTask({
        title: inputValue.trim(),
        priority: selectedPriority,
        dueDate: dueDate || undefined,
        description: '',
      });
      setInputValue('');
      setDueDate('');
      setSelectedPriority('Medium');
    }
  };

  const getPriorityColor = (p: Priority) => {
    switch(p) {
      case 'High': return 'bg-red-500 shadow-red-500/50';
      case 'Medium': return 'bg-amber-400 shadow-amber-400/50';
      case 'Low': return 'bg-zinc-300 dark:bg-zinc-600';
    }
  };

  const isOverdue = (dateStr?: string) => {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date() && new Date(dateStr).toDateString() !== new Date().toDateString();
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-light text-zinc-900 dark:text-white tracking-tight mb-2">Tasks</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage your daily sales activities.</p>
      </header>

      <div className="space-y-6">
        {/* Quick Add Input */}
        <div className="glass-panel p-4 rounded-lg bg-white dark:bg-carbon border border-mist dark:border-charcoal">
          <div className="flex items-center gap-3">
            <Plus className="w-5 h-5 text-zinc-400" />
            <input
              type="text"
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-mist dark:border-white/5">
             <div className="flex items-center gap-4">
               {/* Priority Selector */}
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-medium text-zinc-400 uppercase">Priority</span>
                 <div className="flex bg-zinc-100 dark:bg-white/5 rounded-md p-0.5">
                   {(['Low', 'Medium', 'High'] as Priority[]).map(p => (
                     <button
                       key={p}
                       onClick={() => setSelectedPriority(p)}
                       className={`w-2 h-2 rounded-full mx-1 transition-all ${selectedPriority === p ? getPriorityColor(p) : 'bg-zinc-300 dark:bg-zinc-700'}`}
                       title={p}
                     />
                   ))}
                 </div>
               </div>

               {/* Date Picker */}
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium text-zinc-400 uppercase">Due</span>
                  <input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-transparent text-[10px] text-zinc-600 dark:text-zinc-300 focus:outline-none font-mono"
                  />
               </div>
             </div>
             <button 
                onClick={() => handleKeyDown({ key: 'Enter' } as any)}
                className="text-[10px] font-medium bg-zinc-900 dark:bg-white text-white dark:text-black px-3 py-1 rounded-md"
             >
               Add Task
             </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-1">
          {tasks.length === 0 && (
            <div className="text-center py-12 border border-dashed border-mist dark:border-charcoal rounded-lg">
                <p className="text-zinc-400 text-sm">No tasks pending. You're all caught up.</p>
            </div>
          )}
          
          {tasks.sort((a,b) => (a.isComplete === b.isComplete ? 0 : a.isComplete ? 1 : -1)).map((task) => {
             const overdue = !task.isComplete && isOverdue(task.dueDate);
             return (
            <div 
              key={task.id}
              className={`group relative flex items-center justify-between p-4 bg-white dark:bg-carbon border-b border-mist dark:border-charcoal hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-all duration-200 ${
                task.isComplete ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {/* Priority Indicator Line */}
              {!task.isComplete && task.priority === 'High' && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              )}

              <div className="flex items-center gap-4 flex-1">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                    task.isComplete
                      ? 'bg-zinc-400 border-zinc-400 dark:bg-zinc-600 dark:border-zinc-600'
                      : 'border-zinc-300 dark:border-zinc-600 hover:border-indigo-500 dark:hover:border-indigo-400'
                  }`}
                >
                  {task.isComplete && <Check className="w-3 h-3 text-white" />}
                </button>
                
                <div className="flex flex-col">
                    <span 
                    className={`text-sm transition-all duration-200 ${
                        task.isComplete 
                        ? 'text-zinc-500 line-through' 
                        : 'text-zinc-900 dark:text-zinc-100'
                    }`}
                    >
                    {task.title}
                    </span>
                    {task.description && (
                        <span className="text-xs text-zinc-500 truncate max-w-md">{task.description}</span>
                    )}
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                {task.dueDate && (
                    <div className={`flex items-center gap-1.5 text-xs ${overdue ? 'text-red-500' : 'text-zinc-400'}`}>
                        {overdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
                        <span className={overdue ? 'font-medium' : ''}>{task.dueDate}</span>
                    </div>
                )}

                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} title={`${task.priority} Priority`} />
                
                <button 
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 hover:text-red-500 transition-all"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default Tasks;