import React from "react";
import Sidebar from "../components/bars/SideBar";
import NavBar from "../components/Bars/NavBar";
import { Outlet } from "react-router-dom";

const NavSideBarLayout = () => {
  return (
    <div>
      <NavBar />
      <div>
        <div className="flex w-full">
          <Sidebar />
          <div className="px-4 w-full pl-60">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavSideBarLayout;
