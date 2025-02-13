
import { useState } from "react";
import { AlertTriangle, Bell } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Product = {
  id: string;
  name: string;
  quantity: number;
  lowStockThreshold?: number;
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sample Product 1",
    quantity: 2,
    lowStockThreshold: 10,
  },
  {
    id: "2",
    name: "Sample Product 2",
    quantity: 15,
    lowStockThreshold: 20,
  },
];

const Alerts = () => {
  const { toast } = useToast();

  const getStockStatus = (quantity: number, threshold: number = 10) => {
    if (quantity <= 3) return "critical";
    if (quantity <= threshold) return "low";
    if (quantity <= threshold * 2) return "warning";
    return "normal";
  };

  const getStockColorClass = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-500";
      case "low":
        return "text-orange-500";
      case "warning":
        return "text-yellow-500";
      default:
        return "text-green-500";
    }
  };

  const getStockIcon = (status: string) => {
    switch (status) {
      case "critical":
        return "🔴";
      case "low":
        return "🟠";
      case "warning":
        return "🟡";
      default:
        return "🟢";
    }
  };

  const getLowStockProducts = () => {
    return mockProducts
      .filter(product => {
        const status = getStockStatus(product.quantity, product.lowStockThreshold);
        return ["critical", "low", "warning"].includes(status);
      })
      .sort((a, b) => {
        const statusA = getStockStatus(a.quantity, a.lowStockThreshold);
        const statusB = getStockStatus(b.quantity, b.lowStockThreshold);
        const priority = { critical: 0, low: 1, warning: 2 };
        return priority[statusA as keyof typeof priority] - priority[statusB as keyof typeof priority];
      });
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Alerts</h1>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Low Stock Alerts
            </h2>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Manage Alerts
            </Button>
          </div>
          
          <div className="space-y-3">
            {getLowStockProducts().map((product) => {
              const status = getStockStatus(product.quantity, product.lowStockThreshold);
              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getStockIcon(status)}</span>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className={`text-sm ${getStockColorClass(status)}`}>
                        {product.quantity} units left
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => {
                      // Navigate to inventory page with edit dialog open
                      // This will be implemented in the next step
                    }}
                  >
                    Restock Now
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Alerts;
