import React from 'react';
import { Save, RotateCcw, Info } from 'lucide-react';
import { InvoiceDetails } from '../types';
import ThemeToggle from './ThemeToggle';

interface ControlPanelProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onSave: () => void;
  onReset: () => void;
  generateNewInvoiceNumber: () => void;
  invoiceData: InvoiceDetails;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  darkMode,
  toggleDarkMode,
  onSave,
  onReset,
  generateNewInvoiceNumber,
  invoiceData
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">QuickBill</h1>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          Invoice Generator
        </span>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <Save size={16} className="mr-1" /> Save
        </button>
        
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          <RotateCcw size={16} className="mr-1" /> Reset
        </button>
        
        <button
          type="button"
          onClick={generateNewInvoiceNumber}
          className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          title="Generate new invoice number"
        >
          <Info size={16} className="mr-1" /> New Invoice #
        </button>
        
        <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
};

export default ControlPanel;