import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for easy cookie handling

function CreateZone() {
  const [storeData, setStoreData] = useState({
    storeName: "",
    storeAddress: "",
    managerName: "",
    managerEmail: "",
    cashierName: "",
    cashierEmail: "",
  });

  const [stores, setStores] = useState([]);  // This will hold the list of stores
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await axios.post(
      "http://localhost:4001/api/stores/create",
      storeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Cookie (token) will be sent automatically
      }
    );

    console.log("Store created:", response.data);
    setLoading(false);
    setSuccessMessage("Store created successfully!");
    setStores((prev) => [...prev, response.data.store]);
  } catch (error) {
    console.error("Error during store creation:", error);
    setError(error.response?.data?.message || "Store creation failed");
    setLoading(false);
  }
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
              name="storeName"
              value={storeData.storeName}
              onChange={handleChange}
              required
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Store Address</label>
            <input
              type="text"
              name="storeAddress"
              value={storeData.storeAddress}
              onChange={handleChange}
              required
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Store Manager</label>
            <input
              type="text"
              name="managerName"
              value={storeData.managerName}
              onChange={handleChange}
              required
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Manager Email</label>
            <input
              type="email"
              name="managerEmail"
              value={storeData.managerEmail}
              onChange={handleChange}
              required
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Cashier</label>
            <input
              type="text"
              name="cashierName"
              value={storeData.cashierName}
              onChange={handleChange}
              required
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium">Cashier Email</label>
            <input
              type="email"
              name="cashierEmail"
              value={storeData.cashierEmail}
              onChange={handleChange}
              required
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

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
                  <td className="border px-2 py-1">{store.storeName}</td>
                  <td className="border px-2 py-1">{store.storeAddress}</td>
                  <td className="border px-2 py-1">{store.managerName}</td>
                  <td className="border px-2 py-1">{store.cashierName}</td>
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
