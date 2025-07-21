import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios for API requests

const initialProducts = []; // Initial empty array for products
const stores = ['Store A', 'Store B', 'Store C'];
const categories = ['Apparel', 'Footwear', 'Accessories'];
const sizes = ['S', 'M', 'L', 'XL', '8', '9', '10'];
const colors = ['Red', 'Blue', 'Green', 'White', 'Black'];

export default function StockManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', size: '', color: '', visibleIn: [] });

  const resetForm = () => setForm({ name: '', category: '', size: '', color: '', visibleIn: [] });

  useEffect(() => {
  // Fetch products when the component mounts
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/stocks');
      console.log('API Response:', response.data); // Log the full response
      if (Array.isArray(response.data)) {
        setProducts(response.data);  // Ensure the response is an array
      } else {
        console.error("Error: Received data is not an array");
        setProducts([]);  // Fallback to an empty array if the data is not in expected format
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);  // Ensure we set products to an empty array in case of an error
    }
  };
  fetchProducts();
}, []);


  const handleAdd = async () => {
    const newProduct = { ...form, price: 100, quantity: 10 }; // Example price and quantity
    try {
      const response = await axios.post('/api/stocks', newProduct);
      setProducts([...products, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEdit = (prod) => {
    setEditing(prod.id);
    setForm({ ...prod });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/stocks/${editing}`, form);
      setProducts(products.map(p => p.id === editing ? response.data : p));
      setEditing(null);
      resetForm();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/stocks/${id}`);
      setProducts(products.filter(p => p.id !== id));
      if (editing === id) {
        setEditing(null);
        resetForm();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const toggleVisibility = (store) => {
    setForm(({ visibleIn }) => {
      const list = visibleIn.includes(store)
        ? visibleIn.filter(s => s !== store)
        : [...visibleIn, store];
      return { ...form, visibleIn: list };
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Stock Management</h2>
      {/* Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">{editing ? 'Edit Product' : 'Add Product'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text" placeholder="Product Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={form.size}
            onChange={e => setForm({ ...form, size: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Size</option>
            {sizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={form.color}
            onChange={e => setForm({ ...form, color: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Color</option>
            {colors.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="col-span-2">
            <p className="font-medium mb-1">Visible In Stores:</p>
            <div className="flex flex-wrap gap-2">
              {stores.map(store => (
                <label key={store} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={form.visibleIn.includes(store)}
                    onChange={() => toggleVisibility(store)}
                  />
                  <span>{store}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          {editing ? (
            <>
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
              <button onClick={() => { setEditing(null); resetForm(); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </>
          ) : (
            <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Size</th>
            <th className="border px-2 py-1">Color</th>
            <th className="border px-2 py-1">Visible In</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Ensure `products` is an array before calling `.map()` */}
          {Array.isArray(products) && products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td className="border px-2 py-1">{product.name}</td>
                <td className="border px-2 py-1">{product.category}</td>
                <td className="border px-2 py-1">{product.size}</td>
                <td className="border px-2 py-1">{product.color}</td>
                <td className="border px-2 py-1">{product.visibleIn.join(', ')}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button onClick={() => handleEdit(product)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
