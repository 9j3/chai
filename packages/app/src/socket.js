import { io } from 'socket.io-client'

export const useSocketIO = () => {
  const socket = io('http://localhost:3000')
  return {
    socket
  }
}
