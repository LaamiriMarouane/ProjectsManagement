import React from 'react'
import Sidebar from '../components/bars/SideBar'
import { Outlet } from 'react-router-dom'
import UserCommandsComponent from '../components/userComponents/UserCommandsComponent'

const SideBarLayout = () => {
  return (
    <div className="flex">
      < Sidebar />
      <div className='px-4 w-full'>
        <UserCommandsComponent />
        <Outlet />
      </div>
    </div >
  )
}

export default SideBarLayout