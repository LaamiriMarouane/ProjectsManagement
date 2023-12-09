import React, { useState } from 'react'
import UserDemandFrom from '../forms/UserDemandFrom';
import { IoMdClose } from 'react-icons/io';

const UserDemandComponent = ({ demand }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [currentID, setCurrentID] = useState(null);

    const {
        id,
        projectName,
        user,
        description,
        type,
        theme,
        demandeCreatingtime,
        public: ispublic,
    } = demand;
    const cancelDemand = (id) => { };
    const editDemand = (id) => {
        setCurrentID(id);
    };
    return (

        <div className=" p-2 mb-2 border-b border-b-slate-400 bg-gray-50">
            {
                isUpdate &&
                <div className="h-screen w-screen absolute top-0 left-0 bg-black/50 flex items-center ">
                    <dialog className='relative rounded-full' open={isUpdate}>
                        <UserDemandFrom isUpdate={isUpdate} demandId={currentID} />
                        <div className='cursor-pointer absolute top-2 right-2 hover:bg-slate-300 p-2 rounded-full' onClick={() => setIsUpdate(false)}> <IoMdClose /> </div>
                    </dialog>
                </div>
            }
            <div className="border-b border-b-slate-300 pb-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold"> {projectName} </h2>
                    <p className="text-lg text-gray-500"> {user} </p>
                </div>
                <p className="text-base text-slate-400"> {description} </p>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-base text-black ">
                        {" "}
                        Type : <span className="font-bold mr-3"> {type} </span> | Thème :{" "}
                        <span className="font-bold"> {theme} </span>{" "}
                    </p>
                    <p className="text-sm font-mono italic text-gray-500 float-right">
                        {" "}
                        {demandeCreatingtime}{" "}
                    </p>
                </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
                <div>

                    <button
                        className="bg-blue-200 text-blue-700 font-semibold text-sm px-3 py-1 mr-2 rounded"
                        onClick={() => { setIsUpdate(true); editDemand(demand.id) }}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-200 text-red-700 font-semibold text-sm px-3 py-1 rounded"
                        onClick={() => cancelDemand(id)}
                    >
                        Cancel
                    </button>
                </div>
                <span className="py-[3px] px-[9px] text-xs font-semibold uppercase text-center rounded-full shadow bg-slate-700 text-slate-100">
                    {" "}
                    {ispublic ? "public" : "private"}
                </span>
            </div>
        </div>
    )
}

export default UserDemandComponent