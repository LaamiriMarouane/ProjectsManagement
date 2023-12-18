import React from "react";
import PieChartComponent from "../../components/adminComponents/PieChartComponent";

function AdminPlateformDashBordPage() {
  return (
    <div className="container mx-auto mt-16 my-8">
      <div className="w-[450px] h-[450px] relative bg-zinc-100 rounded-xl p-9 shadow flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-blue-900 absolute top-2 ">
          Demends Statistics
        </h2>
        <PieChartComponent />
      </div>
    </div>
  );
}

export default AdminPlateformDashBordPage;
