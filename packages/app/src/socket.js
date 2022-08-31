import { io, Manager, Socket } from 'socket.io-client';

/**
 *
 * @returns {Manager}
 */
export const useSocketIO = () => {
  return new Manager('http://localhost:3000', {
    autoConnect: false,
  });
};
