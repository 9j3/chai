import { io } from 'socket.io-client'

export const useSocketIO = () => {
  /**
   *
   * @type {Socket}
   */
  const socket = io('http://localhost:3000', {})
  return {
    socket
  }
}
