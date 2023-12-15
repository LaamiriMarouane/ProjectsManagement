import React, { useState } from 'react'
import { FaLink } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const UserProjectsPage = () => {
    return (
        <div className="mt-20 w-full flex flex-col items-center space-y-2">
            <UserProjectsComponent />
            <UserProjectsComponent />
            <UserProjectsComponent />
            <UserProjectsComponent />
            <UserProjectsComponent />
        </div>
    )
}

export default UserProjectsPage


const UserProjectsComponent = () => {
    return (
        <div className="max-w-3xl bg-white py-2 px-3 w-full rounded-md">
            <div className='flex items-start justify-between w-full mb-5'>
                <div>
                    <div className="text-lg font-bold">Search Project Management</div>
                    <div className="text-sm font-bold text-slate-400">search-manag-web</div>
                </div>
                <Link
                    to={"/projects/1"}
                    className="text-black underline flex items-center hover:text-blue-700"
                >
                    <FaLink className="mr-2" />
                    Show More
                </Link>
            </div>
            <div className='flex items-center justify-between w-full '>
                <div className="text-base font-semibold">IT - Developpement</div>
                <div className="text-sm italic font-semibold text-green-400">enabled</div>
            </div>

        </div>
    );
}