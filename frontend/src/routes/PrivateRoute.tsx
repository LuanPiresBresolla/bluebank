import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";

interface PrivateRouteProps {
  component: React.ComponentType;
}

export function PrivateRoute({ component: Component }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Component />;
}