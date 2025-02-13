
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface QRScannerProps {
  onClose: () => void;
}

const QRScanner = ({ onClose }: QRScannerProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="relative h-full">
        {/* Scanner frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 relative">
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-primary" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-primary" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-primary" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-primary" />
          </div>
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          className="absolute top-4 right-4 text-white"
          onClick={onClose}
        >
          <X size={24} />
        </Button>

        {/* Scanning text */}
        <div className="absolute bottom-20 left-0 right-0 text-center">
          <p className="text-white text-lg">Scanning...</p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
