import React from 'react'
import Sidebar from '../components/bars/SideBar'
import NavBar from '../components/Bars/NavBar'
import { Outlet } from 'react-router-dom'

const NavSideBarLayout = () => {
    return (
        <div>
            <NavBar />
            <div>
                <div className="flex">
                    <Sidebar />
                    <div className="w-full h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavSideBarLayout