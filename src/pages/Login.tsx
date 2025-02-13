
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle login logic here
    setTimeout(() => setIsLoading(false), 1000); // Simulated loading
  };

  const handleGoogleLogin = () => {
    // Handle Google login
  };

  const handleQRLogin = () => {
    // Handle QR login
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background p-6">
      <div className="max-w-md mx-auto pt-16 animate-fade-in">
        {/* Circular Design */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          {/* Outer circle */}
          <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-full animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
          </div>
          {/* Middle circle */}
          <div className="absolute inset-8 border-2 border-dashed border-gray-200 rounded-full animate-spin-slow-reverse">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
          </div>
          {/* Inner circle */}
          <div className="absolute inset-16 border-2 border-gray-200 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Oh hello!</h1>
        <p className="text-gray-600 text-center mb-8">
          You should definitely get a great reason to sign up right here :)
        </p>

        {/* Dots indicator */}
        <div className="flex justify-center gap-1 mb-8">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === dot ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(dot)}
            />
          ))}
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => window.location.href = '/signup'}
            className="w-full h-12 text-base font-medium bg-black hover:bg-gray-800"
          >
            REGISTER
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.href = '/login'}
            className="w-full h-12 text-base font-medium border-2"
          >
            LOG IN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
