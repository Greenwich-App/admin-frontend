import { requestAxios } from "../../utils/axios";

export const allUsersService = async () => {
  const {data} = await requestAxios.get(`/users`);
  return data;
};

export const approveUserService = async (id) => {
  const {data} = await requestAxios.post(`/users/approve/${id}`);
  return data;
};