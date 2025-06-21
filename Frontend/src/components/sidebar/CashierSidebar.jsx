import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Users,
  PackageSearch,
  LogOut,
} from "lucide-react";

const cashier = {
  name: "Cashier",
  email: "cashier@example.com",
  profileUrl: "/images/casherprofile.webp",
};

const CashierSidebar = ({ activePage, onSelectPage }) => {
  const sidebarItems = [
    { id: "Dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "POS", label: "POS", icon: <ShoppingCart size={18} /> },
    { id: "Billing", label: "Billing", icon: <FileText size={18} /> },
    { id: "Customers", label: "Customers", icon: <Users size={18} /> },
    { id: "Products", label: "Product Lookup", icon: <PackageSearch size={18} /> },
  ];

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="bg-gray-100 w-64 h-screen shadow-md flex flex-col justify-between">
      {/* Top Menu */}
      <div className="px-4 py-6">
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

      {/* Bottom: Profile + Logout */}
      <div className="px-4 py-4 border-t">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={cashier.profileUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div>
            <p className="text-sm font-semibold">{cashier.name}</p>
            <p className="text-xs text-gray-500">{cashier.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center text-sm space-x-2 text-red-600 hover:underline"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default CashierSidebar;
