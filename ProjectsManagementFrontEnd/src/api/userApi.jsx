import useAxios from "../hooks/useAxios";

async function getSearchUsersApi(subString) {
  return await useAxios().get(`/users/search=${subString}`);
}
async function getUsersListApi() {
  return await useAxios().get("/users");
}

export { getSearchUsersApi, getUsersListApi };
