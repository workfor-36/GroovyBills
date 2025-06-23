import React from "react";

// Sample customer data (replace with backend data)
const sampleCustomers = [
  {
    id: 1,
    name: "Amit Sharma",
    phone: "9876543210",
    email: "amit@example.com",
    totalSpent: 4596,
    lastVisit: "2025-06-15",
  },
  {
    id: 2,
    name: "Neha Patel",
    phone: "9123456780",
    email: "neha@example.com",
    totalSpent: 1820,
    lastVisit: "2025-06-18",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    phone: "9988776655",
    email: "rajesh@example.com",
    totalSpent: 2399,
    lastVisit: "2025-06-10",
  },
];

const Customers = () => {
  return (
    <div className="px-4 py-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Customer Management</h2>

        <div className="overflow-x-auto bg-white shadow rounded-md">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left border">Name</th>
                <th className="px-4 py-3 text-left border">Phone</th>
                <th className="px-4 py-3 text-left border">Email</th>
                <th className="px-4 py-3 text-left border">Total Spent (₹)</th>
                <th className="px-4 py-3 text-left border">Last Visit</th>
                <th className="px-4 py-3 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{customer.name}</td>
                  <td className="px-4 py-2 border">{customer.phone}</td>
                  <td className="px-4 py-2 border">{customer.email}</td>
                  <td className="px-4 py-2 border">₹{customer.totalSpent}</td>
                  <td className="px-4 py-2 border">{customer.lastVisit}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <button
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => alert("Edit customer (coming soon)")}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => alert("Delete customer (coming soon)")}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sampleCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
