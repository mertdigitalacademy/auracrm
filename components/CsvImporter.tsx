import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { X, Upload, ArrowRight, FileText, CheckCircle } from 'lucide-react';
import { Lead } from '../types';

interface CsvImporterProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (leads: Partial<Lead>[]) => void;
}

const AURA_FIELDS = [
  { key: 'name', label: 'Full Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'company', label: 'Company' },
  { key: 'value', label: 'Deal Value' },
  { key: 'status', label: 'Status' },
];

const CsvImporter: React.FC<CsvImporterProps> = ({ isOpen, onClose, onImport }) => {
  const [step, setStep] = useState<'upload' | 'map'>('upload');
  const [csvData, setCsvData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setHeaders(results.meta.fields || []);
          setCsvData(results.data);
          // Auto-guess mapping
          const initialMap: Record<string, string> = {};
          (results.meta.fields || []).forEach(header => {
             const lower = header.toLowerCase();
             if (lower.includes('name')) initialMap[header] = 'name';
             if (lower.includes('email') || lower.includes('mail')) initialMap[header] = 'email';
             if (lower.includes('company') || lower.includes('org')) initialMap[header] = 'company';
             if (lower.includes('value') || lower.includes('amount') || lower.includes('price')) initialMap[header] = 'value';
             if (lower.includes('status') || lower.includes('stage')) initialMap[header] = 'status';
          });
          setMapping(initialMap);
          setStep('map');
        }
      });
    }
  };

  const handleFinish = () => {
    const importedLeads = csvData.map(row => {
      const lead: any = {};
      Object.entries(mapping).forEach(([csvHeader, auraField]) => {
        if (auraField) {
            let val = row[csvHeader];
            if (auraField === 'value') {
                val = parseFloat(val?.replace(/[^0-9.-]+/g,"")) || 0;
            }
            lead[auraField] = val;
        }
      });
      return lead;
    });
    
    // Filter out empties
    const validLeads = importedLeads.filter(l => l.name || l.email);
    onImport(validLeads);
    // Reset
    setStep('upload');
    setCsvData([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-obsidian border border-mist dark:border-charcoal shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-mist dark:border-charcoal bg-zinc-50/50 dark:bg-white/[0.02]">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
            {step === 'upload' ? 'Import Leads' : 'Map Columns'}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><X className="w-4 h-4" /></button>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          {step === 'upload' ? (
            <div 
                className="h-64 border-2 border-dashed border-mist dark:border-charcoal rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors bg-zinc-50 dark:bg-white/[0.02]"
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                    <Upload className="w-5 h-5 text-zinc-400" />
                </div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">Click to upload CSV</p>
                <p className="text-xs text-zinc-500 mt-1">or drag and drop file here</p>
                <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
            </div>
          ) : (
            <div className="space-y-6">
                <p className="text-sm text-zinc-500">Map your CSV columns to Aura fields. Unmapped columns will be ignored.</p>
                
                <div className="border border-mist dark:border-charcoal rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-50 dark:bg-white/5 border-b border-mist dark:border-charcoal">
                            <tr>
                                <th className="px-4 py-3 font-medium text-zinc-500">CSV Header</th>
                                <th className="px-4 py-3 font-medium text-zinc-500 w-8"><ArrowRight className="w-4 h-4" /></th>
                                <th className="px-4 py-3 font-medium text-zinc-500">Aura Field</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-mist dark:divide-charcoal">
                            {headers.map(header => (
                                <tr key={header} className="bg-white dark:bg-carbon">
                                    <td className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                        <FileText className="w-3.5 h-3.5 text-zinc-400" />
                                        {header}
                                    </td>
                                    <td className="px-4 py-3 text-zinc-400"><ArrowRight className="w-3 h-3" /></td>
                                    <td className="px-4 py-3">
                                        <select 
                                            className="w-full bg-zinc-50 dark:bg-black border border-mist dark:border-charcoal rounded px-2 py-1.5 focus:outline-none focus:border-zinc-400 text-zinc-900 dark:text-zinc-200"
                                            value={mapping[header] || ''}
                                            onChange={(e) => setMapping({...mapping, [header]: e.target.value})}
                                        >
                                            <option value="">Don't Import</option>
                                            {AURA_FIELDS.map(f => (
                                                <option key={f.key} value={f.key}>{f.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-zinc-50 dark:bg-white/5 p-4 rounded-lg">
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase mb-2">Preview (First Row)</h4>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        {Object.entries(mapping).map(([header, auraField]) => {
                             if(!auraField || !csvData[0]) return null;
                             return (
                                 <div key={header}>
                                     <span className="text-zinc-400">{auraField}: </span>
                                     <span className="text-zinc-900 dark:text-zinc-200 font-mono">{csvData[0][header]}</span>
                                 </div>
                             )
                        })}
                    </div>
                </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'map' && (
            <div className="p-4 border-t border-mist dark:border-charcoal flex justify-end gap-3 bg-zinc-50/50 dark:bg-white/[0.02]">
                <button onClick={() => setStep('upload')} className="px-4 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                    Back
                </button>
                <button onClick={handleFinish} className="px-6 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-white dark:text-black rounded-md hover:opacity-90 shadow-sm flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    Import {csvData.length} Leads
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default CsvImporter;