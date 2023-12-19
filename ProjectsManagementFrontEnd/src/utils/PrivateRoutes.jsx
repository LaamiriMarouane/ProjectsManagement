import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

function PrivateRoutes({ navto, isLogedIn, roles }) {
  const { auth } = useSelector((store) => store.auth);
  const authRole = auth?.user?.role?.name;
  const hasRole = !!roles ? roles.includes(authRole) : false;

  if (!isLogedIn) {
    if (!auth.user) {
      return <Outlet />;
    } else {
      if (auth?.user?.role?.name === "APP_ADMIN") {
        return <Navigate to={"/admin/dashbord"} />;
      }
      return <Navigate to={"/"} />;
    }
  } else {
    if (auth.user) {
      if (hasRole) {
        return <Outlet />;
      } else {
        return <Navigate to={"/"} />;
      }
    } else {
      return <Navigate to={"/login"} />;
    }
  }
}

export default PrivateRoutes;
