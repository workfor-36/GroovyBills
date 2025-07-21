import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Sample Product List
const sampleProducts = [
  { id: 1, name: "T-Shirt", price: 299, stock: 20 },
  { id: 2, name: "Jeans", price: 999, stock: 15 },
  { id: 3, name: "Sneakers", price: 1999, stock: 8 },
  { id: 4, name: "Cap", price: 199, stock: 25 },
  { id: 5, name: "Watch", price: 1499, stock: 10 },
];

const POS = () => {
  const [cart, setCart] = useState([]);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const invoice = {
      invoiceNo: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      cashier: "Misba Sab", // Replace with real user
      customer: {
        name: "Amit Sharma", // Can be form input later
        phone: "9876543210",
      },
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    setInvoiceData(invoice);
    setCheckoutDone(true);
  };

  const handleBackToPOS = () => {
    setCart([]);
    setInvoiceData(null);
    setCheckoutDone(false);
  };

  // ---------------- Billing Component ----------------
  const Billing = ({ invoice }) => {
    const { invoiceNo, date, cashier, customer, items } = invoice;
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    const generatePDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("GroovyBills Invoice", 14, 20);

      doc.setFontSize(11);
      doc.text(`Invoice No: ${invoiceNo}`, 14, 30);
      doc.text(`Date: ${date}`, 14, 36);
      doc.text(`Cashier: ${cashier}`, 14, 42);
      doc.text(`Customer: ${customer.name}`, 14, 48);
      doc.text(`Phone: ${customer.phone}`, 14, 54);

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
                  <td className="border px-3 py-2">
                    ₹{item.quantity * item.price}
                  </td>
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

          <div className="flex justify-between gap-4">
            <button
              onClick={generatePDF}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Download Invoice PDF
            </button>
            <button
              onClick={handleBackToPOS}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Back to POS
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ---------------------------------------------------
  if (checkoutDone && invoiceData) {
    return <Billing invoice={invoiceData} />;
  }

  return (
    <div className="flex flex-col gap-6 px-4 lg:flex-row lg:px-6 py-4">
      {/* Left Section (Products) */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-xl font-semibold mb-3">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">₹{product.price}</p>
              <p className="text-xs text-gray-400 mb-2">
                In Stock: {product.stock}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white w-full py-1 text-sm rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section (Cart) */}
      <div className="w-full lg:w-1/3">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <ShoppingCart size={20} />
          Cart
        </h2>
        <div className="bg-white border rounded-lg p-4 shadow">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Cart is empty</p>
          ) : (
            <>
              <ul className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-start border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 font-semibold flex justify-between">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default POS;
