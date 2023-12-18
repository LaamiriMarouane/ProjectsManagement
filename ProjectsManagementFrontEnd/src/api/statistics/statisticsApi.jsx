import useAxios from "../../hooks/useAxios";

async function getStatisticsApi() {
  return await useAxios().get("/statistics");
}

export { getStatisticsApi };
