import React from "react";
import NavBar from "../components/Bars/NavBar";
import { Outlet } from "react-router";

function NavBarLayout() {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default NavBarLayout;
