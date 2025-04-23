import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Printer, ArrowLeft } from 'lucide-react';
import InvoicePreview from '../components/InvoicePreview';
import { InvoiceDetails } from '../types';
import html2pdf from 'html2pdf.js';

interface InvoicePreviewPageProps {
  invoiceData: InvoiceDetails;
}

const InvoicePreviewPage: React.FC<InvoicePreviewPageProps> = ({ invoiceData }) => {
  const navigate = useNavigate();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const generatePdf = () => {
    if (!invoiceRef.current) return;
    
    const element = invoiceRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `Invoice-${invoiceData.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Edit
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={generatePdf}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download size={16} className="mr-2" /> Download PDF
          </button>
          <button
            onClick={printInvoice}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Printer size={16} className="mr-2" /> Print
          </button>
        </div>
      </div>

      <div ref={invoiceRef}>
        <InvoicePreview invoiceData={invoiceData} />
      </div>
    </div>
  );
};

export default InvoicePreviewPage;