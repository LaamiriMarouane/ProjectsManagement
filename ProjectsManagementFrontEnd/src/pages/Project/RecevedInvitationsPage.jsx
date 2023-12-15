import React from 'react'

const RecevedInvitationsPage = () => {
    return (
        <div className="w-full space-y-1">
            {
                [1, 2, 3, 4].map(e => {
                    return <RecevedInvitationsComponent />
                })
            }
        </div>
    )
}

const RecevedInvitationsComponent = () => {

    const handleAcceptInvitation = (target) => { }
    const handleDeclineInvitation = (target) => { }
    return (
        <div className="mt-11 w-full border-b  border-b-slate-400  py-7 flex flex-col items-center">

            <div className="flex items-center justify-between w-full mb-5">
                <div className="text-base">You have been invited to join a project : </div>
                <div className="italic text-xs font-semibold"> {"-- " + new Date().toString() + " --"} </div>
            </div>
            <div className="w-full max-w-2xl rounded-xl shadow bg-white py-2 px-3">
                <div className='space-y-2'>

                    <div className="ml-2">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <tbody>
                                <tr className='bg-slate-100 border-b border-b-slate-700'>
                                    <td className='px-2 py-1 text-center text-sm font-semibold'>From</td>
                                    <td className='px-2 py-1 text-center border-l border-l-slate-400 italic text-sm'>Project Responsable</td>
                                </tr>
                                <tr className='bg-slate-100 border-b border-b-slate-700'>
                                    <td className='px-2 py-1 text-center text-sm font-semibold'>Project Name</td>
                                    <td className='px-2 py-1 text-center border-l border-l-slate-400 italic text-sm'>Search Project Management</td>
                                </tr>
                                <tr className='bg-slate-100 border-b border-b-slate-700'>
                                    <td className='px-2 py-1 text-center text-sm font-semibold'>Sub Project Name</td>
                                    <td className='px-2 py-1 text-center border-l border-l-slate-400 italic text-sm'>project-manag-web</td>
                                </tr>
                                <tr className='bg-slate-100 border-b border-b-slate-700'>
                                    <td className='px-2 py-1 text-center text-sm font-semibold'>Type</td>
                                    <td className='px-2 py-1 text-center border-l border-l-slate-400 italic text-sm'>IT</td>
                                </tr>
                                <tr className='bg-slate-100'>
                                    <td className='px-2 py-1 text-center text-sm font-semibold'>Theme</td>
                                    <td className='px-2 py-1 text-center border-l border-l-slate-400 italic text-sm'>Developement</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex items-center justify-around mt-2">
                    <button
                        onClick={() => handleAcceptInvitation(1)}
                        className="p-1 bg-transparent border border-blue-700 text-blue-700 rounded text-sm font-semibold hover:bg-blue-800 hover:text-white">
                        Accept
                    </button>
                    <button
                        onClick={() => handleDeclineInvitation(1)}
                        className="p-1 bg-red-600 border border-red-600 text-white rounded text-sm font-semibold hover:bg-red-400 hover:text-white">
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecevedInvitationsPage