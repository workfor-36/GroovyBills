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
import Pos from './Pos';
import Bills from './Bills';
import Customers from './Customers';
import Products from './Products';

function CashierHome() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "Pos": return <Pos />;
      case "Bills": return <Bills />;
      case "Customers": return <Customers />;
      default: return <Pos />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar>
        
        <SidebarItem
          icon={<ShoppingCart size={20} />}
          text="POS"
          active={activePage === "POS"}
          onClick={() => setActivePage("Pos")}
        />
        <SidebarItem
          icon={<FileText size={20} />}
          text="View all Bills"
          active={activePage === "Bills"}
          onClick={() => setActivePage("Bills")}
        />
        <SidebarItem
          icon={<Users size={20} />}
          text="Customers"
          active={activePage === "Customers"}
          onClick={() => setActivePage("Customers")}
        />
        
      </Sidebar>

      <div className="flex-grow overflow-y-auto p-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default CashierHome;
