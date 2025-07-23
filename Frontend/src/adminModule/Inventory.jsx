import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LOW_STOCK_THRESHOLD = 5;

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showAdjustment, setShowAdjustment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("admin_token");
    if (!token) {
      alert("Access Denied: Admins only");
      navigate("/admin");
    } else {
      fetchInventory();
      fetchStores();
    }
  }, []);

  const fetchInventory = async () => {
    const token = Cookies.get("admin_token");
    try {
      const res = await axios.get("http://localhost:4001/api/inventory/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInventory(res.data);
    } catch (error) {
      console.error("Inventory fetch error:", error.response?.data || error.message);
    }
  };

  const fetchStores = async () => {
    const token = Cookies.get("admin_token");
    try {
      const res = await axios.get("http://localhost:4001/api/stores/all-stores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllStores(res.data);
    } catch (error) {
      console.error("Store fetch error:", error.response?.data || error.message);
    }
  };

  const updateInventory = (logEntry) => {
    fetchInventory();
    setAuditLog((prev) => [...prev, logEntry]);
  };

  const products = [...new Set(inventory.map((item) => item.product))];
  const lowStockItems = inventory.filter((i) => i.quantity <= LOW_STOCK_THRESHOLD);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Inventory Management</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowTransfer(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Transfer Stock
        </button>
        <button
          onClick={() => setShowAdjustment(true)}
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Adjust Stock
        </button>
      </div>

      <table className="w-full table-auto border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Store</th>
            <th className="border px-2 py-1">Product</th>
            <th className="border px-2 py-1">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td className="border px-2 py-1">{item.storeName}</td>
              <td className="border px-2 py-1">{item.product}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {lowStockItems.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
          <h4 className="font-semibold mb-1">⚠️ Low Stock Alerts</h4>
          <ul className="list-disc list-inside">
            {lowStockItems.map((item, i) => (
              <li key={i}>
                {item.product} in {item.storeName} — Only {item.quantity} left
              </li>
            ))}
          </ul>
        </div>
      )}

      {showTransfer && (
        <div className="bg-white p-4 border rounded shadow mt-4">
          <h3 className="font-semibold mb-2">Transfer Stock</h3>
          <TransferForm
            stores={allStores}
            products={products}
            onSubmit={(log) => {
              updateInventory(log);
              setShowTransfer(false);
            }}
            onCancel={() => setShowTransfer(false)}
          />
        </div>
      )}

      {showAdjustment && (
        <div className="bg-white p-4 border rounded shadow mt-4">
          <h3 className="font-semibold mb-2">Adjust Stock</h3>
          <AdjustmentForm
            stores={allStores}
            products={products}
            onSubmit={(log) => {
              updateInventory(log);
              setShowAdjustment(false);
            }}
            onCancel={() => setShowAdjustment(false)}
          />
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Audit Logs</h3>
        <ul className="bg-gray-50 p-3 rounded border max-h-40 overflow-auto text-sm">
          {auditLog.map((log, i) => (
            <li key={i} className="mb-1">
              • {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TransferForm({ stores, products, onSubmit, onCancel }) {
  const [fromStore, setFromStore] = useState("");
  const [toStore, setToStore] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleTransfer = async () => {
    const token = Cookies.get("admin_token");
    try {
      await axios.post(
        "http://localhost:4001/api/inventory/transfer",
        { fromStore, toStore, product, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSubmit(
        `Transferred ${quantity} ${product}(s) from ${fromStore} to ${toStore}`
      );
    } catch (error) {
      alert("Transfer failed. Check inputs.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        value={fromStore}
        onChange={(e) => setFromStore(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="">From Store</option>
        {stores.map((s) => (
          <option key={s._id || s.storeName} value={s.storeName || s}>
            {s.storeName || s}
          </option>
        ))}
      </select>
      <select
        value={toStore}
        onChange={(e) => setToStore(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="">To Store</option>
        {stores
          .filter((s) => (s.storeName || s) !== fromStore)
          .map((s) => (
            <option key={s._id || s.storeName} value={s.storeName || s}>
              {s.storeName || s}
            </option>
          ))}
      </select>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Enter Product Name"
        className="border p-1 rounded"
      />
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border p-1 rounded"
      />
      <div className="flex gap-2">
        <button
          onClick={handleTransfer}
          className="bg-blue-700 text-white px-4 py-1 rounded"
        >
          Transfer
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function AdjustmentForm({ stores, products, onSubmit, onCancel }) {
  const [store, setStore] = useState("");
  const [product, setProduct] = useState("");
  const [adjustment, setAdjustment] = useState(0);

  const handleAdjust = async () => {
    const token = Cookies.get("admin_token");
    try {
      await axios.post(
        "http://localhost:4001/api/inventory/adjust",
        { store, product, adjustment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSubmit(`Adjusted ${product} in ${store} by ${adjustment}`);
    } catch (error) {
      alert("Adjustment failed.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        value={store}
        onChange={(e) => setStore(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="">Select Store</option>
        {stores.map((s) => (
          <option key={s._id || s.storeName} value={s.storeName || s}>
            {s.storeName || s}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Enter Product Name"
        className="border p-1 rounded"
      />
      <input
        type="number"
        value={adjustment}
        onChange={(e) => setAdjustment(Number(e.target.value))}
        className="border p-1 rounded"
      />
      <div className="flex gap-2">
        <button
          onClick={handleAdjust}
          className="bg-yellow-700 text-white px-4 py-1 rounded"
        >
          Adjust
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
