import { Role } from "@/constants/role";
import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthProtectedRoute: React.FunctionComponent = () => {
  const profile = useAuthStore((state) => state.profile);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  return loggedIn && profile?.role === Role.CUSTOMER ? (
    <Navigate to="/" replace />
  ) : loggedIn && profile?.role === Role.ADMIN ? (
    <Navigate to="/admin/settings" replace />
  ) : loggedIn && profile?.role === Role.DELIVERER ? (
    <Navigate to="/delivery/order-management" replace />
  ) : (
    <Outlet />
  );
};

export default AuthProtectedRoute;
