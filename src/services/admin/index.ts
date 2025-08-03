import { requestAxios } from "../../utils/axios";

export const allStatsService = async () => {
  const {data} = await requestAxios.get(`/admin/stats`);
  return data;
};

export const allAdminService = async (search) => {
  const {data} = await requestAxios.get(`/admin?search=${search}`);
  return data;
};

export const addAdminService = async (payload) => {
  const {data} = await requestAxios.post(`/admin/add-admin`, payload);
  return data;
};

export const addScurityService = async (payload) => {
  const {data} = await requestAxios.post(`/admin/add-security`, payload);
  return data;
};

export const removeAdminService = async (id) => {
  const {data} = await requestAxios.post(`/admin/remove-admin/${id}`);
  return data;
};

export const removeSecurityService = async (id) => {
  const {data} = await requestAxios.post(`/admin/remove-security/${id}`);
  return data;
};