import { defineStore } from 'pinia';

export const useRootStore = defineStore({
  id: 'root',
  state: () => ({
    socketConnected: false,
    authLoading: false,
    tokenVerified: false,
    unauthorizedMessage: '',
    returnUrl: '',
  }),
});
