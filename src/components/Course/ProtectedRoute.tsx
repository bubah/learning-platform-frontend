import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthenticationProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
}



export function ProtectedRoute({children }: ProtectedRouteProps) {
  const {user} = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
