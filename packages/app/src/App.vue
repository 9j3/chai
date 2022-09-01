<script setup>
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();

console.log('--------------------------------------');
console.log('CHAI IS INITIALIZED :)');
console.log('--------------------------------------');
</script>

<template>
  <router-view />
</template>

<style></style>
