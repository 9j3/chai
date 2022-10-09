<template>
  <div v-if="showModal">
    <div
      id="modal-id"
      class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
    >
      <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div
        class="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
      >
        <!--content-->
        <div class="">
          <!--body-->
          <div class="text-center p-5 flex-auto justify-center">
            <h2 class="text-xl font-bold py-4">{{ header }}</h2>
            <p class="text-sm text-gray-500 px-8">
              {{ message }}
            </p>
          </div>
          <!--footer-->
          <div class="p-3 mt-2 text-center space-x-4 md:block">
            <button
              class="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600"
              @click="resetModal()"
            >
              Ok, I'll stop
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useChaiStore } from '../stores/chai.store';

const chaiStore = useChaiStore();
const { showModal } = storeToRefs(chaiStore);

const resetModal = () => {
  chaiStore.$patch((state) => {
    state.showModal = false;
  });
};

defineProps({
  message: {
    type: String,
    default: '',
  },
  header: {
    type: String,
    default: '',
  },
});
</script>
