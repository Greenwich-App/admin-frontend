import { requestAxios } from "../../utils/axios";

export const allResidentsService = async () => {
  const {data} = await requestAxios.get(`/residences`);
  return data;
};

export const getSingleResidenceService = async (id) => {
  const {data} = await requestAxios.get(`/residences/${id}`);
  return data;
};