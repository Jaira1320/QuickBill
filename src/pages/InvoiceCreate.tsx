import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, RotateCcw } from 'lucide-react';
import InvoiceForm from '../components/InvoiceForm';
import { InvoiceDetails } from '../types';
import { saveInvoiceToLocalStorage } from '../utils/localStorage';

interface InvoiceCreateProps {
  invoiceData: InvoiceDetails;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceDetails>>;
}

const InvoiceCreate: React.FC<InvoiceCreateProps> = ({
  invoiceData,
  setInvoiceData
}) => {
  const navigate = useNavigate();

  const saveInvoice = () => {
    saveInvoiceToLocalStorage(invoiceData);
    navigate('/preview');
  };

  const resetInvoice = () => {
    if (window.confirm('Are you sure you want to reset the invoice? All data will be lost.')) {
      const today = new Date().toISOString().split('T')[0];
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);
      
      setInvoiceData({
        companyName: '',
        companyLogo: '',
        clientName: '',
        clientAddress: '',
        invoiceNumber: 'INV-001',
        invoiceDate: today,
        dueDate: dueDate.toISOString().split('T')[0],
        lineItems: [{ item: '', description: '', quantity: 1, rate: 0, amount: 0 }],
        notes: '',
        taxRate: 0,
        subtotal: 0,
        taxAmount: 0,
        total: 0
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Invoice</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={saveInvoice}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save size={16} className="mr-2" /> Save & Preview
          </button>
          <button
            onClick={resetInvoice}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RotateCcw size={16} className="mr-2" /> Reset
          </button>
        </div>
      </div>

      <InvoiceForm 
        invoiceData={invoiceData} 
        setInvoiceData={setInvoiceData} 
      />
    </div>
  );
};

export default InvoiceCreate;