
import { useState } from "react";
import { Package, PackageX, AlertTriangle, Search, QrCode, Store } from "lucide-react";
import { Link } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";

const DashboardStat = ({
  icon: Icon,
  label,
  value,
  color,
  trend,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  trend?: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`bg-white/90 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 transition-all hover:shadow-md ${
      onClick ? "cursor-pointer active:scale-98" : ""
    }`}
  >
    <div className={`${color} p-3 rounded-lg`}>
      <Icon size={24} className="text-white" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-600">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-xl font-semibold">{value}</p>
        {trend && (
          <span className={`text-xs ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  </div>
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleLowStockClick = () => {
    // Navigate to low stock alerts page
  };

  const handleScanQR = () => {
    // Handle QR scanning
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <Store size={24} className="text-primary" />
              <h1 className="text-2xl font-bold">Store Name</h1>
            </div>
            <p className="text-gray-600 mt-1">Welcome back, John</p>
          </div>
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=4A90E2&color=fff"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
        </div>

        {/* Search Section */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
          />
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <DashboardStat
            icon={Package}
            label="Total Products"
            value="1,234"
            trend="+12% ↑"
            color="bg-primary"
          />
          <DashboardStat
            icon={Package}
            label="In Stock Items"
            value="1,089"
            trend="+5% ↑"
            color="bg-green-500"
          />
          <DashboardStat
            icon={AlertTriangle}
            label="Low Stock Alerts"
            value="8"
            trend="-2% ↓"
            color="bg-orange-500"
            onClick={handleLowStockClick}
          />
        </div>

        {/* QR Scan Button */}
        <Button
          onClick={handleScanQR}
          className="w-full h-12 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
        >
          <QrCode size={20} />
          Scan QR Code
        </Button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/inventory">
            <Button variant="outline" className="w-full">
              View Inventory
            </Button>
          </Link>
          <Link to="/add-product">
            <Button variant="outline" className="w-full">
              Add Product
            </Button>
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
