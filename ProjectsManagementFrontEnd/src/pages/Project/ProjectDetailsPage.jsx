// import React from 'react'

// const ProjectDetaillsPage = ({ demand }) => {
//     const {
//         id,
//         projectName,
//         user,
//         description,
//         type,
//         theme,
//         demandeCreatingtime,
//         public: ispublic,
//       } = demand;

//     return (
//         <div className=" p-2 mb-2 border-b border-b-slate-400 bg-gray-50">
//             <div className="border-b border-b-slate-300 pb-2">
//                 <div className="flex items-center justify-between">
//                     <h2 className="text-xl font-semibold"> {projectName} </h2>
//                     <p className="text-lg text-gray-500"> {user} </p>
//                 </div>
//                 <p className="text-base text-slate-400"> {description} </p>
//                 <div className="flex items-center justify-between mt-2">
//                     <p className="text-base text-black ">
//                         {" "}
//                         Type : <span className="font-bold mr-3"> {type} </span> | Thème :{" "}
//                         <span className="font-bold"> {theme} </span>{" "}
//                     </p>
//                     <p className="text-sm font-mono italic text-gray-500 float-right">
//                         {" "}
//                         {demandeCreatingtime}{" "}
//                     </p>
//                 </div>
//             </div>
//             <div className="mt-2 flex justify-between items-center">
//                 <div>
//                     <button
//                         className="bg-blue-200 text-blue-700 font-semibold text-sm px-3 py-1 mr-2 rounded"
//                         onClick={() =>
//                             setIsUpdate({ demandToUpdate: demand, isUpdate: true })
//                         }
//                     >
//                         Edit
//                     </button>
//                     <button
//                         className="bg-red-200 text-red-700 font-semibold text-sm px-3 py-1 rounded"
//                         onClick={() => cancelDemand(id)}
//                     >
//                         Cancel
//                     </button>
//                 </div>
//                 <span className="py-[3px] px-[9px] text-xs font-semibold uppercase text-center rounded-full shadow bg-slate-700 text-slate-100">
//                     {" "}
//                     {ispublic ? "public" : "private"}
//                 </span>
//             </div>
//         </div>
//     );
// }

// export default ProjectDetaillsPage

import React from 'react'
import ProjectDetailsComponent from '../components/project/ProjectDetailsComponent';

const metadata = [
    {
        id: 1,
        projectName: "Dev Web",
        projectLongName: "Dev Web for testing",
        user: "Hamza ELKADDARI",
        status: false,
        type: "IT",
        theme: "Développement",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias, Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
        public: true,
        creatingtime: "01/09/2023",
    },
];


const ProjectDetailsPage = () => {
    return (
        <div className="h-full w-full ">
            <ProjectDetailsComponent metadata={metadata} />
        </div>
    )
}

export default ProjectDetailsPage