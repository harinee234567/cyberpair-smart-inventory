
import { useState } from "react";
import { Search, Filter, Edit, Trash2, QrCode } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  quantity: number;
  price: number;
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sample Product 1",
    image: "https://via.placeholder.com/50",
    category: "electronics",
    quantity: 50,
    price: 299.99,
  },
  {
    id: "2",
    name: "Sample Product 2",
    image: "https://via.placeholder.com/50",
    category: "clothing",
    quantity: 5,
    price: 49.99,
  },
];

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [stockFilter, setStockFilter] = useState<string>("");

  const getStockStatus = (quantity: number) => {
    if (quantity <= 0) return "out";
    if (quantity < 10) return "low";
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

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Inventory</h1>

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
            <Select onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="grocery">Grocery</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setStockFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Stock</SelectItem>
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
                  <Button variant="ghost" size="sm">
                    <QrCode className="w-4 h-4 mr-2" />
                    Scan QR
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Inventory;
