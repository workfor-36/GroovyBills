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
  ChevronDown, ChevronUp
} from "lucide-react"

import AdminDashboard from './AdminDashBoard';
import Stores from './Stores';
import Accounting from './Acounting';
import Inventory from './Inventory';
import CreateZone from './CreateZone';
import Report from './Report';
import StockManagement from './StockManagement';

function AdminHome() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [showAccountingDropdown, setShowAccountingDropdown] = useState(false);


  const renderContent = () => {
    switch (activePage) {
      case "Dashboard": return <AdminDashboard />;
      case "Stores": return <Stores />;
      case "Accounting": return <Accounting />;
      case "Inventory": return <Inventory />;
      case "CreateZone": return <CreateZone />;
      case "StockManagement": return <StockManagement />;
      case "Report": return <Report />;
      case "Payment": return <div>Payment</div>;
      case "GSTInfo": return <div>GST Information</div>;
      case "UtilityBills": return <div>Utility Bills</div>;
      case "ExpenceWithdraw": return <div>Expences and Withdraw</div>;


      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active={activePage === "Dashboard"} onClick={() => setActivePage("Dashboard")} />
        <SidebarItem icon={<Store size={20} />} text="Stores" active={activePage === "Stores"} onClick={() => setActivePage("Stores")} />
        <SidebarItem icon={<Warehouse size={20} />} text="Inventory" active={activePage === "Inventory"} onClick={() => setActivePage("Inventory")} />
        <SidebarItem
  icon={<UserCog size={20} />}
  text={
    <div className="flex justify-between items-center w-full">
      <span>Accounting</span>
      {showAccountingDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </div>
  }
  active={activePage === "Accounting"}
  onClick={() => setShowAccountingDropdown((prev) => !prev)}
/>
        {showAccountingDropdown && (
  <>
    <SidebarItem
      text="Payment"
      active={activePage === "Payment"}
      onClick={() => setActivePage("Payment")}
    />
    <SidebarItem
      text="GST Information"
      active={activePage === "GSTInfo"}
      onClick={() => setActivePage("GSTInfo")}
    />
    <SidebarItem
      text="Bak Details"
      active={activePage === "BankDetails"}
      onClick={() => setActivePage("BankDetails")}
    />
    <SidebarItem
      text="Utility Bills"
      active={activePage === "UtilitiyBills"}
      onClick={() => setActivePage("UtilitiyBills")}
    />
    <SidebarItem
      text="Expensence and withdraw"
      active={activePage === "Expencewithdraw"}
      onClick={() => setActivePage("ExpenceWithdraw")}
    />
  </>
)}
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



