import { LoginCredentials } from "../../types/types";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: LoginCredentials | null;
  children: React.ReactNode;
}

export function ProtectedRoute({ user, children }: ProtectedRouteProps) {
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
