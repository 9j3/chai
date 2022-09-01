<script setup>
import FluentSideBar from '@/components/FluentSideBar.vue';
import FluentChatHeader from '@/components/FluentChatHeader.vue';
import FluentChatSpace from '@/components/FluentChatSpace.vue';
import FluentChatControl from '@/components/FluentChatControl.vue';

import { storeToRefs } from 'pinia';
import { useAuthStore, useUsersStore } from '@/stores';
import { initSocket } from '@/socket';
const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

initSocket();
</script>

<template>
  <div class="flex flex-row h-screen antialiased text-gray-800">
    <FluentSideBar />
    <div class="flex flex-col h-full w-full bg-white px-4 py-6">
      <FluentChatHeader />
      <FluentChatSpace />
      <FluentChatControl />
    </div>
  </div>
</template>
