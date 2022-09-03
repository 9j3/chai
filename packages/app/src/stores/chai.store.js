import { defineStore } from 'pinia';
import axios from 'axios';

export const useChaiStore = defineStore('chai', {
  state: () => {
    return {
      sender: undefined,
      socketConnected: false,
      selectedRoom: 1,
      clients: {},
      rooms: [],
      messages: [
        {
          id: 1,
          content: 'Heute alle vor Ort!',
          sender: 'Bruno Hammer',
        },
      ],
    };
  },
  actions: {
    async getRooms() {
      const { data } = await axios.get('http://localhost:3000/api/chat/rooms');
      this.rooms = data;
    },
  },
  getters: {
    getRoomById: (state) => {
      return (roomId) =>
        state.rooms.find((room) => room.roomId === Number(roomId));
    },
  },
});