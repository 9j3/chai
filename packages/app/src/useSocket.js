import { io } from 'socket.io-client';

export const useSocket = () => {
  return io('http://localhost:3000/chat', {
    autoConnect: false,
    transports: ['websocket'],
  });
};
