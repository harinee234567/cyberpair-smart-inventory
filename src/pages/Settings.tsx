import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Download,
  LogOut,
  FileSpreadsheet,
  FileText,
  KeyRound,
  Store,
  QrCode,
} from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    storeName: "My Store",
    ownerName: "John Doe",
    email: "john@example.com",
  });

  const handleLogout = () => {
    navigate("/login");
  };

  const handleDownloadCSV = () => {
    toast({
      title: "Download Started",
      description: "Your inventory report is being downloaded as CSV.",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Download Started",
      description: "Your inventory report is being downloaded as PDF.",
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved successfully.",
    });
    setIsEditProfileOpen(false);
  };

  const handleShowStoreQR = () => {
    toast({
      title: "Store QR Code",
      description: "This feature will be implemented soon.",
    });
  };

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="w-6 h-6" />
          Settings
        </h1>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              Profile
            </h2>
            <Button variant="outline" size="sm" onClick={() => setIsEditProfileOpen(true)}>
              Edit Profile
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Store Name:</span>
              <span className="font-medium">{profileForm.storeName}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Owner Name:</span>
              <span className="font-medium">{profileForm.ownerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Email:</span>
              <span className="font-medium">{profileForm.email}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-500" />
            Notification Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-gray-500">Get notified when products are running low</p>
              </div>
              <Switch
                checked={lowStockAlerts}
                onCheckedChange={setLowStockAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Expiry Alerts</Label>
                <p className="text-sm text-gray-500">Get notified about expiring products</p>
              </div>
              <Switch
                checked={expiryAlerts}
                onCheckedChange={setExpiryAlerts}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <QrCode className="w-5 h-5 text-gray-500" />
              Store QR Code
            </h2>
            <Button variant="outline" size="sm" onClick={handleShowStoreQR}>
              Show QR
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Display your store's unique QR code for quick access
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Download className="w-5 h-5 text-gray-500" />
            Export Inventory
          </h2>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadCSV} className="flex-1">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export as CSV
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF} className="flex-1">
              <FileText className="w-4 h-4 mr-2" />
              Export as PDF
            </Button>
          </div>
        </div>

        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input
                  value={profileForm.storeName}
                  onChange={(e) => setProfileForm({ ...profileForm, storeName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Owner Name</Label>
                <Input
                  value={profileForm.ownerName}
                  onChange={(e) => setProfileForm({ ...profileForm, ownerName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
};

export default Settings;
