<script setup>
const props = defineProps({
  isMyMessage: {
    type: Boolean,
    default: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div
    v-if="isMyMessage"
    class="w-full flex justify-end mt-3"
  >
    <div class="w-1/2">
      <div class="mt-3 w-full bg-primary p-4 rounded-b-xl rounded-tl-xl">
        <p class="text-sm text-white">
          {{ message }}
        </p>
        <p class="text-slate-200 text-right text-xs">
          {{ timestamp }}
        </p>
      </div>
    </div>
  </div>
  <div
    v-else
    class="w-full flex flex-start overflow-y-auto"
  >
    <div class="w-1/2">
      <div class="mt-3 w-full p-4 rounded-b-xl rounded-tr-xl bg-gray-300">
        <p class="text-sm text-black">
          {{ message }}
        </p>
        <p class="text-slate-500 text-right text-xs">
          {{ timestamp }}
        </p>
      </div>
    </div>
  </div>
</template>
