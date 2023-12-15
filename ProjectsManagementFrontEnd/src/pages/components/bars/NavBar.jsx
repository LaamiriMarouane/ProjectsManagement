import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  return (
    <header className="fixed top-0 w-full mx-auto bg-slate-50 shadow-md px-4 py-2">
      <div className="flex justify-between items-center">
        <a href="/" className="text-3xl font-semibold">
          MMH
        </a>
          <DropdownMenu/>
          {/* <Link to={"/profile"} className={"flex justify-around items-center gap-2 font-bold text-sm text-blue-800"}>
            user-name
            <CgProfile size={23}/>
          </Link> */}
        
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

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    setIsOpen(false);
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    setIsOpen(false);
  };

  const handleProfile = () => {
    console.log('Profile clicked');
    setIsOpen(false);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click',  handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
          onClick={toggleDropdown}
        >
          <FaUser className="mr-1" />
          Username
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={handleProfile}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              Profile
            </button>
            <button
              onClick={handleSettings}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

