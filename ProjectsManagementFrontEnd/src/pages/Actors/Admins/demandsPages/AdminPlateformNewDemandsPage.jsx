import React, { useEffect } from "react";
import DemandComponent from "../../../components/adminComponents/DemandComponent";
import AdminCommandComponent from "../../../components/adminComponents/AdminCommandComponent";
import { useDispatch, useSelector } from "react-redux";
import { getNewDemands } from "../../../../features/demandsSlice";
import Spinner from "../../../components/tools/Spinner";

const AdminPlateformNewDemandsPage = () => {
  const { newDemands, DemandErrors, newDemandsLoading } = useSelector(
    (store) => store.demand
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewDemands());
  }, []);

  return (
    <>
      <div className="container mx-auto mt-16 my-8">
        <AdminCommandComponent />
        {newDemandsLoading ? (
          <div className="absolute top-1/2 left-1/2 ">
            <Spinner />
          </div>
        ) : (
          <DemandeNotification demandeList={newDemands} />
        )}
      </div>
    </>
  );
};

export default AdminPlateformNewDemandsPage;

const DemandeNotification = ({ demandeList }) => {
  return (
    <div className="px-48">
      <div className="rounded-lg  ">
        {demandeList?.length > 0 && (
          <div className="bg-slate-200 px-3 py-1 border-b border-b-slate-300 rounded-tr-lg text-sm rounded-tl-lg">
            You have {demandeList.length} notification
          </div>
        )}
        {demandeList?.length ? (
          demandeList.map((demand) => (
            <DemandComponent
              Key={demand.id}
              demand={demand}
              demandType={"new"}
            />
          ))
        ) : (
          <div className="text-center w-full py-3">No Notification</div>
        )}
      </div>
    </div>
  );
};
