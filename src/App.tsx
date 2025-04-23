import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import InvoiceCreate from './pages/InvoiceCreate';
import InvoicePreviewPage from './pages/InvoicePreviewPage';
import { InvoiceDetails } from './types';
import { getLastInvoiceFromLocalStorage } from './utils/localStorage';

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceDetails>(() => {
    const savedInvoice = getLastInvoiceFromLocalStorage();
    if (savedInvoice) return savedInvoice;

    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    
    return {
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
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">QuickBill</span>
                <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Invoice Generator
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Create
              </Link>
              <Link
                to="/preview"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Preview
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <InvoiceCreate 
                invoiceData={invoiceData} 
                setInvoiceData={setInvoiceData}
              />
            } 
          />
          <Route 
            path="/preview" 
            element={
              <InvoicePreviewPage 
                invoiceData={invoiceData}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;