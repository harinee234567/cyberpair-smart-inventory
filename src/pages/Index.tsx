
import { Package, PackageX, AlertTriangle, Search, QrCode } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

const DashboardStat = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4">
    <div className={`${color} p-3 rounded-lg`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

const Index = () => {
  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back, John</p>
          </div>
          <img
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-4">
          <DashboardStat
            icon={Package}
            label="Total Products"
            value="1,234"
            color="bg-primary"
          />
          <DashboardStat
            icon={PackageX}
            label="Out of Stock"
            value="12"
            color="bg-destructive"
          />
          <DashboardStat
            icon={AlertTriangle}
            label="Low Stock Alerts"
            value="8"
            color="bg-yellow-500"
          />
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          <QrCode size={20} />
          Scan QR Code
        </button>
      </div>
    </MobileLayout>
  );
};

export default Index;
