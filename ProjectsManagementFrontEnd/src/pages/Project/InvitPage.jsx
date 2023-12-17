import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSentInvitations } from "../../features/invitationSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/tools/Spinner";

const InvitPage = () => {
  const { sentInvitations, error, invitationloading } = useSelector(
    (state) => state.invitation
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSentInvitations(id));
  }, []);
  const handleCancelInvitation = (target) => {};
  // useEffect(() => {
  //   if (!invitationloading && error !== "") {
  //     navigate("/error", { state: { error } });
  //   }
  // }, [invitationloading, error]);

  return (
    <>
      {invitationloading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
          <Spinner />
        </div>
      ) : (
        sentInvitations.map((invitation) => {
          return (
            <div className="w-full mt-3 space-y-3 flex flex-col items-center">
              <div className="w-full max-w-2xl flex items-center rounded-xl shadow bg-white py-2 px-3 justify-between">
                <div className="space-y-1 flex items-center gap-2">
                  <img
                    className=" hover:z-20 rounded-full h-14 w-14 object-cover object-center transition-transform transform origin-center hover:scale-[3]"
                    src={
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt=""
                  />
                  <div className="space-y-1">
                    <div className="text-sm font-semibold">
                      {invitation.to.username}
                    </div>
                    <div className="text-slate-400 text-sm font-semibold">
                      {invitation.to.email}
                    </div>
                    <div className="italic text-xs font-semibold">
                      {invitation.creationTime}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCancelInvitation(1)}
                  className="p-1 bg-transparent border border-black rounded-xl text-sm font-semibold hover:bg-transparent/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default InvitPage;
