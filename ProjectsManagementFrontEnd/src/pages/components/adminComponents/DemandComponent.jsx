import React from "react";

function DemandComponent({ demand }) {
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
  const acceptDemand = (id) => {};
  const rejectDemand = (id) => {};

  return (
    <div className=" p-2 mb-2 border-b border-b-slate-400 bg-gray-50">
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
            className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
            onClick={() => acceptDemand(id)}
          >
            Accept
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => rejectDemand(id)}
          >
            Reject
          </button>
        </div>
        <span className="py-[3px] px-[9px] text-xs font-semibold uppercase text-center rounded-full shadow bg-slate-700 text-slate-100">
          {" "}
          {ispublic ? "public" : "private"}
        </span>
      </div>
    </div>
  );
}

export default DemandComponent;
