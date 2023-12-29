import useAxios from "../hooks/useAxios";

async function getContactChatDetails(receiverId) {
  return await useAxios().get(`/chat/contacts/${receiverId}`);
}
async function getAllContacts() {
  return await useAxios().get(`/chat/contacts`);
}
async function PostaddContact(receiverId) {
  return await useAxios().post(`/chat/contacts/${receiverId}`);
}

export { PostaddContact, getContactChatDetails, getAllContacts };
