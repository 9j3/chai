import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import './index.css';

import App from './App.vue';
import { router } from '@/router';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(router);

app.mount('#app');
