import useAxios from "../hooks/useAxios";

async function getdemandsApi() {
  return await useAxios().get("/demands");
}
async function getAllDemandStatesApi() {
  return await useAxios().get("/demands/demand-states");
}
async function getNewDemandsApi() {
  return await useAxios().get("/demands/new");
}
async function getRejectedDemandsApi() {
  return await useAxios().get("/demands/rejected");
}
async function getAcceptedDemandsApi() {
  return await useAxios().get("/demands/accepted");
}
async function getdemandDetailsApi(id) {
  return await useAxios().get(`/demands/${id}`);
}
async function postCreateDemandApi(Data) {
  return await useAxios().post("/demands", Data);
}
async function putUpdateDemandApi(Data) {
  return await useAxios().put("/demands/update", Data);
}
async function putValidateDemandApi(id) {
  return await useAxios().put(`/demands/validate/${id}`);
}
async function putRejectDemanddApi(id) {
  return await useAxios().put(`/demands/reject/${id}`);
}
async function deleteDemanddApi(id) {
  return await useAxios().delete(`/demands/delete/${id}`);
}

export {
  getdemandsApi,
  getAllDemandStatesApi,
  getNewDemandsApi,
  getRejectedDemandsApi,
  getAcceptedDemandsApi,
  getdemandDetailsApi,
  postCreateDemandApi,
  putValidateDemandApi,
  putRejectDemanddApi,
  deleteDemanddApi,
  putUpdateDemandApi,
};
