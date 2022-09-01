import { defineStore } from 'pinia';
import { useUsersStore } from '@/stores/users.store';

const baseUrl = `http://localhost:3000/api/chats`;

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    selectedUserId: '',
  }),
});
