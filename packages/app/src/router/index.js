import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: { path: '/1' },
    },
    {
      path: '/:id',
      component: HomeView,
      name: 'chat',
    },
  ],
});
