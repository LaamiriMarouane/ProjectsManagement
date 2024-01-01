import React, { useEffect, useState } from "react";
import UserDemandComponent from "../../../components/userComponents/UserDemandComponent";
import AcceptedDemandComponent from "../../../components/userComponents/AcceptedDemandComponent";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import UserDemandFrom from "../../../components/forms/UserDemandFrom";
import { MdAdd } from "react-icons/md";
import {
  getUserAcceptedDemands,
  getUserNewDemands,
  getRejectedDemands,
  getUserAcceptedAndRejectedDemands
} from "../../../../features/demandsSlice";
import Spinner from "../../../components/tools/Spinner";
import RejectedDemandComponent from "../../../components/userComponents/RejectedDemandComponent";

const ConsultPage = () => {
  const [updateInfo, setIsUpdate] = useState({
    demandToUpdate: {},
    isUpdate: false,
  });
  const [addDemand, setAddDemand] = useState(false);
  const {
    newDemands,
    acceptedDemands,
    DemandErrors,
    newDemandsLoading,
    acceptedDemandsLoading,
    rejectedDemands,
    rejectedDemandsLoading,
    acceptedAndRejectedDemands,
    acceptedAndRejectedDemandsLoading
  } = useSelector((store) => store.demand);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserNewDemands());
    dispatch(getUserAcceptedDemands());
    dispatch(getRejectedDemands());
    dispatch(getUserAcceptedAndRejectedDemands());
  }, []);

  return (
    <div className="mt-16">
      <div className="flex justify-end items-center">
        <button
          className="bg-blue-800 text-base font-semibold text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => setAddDemand(true)}
        >
          <MdAdd />
          Create Project
        </button>
      </div>
      <div className="flex items-start mt-3 w-full divide-solid divide-x divide-gray-500">
        <div className="w-[50%] h-screen px-3">
          <div className="rounded-lg border border-slate-300 bg-slate-100">
            <div className="bg-slate-200 px-3 py-1 border-b border-b-slate-300 rounded-tr-lg text-sm rounded-tl-lg">
              You have {newDemands?.length > 0 ? newDemands.length : 0} demandes
              created{" "}
            </div>
            {newDemandsLoading ? (
              <Spinner />
            ) : newDemands?.length ? (
              newDemands.map((demande) => (
                <UserDemandComponent
                  key={demande.id}
                  demand={demande}
                  setIsUpdate={setIsUpdate}
                />
              ))
            ) : (
              <div className="text-center w-full py-3">No demand created</div>
            )}
          </div>
        </div>
        <div className="w-[50%] h-screen px-3">
          <div className="rounded-lg border border-slate-300 ">
            <div className="bg-slate-200 px-3 py-1 border-b border-b-slate-300 rounded-tr-lg text-sm rounded-tl-lg">
              You have {acceptedAndRejectedDemands?.length} demandes 
            </div>
            {acceptedAndRejectedDemandsLoading ? (
              <Spinner />
            ) : acceptedAndRejectedDemands?.length ? (
              acceptedAndRejectedDemands.slice().reverse().map((demand) => {
                if( demand.demandState === 'COMPLETED' ) {
                  return <AcceptedDemandComponent key={demand?.id} demand={demand} />
                } else {
                  return <RejectedDemandComponent key={demand?.id} demand={demand} />
                }
              })
            ) : (
              <div className="text-center w-full py-3">No demand state</div>
            )}
          </div>
        </div>
      </div>
      {
        (updateInfo.isUpdate || addDemand) && (
          <div className="h-full w-screen fixed top-0 left-0 bottom-0 bg-black/50 flex items-center ">
            <dialog
              className="relative rounded-xl"
              open={updateInfo.isUpdate || addDemand}
            >
              <div
                className="cursor-pointer absolute top-2 right-2 hover:bg-slate-300 p-2 rounded-full"
                onClick={() => {
                  setIsUpdate((prev) => {
                    return { demandToUpdate: {}, isUpdate: false };
                  });
                  setAddDemand(false);
                }}
              >
                <IoMdClose />
              </div>
              {addDemand && (
                <UserDemandFrom
                  isUpdate={false}
                  demandToUpdate={{}}
                  setAddDemand={setAddDemand}
                />
              )}
              {updateInfo.isUpdate && (
                <UserDemandFrom
                  isUpdate={updateInfo.isUpdate}
                  demandToUpdate={updateInfo.demandToUpdate}
                  setIsUpdate={setIsUpdate}
                />
              )}
            </dialog>
          </div>
        )
      }
    </div >
  );
};

export default ConsultPage;
