import React, { useEffect } from "react";
import DemandComponent from "../../../components/adminComponents/DemandComponent";
import AdminCommandComponent from "../../../components/adminComponents/AdminCommandComponent";
import { getAcceptedDemands } from "../../../../features/demandsSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/tools/Spinner";

function AdminPlateformAcceptedDemandsPage() {
  const { acceptedDemands, DemandErrors, acceptedDemandsLoading } = useSelector(
    (store) => store.demand
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAcceptedDemands());
  }, []);

  return (
    <div className="container mx-auto mt-16 my-8">
      <AdminCommandComponent />
      {acceptedDemandsLoading ? (
        <div className="absolute top-1/2 left-1/2 ">
          <Spinner />
        </div>
      ) : (
        <div className="px-48">
          <div className="rounded-lg  ">
            {acceptedDemands?.length ? (
              acceptedDemands.map((demand) => (
                <DemandComponent
                  Key={demand.id}
                  demand={demand}
                  demandType={"accept"}
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
}

export default AdminPlateformAcceptedDemandsPage;
