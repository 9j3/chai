<script setup>
const props = defineProps({
    dateString: String
})
</script>

<template>
  <div class="text-center my-5">
    <hr class="-mb-3">
    <span class="text-xs text-slate-300 font-medium bg-white px-3 -mt-3">{{ dateString }}</span>
  </div>
</template>