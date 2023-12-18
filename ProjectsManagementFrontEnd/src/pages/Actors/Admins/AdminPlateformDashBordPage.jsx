import React from "react";
import PieChartComponent from "../../components/adminComponents/PieChartComponent";
import { GoGitPullRequest } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

function AdminPlateformDashBordPage() {
  return (
    <div className="container mx-auto mt-16 my-8">

      <div className="grid grid-cols-3">
        <div className="flex items-center justify-between bg-white py-2 px-3 rounded-md max-w-[18rem] shadow shadow-slate-400">
          <div className="space-y-2">
            <p className="text-xl font-bold">Demands</p>
            <p className="text-lg font-medium tracking-[0.1rem] text-gray-500 font-serif">1587</p>
          </div>
          <GoGitPullRequest size={40} />
        </div>


        <div className="flex items-center justify-between bg-white py-2 px-3 rounded-md max-w-[18rem] shadow shadow-slate-400">
          <div className="space-y-2">
            <p className="text-xl font-bold">Users</p>
            <p className="text-lg font-medium tracking-[0.1rem] text-gray-500 font-serif">1587</p>
          </div>
          <FaUsers size={40} />
        </div>

        <div className="flex items-center justify-between bg-white py-2 px-3 rounded-md max-w-[18rem] shadow shadow-slate-400">
          <div className="space-y-2">
            <p className="text-xl font-bold">Projects</p>
            <p className="text-lg font-medium tracking-[0.1rem] text-gray-500 font-serif">1587</p>
          </div>
          <MdDashboard size={40} />
        </div>
      </div>

      <div className="w-[450px] h-[450px] relative bg-zinc-100 rounded-xl p-9 shadow flex flex-col items-center justify-center mt-5">
        <h2 className="text-2xl font-semibold text-blue-900 absolute top-2 ">
          Demends Statistics
        </h2>
        <PieChartComponent />
      </div>
    </div>
  );
}

export default AdminPlateformDashBordPage;
