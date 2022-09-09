import { io } from 'socket.io-client';

export const useSocket = () => {
  return io('http://192.168.0.50:3000/chat', {
    autoConnect: false,
    transports: ['websocket'],
  });
};
