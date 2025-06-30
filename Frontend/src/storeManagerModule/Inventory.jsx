import { useState } from "react";
import DataTable from "react-data-table-component";

const initialProducts = [
  { id: 1, name: "T-Shirt", category: "Apparel", size: "M", color: "Red", visible: true },
  { id: 2, name: "Shoes", category: "Footwear", size: "9", color: "Black", visible: true },
];

function Inventory() {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState({ name: "", category: "", size: "", color: "", visible: true });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...form, id: editingId } : p))
      );
    } else {
      setProducts((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setForm({ name: "", category: "", size: "", color: "", visible: true });
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleVisibility = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p))
    );
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Category", selector: (row) => row.category },
    { name: "Size", selector: (row) => row.size },
    { name: "Color", selector: (row) => row.color },
    {
      name: "Visibility",
      cell: (row) => (
        <button
          onClick={() => toggleVisibility(row.id)}
          className={`text-xs px-2 py-1 rounded ${row.visible ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {row.visible ? "Visible" : "Hidden"}
        </button>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(row)} className="text-blue-600 text-sm">Edit</button>
          <button onClick={() => handleDelete(row.id)} className="text-red-600 text-sm">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Store Inventory Management</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <input
          className="border px-2 py-1 rounded"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border px-2 py-1 rounded"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <input
          className="border px-2 py-1 rounded"
          placeholder="Size"
          value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })}
        />
        <input
          className="border px-2 py-1 rounded"
          placeholder="Color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />
        <div className="flex items-center gap-2 col-span-2 md:col-span-1">
          <input
            type="checkbox"
            checked={form.visible}
            onChange={(e) => setForm({ ...form, visible: e.target.checked })}
          />
          <label>Visible in Store</label>
        </div>
        <button type="submit" className="bg-teal-600 text-white rounded py-1 col-span-2 md:col-span-1 hover:bg-teal-700">
          {editingId !== null ? "Update Product" : "Add Product"}
        </button>
      </form>

      <DataTable
        title="Product List"
        columns={columns}
        data={products}
        pagination
        highlightOnHover
        striped
        persistTableHead
      />
    </div>
  );
}

export default Inventory;
