import { defineStore } from 'pinia'

const baseUrl = `http://localhost:3000/api/chats`

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    selectedUserId: ''
  }),
  getters: {
    getUserById: state => {
      return userId => state.users.find(user => user.userId === userId)
    }
  }
})
