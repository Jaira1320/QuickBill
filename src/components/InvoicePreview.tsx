import React from 'react';
import { formatCurrency, formatDate } from '../utils/format';
import { InvoiceDetails } from '../types';

interface InvoicePreviewProps {
  invoiceData: InvoiceDetails;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoiceData }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6 print:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">INVOICE</h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">{invoiceData.invoiceNumber}</p>
          </div>
          <div className="text-right">
            {invoiceData.companyLogo && (
              <img 
                src={invoiceData.companyLogo} 
                alt={`${invoiceData.companyName} logo`} 
                className="h-16 mb-2 ml-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{invoiceData.companyName || 'Your Company'}</h2>
          </div>
        </div>

        {/* Billing Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Bill To:</h3>
            <p className="font-medium text-gray-800 dark:text-gray-200">{invoiceData.clientName || 'Client Name'}</p>
            <p className="text-gray-600 dark:text-gray-300">{invoiceData.clientAddress || 'Client Address'}</p>
          </div>
          <div className="text-right">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Invoice Date:</span>
                <span className="text-sm text-gray-800 dark:text-gray-200">{formatDate(invoiceData.invoiceDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date:</span>
                <span className="text-sm text-gray-800 dark:text-gray-200">{formatDate(invoiceData.dueDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="border dark:border-gray-700 rounded-lg overflow-hidden mb-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Qty</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rate</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {invoiceData.lineItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{item.item || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.description || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-right">{item.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-right">{formatCurrency(item.rate)}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 text-right font-medium">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatCurrency(invoiceData.subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 border-b dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Tax ({invoiceData.taxRate}%):</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatCurrency(invoiceData.taxAmount)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span className="text-gray-900 dark:text-white">Total:</span>
              <span className="text-blue-600 dark:text-blue-400">{formatCurrency(invoiceData.total)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoiceData.notes && (
          <div className="mt-8 pt-4 border-t dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Notes:</h3>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoiceData.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePreview;