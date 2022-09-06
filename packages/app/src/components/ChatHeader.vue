<template>
  <div
    class="h-16 border-b flex justify-between items-center w-full px-5 py-2 shadow-sm"
  >
    <div class="flex items-center">
      <p class="font-semibold ml-3 text-slate-600">
        {{ getRoomById($route.params.id)?.name }}
      </p>
    </div>

    <div class="flex justify-end">
      <div
        v-if="sender"
        style="padding-top: 0.3em; padding-bottom: 0.3rem"
        class="flex items-center space-x-1 text-sm p-4 bg-green-500 text-white rounded-full"
      >
        <CheckCircleIcon class="text-white w-5" />

        <div>{{ sender }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useChaiStore } from '@/stores/chai.store';
import { CheckCircleIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';

const chaiStore = useChaiStore();
const { sender, getRoomById } = storeToRefs(chaiStore);
</script>
