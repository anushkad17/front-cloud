import { useState } from "react";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return isAuthenticated ? (
    <Dashboard user={user} onLogout={handleLogout} />
  ) : (
    <Auth onLogin={handleLogin} />
  );
};

export default Index;