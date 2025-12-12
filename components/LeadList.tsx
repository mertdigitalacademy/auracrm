import React, { useState } from 'react';
import { MoreHorizontal, Filter, Plus, Download, Trash2, FolderPlus, CheckSquare, Square } from 'lucide-react';
import { Lead, UserList } from '../types';

interface LeadListProps {
  leads: Lead[];
  onAddClick: () => void;
  onImportClick: () => void;
  onDeleteLeads: (ids: string[]) => void;
  userLists: UserList[];
  onAddLeadsToList: (listId: string, leadIds: string[]) => void;
  onCreateList: (name: string, leadIds: string[]) => void;
}

const LeadList: React.FC<LeadListProps> = ({ 
    leads, onAddClick, onImportClick, onDeleteLeads, userLists, onAddLeadsToList, onCreateList 
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showListMenu, setShowListMenu] = useState(false);
  const [newListName, setNewListName] = useState('');

  const toggleSelectAll = () => {
    if (selectedIds.length === leads.length) setSelectedIds([]);
    else setSelectedIds(leads.map(l => l.id));
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleExport = () => {
    const dataToExport = selectedIds.length > 0 
        ? leads.filter(l => selectedIds.includes(l.id))
        : leads;
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + ["Name,Company,Email,Value,Status,Tags"].join(",") + "\n"
        + dataToExport.map(l => 
            `${l.name},${l.company},${l.email},${l.value},${l.status},"${l.tags.join(';')}"`
        ).join("\n");
        
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aura_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} leads?`)) {
        onDeleteLeads(selectedIds);
        setSelectedIds([]);
    }
  };

  const handleCreateList = () => {
      if (newListName) {
          onCreateList(newListName, selectedIds);
          setNewListName('');
          setShowListMenu(false);
          setSelectedIds([]);
      }
  };

  return (
    <div className="p-8 h-full overflow-hidden flex flex-col relative">
      <header className="mb-6 flex justify-between items-center border-b border-mist dark:border-charcoal pb-6">
        <div>
          <h1 className="text-2xl font-light text-zinc-900 dark:text-white tracking-tight">Leads</h1>
        </div>
        <div className="flex items-center gap-3">
             <button onClick={onImportClick} className="px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors border border-mist dark:border-charcoal rounded-md">
                 Import CSV
             </button>
             <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors border border-mist dark:border-charcoal hover:border-zinc-300 dark:hover:border-zinc-600 rounded-md bg-white dark:bg-carbon">
                <Filter className="w-4 h-4" strokeWidth={1.5} />
             </button>
             <button 
                onClick={onAddClick}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity shadow-sm"
             >
                <Plus className="w-3 h-3" />
                Add Lead
            </button>
        </div>
      </header>

      <div className="glass-panel rounded-md overflow-hidden flex-1 flex flex-col bg-white dark:bg-carbon border border-mist dark:border-charcoal shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-mist dark:border-charcoal text-[11px] font-medium text-zinc-500 uppercase tracking-wide bg-zinc-50/50 dark:bg-white/[0.02]">
                <th className="px-6 py-4 w-12">
                    <button onClick={toggleSelectAll} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                        {selectedIds.length === leads.length && leads.length > 0 ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Name</th>
                <th className="px-6 py-4 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Company</th>
                <th className="px-6 py-4 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Status</th>
                <th className="px-6 py-4 text-right cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Value</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-mist dark:divide-charcoal">
                {leads.map((lead) => {
                    const isSelected = selectedIds.includes(lead.id);
                    return (
                <tr key={lead.id} className={`group hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors text-sm ${isSelected ? 'bg-zinc-50 dark:bg-white/[0.04]' : ''}`}>
                    <td className="px-6 py-4">
                        <button onClick={() => toggleSelect(lead.id)} className={`text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 ${isSelected ? 'text-zinc-900 dark:text-white' : ''}`}>
                            {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                        </button>
                    </td>
                    <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-mist dark:border-white/5">
                            {lead.name.substring(0,2).toUpperCase()}
                        </div>
                        <span className="font-medium text-zinc-900 dark:text-zinc-200">{lead.name}</span>
                    </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">{lead.company}</td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                                lead.status === 'Won' ? 'bg-zinc-800 dark:bg-zinc-200' :
                                'bg-zinc-300 dark:bg-zinc-600'
                            }`} />
                            <span className="text-zinc-600 dark:text-zinc-400 text-xs">{lead.status}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-zinc-700 dark:text-zinc-300">
                    ${lead.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex gap-1.5">
                            {lead.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-mist dark:border-charcoal text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-400 opacity-0 group-hover:opacity-100 transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                    </td>
                </tr>
                )})}
            </tbody>
            </table>
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedIds.length > 0 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 glass-panel shadow-2xl rounded-full px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-5 bg-white dark:bg-charcoal border border-zinc-200 dark:border-zinc-700">
              <span className="text-xs font-medium text-zinc-500 border-r border-zinc-300 dark:border-zinc-600 pr-4">{selectedIds.length} selected</span>
              
              <div className="relative">
                  <button 
                    onClick={() => setShowListMenu(!showListMenu)}
                    className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                      <FolderPlus className="w-4 h-4" /> Add to List
                  </button>
                  {/* List Dropdown */}
                  {showListMenu && (
                      <div className="absolute bottom-full left-0 mb-3 w-48 glass-panel rounded-lg p-2 shadow-xl bg-white dark:bg-charcoal flex flex-col gap-1">
                          {userLists.map(list => (
                              <button key={list.id} onClick={() => { onAddLeadsToList(list.id, selectedIds); setShowListMenu(false); setSelectedIds([]); }} className="text-left px-3 py-2 text-xs hover:bg-zinc-100 dark:hover:bg-white/5 rounded-md">
                                  {list.name}
                              </button>
                          ))}
                          <div className="border-t border-zinc-200 dark:border-white/10 my-1 pt-2 px-2">
                              <input 
                                type="text" 
                                placeholder="New List Name..." 
                                className="w-full bg-transparent text-xs outline-none mb-2"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                              />
                              <button onClick={handleCreateList} className="w-full text-xs bg-zinc-900 text-white dark:bg-white dark:text-black py-1 rounded">Create</button>
                          </div>
                      </div>
                  )}
              </div>

              <button onClick={handleExport} className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <Download className="w-4 h-4" /> Export
              </button>

              <button onClick={handleDelete} className="flex items-center gap-2 text-xs font-medium text-red-500 hover:text-red-600 transition-colors border-l border-zinc-300 dark:border-zinc-600 pl-4">
                  <Trash2 className="w-4 h-4" /> Delete
              </button>
          </div>
      )}
    </div>
  );
};

export default LeadList;