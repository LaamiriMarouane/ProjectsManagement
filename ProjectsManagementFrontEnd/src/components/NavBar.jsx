import React from 'react'

const NavBar = () => {
  return (
    <header className='fixed top-0 w-full mx-auto shadow-md px-4 py-2'>
        <div className='flex justify-between items-center'>
            <a href='/' className="text-3xl font-semibold">MMH</a>
            <div className="flex justify-around items-center gap-5">
                <a href="/register" className='font-bold text-lg' >Register</a>
                <a href="/login" className='font-bold text-lg px-3 py-2 rounded-lg bg-black text-white' >Login</a>
            </div>
        </div>
    </header>
  )
} 

export default NavBar