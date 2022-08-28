<script setup>
import { Nav, Alert } from '@/components'
import { useAuthStore } from '@/stores'

import { useSocketIO } from '@/socket'

const authStore = useAuthStore()
/** @type {Socket} */
const { socket } = useSocketIO()

// TODO: remove (just for demo purposes)
setInterval(() => {
  socket.emit('events', { foo: 'bar' })
}, 3000)
</script>

<template>
  <div class="app-container" :class="authStore.user && 'bg-light'">
    <Alert />
    <div class="">
      <router-view />
    </div>
  </div>
</template>
