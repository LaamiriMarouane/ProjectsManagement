import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

function PrivateRoutes({ navto, isLogedIn }) {
  const { auth } = useSelector((store) => store.auth);

  const isAuth = isLogedIn ? auth.accessToken : !auth.accessToken;

  return isAuth || true ? <Outlet /> : <Navigate to={navto} />;
}

export default PrivateRoutes;
