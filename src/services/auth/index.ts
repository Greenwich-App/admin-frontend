import { requestAxios } from "../../utils/axios";

export const loginService = async (values: any) => {
  const {data} = await requestAxios.post(`/auth/login`, values);
  return data;
};

// export const verify2FAService = async (values: any) => {
//   const {data} = await requestAxios.post(`/da/eo`, values);
//   return data;
// };

export const getCurrentAdminService = async () => {
  const {data} = await requestAxios.get(`/profile`);
  return data;
};
