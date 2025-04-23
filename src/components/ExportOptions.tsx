import React from 'react';
import { Download, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface ExportOptionsProps {
  invoiceData: any;
  generatePdf: () => void;
  printInvoice: () => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ 
  invoiceData, 
  generatePdf, 
  printInvoice 
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-end">
      <button
        type="button"
        onClick={generatePdf}
        disabled={!invoiceData.invoiceNumber}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Download size={16} className="mr-2" />
        Download PDF
      </button>
      <button
        type="button"
        onClick={printInvoice}
        disabled={!invoiceData.invoiceNumber}
        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Printer size={16} className="mr-2" />
        Print
      </button>
    </div>
  );
};

export default ExportOptions;