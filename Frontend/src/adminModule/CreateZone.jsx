import React, { useState } from "react";

function CreateZone() {
  const [storeData, setStoreData] = useState({
    name: "",
    address: "",
    manager: "",
    cashier: "",
  });

  const [stores, setStores] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStores((prev) => [...prev, storeData]);
    setStoreData({ name: "", address: "", manager: "", cashier: "" });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Store Management</h2>

      <button
        onClick={() => setShowForm(true)}
        className="bg-teal-700 text-white px-4 py-2 rounded mb-4"
      >
        + Create New Store
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border p-4 rounded shadow mb-6"
        >
          <h3 className="text-lg font-semibold mb-3">New Store Details</h3>

          <div className="mb-3">
            <label className="block font-medium">Store Name</label>
            <input
              type="text"
              name="name"
              value={storeData.name}
              onChange={handleChange}
              required
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Store Address</label>
            <input
              type="text"
              name="address"
              value={storeData.address}
              onChange={handleChange}
              required
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Store Manager</label>
            <input
              type="text"
              name="manager"
              value={storeData.manager}
              onChange={handleChange}
              required
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Cashier</label>
            <input
              type="text"
              name="cashier"
              value={storeData.cashier}
              onChange={handleChange}
              required
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Store
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Store List */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Stores List</h3>
        {stores.length === 0 ? (
          <p className="text-gray-600">No stores added yet.</p>
        ) : (
          <table className="w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Store Name</th>
                <th className="border px-2 py-1">Address</th>
                <th className="border px-2 py-1">Manager</th>
                <th className="border px-2 py-1">Cashier</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{store.name}</td>
                  <td className="border px-2 py-1">{store.address}</td>
                  <td className="border px-2 py-1">{store.manager}</td>
                  <td className="border px-2 py-1">{store.cashier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CreateZone;
