import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  const { auth } = useSelector((store) => store.auth);
  const role = auth.user.role.name;
  return (
    <div
      className={`mt-14 h-screen fixed top-0 left-0 bottom-0 bg-transparent border-r border-r-slate-400 w-[15%] `}
    >
      <ul className="list-reset py-4 px-2 w-full">
        {role == "APP_ADMIN" && (
          <>
            {" "}
            <li className="flex items-center">
              <Link
                to="/admin/dashBord"
                className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
              >
                DashBord
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/admin/users"
                className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
              >
                App Users
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/admin/demands/new"
                className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
              >
                Users Demands
              </Link>
            </li>
          </>
        )}
        <li className="flex items-center">
          <Link
            to="/projects"
            className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
          >
            All Projects
          </Link>
        </li>
        {role !== "GUEST" &&(
            <>
              <li className="flex items-center">
                <Link
                  to="/user/demands"
                  className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
                >
                  My Demands
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/user/projects"
                  className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
                >
                  My Projects
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/user/agenda"
                  className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
                >
                  My Agenda
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to="/user/invitations"
                  className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
                >
                  My Invitations
                </Link>
              </li>
            </>
          )}
      </ul>
    </div>
  );
}

export default Sidebar;
