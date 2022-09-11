import { io } from 'socket.io-client';

export const useSocket = () => {
  return io('http://127.0.0.1:3000/chat', {
    autoConnect: false,
    transports: ['websocket'],
  });
};
