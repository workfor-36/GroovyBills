import React, { useState } from "react";

// Sample inventory and threshold
const initialInventory = [
  { id: 1, store: "Store A", product: "T-Shirt", quantity: 10 },
  { id: 2, store: "Store B", product: "Jeans", quantity: 3 },
  { id: 3, store: "Store A", product: "Sneakers", quantity: 25 },
  { id: 4, store: "Store B", product: "Sneakers", quantity: 2 },
];
const LOW_STOCK_THRESHOLD = 5;

export default function InventoryManagement() {
  const [inventory, setInventory] = useState(initialInventory);
  const [auditLog, setAuditLog] = useState([]);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showAdjustment, setShowAdjustment] = useState(false);

  const updateInventory = (newInventory, logEntry) => {
    setInventory(newInventory);
    setAuditLog((prev) => [...prev, logEntry]);
  };

  const stores = [...new Set(inventory.map(item => item.store))];
  const products = [...new Set(inventory.map(item => item.product))];

  const lowStockItems = inventory.filter(i => i.quantity <= LOW_STOCK_THRESHOLD);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Inventory Management</h2>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setShowTransfer(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Transfer Stock</button>
        <button onClick={() => setShowAdjustment(true)} className="bg-yellow-600 text-white px-4 py-2 rounded">Adjust Stock</button>
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
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.store}</td>
              <td className="border px-2 py-1">{item.product}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
          <h4 className="font-semibold mb-1">⚠️ Low Stock Alerts</h4>
          <ul className="list-disc list-inside">
            {lowStockItems.map((item, i) => (
              <li key={i}>{item.product} in {item.store} — Only {item.quantity} left</li>
            ))}
          </ul>
        </div>
      )}

      {/* Transfer Stock Form */}
      {showTransfer && (
        <div className="bg-white p-4 border rounded shadow mt-4">
          <h3 className="font-semibold mb-2">Transfer Stock</h3>
          <TransferForm
            stores={stores}
            products={products}
            inventory={inventory}
            onSubmit={(updated, log) => {
              updateInventory(updated, log);
              setShowTransfer(false);
            }}
            onCancel={() => setShowTransfer(false)}
          />
        </div>
      )}

      {/* Manual Adjustment Form */}
      {showAdjustment && (
        <div className="bg-white p-4 border rounded shadow mt-4">
          <h3 className="font-semibold mb-2">Adjust Stock</h3>
          <AdjustmentForm
            stores={stores}
            products={products}
            inventory={inventory}
            onSubmit={(updated, log) => {
              updateInventory(updated, log);
              setShowAdjustment(false);
            }}
            onCancel={() => setShowAdjustment(false)}
          />
        </div>
      )}

      {/* Audit Logs */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Audit Logs</h3>
        <ul className="bg-gray-50 p-3 rounded border max-h-40 overflow-auto text-sm">
          {auditLog.map((log, i) => <li key={i} className="mb-1">• {log}</li>)}
        </ul>
      </div>
    </div>
  );
}

function TransferForm({ stores, products, inventory, onSubmit, onCancel }) {
  const [fromStore, setFromStore] = useState("");
  const [toStore, setToStore] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleTransfer = () => {
    const updated = [...inventory];
    const fromItem = updated.find(i => i.store === fromStore && i.product === product);
    const toItem = updated.find(i => i.store === toStore && i.product === product);

    if (fromItem && fromItem.quantity >= quantity) {
      fromItem.quantity -= quantity;
      if (toItem) {
        toItem.quantity += quantity;
      } else {
        updated.push({ id: updated.length + 1, store: toStore, product, quantity });
      }
      onSubmit(updated, `Transferred ${quantity} ${product}(s) from ${fromStore} to ${toStore}`);
    } else {
      alert("Insufficient stock or invalid selection.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <select value={fromStore} onChange={e => setFromStore(e.target.value)} className="border p-1 rounded">
        <option value="">From Store</option>
        {stores.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <select value={toStore} onChange={e => setToStore(e.target.value)} className="border p-1 rounded">
        <option value="">To Store</option>
        {stores.filter(s => s !== fromStore).map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <select value={product} onChange={e => setProduct(e.target.value)} className="border p-1 rounded">
        <option value="">Product</option>
        {products.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="border p-1 rounded" />
      <div className="flex gap-2">
        <button onClick={handleTransfer} className="bg-blue-700 text-white px-4 py-1 rounded">Transfer</button>
        <button onClick={onCancel} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
      </div>
    </div>
  );
}

function AdjustmentForm({ stores, products, inventory, onSubmit, onCancel }) {
  const [store, setStore] = useState("");
  const [product, setProduct] = useState("");
  const [adjustment, setAdjustment] = useState(0);

  const handleAdjust = () => {
    const updated = [...inventory];
    const item = updated.find(i => i.store === store && i.product === product);
    if (item) {
      item.quantity += adjustment;
      onSubmit(updated, `Adjusted ${product} in ${store} by ${adjustment}`);
    } else {
      alert("Item not found.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <select value={store} onChange={e => setStore(e.target.value)} className="border p-1 rounded">
        <option value="">Select Store</option>
        {stores.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <select value={product} onChange={e => setProduct(e.target.value)} className="border p-1 rounded">
        <option value="">Select Product</option>
        {products.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <input type="number" value={adjustment} onChange={e => setAdjustment(Number(e.target.value))} className="border p-1 rounded" />
      <div className="flex gap-2">
        <button onClick={handleAdjust} className="bg-yellow-700 text-white px-4 py-1 rounded">Adjust</button>
        <button onClick={onCancel} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
      </div>
    </div>
  );
}
