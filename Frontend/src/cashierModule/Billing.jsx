import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // 


const sampleInvoice = {
  invoiceNo: "INV-20250621",
  date: new Date().toLocaleDateString(),
  cashier: "Misba Sab",
  customer: {
    name: "Amit Sharma",
    phone: "9876543210",
  },
  items: [
    { name: "T-Shirt", quantity: 2, price: 299 },
    { name: "Jeans", quantity: 1, price: 999 },
    { name: "Cap", quantity: 1, price: 199 },
  ],
};

const Billing = () => {
  const { invoiceNo, date, cashier, customer, items } = sampleInvoice;

  const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(16);
    doc.text("GroovyBills Invoice", 14, 20);

    doc.setFontSize(11);
    doc.text(`Invoice No: ${invoiceNo}`, 14, 30);
    doc.text(`Date: ${date}`, 14, 36);
    doc.text(`Cashier: ${cashier}`, 14, 42);
    doc.text(`Customer: ${customer.name}`, 14, 48);
    doc.text(`Phone: ${customer.phone}`, 14, 54);

    // Table
    doc.autoTable({
      startY: 60,
      head: [["Item", "Qty", "Price", "Subtotal"]],
      body: items.map((item) => [
        item.name,
        item.quantity,
        `₹${item.price}`,
        `₹${item.quantity * item.price}`,
      ]),
      styles: { fontSize: 11 },
      headStyles: { fillColor: [52, 152, 219] },
    });

    // Total
    doc.text(`Total: ₹${total}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`${invoiceNo}.pdf`);
  };

  return (
    <div className="px-4 py-6 lg:px-12">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-md">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-1">Invoice</h2>
          <p className="text-sm text-gray-500">Invoice No: {invoiceNo}</p>
          <p className="text-sm text-gray-500">Date: {date}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p className="font-medium">Cashier:</p>
            <p>{cashier}</p>
          </div>
          <div>
            <p className="font-medium">Customer:</p>
            <p>{customer.name}</p>
            <p>{customer.phone}</p>
          </div>
        </div>

        <table className="w-full text-sm border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-3 py-2">Item</th>
              <th className="border px-3 py-2">Qty</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="border px-3 py-2">{item.name}</td>
                <td className="border px-3 py-2">{item.quantity}</td>
                <td className="border px-3 py-2">₹{item.price}</td>
                <td className="border px-3 py-2">₹{item.quantity * item.price}</td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td colSpan="3" className="border px-3 py-2 text-right">
                Total
              </td>
              <td className="border px-3 py-2">₹{total}</td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download Invoice PDF
        </button>
      </div>
    </div>
  );
};

export default Billing;
