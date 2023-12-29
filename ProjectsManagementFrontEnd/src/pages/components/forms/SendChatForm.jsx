import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addChatMessage } from "../../../features/chatSlice";
function SendChatForm({ stompClient, selectedUser, user }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const handleSendPublicMessage = (data) => {
    if (stompClient) {
      const chatMessage = {
        sender: selectedUser.sender,
        receiver: selectedUser.receiver,
        content: data.msg,
      };
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      dispatch(addChatMessage({ id: Math.random(), ...chatMessage }));
    }
    reset();
  };
  return (
    <form
      className="flex gap-5 p-5 justify-center justify-items-center "
      onSubmit={handleSubmit(handleSendPublicMessage)}
    >
      <input
        className="grow appearance-none outline-none bg-transparent font-medium text-sm w-full py-1 px-2 textgray-700 leading-tight border-b border-gray-400"
        type="text"
        placeholder="Write msg to send ..."
        {...register("msg", { required: true })}
      />
      <button
        type="submit"
        className="text-white py-2 px-4 rounded   focus:outline-none focus:shadow-outline-blue bg-btn"
      >
        Send
      </button>
    </form>
  );
}

export default SendChatForm;
