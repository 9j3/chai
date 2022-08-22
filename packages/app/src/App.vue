<script setup>
import { Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
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