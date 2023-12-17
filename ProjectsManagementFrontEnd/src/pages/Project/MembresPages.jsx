import React, { useEffect, useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import { getSearchUsers, resetUsers } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { postSendInvitation } from "../../features/invitationSlice";
import { getProjectDetails } from "../../features/project/projectSlice";
import Spinner from "../components/tools/Spinner";

const MembresPages = () => {
  const { users, loading } = useSelector((store) => store.users);
  const { error, invitationloading } = useSelector((store) => store.invitation);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { project, projectsError, projectsloading } = useSelector(
    (state) => state.project
  );

  const image =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const [searchTerm, setSearchTerm] = useState("");
  const [addMember, setAddMember] = useState(false);

  //**************

  const [isParticipantsPermissions, setIsParticipantsPermissions] =
    useState(false);
  const [isAdminsPermissions, setIsAdminsPermissions] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [selectedParticipantsPermissions, setSelectedParticipantsPermissions] =
    useState([]);
  const [selectedAdminsPermissions, setSelectedAdminsPermissions] = useState(
    []
  );

  //*****************
  const handleAdd = (toUserId) => {
    dispatch(postSendInvitation({ projectId: id, toUserId }));
    if (!error) {
      setAddMember(false);
    }
  };

  const handlePermissions = (userID, { isAdmin }) => {
    setCurrentUserID(userID);
    if (isAdmin) {
      setIsAdminsPermissions(true);
    } else {
      setIsParticipantsPermissions(true);
    }
  };

  const handleAdminsPermissionChange = (permission) => {
    setSelectedAdminsPermissions((prevPermissions) => {
      if (prevPermissions.includes(permission)) {
        return prevPermissions.filter((p) => p !== permission);
      } else {
        return [...prevPermissions, permission];
      }
    });
  };

  const handleParticipantsPermissionChange = (permission) => {
    setSelectedParticipantsPermissions((prevPermissions) => {
      if (prevPermissions.includes(permission)) {
        return prevPermissions.filter((p) => p !== permission);
      } else {
        return [...prevPermissions, permission];
      }
    });
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(getSearchUsers(searchTerm));
    } else {
      dispatch(resetUsers());
    }
  }, [searchTerm]);
  useEffect(() => {
    dispatch(getProjectDetails(id));
  }, []);

  //haddle errors
  // useEffect(() => {
  //   if (!projectsloading && projectsError !== "") {
  //     navigate("/error", { state: { projectsError } });
  //   }
  // }, [projectsloading, projectsError]);

  return (
    <>
      {projectsloading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-end w-full">
            {addMember && (
              <div className="h-full w-screen fixed top-0 left-0 bottom-0 bg-black/80 z-40 flex items-center">
                <dialog
                  className="w-full max-w-lg py-5 px-4 rounded"
                  open={addMember}
                >
                  <div className="flex items-center gap-4">
                    <input
                      className="text-base placeholder:italic placeholder:text-slate-600 block bg-white w-full border border-slate-300 rounded-full py-2 px-3 focus:outline-none sm:text-sm"
                      placeholder="Add some users..."
                      type="text"
                      name="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      onClick={() => setAddMember(false)}
                      className=" py-1 px-2 text-sm font-semibold bg-slate-300 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>

                  <ul className="w-[90%] mt-2">
                    {users?.users?.length > 0 &&
                      users?.users.map((user, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-start space-x-36 mb-1 py-1 px-1 border-b border-b-slate-300 hover:bg-slate-100 rounded-md"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              className=" rounded-full h-14 w-14 object-cover object-center"
                              src={image}
                              alt="user_image"
                            />
                            <div className="ml-3 overflow-hidden">
                              <p className="text-sm font-medium text-black">
                                {user.username}
                              </p>
                              <p className="text-sm text-slate-500 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <button
                            className="bg-black text-white text-sm font-semibold px-2 py-1 rounded"
                            onClick={() => handleAdd(user.id)}
                          >
                            Invit
                          </button>
                        </li>
                      ))}
                  </ul>
                </dialog>
              </div>
            )}

            <button
              className="bg-transparent text-blue-800 text-sm font-semibold border border-blue-800 px-2 py-1 rounded-xl flex items-center gap-2"
              onClick={() => {
                setAddMember(true);
              }}
            >
              <MdGroupAdd size={22} />
              Invit Membres
            </button>
          </div>
          <div className="flex">
            <div className="w-full">
              <h2 className="text-xl font-semibold text-gray-600 tracking-wider">
                Participants
              </h2>
              {/* {(isParticipantsPermissions || isAdminsPermissions) && (
                <div className="h-full w-screen fixed top-0 left-0 bottom-0 bg-black/80 z-40 flex items-center">
                  <dialog
                    className="w-full max-w-lg py-5 px-4 rounded"
                    open={isParticipantsPermissions || isAdminsPermissions}
                  >
                    <div className="flex items-center gap-4">
                      <div className="my-4 p-4 border rounded-md">
                        <h2 className="text-lg font-semibold mb-2">
                          Permissions of user [ {currentUserID} ] :
                        </h2>
                        <ul>
                          {isParticipantsPermissions &&
                            permissions.map((permission) => (
                              <li key={permission} className="mb-2">
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    value={permission}
                                    checked={selectedParticipantsPermissions.includes(
                                      permission
                                    )}
                                    onChange={() =>
                                      handleParticipantsPermissionChange(
                                        permission
                                      )
                                    }
                                    className="mr-2 cursor-pointer"
                                  />
                                  {permission}
                                </label>
                              </li>
                            ))}
                          {isAdminsPermissions &&
                            permissionsAdmin.map((permission) => (
                              <li key={permission} className="mb-2">
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    value={permission}
                                    checked={selectedAdminsPermissions.includes(
                                      permission
                                    )}
                                    onChange={() =>
                                      handleAdminsPermissionChange(permission)
                                    }
                                    className="mr-2 cursor-pointer"
                                  />
                                  {permission}
                                </label>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => {
                          setIsParticipantsPermissions(false);
                          setIsAdminsPermissions(false);
                        }}
                        className=" py-1 px-2 text-sm font-semibold bg-slate-300 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </dialog>
                </div>
              )} */}
              <ul role="list" className="p-6 space-y-2">
                {project?.members?.users.map((person) => {
                  return (
                    <UserCart key={person.id} person={person} image={image} />
                  );
                })}
              </ul>
            </div>

            <div className="border-r border-slate-400 mx-4" />
            <div className="w-full">
              <h2 className="text-xl font-semibold text-gray-600 tracking-wider">
                Admins
              </h2>
              <ul role="list" className="p-6 space-y-2 ">
                {project?.admins?.users.map((person) => {
                  return (
                    <UserCart key={person.id} person={person} image={image} />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MembresPages;

const UserCart = ({ person, image }) => {
  return (
    <>
      <li
        //onClick={() => handlePermissions(person.id, { isAdmin: true })}

        className={`flex py-2 shadow-black shadow gap-2 rounded-xl px-2 items-center bg-transparent/90 hover:bg-transparent/75 cursor-pointer`}
      >
        <img
          className=" hover:z-20 rounded-full h-14 w-14 object-cover object-center transition-transform transform origin-center hover:scale-[3]"
          src={image}
          alt=""
        />
        <div className="ml-3 overflow-hidden">
          <p className="text-sm font-medium text-white">{person.username}</p>
          <p className="text-sm text-slate-400 truncate">{person.email}</p>
        </div>
      </li>
    </>
  );
};
