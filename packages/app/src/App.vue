<script setup>
import { Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';
import { inject, ref, toRef } from 'vue';

const { user } = useAuthStore();
/** @type {import('socket.io-client').Socket}*/
const socket = inject('socket');
const showDebug = true;
</script>
<template>
  <div class="app-container" :class="user && 'bg-light'">
    <Alert />
    <div
      v-if="showDebug"
      class="debug-window bg-white rounded-2xl border-2 border-red-600"
    >
      <h2 class="text-red-700 font-bold">DEBUG</h2>
      <p>USER: {{ user?.data.user.username }}</p>
      <p class="font-extrabold">WEBSOCKET: {{ socket.connected }}</p>
    </div>
    <div class="">
      <router-view />
    </div>
  </div>
</template>

<style>
.debug-window {
  position: fixed;
  padding: 5px;
  z-index: 100;
  margin-top: 30vh;
  margin-right: 5vw;
  right: 0;
  top: 0;
}
</style>
