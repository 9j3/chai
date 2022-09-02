import { defineStore } from 'pinia';

export const useChaiStore = defineStore('chai', {
  state: () => {
    return {
      sender: '',
    };
  },
});
