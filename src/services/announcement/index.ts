import { requestAxios } from "../../utils/axios";

export const allAnnouncementService = async () => {
  const {data} = await requestAxios.get(`/announcements`);
  return data;
};

export const createAnnouncementService = async (payload) => {
  const {data} = await requestAxios.post(`/announcements`, payload);
  return data;
};

export const postAnnouncementService = async (id) => {
  const {data} = await requestAxios.post(`/announcements/${id}/post`);
  return data;
};

export const updateAnnouncementService = async (id, payload) => {
  const {data} = await requestAxios.patch(`/announcements/${id}`, payload);
  return data;
};

export const deleteAnnouncementService = async (id) => {
  const {data} = await requestAxios.delete(`/announcements/${id}`);
  return data;
};