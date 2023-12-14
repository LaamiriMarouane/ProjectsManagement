import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className={`mt-14 h-screen fixed top-0 left-0 bottom-0 bg-transparent border-r border-r-slate-400 w-[15%] `}
    >
      <ul className="list-reset py-4 px-2 w-full">
        <li className="flex items-center">
          <Link
            to="/projects"
            className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
          >
            All Projects
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            to="/user/demands"
            className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
          >
            Demands
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
            Agenda
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            to="/user/invit"
            className="text-sm w-full font-semibold px-4 py-4 border-b border-b-slate-400 hover:bg-slate-100"
          >
            Invitations
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
