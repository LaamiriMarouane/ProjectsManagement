import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const NavBar = () => {
  return (
    <header className="fixed top-0 w-full mx-auto bg-slate-50 shadow-md px-4 py-2">
      <div className="flex justify-between items-center">
        <a href="/" className="text-3xl font-semibold">
          MMH
        </a>
        
          <Link to={"/profile"} className={"flex justify-around items-center gap-2 font-bold text-sm text-blue-800"}>
            user-name
            <CgProfile size={23}/>
          </Link>
        
        {/* <div className="flex justify-around items-center gap-5">
          <Link to={"/register"} className={"font-bold text-sm text-blue-800"}>
            Register
          </Link>
          <Link
            to="/login"
            className='font-bold text-sm px-3 py-2 rounded bg-blue-800 text-white'
          >
            Login
          </Link>
        </div> */}
      </div>
    </header>
  );
};

export default NavBar;
