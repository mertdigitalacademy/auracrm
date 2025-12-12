import React, { useState } from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Lead, LeadStatus } from '../types';
import { PIPELINE_COLUMNS } from '../constants';

interface PipelineProps {
  leads: Lead[];
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  onAddClick: () => void;
}

const Pipeline: React.FC<PipelineProps> = ({ leads, updateLeadStatus, onAddClick }) => {
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(id);
    e.dataTransfer.effectAllowed = 'move';
    const el = e.target as HTMLElement;
    el.style.opacity = '0.5';
  };
  
  const handleDragEnd = (e: React.DragEvent) => {
    const el = e.target as HTMLElement;
    el.style.opacity = '1';
    setDraggedLeadId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
  };

  const handleDrop = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    if (draggedLeadId) {
      updateLeadStatus(draggedLeadId, status);
      setDraggedLeadId(null);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="px-8 py-6 flex-shrink-0 flex justify-between items-center border-b border-mist dark:border-charcoal">
        <h1 className="text-xl font-light text-zinc-900 dark:text-white tracking-tight">Pipeline</h1>
        <div className="flex gap-2">
            <button 
                onClick={onAddClick}
                className="p-1.5 rounded-md border border-mist dark:border-charcoal hover:bg-zinc-50 dark:hover:bg-white/5 text-zinc-500 transition-colors"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-x-auto overflow-y-hidden px-8 pb-8 pt-6">
        <div className="flex h-full gap-6 min-w-max">
          {PIPELINE_COLUMNS.map((column) => {
            const columnLeads = leads.filter(l => l.status === column);
            
            return (
              <div 
                key={column}
                className="w-72 flex flex-col h-full"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column)}
              >
                <div className="flex items-center justify-between mb-4 px-1 pb-2 border-b border-mist dark:border-charcoal">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-wide">{column}</span>
                    <span className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-white/5 px-1.5 py-0.5 rounded-full">{columnLeads.length}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto pr-1 pb-2">
                  {columnLeads.map((lead) => (
                    <div
                      key={lead.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      onDragEnd={handleDragEnd}
                      className="p-4 rounded-md cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 group bg-white dark:bg-carbon border border-mist dark:border-charcoal hover:border-zinc-300 dark:hover:border-zinc-600"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-tight">
                            {lead.name}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-xs text-zinc-500 mb-4">{lead.company}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-50 dark:border-white/5">
                        <div className="flex gap-1.5">
                            {lead.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-sm bg-zinc-50 dark:bg-white/5 text-zinc-500 border border-mist dark:border-white/5">
                                {tag}
                            </span>
                            ))}
                        </div>
                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                          {formatCurrency(lead.value)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {columnLeads.length === 0 && (
                    <div className="h-24 border border-dashed border-mist dark:border-charcoal rounded-md flex items-center justify-center opacity-60">
                        <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">Empty</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pipeline;