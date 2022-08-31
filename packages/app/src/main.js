import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';

import App from './App.vue';
import { router } from './router';
import socket from '@/plugins/socket';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(socket, {
  connection: 'http://localhost:3000/chat',
});

app.mount('#app');
