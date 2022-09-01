<template>
  <div class="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">
    2 hours ago
  </div>
  <div
    class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0"
  >
    T
  </div>
  <div class="flex flex-col flex-grow ml-3">
    <div class="text-sm font-medium">
      {{ user.fullName }}
    </div>
    <div class="text-xs truncate w-40">
      Good after noon! how can i help you?
    </div>
  </div>
  <div class="flex-shrink-0 ml-2 self-end mb-1">
    <span
      class="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full"
      >3</span
    >
  </div>
</template>
<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
