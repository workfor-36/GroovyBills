import { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Users,
  PackageSearch,
} from "lucide-react";

import Dashboard from './Dashboard'; // ✅ New Dashboard component
import POS from './POS';
import Billing from './Billing';
import Customers from './Customers';
import Products from './Products';

// ✅ Sidebar Component for Cashier
const CashierSidebar = ({ activePage, onSelectPage }) => {
  const sidebarItems = [
    { id: "Dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "POS", label: "POS", icon: <ShoppingCart size={18} /> },
    { id: "Billing", label: "Billing", icon: <FileText size={18} /> },
    { id: "Customers", label: "Customers", icon: <Users size={18} /> },
    { id: "Products", label: "Product Lookup", icon: <PackageSearch size={18} /> },
  ];

  return (
    <div className="bg-gray-100 w-64 h-screen shadow-md px-4 py-6">
      <h2 className="text-lg font-bold mb-6">Cashier Panel</h2>
      <ul className="space-y-2">
        {sidebarItems.map((item) => (
          <li
            key={item.id}
            onClick={() => onSelectPage(item.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded cursor-pointer ${
              activePage === item.id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

function CashierHome() {
  const [activePage, setActivePage] = useState("Dashboard"); // ⬅️ default page changed to Dashboard

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard": return <Dashboard />;
      case "POS": return <POS />;
      case "Billing": return <Billing />;
      case "Customers": return <Customers />;
      case "Products": return <Products />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <CashierSidebar activePage={activePage} onSelectPage={setActivePage} />

      <div className="flex-grow overflow-y-auto p-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default CashierHome;
