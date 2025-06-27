import React, { useState } from 'react';

const dummyReports = {
  sales: {
    daily: 12000,
    weekly: 84200,
    monthly: 342000,
  },
  tax: {
    gstCollected: 18500,
    gstPending: 3200,
  },
  inventory: {
    turnoverRate: "6.3%",
    restocksThisMonth: 12,
  },
  insights: {
    topProducts: ["T-Shirt", "Sneakers", "Jackets"],
    highValueCustomers: ["Aarav Mehta", "Diya Kapoor", "Rahul Singh"],
  },
  analytics: {
    stores: 5,
    totalRevenue: "₹5,84,000",
    avgDailySales: "₹18,900",
  }
};

function Report() {
  const [reportType, setReportType] = useState('daily');

  const formatCurrency = (amount) =>
    typeof amount === 'number' ? `₹${amount.toLocaleString()}` : amount;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Business Reports & Analytics</h2>

      {/* Sales Report Filter */}
      <div className="mb-6">
        <label className="font-medium mr-4">Select Sales Report:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Sales Reports */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Sales Report</h3>
        <p className="text-xl text-green-600">{formatCurrency(dummyReports.sales[reportType])}</p>
      </div>

      {/* Tax Report */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Tax / GST Report</h3>
        <div className="space-y-1">
          <p>GST Collected: <span className="font-bold">{formatCurrency(dummyReports.tax.gstCollected)}</span></p>
          <p>Pending GST: <span className="font-bold text-red-600">{formatCurrency(dummyReports.tax.gstPending)}</span></p>
        </div>
      </div>

      {/* Inventory Reports */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Inventory Turnover & Restock</h3>
        <p>Turnover Rate: <span className="font-bold">{dummyReports.inventory.turnoverRate}</span></p>
        <p>Restocks This Month: <span className="font-bold">{dummyReports.inventory.restocksThisMonth}</span></p>
      </div>

      {/* Insights */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Insights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Top Products:</p>
            <ul className="list-disc ml-5 text-sm">
              {dummyReports.insights.topProducts.map((prod, i) => (
                <li key={i}>{prod}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">High-Value Customers:</p>
            <ul className="list-disc ml-5 text-sm">
              {dummyReports.insights.highValueCustomers.map((cust, i) => (
                <li key={i}>{cust}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Consolidated Analytics */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Consolidated Multi-Store Analytics</h3>
        <div className="space-y-1">
          <p>Total Stores: <span className="font-bold">{dummyReports.analytics.stores}</span></p>
          <p>Total Revenue: <span className="font-bold">{dummyReports.analytics.totalRevenue}</span></p>
          <p>Avg. Daily Sales: <span className="font-bold">{dummyReports.analytics.avgDailySales}</span></p>
        </div>
      </div>
    </div>
  );
}

export default Report;
