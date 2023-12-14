import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Tabs = () => {
  let { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    { to: `/projects/${id}`, label: "About" },
    { to: `/projects/${id}/ressources`, label: "Ressources" },
    { to: `/projects/${id}/agenda`, label: "Agenda" },
    { to: `/projects/${id}/membres`, label: "Membres" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <ul className="flex border-b border-b-slate-400 my-3 w-full">
      {tabs.map((tab) => (
        <Tab
          key={tab.to}
          to={tab.to}
          label={tab.label}
          activeTab={activeTab}
          onClick={handleTabClick}
        />
      ))}
    </ul>
  );
};

export default Tabs;

const Tab = ({ to, label, activeTab, onClick }) => {
  let isActive = false;
  if (to === activeTab || `${to}/` === activeTab) isActive = true;

  return (
    <li className={`mr-4 ${isActive ? "border-b-2 border-blue-500" : ""}`}>
      <Link
        to={to}
        onClick={() => onClick(to)}
        className={`block py-2 px-4 text-sm font-semibold ${
          isActive ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
        }`}
      >
        {label}
      </Link>
    </li>
  );
};
