import React, { useEffect } from "react";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { AiOutlinePoweroff } from "react-icons/ai";
import DemandComponent from "../../../components/adminComponents/DemandComponent";
import AdminCommandComponent from "../../../components/adminComponents/AdminCommandComponent";
import { useDispatch, useSelector } from "react-redux";
import { getRejectedDemands } from "../../../../features/demandsSlice";
import Spinner from "../../../../utils/Spinner";

const AdminPlateformRejectedDemandsPage = () => {
  const { rejectedDemands, DemandErrors, rejectedDemandsLoading } = useSelector(
    (store) => store.demand
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRejectedDemands());
  }, []);

  return (
    <div className="container mx-auto mt-16 my-8">
      <AdminCommandComponent />
      {rejectedDemandsLoading ? (
        <div className="absolute top-1/2 left-1/2 ">
          <Spinner />
        </div>
      ) : (
        <div className="px-48">
          <div className="rounded-lg  ">
            {rejectedDemands?.length ? (
              rejectedDemands.map((demand) => (
                <DemandComponent
                  Key={demand.id}
                  demand={demand}
                  demandType={"reject"}
                />
              ))
            ) : (
              <div className="text-center w-full py-3">No Notification</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlateformRejectedDemandsPage;
