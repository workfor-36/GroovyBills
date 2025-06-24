import Sidebar, { SidebarItem} from './Sidebar';
import { useState } from 'react';
import {
  Receipt,
  Warehouse,
  LayoutDashboard
} from "lucide-react"

import ManagerDashboard from './ManagerDasboard';
import Inventory from './Inventory';
import Report from './Report';

function StoreManagerHome() {
  const [activePage, setActivePage] = useState("Dashboard");


  const renderContent = () => {
    switch (activePage) {
      case "Dashboard": return <ManagerDashboard />;
      case "Inventory": return <Inventory />;
      case "Report": return <Report />;
      default: return <ManagerDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={activePage === "Dashboard"} onClick={() => setActivePage("Dashboard")} />
        <SidebarItem icon={<Warehouse size={20} />} text="Inventory" active={activePage === "Inventory"} onClick={() => setActivePage("Inventory")} />
        <SidebarItem icon={<Receipt size={20} />} text="Report" active={activePage === "Report"} onClick={() => setActivePage("Report")} />
      </Sidebar>

      <div className="flex-grow overflow-y-auto p-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default StoreManagerHome;



