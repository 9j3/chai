import { io } from 'socket.io-client';

export default {
  install: (app, { connection, options }) => {
    const socket = io(connection, {
      autoConnect: false,
    });
    app.config.globalProperties.$socket = socket;
    app.provide('socket', socket);
  },
};
