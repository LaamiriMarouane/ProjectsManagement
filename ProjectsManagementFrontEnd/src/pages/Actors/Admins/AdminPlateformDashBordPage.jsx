import React, { useEffect, useState } from "react";
import PieChartComponent from "../../components/adminComponents/PieChartComponent";
import { GoGitPullRequest } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "../../../features/statistics/statisticsSlice";
import Spinner from "../../components/tools/Spinner";

const DemandsCOLORS = ["#3182CE", "#2C7A7B", "#FF6666"];
const ProjectsCOLORS = ["#3182CE", "#2C7A7B"];

function AdminPlateformDashBordPage() {
  const { statistics, loading } = useSelector((store) => store.statistics);
  const [demandsData, setDemandsData] = useState([]);
  const [prjectsData, setPrjectsData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatistics());
  }, []);
  useEffect(() => {
    if (!loading) {
      setDemandsData([
        { name: "New Demands", value: statistics.newDemandsNumber },
        { name: "Accepted Demands", value: statistics.acceptedDemandsNumber },
        { name: "Rejected Demands", value: statistics.rejectedDemandsNumber },
      ]);
      setPrjectsData([
        { name: "Public Projects", value: statistics.publicProjects },
        { name: "Private Projects", value: statistics.privateProjects },
      ]);
    }
  }, [statistics]);
  return (
    <div className="container mx-auto mt-16 my-8 w-[90%] flex   flex-col items-center justify-center">
      {loading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
          <Spinner />
        </div>
      ) : (
        <>
          {" "}
          <div className="flex items-center justify-between w-full mx-auto ">
            <ItemCart number={statistics.usersNumber} name={"Users"}>
              <FaUsers size={60} />
            </ItemCart>

            <ItemCart number={statistics.projectNumber} name={"Projects"}>
              <GoGitPullRequest size={60} />
            </ItemCart>

            <ItemCart number={statistics.demandsNumber} name={"Demands"}>
              <MdDashboard size={60} />
            </ItemCart>
          </div>
          <div className="flex items-center justify-between w-full mx-auto">
            <div className="w-[450px] h-[450px] relative bg-zinc-100 rounded-xl p-9 shadow flex flex-col items-center justify-center mt-5">
              <h2 className="text-2xl font-semibold text-blue-900 absolute top-2 ">
                Demends Statistics
              </h2>

              <PieChartComponent colors={DemandsCOLORS} data={demandsData} />
            </div>
            <div className="w-[450px] h-[450px] relative bg-zinc-100 rounded-xl p-9 shadow flex flex-col items-center justify-center mt-5">
              <h2 className="text-2xl font-semibold text-blue-900 absolute top-2 ">
                Projects Statistics
              </h2>
              <PieChartComponent colors={ProjectsCOLORS} data={prjectsData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPlateformDashBordPage;
const ItemCart = ({ number, name, children }) => {
  return (
    <div className="flex flex-col  justify-between bg-zinc-100 py-4 px-6 rounded-md w-[20rem]  h-[10rem] shadow shadow-slate-400">
      <div className="flex  items-center justify-between">
        <p className="text-3xl font-semibold text-blue-900">{name}</p>
        {children}
      </div>
      <p className="text-5xl font-medium tracking-[0.1rem] text-gray-700 font-serif">
        {number}
      </p>
    </div>
  );
};
