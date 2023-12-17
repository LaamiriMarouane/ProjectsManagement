import useAxios from "../hooks/useAxios";

async function postSendInvitationApi(projectId, toUserId) {
  return await useAxios().post(`/invitations/${projectId}/${toUserId}`);
}
async function getAllInvitationsByProjectApi(projectId) {
  return await useAxios().get(`/invitations/${projectId}`);
}
async function getReceivedInvitationApi() {
  return await useAxios().get("/invitations");
}
async function putDeclineInvitationApi(invitationId) {
  return await useAxios().put(`/invitations/decline/${invitationId}`);
}
async function putAcceptInvitationApi(invitationId) {
  return await useAxios().put(`/invitations/accept/${invitationId}`);
}

export {
  postSendInvitationApi,
  getAllInvitationsByProjectApi,
  getReceivedInvitationApi,
  putDeclineInvitationApi,
  putAcceptInvitationApi,
};
