import React, { useState } from "react";

// Sample product data (replace with backend data)
const sampleProducts = [
  { id: 1, name: "T-Shirt", category: "Clothing", price: 299, stock: 25 },
  { id: 2, name: "Jeans", category: "Clothing", price: 999, stock: 12 },
  { id: 3, name: "Sneakers", category: "Footwear", price: 1899, stock: 8 },
  { id: 4, name: "Cap", category: "Accessories", price: 199, stock: 30 },
  { id: 5, name: "Watch", category: "Accessories", price: 1499, stock: 5 },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Product Lookup</h2>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Product table */}
        <div className="overflow-x-auto bg-white shadow rounded-md">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left border">Product Name</th>
                <th className="px-4 py-3 text-left border">Category</th>
                <th className="px-4 py-3 text-left border">Price (₹)</th>
                <th className="px-4 py-3 text-left border">Stock</th>
                <th className="px-4 py-3 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{product.name}</td>
                    <td className="px-4 py-2 border">{product.category}</td>
                    <td className="px-4 py-2 border">₹{product.price}</td>
                    <td className="px-4 py-2 border">{product.stock}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => alert("Edit product")}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                          onClick={() => alert("View product details")}
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No products found.
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

export default Products;
