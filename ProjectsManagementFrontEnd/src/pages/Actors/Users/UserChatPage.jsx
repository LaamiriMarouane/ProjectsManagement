import React, { useEffect, useState } from "react";
import SendChatForm from "../../components/forms/SendChatForm";
import "../../../utils/initGlobal";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { BsPersonPlusFill } from "react-icons/bs";
import AddChatContactModal from "../../components/userComponents/AddChatContactModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addChatMessage,
  getAllChatContacts,
  getChatDetails,
} from "../../../features/chatSlice";

const image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
function UserChatPage() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [isConnect, setIsConnect] = useState(false);
  const [stompClient, setStompClient] = useState();
  const { chatDetails, contacts, chatLoading } = useSelector(
    (store) => store.chat
  );
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store.auth);
  const onPrivateMessageReceived = ({ body }) => {
    const msg = JSON.parse(body);
    dispatch(addChatMessage(msg));
  };

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws");
    const temp = over(sock);
    setStompClient(temp);
    const headers = {
      Authorization: `Bearer ${auth?.accessToken}`,
    };
    temp.connect(
      headers,
      () => {
        setIsConnect(true);
        temp.subscribe(
          `/user/${auth?.user?.username}/private`,
          onPrivateMessageReceived
        );
      },
      () => {
        setIsConnect(false);
      }
    );
  }, []);
  useEffect(() => {
    dispatch(getAllChatContacts());
  }, []);

  useEffect(() => {
    if (selectedUser) dispatch(getChatDetails(selectedUser?.receiver.id));
  }, [selectedUser]);
  useEffect(() => {
    if (selectedUser) dispatch(getChatDetails(selectedUser?.receiver.id));
  }, [selectedUser]);
  return (
    <>
      <div className="flex   w-full  mt-14  h-[calc(100vh-58px)] ">
        <div className="bg-zinc-100 w-full flex  relative flex-col justify-between">
          {!selectedUser ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
              select user to send msg
            </div>
          ) : (
            chatDetails?.messages &&
            !chatLoading && (
              <>
                {" "}
                <div
                  className={`w-full h-16 flex py-9  shadow gap-2  px-2 items-center bg-slate-50  cursor-pointer`}
                >
                  <img
                    className="rounded-full hover:z-20 rounded-full h-14 w-14 object-cover object-center transition-transform transform origin-center "
                    src={image}
                    alt=""
                  />
                  <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium ">
                      {selectedUser?.receiver?.username}
                    </p>
                    <p className="text-sm text-slate-400 truncate">
                      {selectedUser?.receiver?.email}
                    </p>
                  </div>
                </div>
                <div className="grow my-auto p-2 overflow-hidden">
                  <div className="overflow-auto	max-h-full ">
                    {chatDetails?.messages?.map((msg) => {
                      console.log(msg?.sender.username, auth.user.username);
                      const amSender =
                        msg?.sender.username === auth.user.username;
                      return (
                        <MsgCart key={msg.id} msg={msg} amSender={amSender} />
                      );
                    })}
                  </div>
                </div>
                <div>
                  <SendChatForm
                    stompClient={stompClient}
                    selectedUser={selectedUser}
                  />
                </div>
              </>
            )
          )}
        </div>
        <div className=" bg-slate-50 w-1/3 shadow pb-8  overflow-hidden">
          <div className="w-full h-16 px-2 shadow flex  justify-between  ">
            <div className="flex items-center justify-center">
              <p className="text-xl font-semibold">Chats</p>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="rounded-full px-2 py-1.5 cursor-pointer hover:bg-gray-200 "
                onClick={() => setOpen(true)}
              >
                <BsPersonPlusFill size={25} />
              </div>
            </div>
          </div>
          <div className="overflow-auto	max-h-full h-[calc(100%-38px)]">
            {!chatLoading &&
              contacts?.map((contact) => (
                <UserCart
                  key={contact.id}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  contact={contact}
                />
              ))}
          </div>
        </div>
      </div>
      <div>
        <AddChatContactModal open={open} setOpen={setOpen} />
      </div>
    </>
  );
}

export default UserChatPage;
const MsgCart = ({ msg, amSender }) => {
  return (
    <div className="m-3">
      <p className={`text-sm  text-slate-900 ${amSender ? "text-right" : ""}`}>
        {msg.time}
      </p>
      <div className="flex   w-full  ">
        <div
          className={`  rounded-lg max-w-fit px-3 py-1 ${
            amSender ? "ml-auto bg-blue-500" : "bg-slate-700"
          }`}
        >
          <p className="text-base font-bold  text-slate-50">{msg.content}</p>
        </div>
      </div>
    </div>
  );
};

const UserCart = ({ selectedUser, setSelectedUser, contact }) => {
  return (
    <div
      className={` ${
        selectedUser?.id === contact?.id ? "bg-slate-200" : ""
      }  w-full h-18 flex shadow gap-2 p-2 items-center  cursor-pointer hover:bg-gray-200 `}
      onClick={() => setSelectedUser(contact)}
    >
      <img
        className=" rounded-full h-14 w-14 object-cover object-center transition-transform transform origin-center"
        src={image}
        alt=""
      />
      <div className="w-full h-full flex  justify-between">
        <div className="ml-3 overflow-hidden">
          <p className="text-base font-bold  mb-2">
            {contact?.receiver?.username}
          </p>
          <p className="text-sm text-slate-500 truncate">
            {contact?.lastMessage?.content
              ? contact.lastMessage.content
              : "no msg yet"}
          </p>
        </div>
        <div className="ml-3 overflow-hidden">
          {contact?.lastMessage ? (
            <>
              <p className="text-sm font-medium mb-4 ">15:10 PM</p>
              <p className="text-xs text-slate-400 mr-0.5  truncate text-right">
                <span className="rounded-full  text-white  px-1.5 bg-green-500">
                  6
                </span>
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
