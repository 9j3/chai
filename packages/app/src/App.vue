<script setup>
import { ref } from 'vue';
import { useChaiStore } from '@/stores/chai.store';
import { storeToRefs } from 'pinia';

console.log('--------------------------------------');
console.log('CHAI IS INITIALIZED :)');
console.log('--------------------------------------');

const chaiStore = useChaiStore();
const { sender } = storeToRefs(chaiStore);

const message = ref();
const i_sender = ref();

const messages = ref([
  {
    id: 1,
    content: 'Hello World',
    sender: 'Laurin',
  },
]);

const sendMessage = () => {
  const msg = {
    id: messages.value.length + 1,
    content: message.value,
    sender: sender.value,
  };

  messages.value.push(msg);
};

const register = () => {
  chaiStore.$patch({
    sender: i_sender.value,
  });
};
</script>

<template>
  <div v-if="!sender">
    <div
      id="modal-id"
      class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
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
                v-model.lazy="sender"
                type="text"
                class="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                placeholder="Your name"
              />
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
  </div>
  <div class="p-5 h-screen w-full bg-blue-600">
    <div
      class="h-full bg-white overflow-hidden flex flex-col rounded-xl overflow-hidden shadow-xl"
    >
      <!-- body -->
      <div class="h-auto flex">
        <div class="w-full h-full flex flex-col">
          <div
            class="h-16 border-b flex justify-between items-center w-full px-5 py-2 shadow-sm"
          >
            <div class="flex items-center">
              <p class="font-semibold ml-3 text-slate-600">Chai - Chatspace</p>
            </div>
            <div class="flex items-center space-x-5">
              {{ sender }}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 stroke-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </div>
          </div>
          <div class="h-full px-10 py-4">
            <!-- message container -->
            <div class="text-center my-5">
              <hr class="-mb-3" />
              <span
                class="text-xs text-slate-300 font-medium bg-white px-3 -mt-3"
                >Wednesday, Feburary 5</span
              >
            </div>
            <!-- messages -->
            <div
              v-for="msg in messages"
              :key="msg.id"
              class="w-full flex flex-start overflow-y-auto"
            >
              <div v-if="msg.sender !== sender" class="w-1/2">
                <div class="flex items-center">
                  <img
                    class="h-5 w-5 overflow-hidden rounded-full"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                    alt=""
                  />
                  <p class="font-semibold ml-3 text-sm text-slate-600">
                    {{ msg.sender }}
                    <span class="text-slate-400 text-xs">3:21 PM</span>
                  </p>
                </div>

                <div
                  class="mt-3 w-full bg-slate-50 p-4 rounded-b-xl rounded-tr-xl"
                >
                  <p class="text-sm text-slate-500">
                    {{ msg.content }}
                  </p>
                </div>
              </div>
              <div v-else class="w-full flex justify-end mt-3">
                <div class="w-1/2">
                  <div class="flex items-center justify-end">
                    <p class="font-semibold mr-3 text-sm text-slate-600">
                      Me <span class="text-slate-400 text-xs">3:25 PM</span>
                    </p>

                    <img
                      class="h-5 w-5 overflow-hidden rounded-full"
                      src="https://source.unsplash.com/random/500x500/?face"
                      alt=""
                    />
                  </div>

                  <div
                    class="mt-3 w-full bg-blue-500 p-4 rounded-b-xl rounded-tl-xl"
                  >
                    <p class="text-sm text-white break-words">
                      {{ msg.content }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- me -->

            <div class="text-center my-5">
              <hr class="-mb-3" />
              <span
                class="text-xs text-slate-300 font-medium bg-white px-3 -mt-3"
                >Today, 2:15 AM 5</span
              >
            </div>
            <!-- messages -->
            <div class="w-full flex flex-start">
              <div class="w-1/2">
                <div class="flex items-center">
                  <img
                    class="h-5 w-5 overflow-hidden rounded-full"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                    alt=""
                  />
                  <p class="font-semibold ml-3 text-sm text-slate-600">
                    Mircel Jones
                    <span class="text-slate-400 text-xs">3:21 PM</span>
                  </p>
                </div>

                <div class="mt-3 bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
                  <p class="text-sm text-slate-500">ok, Thanks</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-5 py-3">
            <div
              class="h-12 flex justify-between px-3 items-center border border-transparent bg-slate-50 focus-within:border-slate-300 rounded-lg"
            >
              <input
                v-model="message"
                type="text"
                class="w-full px-3 bg-transparent outline-none placeholder:text-slate-400"
                placeholder="Type your message"
                @keyup.enter="sendMessage()"
              />
              <div class="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 stroke-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 stroke-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
