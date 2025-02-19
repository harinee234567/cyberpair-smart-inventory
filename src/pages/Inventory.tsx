import { useState } from "react";
import { Search, Filter, Edit, Trash2, QrCode, Plus, Save } from "lucide-react";
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
  manufacturingDate?: string;
  expiryDate?: string;
  lowStockThreshold?: number;
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 13 Pro",
    image: "https://via.placeholder.com/50",
    category: "electronics",
    quantity: 15,
    price: 999.99,
    lowStockThreshold: 5,
  },
  {
    id: "2",
    name: "Organic Milk",
    image: "https://via.placeholder.com/50",
    category: "food",
    quantity: 25,
    price: 4.99,
    manufacturingDate: "2024-03-01",
    expiryDate: "2024-03-15",
    lowStockThreshold: 10,
  },
  {
    id: "3",
    name: "Face Cream",
    image: "https://via.placeholder.com/50",
    category: "cosmetics",
    quantity: 8,
    price: 29.99,
    manufacturingDate: "2023-12-01",
    expiryDate: "2025-12-01",
    lowStockThreshold: 5,
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    image: "https://via.placeholder.com/50",
    category: "clothing",
    quantity: 50,
    price: 19.99,
    lowStockThreshold: 15,
  },
  {
    id: "5",
    name: "Fresh Bread",
    image: "https://via.placeholder.com/50",
    category: "food",
    quantity: 3,
    price: 2.99,
    manufacturingDate: "2024-03-10",
    expiryDate: "2024-03-12",
    lowStockThreshold: 5,
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
    if (quantity <= 0) return "out";
    if (quantity < threshold) return "low";
    return "in";
  };

  const getStockColorClass = (status: string) => {
    switch (status) {
      case "out":
        return "text-red-500";
      case "low":
        return "text-orange-500";
      default:
        return "text-green-500";
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

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const productStockStatus = getStockStatus(product.quantity, product.lowStockThreshold);
    const matchesStock = stockFilter === "all" || productStockStatus === stockFilter;
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Inventory</h1>

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
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="cosmetics">Cosmetics</SelectItem>
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

        <div className="space-y-4">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.quantity, product.lowStockThreshold);
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
                    {(product.category === "food" || product.category === "cosmetics") && (
                      <p className="text-xs text-gray-400">
                        Expires: {product.expiryDate}
                      </p>
                    )}
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

        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <Input 
                    value={editingProduct.name}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <Input 
                    type="number"
                    value={editingProduct.price}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Stock</label>
                  <Input 
                    type="number"
                    value={editingProduct.quantity}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Low Stock Threshold</label>
                  <Input 
                    type="number"
                    value={editingProduct.lowStockThreshold || 10}
                    readOnly
                    className="bg-gray-50"
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={editingProduct.category}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingProduct(null)}>
                Close
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
