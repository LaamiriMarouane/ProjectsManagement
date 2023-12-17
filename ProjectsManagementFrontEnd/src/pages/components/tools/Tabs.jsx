import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

const Tabs = () => {
  let { id } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const { project, projectsloading } = useSelector((state) => state.project);
  const { auth } = useSelector((store) => store.auth);
  const role = auth?.user?.role?.name;

  const allRoles = [
    "APP_USER",
    "APP_ADMIN",
    "PROJECT_ADMIN",
    "PROJECT_OWNER",
    "PROJECT_MEMBER",
    "GUEST",
  ];
  const userProjectRoles = ["PROJECT_ADMIN", "PROJECT_OWNER", "PROJECT_MEMBER"];
  const tabs = [
    { to: `/projects/${id}`, label: "About", roles: [...allRoles] },
    {
      to: `/projects/${id}/ressources`,
      label: "Ressources",
      roles: [...allRoles],
    },
    {
      to: `/projects/${id}/agenda`,
      label: "Agenda",
      roles: [...userProjectRoles],
    },
    {
      to: `/projects/${id}/membres`,
      label: "Membres",
      roles: [...userProjectRoles],
    },
    {
      to: `/projects/${id}/invitations`,
      label: "invitations",
      roles: ["PROJECT_ADMIN", "PROJECT_OWNER"],
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    setActiveTab(tabs.find((tab) => tab.to === location.pathname).to);
  }, [location]);
  return (
    <div className="flex justify-between border-b border-b-slate-400 my-3 w-full">
      <ul className="flex">
        {tabs.map((tab) => {
          if (tab?.roles.includes(role)) {
            return (
              <Tab
                key={tab.to}
                to={tab.to}
                label={tab.label}
                activeTab={activeTab}
                onClick={handleTabClick}
              />
            );
          }
          return;
        })}
      </ul>
      <h2 className=" text-lg font-semibold ">
        Project Name( {!projectsloading && project.shortName} ){" "}
      </h2>
    </div>
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
