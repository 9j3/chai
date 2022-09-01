<template>
  <div class="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
    <div class="flex flex-row items-center">
      <div class="flex flex-row items-center">
        <div class="text-xl font-semibold">Messages</div>
        <div
          class="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium"
        >
          5
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div class="text-xs text-gray-400 font-semibold uppercase">Static</div>
    </div>
    <div class="mt-2">
      <div class="flex flex-col -mx-4">
        <div class="relative flex flex-row items-center p-4">
          <div class="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">
            5 min
          </div>
          <div
            class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0"
          >
            T
          </div>
          <div class="flex flex-col flex-grow ml-3">
            <div class="text-sm font-medium">TEST 1</div>
            <div class="text-xs truncate w-40">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis,
              doloribus?
            </div>
          </div>
          <div class="flex-shrink-0 ml-2 self-end mb-1">
            <span
              class="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full"
              >5</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div class="text-xs text-gray-400 font-semibold uppercase">@TEKO</div>
    </div>
    <div class="h-full overflow-hidden relative pt-2">
      <div class="flex flex-col divide-y h-full overflow-y-auto -mx-4">
        <!-- RENDER A LIST ITEM FOR EACH USER !-->
        <div
          v-for="user in users"
          :key="user.userId"
          class="flex flex-row hover:cursor-pointer items-center p-4 relative hover:bg-blue-50"
          @click="chatStore.$patch({ selectedUserId: user.userId })"
        >
          <FluentChatListItem :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useChatStore, useUsersStore } from '@/stores';
import { storeToRefs } from 'pinia';
import FluentChatListItem from '@/components/FluentChatListItem.vue';

const userStore = useUsersStore();
const chatStore = useChatStore();
const { users } = storeToRefs(userStore);
userStore.getAll();
</script>
