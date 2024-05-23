import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import AuthRoute from "../AuthRoute/AuthRoute";
import NotFound from "../NotFound/NotFound";

function AdminRoute({children}) {
  const { user } = useAuth();

  return user.isAdmin ? (
    children
  ) : (
    <NotFound
      linkRoute="/dashboard"
      linkText="Go to dashboard"
      message="Ypu don't have access to this page"
    />
  );
}

const AdminRouteExport = ({ children }) => (
  <AuthRoute>
    <AdminRoute>{children}</AdminRoute>
  </AuthRoute>
);

export default AdminRouteExport;
