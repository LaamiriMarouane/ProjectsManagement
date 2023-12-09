import React from "react";
import NavBar from "../components/Bars/NavBar";
import { Outlet } from "react-router";

function NavBarLayout() {
  return (
    <div className="app h-screen w-screen">
      <NavBar />
      <div className="content  h-screen w-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default NavBarLayout;
