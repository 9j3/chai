<script setup>
import { Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';

import { useSocketIO } from '@/socket';
import { onMounted } from 'vue';
import { io } from 'socket.io-client';

const authStore = useAuthStore();

onMounted(() => {
  console.log('Application mounted');
  const socketManager = useSocketIO();
  const chatSocket = socketManager.socket('/chat');
  socketManager.open((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Successfully connected to WS Backend');
    }
  });
});
</script>

<template>
  <div class="app-container" :class="authStore.user && 'bg-light'">
    <Alert />
    <div class="">
      <router-view />
    </div>
  </div>
</template>
