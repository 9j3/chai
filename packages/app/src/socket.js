import { io, Socket } from 'socket.io-client';
import { useRootStore } from '@/stores/root.store';

/** @type{import('vue').App}*/
let appInstance = null;
let socketInitOngoing = false;

export const setAppInstance = (instance) => {
  appInstance = instance;
};

export const useSocketIO = () => {
  return io('http://localhost:3000/chat', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
    transports: ['websocket'],
  });
};

export const initSocket = async () => {
  const initialisedSocket = appInstance.config.globalProperties.$socket;

  let socketInitialized = initialisedSocket !== undefined;

  if (!socketInitialized && !socketInitOngoing) {
    console.log('Socket is not initialized or dangling. Trying to init...');
    socketInitOngoing = true;

    let connectionAttempts = 1;
    const socket = useSocketIO();

    socket.on('connect', () => {
      if (socket.connected) {
        console.log('Successfully connected socket to backend gateway');
      }

      connectionAttempts = 1;
      socketInitOngoing = false;

      const rootStore = useRootStore();

      rootStore.$patch({
        socketInitialized: true,
      });

      if (!socketInitialized) {
        // provide socketIo instance
        console.log('providing socket instance globally', socket);
        appInstance.config.globalProperties.$socket = socket;
      }
    });

    socket.on('connect_error', (e) => {
      console.error(
        `Unable to connect socket to backend gateway, attempt ${connectionAttempts}`,
        e,
      );

      // try to reconnect if connection revoked
      if (connectionAttempts < 10) {
        setTimeout(async () => {
          const { accessToken } = await Storage.get({ key: 'access_token' });
          socket.auth.token = accessToken;
          socket.connect();
        }, 2000);
      }
    });

    socket.on('error', (error) => {
      console.error('General error occurred while socket connect', error);
    });
  } else if (initialisedSocket && !initialisedSocket.connected) {
    console.info('Socket is already connected');
    initialisedSocket.connect();
  }
};
