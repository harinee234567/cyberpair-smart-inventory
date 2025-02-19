import { useState } from "react";
import { AlertTriangle, Bell, Trash, Calendar, AlertOctagon } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { differenceInDays, parseISO } from "date-fns";

type Product = {
  id: string;
  name: string;
  quantity: number;
  lowStockThreshold?: number;
  expiryDate?: string;
};

const Alerts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Sample Product 1",
      quantity: 2,
      lowStockThreshold: 10,
      expiryDate: "2024-04-15",
    },
    {
      id: "2",
      name: "Sample Product 2",
      quantity: 15,
      lowStockThreshold: 20,
      expiryDate: "2024-04-20",
    },
    {
      id: "3",
      name: "Sample Product 3",
      quantity: 8,
      lowStockThreshold: 15,
      expiryDate: "2024-04-01", // Expired
    },
  ]);

  // Stock status functions
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

  // Expiry status functions
  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const daysUntilExpiry = differenceInDays(parseISO(expiryDate), today);
    
    if (daysUntilExpiry < 0) return "expired";
    if (daysUntilExpiry <= 7) return "expiring";
    return "safe";
  };

  const getExpiryIcon = (status: string) => {
    switch (status) {
      case "expired":
        return "🚨";
      case "expiring":
        return "⚠️";
      default:
        return "🟢";
    }
  };

  const getExpiryColorClass = (status: string) => {
    switch (status) {
      case "expired":
        return "text-red-500";
      case "expiring":
        return "text-orange-500";
      default:
        return "text-green-500";
    }
  };

  // Filter and sort functions
  const getLowStockProducts = () => {
    return products
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

  const getExpiringProducts = () => {
    return products
      .filter(product => product.expiryDate)
      .sort((a, b) => {
        if (!a.expiryDate || !b.expiryDate) return 0;
        return parseISO(a.expiryDate).getTime() - parseISO(b.expiryDate).getTime();
      })
      .filter(product => {
        if (!product.expiryDate) return false;
        const status = getExpiryStatus(product.expiryDate);
        return ["expired", "expiring"].includes(status);
      });
  };

  const handleRemoveExpired = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    toast({
      title: "Product Removed",
      description: "The expired product has been moved to the Expired Products Log.",
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

        {/* Expiry Alerts */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" />
              Expiry Alerts
            </h2>
            <Button variant="outline" size="sm">
              <AlertOctagon className="w-4 h-4 mr-2" />
              Manage Expiry
            </Button>
          </div>
          
          <div className="space-y-3">
            {getExpiringProducts().map((product) => {
              if (!product.expiryDate) return null;
              const status = getExpiryStatus(product.expiryDate);
              const daysUntilExpiry = differenceInDays(parseISO(product.expiryDate), new Date());
              
              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getExpiryIcon(status)}</span>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className={`text-sm ${getExpiryColorClass(status)}`}>
                        {status === "expired" 
                          ? "Expired" 
                          : `Expires in ${daysUntilExpiry} days`}
                      </p>
                    </div>
                  </div>
                  {status === "expired" ? (
                    <Button 
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveExpired(product.id)}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => {
                        // Navigate to inventory page with edit dialog open
                        // This will be implemented in the next step
                      }}
                    >
                      Check Stock
                    </Button>
                  )}
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
