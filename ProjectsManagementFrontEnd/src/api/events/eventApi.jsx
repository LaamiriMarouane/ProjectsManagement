import useAxios from "../../hooks/useAxios";

async function getUserEventsApi() {
  return await useAxios().get("/events/users");
}

async function PostUserEventApi(formData) {
  return await useAxios().post("/events/users", formData);
}

export { getUserEventsApi, PostUserEventApi };
