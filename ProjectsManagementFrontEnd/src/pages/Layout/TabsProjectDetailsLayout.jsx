import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Tabs from "../../utils/Tabs";

const TabsProjectDetailsLayout = () => {
  return (
    <div className="mt-16">
      <Tabs />
      <div className="h-full w-full mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default TabsProjectDetailsLayout;
