
import { useState } from "react";
import { Search, Filter, Edit, Trash2, QrCode, Plus, Save, AlertTriangle, Bell } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
  lowStockThreshold?: number;
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sample Product 1",
    image: "https://via.placeholder.com/50",
    category: "electronics",
    quantity: 2,
    price: 299.99,
    lowStockThreshold: 10,
  },
  {
    id: "2",
    name: "Sample Product 2",
    image: "https://via.placeholder.com/50",
    category: "clothing",
    quantity: 15,
    price: 49.99,
    lowStockThreshold: 20,
  },
];

const Inventory = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [restockQuantity, setRestockQuantity] = useState<number>(0);

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

  const handleSaveChanges = () => {
    if (editingProduct) {
      toast({
        title: "Changes saved",
        description: "Product information has been updated successfully.",
      });
      setEditingProduct(null);
    }
  };

  const handleDelete = (productId: string) => {
    toast({
      title: "Product deleted",
      description: "The product has been removed from inventory.",
      variant: "destructive",
    });
  };

  const handleRestock = () => {
    if (editingProduct && restockQuantity > 0) {
      const newQuantity = editingProduct.quantity + restockQuantity;
      setEditingProduct({
        ...editingProduct,
        quantity: newQuantity,
      });
      setRestockQuantity(0);
      toast({
        title: "Stock updated",
        description: `Added ${restockQuantity} units to inventory.`,
      });
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
        <h1 className="text-2xl font-bold">Inventory</h1>

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
                    onClick={() => setEditingProduct(product)}
                  >
                    Restock Now
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="grocery">Grocery</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
              </SelectContent>
            </Select>

            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="in">In Stock</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {mockProducts.map((product) => {
            const stockStatus = getStockStatus(product.quantity);
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">${product.price}</span>
                    <span className={`text-sm ${getStockColorClass(stockStatus)}`}>
                      {product.quantity} in stock
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <QrCode className="w-4 h-4 mr-2" />
                      Scan QR
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <Input 
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      name: e.target.value
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <Input 
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      price: parseFloat(e.target.value)
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Stock</label>
                  <Input 
                    type="number"
                    value={editingProduct.quantity}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      quantity: parseInt(e.target.value)
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Low Stock Threshold</label>
                  <Input 
                    type="number"
                    value={editingProduct.lowStockThreshold || 10}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      lowStockThreshold: parseInt(e.target.value)
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Add Stock</label>
                  <div className="flex gap-2">
                    <Input 
                      type="number"
                      value={restockQuantity}
                      onChange={(e) => setRestockQuantity(parseInt(e.target.value) || 0)}
                      placeholder="Enter quantity to add"
                    />
                    <Button onClick={handleRestock}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>

                <Select 
                  value={editingProduct.category}
                  onValueChange={(value) => setEditingProduct({
                    ...editingProduct,
                    category: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grocery">Grocery</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
};

export default Inventory;
