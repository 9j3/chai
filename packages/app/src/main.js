import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import './index.css';

import App from './App.vue';
import { router } from '@/router';
import { useSocket } from '@/useSocket';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.provide('$SOCKET', useSocket());

app.use(router);

app.mount('#app');
