import { io, Socket } from 'socket.io-client'

/**
 *
 * @returns {Socket}
 */
export const useSocketIO = () => {
  return io('http://localhost:3000/chat', {
    autoConnect: false,
  });
};
