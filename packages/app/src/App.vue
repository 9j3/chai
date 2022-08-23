<script setup>
import { Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';
import { useSocketIO } from "@/socket";

const authStore = useAuthStore();
const { socket } = useSocketIO()

socket.on('welcome', () => { console.log('welcome') })

</script>

<template>
  <div
    class="app-container"
    :class="authStore.user && 'bg-light'"
  >
    <Alert />
    <div class="">
      <router-view />
    </div>
  </div>
</template>