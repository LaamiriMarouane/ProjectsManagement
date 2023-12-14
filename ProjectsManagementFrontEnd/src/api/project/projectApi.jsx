import useAxios from "../../hooks/useAxios";

async function getAllpublicProjectsApi() {
  return await useAxios().get("/projects");
}
async function getProjectDetailsApi(projectId) {
  return await useAxios().get(`/projects/${projectId}`);
}
async function getMyProjectsApi() {
  return await useAxios().get("/projects/my-projects");
}

export { getAllpublicProjectsApi, getProjectDetailsApi, getMyProjectsApi };
