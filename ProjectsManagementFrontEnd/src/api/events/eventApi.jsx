import useAxios from "../../hooks/useAxios";

async function getEventApi() {
  return await useAxios().get("/events");
}
async function getTodayEventApi() {
  return await useAxios().get("/events/today");
}
async function PostEventApi(formData) {
  return await useAxios().post("/events", formData);
}

export { getEventApi, PostEventApi, getTodayEventApi };
