import useAxios from "../hooks/useAxios";

async function getSearchUsersApi(subString) {
  return await useAxios().get(`/users?search=${subString}`);
}
async function getUsersListApi(page, size) {
  return await useAxios().get(`/users?page=${page}&size=${size}`);
}

export { getSearchUsersApi, getUsersListApi };
