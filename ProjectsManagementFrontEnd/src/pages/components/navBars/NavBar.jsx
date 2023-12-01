import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="fixed top-0 w-full mx-auto shadow-md px-4 py-2">
      <div className="flex justify-between items-center">
        <a href="/" className="text-3xl font-semibold">
          MMH
        </a>
        <div className="flex justify-around items-center gap-5">
          <Link to={"/register"} className={"font-bold text-sm"}>
            Register
          </Link>

          <Link
            to="/login"
            className='font-bold text-sm px-3 py-2 rounded bg-black text-white'
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
