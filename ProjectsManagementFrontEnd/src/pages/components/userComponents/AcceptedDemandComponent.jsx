import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const AcceptedDemandComponent = ({ demand }) => {
  return (
    <div class="my-1 px-2 py-6 w-full mx-auto bg-slate-50 rounded-xl shadow flex items-center space-x-2">
      <div class="shrink-0 ">
        <IoMdCheckmarkCircleOutline style={{ color: "green" }} size={40} />
      </div>
      <div>
        <div className="flex items-center gap-10">
          <div class="text-lg font-medium text-black">
            {demand?.projectName}
          </div>
          <p className="text-sm font-mono italic text-gray-500 float-right">
            {demand?.validationTime}
          </p>
        </div>
        <div class="text-base font-normal text-gray-500">
          {demand?.projectLongName}
        </div>
        <p class="text-gray-800">
          You have successfully created
          <em className="font-bold text-xs text-black">Project-Manag</em>{" "}
        </p>
      </div>
    </div>
  );
};

export default AcceptedDemandComponent;
