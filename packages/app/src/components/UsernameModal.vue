<template>
  <div
    id="modal-id"
    class="min-w-screen backdrop-blur backdrop-brightness-75 h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
  >
    <div
      class="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
    >
      <!--content-->
      <div class="">
        <!--body-->
        <div class="text-center p-5 flex-auto justify-center">
          <h2 class="text-2xl mb-4 text-slate-700">
            Welcome to the chatspace
          </h2>
          <div>
            <input
              v-model.lazy="i_sender"
              type="text"
              class="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
              placeholder="Your name"
            >
            <button
              class="px-4 rounded-r-lg bg-blue-700 text-white w-1/3 font-bold p-2 uppercase"
              @click.stop="register()"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useChaiStore } from '@/stores/chai.store';
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const socket = inject('$SOCKET');
const chaiStore = useChaiStore();
const i_sender = ref();

console.log(socket);

const register = () => {
  socket.connect();
  socket.emit('client:init', i_sender.value);
  socket.emit('room:join', route.params.id);
  chaiStore.$patch({
    sender: i_sender.value,
  });
};
</script>
