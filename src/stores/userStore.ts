import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: useStorage("user", {}),
    token: useStorage("token", ""),
    expiration: useStorage("expiration", ""),
    loadingData: useStorage("loadingData", false),
    isSuperAdmin: useStorage("isSuperAdmin", false)
  }),
  actions: {
  },
});
