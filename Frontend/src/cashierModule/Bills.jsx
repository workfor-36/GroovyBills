import React, { useState } from "react";

const sampleBills = [
  {
    invoiceNo: "INV-20250701",
    date: "2025-07-01",
    customer: { name: "Amit Sharma" },
    total: 1997,
  },
  {
    invoiceNo: "INV-20250621",
    date: "2025-06-21",
    customer: { name: "Neha Patel" },
    total: 2997,
  },
  {
    invoiceNo: "INV-20250715",
    date: "2025-07-15",
    customer: { name: "Rahul Verma" },
    total: 1250,
  },
  {
    invoiceNo: "INV-20250630",
    date: "2025-06-30",
    customer: { name: "Amit Sharma" },
    total: 1899,
  },
];

const Bill = () => {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredBills = sampleBills
    .filter((bill) =>
      bill.customer.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

  const toggleSort = () => setSortAsc(!sortAsc);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-xl font-semibold">Bills</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by customer name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-full sm:w-64 text-sm"
          />
          <button
            onClick={toggleSort}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Sort by Date {sortAsc ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Invoice #</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Customer</th>
              <th className="border px-4 py-2 text-left">Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No bills found.
                </td>
              </tr>
            ) : (
              filteredBills.map((bill) => (
                <tr key={bill.invoiceNo} className="border-t hover:bg-gray-50">
                  <td className="border px-4 py-2">{bill.invoiceNo}</td>
                  <td className="border px-4 py-2">{bill.date}</td>
                  <td className="border px-4 py-2">{bill.customer.name}</td>
                  <td className="border px-4 py-2">₹{bill.total}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bill;
