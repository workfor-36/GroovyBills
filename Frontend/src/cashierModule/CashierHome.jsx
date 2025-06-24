import Sidebar, { SidebarItem } from './Sidebar';
import { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Users,
  PackageSearch,
} from "lucide-react";

import Dashboard from './Dashboard';
import POS from './POS';
import Billing from './Billing';
import Customers from './Customers';
import Products from './Products';

function CashierHome() {
  const [activePage, setActivePage] = useState("Dashboard");

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
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activePage === "Dashboard"}
          onClick={() => setActivePage("Dashboard")}
        />
        <SidebarItem
          icon={<ShoppingCart size={20} />}
          text="POS"
          active={activePage === "POS"}
          onClick={() => setActivePage("POS")}
        />
        <SidebarItem
          icon={<FileText size={20} />}
          text="Billing"
          active={activePage === "Billing"}
          onClick={() => setActivePage("Billing")}
        />
        <SidebarItem
          icon={<Users size={20} />}
          text="Customers"
          active={activePage === "Customers"}
          onClick={() => setActivePage("Customers")}
        />
        <SidebarItem
          icon={<PackageSearch size={20} />}
          text="Product Lookup"
          active={activePage === "Products"}
          onClick={() => setActivePage("Products")}
        />
      </Sidebar>

      <div className="flex-grow overflow-y-auto p-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default CashierHome;
