import useAxios from "../../hooks/useAxios";

async function getUserEventsApi() {
  return await useAxios().get("/events/users");
}
async function getProjectEventsApi(projectId) {
  return await useAxios().get(`/events/projects/${projectId}`);
}

async function PostUserEventApi(formData) {
  return await useAxios().post("/events/users", formData);
}
async function PostProjectEventApi(projectId, formData) {
  return await useAxios().post(`/events/projects/${projectId}`, formData);
}

export {
  getUserEventsApi,
  PostUserEventApi,
  PostProjectEventApi,
  getProjectEventsApi,
};
