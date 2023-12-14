// import React from 'react';
// import { FaUser, FaCalendarAlt } from 'react-icons/fa';
//
// const ProjectDetailsComponent = () => {
//   return (
//     <div className="w-full mx-auto bg-white text-black p-8 border rounded-md shadow-lg">
//       <div className="flex items-center justify-between border-b border-b-slate-200 pb-2">
//         <div className='flex items-center justify-center gap-3'>
//           <h2 className="text-xl font-bold mb-1">{metadata[0].projectLongName}</h2>
//           <span className="bg-purple-800 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full ">public</span>
//         </div>
//         <h2 className="text-lg font-semibold font-mono mb-1">{metadata[0].projectName}</h2>
//       </div>
//       <p className="text-gray-600 my-3">{metadata[0].description}</p>

//       <div className="flex items-center mb-4 text-xs font-semibold">
//         <FaUser className="mr-2" />
//         <span>{metadata[0].user}</span>
//       </div>
//       <div className="flex items-center mb-4 text-xs font-semibold">
//         <FaCalendarAlt className="mr-2" />
//         <span >{metadata[0].creatingtime}</span>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetailsComponent;

import React from "react";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

const ProjectDetails = ({ prorjectDetails }) => {
  const {
    longName,
    shortName,
    user,
    type,
    theme,
    active: status,
    creatingtime,
    description,
    public: isPublic,
  } = prorjectDetails;

  return (
    <div className="flex  items-start justify-center mx-auto">
      <div className="w-full max-w-[1024px]">
        <div className="flex items-center justify-between border-b border-b-slate-400 pb-2">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-xl font-bold mb-1">{longName}</h2>
            <span
              className={`bg-${
                isPublic ? "purple-800" : "gray-400"
              } text-white text-sm font-semibold px-2.5 py-0.5 rounded-full`}
            >
              {isPublic ? "public" : "private"}
            </span>
          </div>
          <h2 className="text-lg font-semibold font-mono mb-1">{shortName}</h2>
        </div>
        <p className="text-gray-600 my-3">{description}</p>

        <div className=" text-base font-semibold">
          <span className="uppercase">- Type :</span>
          <span className="text-sm text-gray-800 mx-1">{type}</span>
        </div>
        <div className="mt-3 text-base font-semibold">
          <span className="uppercase">- Theme :</span>
          <span className="text-sm text-gray-800 mx-1">{theme}</span>
        </div>
        <div className="mt-3 text-base font-semibold">
          <span className="uppercase">- Status :</span>
          <span
            className={`text-xs font-bold mx-1 px-1 py-1.5 rounded shadow uppercase ${
              status ? " bg-green-400" : "bg-red-400"
            } `}
          >
            {status ? "enabled" : "disabled"}
          </span>
        </div>

        <div className="mt-7 py-4 border-t border-t-slate-400">
          <div className="flex items-center mb-4 text-sm font-semibold">
            <FaUser className="mr-2" />
            <span className="uppercase underline">Responsible :</span>
            <span className="text-sm text-gray-800 mx-1">{user}</span>
          </div>
          <div className="flex items-center mb-4 text-sm font-semibold">
            <FaCalendarAlt className="mr-2" />
            <span className="uppercase underline">Creation Date :</span>
            <span className="text-sm text-gray-800 mx-1">{creatingtime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
