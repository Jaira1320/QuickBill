export interface LineItem {
  item: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceDetails {
  companyName: string;
  companyLogo: string;
  clientName: string;
  clientAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  lineItems: LineItem[];
  notes: string;
  taxRate: number;
  subtotal: number;
  taxAmount: number;
  total: number;
}