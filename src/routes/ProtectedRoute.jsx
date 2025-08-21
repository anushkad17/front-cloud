import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/auth" replace />;
}
// This component checks if a user is authenticated by looking for a token in localStorage.
// If the token exists, it renders the child components (Outlet).