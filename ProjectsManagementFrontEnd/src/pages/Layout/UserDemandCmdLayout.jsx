import React from 'react'
import UserCommandsComponent from '../components/userComponents/UserCommandsComponent'
import { Outlet } from 'react-router-dom'

const UserDemandCmdLayout = () => {
  return (
    <div>
        <UserCommandsComponent/>
        <Outlet/>
    </div>
  )
}

export default UserDemandCmdLayout