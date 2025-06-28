import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    expiration: localStorage.getItem('expiration') || null,
    loadingData: false,
    isSuperAdmin: true
  }),
  actions: {
  },
});
