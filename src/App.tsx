
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import AuthGuard from "./components/AuthGuard";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Index />
            </AuthGuard>
          }
        />
        <Route
          path="/alerts"
          element={
            <AuthGuard>
              <Alerts />
            </AuthGuard>
          }
        />
        <Route
          path="/settings"
          element={
            <AuthGuard>
              <Settings />
            </AuthGuard>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
