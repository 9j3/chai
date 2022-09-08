import axios from 'axios';
import { defineStore } from 'pinia';

export const useChaiStore = defineStore('chai', {
  state: () => {
    return {
      sender: undefined,
      socketConnected: false,
      selectedRoom: 1,
      clients: {},
      rooms: {},
      messages: [],
    };
  },
  actions: {
    async getRooms() {
      const { data } = await axios.get('http://localhost:3000/api/chat/rooms');
      this.rooms = data;
    },

    async getMessages(roomId) {
      console.log('chaiStore::getMessages');
      const { data } = await axios.get(
        'http://localhost:3000/api/chat/messages/' + roomId,
      );
      console.log(data);
      this.messages = data;
    },
  },
  getters: {
    getRoomById: (state) => {
      return (roomId) => state.rooms[roomId];
    },
  },
});
