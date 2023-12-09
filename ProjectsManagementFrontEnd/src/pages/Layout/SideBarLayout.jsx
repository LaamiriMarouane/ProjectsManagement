import React from "react";
import Sidebar from "../components/bars/SideBar";
import { Outlet } from "react-router-dom";

const SideBarLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="px-4 w-full pl-60">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBarLayout;
