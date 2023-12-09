import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io';
import UserDemandFrom from '../forms/UserDemandFrom';

const UserCommandsComponent = () => {
    const [isDemand, setIsDemand] = useState(true);
    const [isCreateProject, setIsCreateProject] = useState(false);

    return (
        <div className="container mx-auto mt-16">
            {
                isCreateProject &&
                <div className="h-screen w-screen absolute top-0 left-0 bg-black/50 flex items-center ">
                    <dialog className='relative rounded-full' open={isCreateProject}>
                        <UserDemandFrom isUpdate={false} />
                        <div className='cursor-pointer absolute top-2 right-2 hover:bg-slate-300 p-2 rounded-full' onClick={() => { setIsCreateProject(false); setIsDemand(true) }}> <IoMdClose /> </div>
                    </dialog>
                </div>
            }
            <div className="flex justify-between items-center">
                <div></div>
                {
                    isDemand && <button className="bg-blue-800 text-base font-semibold text-white px-4 py-2 rounded flex items-center gap-2">
                        <MdAdd />
                        <button
                            onClick={() => { setIsDemand(false); setIsCreateProject(true) }}
                        >Create Project</button>
                    </button>
                }
            </div>
        </div>
    )
}

export default UserCommandsComponent