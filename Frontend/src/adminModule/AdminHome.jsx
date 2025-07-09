import Sidebar, { SidebarItem} from './Sidebar'
import { useState } from 'react';
import {
  Store,
  Receipt,
  Warehouse,
  UserCog, 
  MapPinPlus,
  LayoutDashboard,
  Settings,
} from "lucide-react"

import AdminDashboard from './AdminDashBoard';
import Stores from './Stores';
import GST from './GST';
import Inventory from './Inventory';
import CreateZone from './CreateZone';
import Report from './Report';
import StockManagement from './StockManagement';

function AdminHome() {
  const [activePage, setActivePage] = useState("Dashboard");
  // const [showAccountingDropdown, setShowAccountingDropdown] = useState(false);


  const renderContent = () => {
    switch (activePage) {
      case "Dashboard": return <AdminDashboard />;
      case "Stores": return <Stores />;
      case "GST": return <GST />;
      case "Inventory": return <Inventory />;
      case "CreateZone": return <CreateZone />;
      case "StockManagement": return <StockManagement />;
      case "Report": return <Report />;

      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={activePage === "Dashboard"} onClick={() => setActivePage("Dashboard")} />
        <SidebarItem icon={<Store size={20} />} text="Stores" active={activePage === "Stores"} onClick={() => setActivePage("Stores")} />
        <SidebarItem icon={<Warehouse size={20} />} text="Inventory" active={activePage === "Inventory"} onClick={() => setActivePage("Inventory")} />
        <SidebarItem icon={<UserCog size={20} />} text="GST"   active={activePage === "GST"} onClick={() => setActivePage(GST)} />
        <SidebarItem icon={<MapPinPlus size={20} />} text="Create Zone" active={activePage === "CreateZone"} onClick={() => setActivePage("CreateZone")} />
        <SidebarItem icon={<Receipt size={20} />} text="Report" active={activePage === "Report"} onClick={() => setActivePage("Report")} />
        <SidebarItem icon={<Settings size={20} />} text="Stock Management" active={activePage === "StockManagement"} onClick={() => setActivePage("StockManagement")} />
      </Sidebar>

      <div className="flex-grow overflow-y-auto p-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminHome;



