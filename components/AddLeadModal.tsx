import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LeadStatus } from '../types';
import { PIPELINE_COLUMNS } from '../constants';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (lead: any) => void;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    value: '',
    status: 'New' as LeadStatus,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      value: Number(formData.value) || 0,
      tags: ['New'], // Default tag
    });
    setFormData({ name: '', company: '', email: '', value: '', status: 'New' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-obsidian border border-mist dark:border-charcoal shadow-2xl rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-mist dark:border-charcoal bg-zinc-50/50 dark:bg-white/[0.02]">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">Add New Lead</h2>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Full Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 bg-white dark:bg-carbon border border-mist dark:border-charcoal rounded-md text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all placeholder:text-zinc-400"
              placeholder="e.g. Alice Freeman"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Company</label>
            <input
              required
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full px-3 py-2 bg-white dark:bg-carbon border border-mist dark:border-charcoal rounded-md text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all placeholder:text-zinc-400"
              placeholder="e.g. Nexus Corp"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Value ($)</label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="w-full px-3 py-2 bg-white dark:bg-carbon border border-mist dark:border-charcoal rounded-md text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all placeholder:text-zinc-400"
                placeholder="0"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as LeadStatus})}
                className="w-full px-3 py-2 bg-white dark:bg-carbon border border-mist dark:border-charcoal rounded-md text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all appearance-none"
              >
                {PIPELINE_COLUMNS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 bg-white dark:bg-carbon border border-mist dark:border-charcoal rounded-md text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all placeholder:text-zinc-400"
              placeholder="alice@example.com"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity shadow-sm"
            >
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;