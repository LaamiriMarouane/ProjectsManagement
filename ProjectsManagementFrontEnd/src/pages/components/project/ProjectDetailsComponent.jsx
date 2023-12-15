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

  const sendCloseProjectDemand = (projectID) => {  }

  return (
    <div className="flex  items-start justify-center mx-auto">
      <div className="w-full max-w-[1024px]">
        <div className="flex items-center justify-between border-b border-b-slate-400 pb-2">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-xl font-bold mb-1">{longName}</h2>
            <span
              className={`${isPublic ? "bg-purple-800" : "bg-gray-400"
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
            className={`text-xs font-bold mx-1 px-1 py-1.5 rounded shadow uppercase ${status ? " bg-green-400" : "bg-red-400"
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
        <button 
        onClick={()=> sendCloseProjectDemand(1)}
        className="shadow rounded-md py-1 5 px-2 bg-transparent border border-yellow-600 text-sm font-semibold mt-5 text-yellow-600 hover:bg-yellow-600 hover:text-white">
          Close Project
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
