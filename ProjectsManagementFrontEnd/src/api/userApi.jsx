import useAxios from "../hooks/useAxios";

async function getUsersListApi(page, size, searchTerm) {
  if (searchTerm && searchTerm != "") {
    console.log(page, size, searchTerm);

    return await useAxios().get(
      `/users?search=${searchTerm}&page=${page}&size=${size}`
    );
  }
  return await useAxios().get(`/users?page=${page}&size=${size}`);
}

export { getUsersListApi };
