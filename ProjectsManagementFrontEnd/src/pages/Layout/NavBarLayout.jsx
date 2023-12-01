import React from "react";
import NavBar from "../components/navBars/NavBar";
import { Outlet } from "react-router";

function NavBarLayout() {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
        {/* {pathname == "/" ? <DashBord /> : <Outlet />} */}
        <Outlet />
      </div>
    </div>
  );
}

export default NavBarLayout;
