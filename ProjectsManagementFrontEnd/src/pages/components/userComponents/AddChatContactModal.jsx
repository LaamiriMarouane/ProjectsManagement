import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, resetUsers } from "../../../features/userSlice";
import { postAddContact } from "../../../features/chatSlice";

const image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
function AddChatContactModal({ open, setOpen }) {
  const { users, loading } = useSelector((store) => store.users);
  const { error } = useSelector((store) => store.chat);

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      dispatch(getUsers({ page: 0, pageSize: 5, searchTerm: searchTerm }));
    } else {
      dispatch(resetUsers());
    }
  }, [searchTerm]);
  const handleAdd = (id) => {
    dispatch(postAddContact(id));
    setOpen(false);
  };
  return (
    <dialog open={open}>
      <div
        className="h-screen w-screen fixed z-20 top-0 left-0 bottom-0 bg-black/50  "
        onClick={() => {
          setOpen(false);
          setSearchTerm("");
        }}
      ></div>
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full max-w-lg py-5 px-4 rounded bg-white ">
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
            onClick={() => {
              setOpen(false);
              // dispatch(resetUsers());
              setSearchTerm("");
            }}
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
                className="flex items-center justify-between space-x-36 mb-1 py-1 px-1 border-b border-b-slate-300 hover:bg-slate-100 rounded-md"
              >
                <div className="flex items-center">
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
                  className="bg-black text-white text-sm float-right font-semibold px-2 py-1 rounded"
                  onClick={() => handleAdd(user.id)}
                  // disabled={invitationloading}
                >
                  Add
                </button>
              </li>
            ))}
        </ul>
      </div>
    </dialog>
  );
}

export default AddChatContactModal;
