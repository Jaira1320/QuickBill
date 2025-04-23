import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { LineItem, InvoiceDetails } from '../types';

interface InvoiceFormProps {
  invoiceData: InvoiceDetails;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceDetails>>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoiceData, setInvoiceData }) => {
  const handleLineItemChange = (index: number, field: keyof LineItem, value: string | number) => {
    const updatedLineItems = [...invoiceData.lineItems];
    
    if (field === 'quantity' || field === 'rate') {
      // Convert to number and calculate amount
      const numValue = parseFloat(value as string) || 0;
      updatedLineItems[index] = {
        ...updatedLineItems[index],
        [field]: numValue,
        amount: field === 'quantity' 
          ? numValue * updatedLineItems[index].rate
          : updatedLineItems[index].quantity * numValue
      };
    } else {
      updatedLineItems[index] = {
        ...updatedLineItems[index],
        [field]: value
      };
    }
    
    setInvoiceData({
      ...invoiceData,
      lineItems: updatedLineItems
    });
  };

  const addLineItem = () => {
    setInvoiceData({
      ...invoiceData,
      lineItems: [
        ...invoiceData.lineItems,
        { item: '', description: '', quantity: 1, rate: 0, amount: 0 }
      ]
    });
  };

  const removeLineItem = (index: number) => {
    const updatedLineItems = [...invoiceData.lineItems];
    updatedLineItems.splice(index, 1);
    setInvoiceData({
      ...invoiceData,
      lineItems: updatedLineItems
    });
  };

  // Calculate totals whenever line items change
  useEffect(() => {
    const subtotal = invoiceData.lineItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (invoiceData.taxRate / 100);
    const total = subtotal + taxAmount;

    setInvoiceData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
    }));
  }, [invoiceData.lineItems, invoiceData.taxRate]);

  return (
    <div className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Invoice Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={invoiceData.companyName}
              onChange={(e) => setInvoiceData({...invoiceData, companyName: e.target.value})}
              placeholder="Your Company"
            />
          </div>
          
          <div>
            <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Company Logo URL (optional)
            </label>
            <input
              type="text"
              id="companyLogo"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={invoiceData.companyLogo}
              onChange={(e) => setInvoiceData({...invoiceData, companyLogo: e.target.value})}
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={invoiceData.clientName}
              onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
              placeholder="Client Name"
            />
          </div>
          
          <div>
            <label htmlFor="clientAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Client Address
            </label>
            <input
              type="text"
              id="clientAddress"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={invoiceData.clientAddress}
              onChange={(e) => setInvoiceData({...invoiceData, clientAddress: e.target.value})}
              placeholder="Client Address"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Invoice Number
            </label>
            <input
              type="text"
              id="invoiceNumber"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={invoiceData.invoiceNumber}
              onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
              placeholder="INV-001"
            />
          </div>
          
          <div>
            <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Invoice Date
            </label>
            <input
              type="date"
              id="invoiceDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={invoiceData.invoiceDate}
              onChange={(e) => setInvoiceData({...invoiceData, invoiceDate: e.target.value})}
            />
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={invoiceData.dueDate}
              onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Line Items</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Qty</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rate</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {invoiceData.lineItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      value={item.item}
                      onChange={(e) => handleLineItemChange(index, 'item', e.target.value)}
                      placeholder="Item name"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      value={item.description}
                      onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                      placeholder="Description"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      value={item.quantity}
                      onChange={(e) => handleLineItemChange(index, 'quantity', e.target.value)}
                      min="1"
                      step="1"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      value={item.rate}
                      onChange={(e) => handleLineItemChange(index, 'rate', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-3 py-2 text-right font-medium">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-3 py-2">
                    <button 
                      type="button"
                      onClick={() => removeLineItem(index)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <button
          type="button"
          onClick={addLineItem}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus size={16} className="mr-1" /> Add Item
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
              placeholder="Any additional notes for the client..."
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
              <span className="font-medium">{formatCurrency(invoiceData.subtotal)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <label htmlFor="taxRate" className="text-sm text-gray-600 dark:text-gray-300">
                  Tax Rate:
                </label>
                <input
                  type="number"
                  id="taxRate"
                  className="w-16 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                  value={invoiceData.taxRate}
                  onChange={(e) => setInvoiceData({...invoiceData, taxRate: parseFloat(e.target.value) || 0})}
                  min="0"
                  max="100"
                  step="0.1"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">%</span>
              </div>
              <span className="text-sm font-medium">{formatCurrency(invoiceData.taxAmount)}</span>
            </div>
            
            <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-base font-medium text-gray-900 dark:text-white">Total:</span>
              <span className="text-base font-bold text-blue-600 dark:text-blue-400">{formatCurrency(invoiceData.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;