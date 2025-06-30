import React, { useState } from "react";
import DataTable from "react-data-table-component";

// Dummy data
const salesData = [
  { date: "2025-06-28", totalSales: 5600, gst: 800 },
  { date: "2025-06-29", totalSales: 6200, gst: 930 },
  { date: "2025-06-30", totalSales: 5100, gst: 750 },
];

const inventoryTurnover = [
  { product: "T-Shirt", sold: 100, restocked: 40 },
  { product: "Jeans", sold: 70, restocked: 20 },
  { product: "Sneakers", sold: 50, restocked: 15 },
];

const topCustomers = [
  { name: "Aman Sharma", totalSpent: 8500 },
  { name: "Neha Verma", totalSpent: 7900 },
  { name: "Ravi Kumar", totalSpent: 6800 },
];

const topProducts = [
  { name: "T-Shirt", unitsSold: 120 },
  { name: "Shoes", unitsSold: 95 },
  { name: "Cap", unitsSold: 75 },
];

function Report() {
  const [filter, setFilter] = useState("daily");

  const salesColumns = [
    { name: "Date", selector: (row) => row.date },
    { name: "Total Sales (₹)", selector: (row) => row.totalSales },
    { name: "GST (₹)", selector: (row) => row.gst },
  ];

  const inventoryColumns = [
    { name: "Product", selector: (row) => row.product },
    { name: "Units Sold", selector: (row) => row.sold },
    { name: "Restocked", selector: (row) => row.restocked },
  ];

  const topProductsColumns = [
    { name: "Product", selector: (row) => row.name },
    { name: "Units Sold", selector: (row) => row.unitsSold },
  ];

  const customerColumns = [
    { name: "Customer", selector: (row) => row.name },
    { name: "Total Spent (₹)", selector: (row) => row.totalSpent },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Store Reports</h2>

      {/* Filter Options */}
      <div className="mb-6 flex gap-4">
        {["daily", "weekly", "monthly"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded ${
              filter === option
                ? "bg-teal-700 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setFilter(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)} Report
          </button>
        ))}
      </div>

      {/* Sales Table */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Sales & GST Report</h3>
        <DataTable columns={salesColumns} data={salesData} pagination striped />
      </div>

      {/* Inventory Table */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Inventory Turnover</h3>
        <DataTable
          columns={inventoryColumns}
          data={inventoryTurnover}
          pagination
          striped
        />
      </div>

      {/* Top Products */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Top Selling Products</h3>
        <DataTable
          columns={topProductsColumns}
          data={topProducts}
          pagination
          striped
        />
      </div>

      {/* High-Value Customers */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">High-Value Customers</h3>
        <DataTable
          columns={customerColumns}
          data={topCustomers}
          pagination
          striped
        />
      </div>
    </div>
  );
}

export default Report;
