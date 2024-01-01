import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReceivedInvitations,
  putAcceptInvitation,
  putDeclineInvitation,
} from "../../features/invitationSlice";
import Spinner from "../components/tools/Spinner";

const RecevedInvitationsPage = () => {
  const { receivedInvitation, invitationloading } = useSelector(
    (state) => state.invitation
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReceivedInvitations());
  }, []);
  return (
    <div className="w-full space-y-1 h-full mt-20">
      {invitationloading ? (
        <div className="w-full h-[30rem] flex items-center justify-center  ">
          <Spinner />
        </div>
      ) : receivedInvitation.length === 0 ? (
        <div className="w-full h-[30rem] flex items-center justify-center">
          No invitation received at the moment
        </div>
      ) : (
        receivedInvitation.map((invitation) => {
          return (
            <RecevedInvitationsComponent
              key={invitation.id}
              invitation={invitation}
            />
          );
        })
      )}
    </div>
  );
};

const RecevedInvitationsComponent = ({ invitation }) => {
  const { id, project, from, creationTime, state } = invitation;
  const dispatch = useDispatch();
  const handleAcceptInvitation = (invitationId) => {
    dispatch(putAcceptInvitation(invitationId));
  };
  const handleDeclineInvitation = (invitationId) => {
    dispatch(putDeclineInvitation(invitationId));
  };
  return (
    <div className="mt-11 w-full border-b  border-b-slate-400  py-7 flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-5">
        <div className="text-base">
          You have been invited to join a project :{" "}
        </div>
        <div className="italic text-xs font-semibold">
          {" "}
          {"-- " + creationTime + " --"}{" "}
        </div>
      </div>
      <div className="w-full max-w-2xl rounded-xl shadow bg-white py-2 px-3">
        <div className="space-y-2">
          <div className="ml-2">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <tbody>
                <tr className="bg-slate-100 border-b border-b-slate-700">
                  <td className="px-2 py-1 text-center text-sm font-semibold">
                    From
                  </td>
                  <td className="px-2 py-1 text-center border-l border-l-slate-400 italic text-sm">
                    {from.username}
                  </td>
                </tr>
                <tr className="bg-slate-100 border-b border-b-slate-700">
                  <td className="px-2 py-1 text-center text-sm font-semibold">
                    Project Name
                  </td>
                  <td className="px-2 py-1 text-center border-l border-l-slate-400 italic text-sm">
                    {project.longName}
                  </td>
                </tr>
                <tr className="bg-slate-100 border-b border-b-slate-700">
                  <td className="px-2 py-1 text-center text-sm font-semibold">
                    Sub Project Name
                  </td>
                  <td className="px-2 py-1 text-center border-l border-l-slate-400 italic text-sm">
                    {project.shortName}
                  </td>
                </tr>
                <tr className="bg-slate-100 border-b border-b-slate-700">
                  <td className="px-2 py-1 text-center text-sm font-semibold">
                    Type
                  </td>
                  <td className="px-2 py-1 text-center border-l border-l-slate-400 italic text-sm">
                    {project.type}
                  </td>
                </tr>
                <tr className="bg-slate-100">
                  <td className="px-2 py-1 text-center text-sm font-semibold">
                    Theme
                  </td>
                  <td className="px-2 py-1 text-center border-l border-l-slate-400 italic text-sm">
                    {project.theme}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-around mt-2">
          <button
            onClick={() => handleAcceptInvitation(id)}
            className="p-1 bg-transparent border border-blue-700 text-blue-700 rounded text-sm font-semibold hover:bg-blue-800 hover:text-white"
          >
            Accept
          </button>
          <button
            onClick={() => handleDeclineInvitation(id)}
            className="p-1 bg-red-600 border border-red-600 text-white rounded text-sm font-semibold hover:bg-red-400 hover:text-white"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecevedInvitationsPage;
