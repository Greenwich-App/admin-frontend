import { requestAxios } from "../../utils/axios";

export const allVisitorsService = async () => {
  const {data} = await requestAxios.get(`/access-codes/visitors`);
  return data;
};