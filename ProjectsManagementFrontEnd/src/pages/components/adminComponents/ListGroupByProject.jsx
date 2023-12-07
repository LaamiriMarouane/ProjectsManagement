import React from 'react'

const ListGroupByProjectComponent = ({ groupByProjects = [
    {
        id: null,
        projectName: "",
        username: '',
        status: true,
        projectDescription: ''
    }
] }) => {

    return (
        <div className="mt-16 container mx-auto my-8">
            <h1 className="text-3xl font-bold mb-4">Projets Acceptés</h1>
            <div className="grid grid-cols-3 gap-4">
                {groupByProjects.map(project => (
                    <div key={project.id}  className='border border-slate-500 bg-slate-200 rounded-lg shadow-lg'>
                        <table className="table-fixed w-full">
                            <tr>
                                <th className="p-3 text-sm border-b border-r border-slate-600 font-semibold tracking-wide text-left ">Nom du Projet</th>
                                <td className="p-3 text-sm border-b border-slate-600  ">{project.projectName}</td>
                            </tr>
                            <tr className=' '>
                                <th className="p-3 text-sm border-b border-r border-slate-600 font-semibold tracking-wide text-left ">Nom d'Utilisateur</th>
                                <td className="p-3 text-sm border-b border-slate-600 ">{project.username}</td>
                            </tr>
                            <tr className=' '>
                                <th className="p-3 text-sm border-b border-r border-slate-600 font-semibold tracking-wide text-left ">Status</th>
                                <td className="p-3 text-sm border-b border-slate-600 ">
                                    <span className={`py-1 px-2 shadow-black shadow text-xs font-bold uppercase tracking-wider ${project.status ? 'bg-green-200 text-green-600 ' : 'bg-red-200 text-red-600 '} rounded-full `}>{project.status ? 'enable' : 'disable'}</span>
                                </td>
                            </tr>
                            <tr className=' '>
                                <th className="p-3 text-sm border-b border-r border-slate-600 font-semibold tracking-wide text-left ">Description</th>
                                <td className="p-3 text-sm border-b border-slate-600 ">{project.projectDescription}</td>
                            </tr>
                            <tr className=' '>
                                <th className="p-3 text-sm border-t border-r border-slate-600 font-semibold tracking-wide text-left ">Actions</th>
                                <td className="p-3 text-sm border-t border-slate-600 ">
                                    <div className="flex gap-2">
                                        <button className="bg-blue-500 text-white px-3 py-2 rounded">
                                            <FiEdit />
                                        </button>
                                        <button className="bg-red-500 text-white px-3 py-2 rounded">
                                            <MdDelete />
                                        </button>
                                        <button className="bg-yellow-500 text-white px-3 py-2 rounded">
                                            <AiOutlinePoweroff />
                                        </button>
                                    </div>
                                </td>
                            </tr>   
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ListGroupByProjectComponent