import { InvoiceDetails } from "../types";

export const saveInvoiceToLocalStorage = (invoice: InvoiceDetails): void => {
  try {
    const invoices = getInvoicesFromLocalStorage();
    const existingIndex = invoices.findIndex(inv => inv.invoiceNumber === invoice.invoiceNumber);
    
    if (existingIndex >= 0) {
      invoices[existingIndex] = invoice;
    } else {
      invoices.push(invoice);
    }
    
    localStorage.setItem('invoices', JSON.stringify(invoices));
    localStorage.setItem('lastInvoice', JSON.stringify(invoice));
  } catch (error) {
    console.error('Error saving invoice to localStorage:', error);
  }
};

export const getInvoicesFromLocalStorage = (): InvoiceDetails[] => {
  try {
    const invoices = localStorage.getItem('invoices');
    return invoices ? JSON.parse(invoices) : [];
  } catch (error) {
    console.error('Error getting invoices from localStorage:', error);
    return [];
  }
};

export const getLastInvoiceFromLocalStorage = (): InvoiceDetails | null => {
  try {
    const lastInvoice = localStorage.getItem('lastInvoice');
    return lastInvoice ? JSON.parse(lastInvoice) : null;
  } catch (error) {
    console.error('Error getting last invoice from localStorage:', error);
    return null;
  }
};