<script setup>
import ChatHeader from '@/components/ChatHeader.vue';
import UsernameModal from '@/components/UsernameModal.vue';
import { useChaiStore } from '@/stores/chai.store';
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline';
import { storeToRefs } from 'pinia';
import { inject, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

console.log('--------------------------------------');
console.log('CHAI IS INITIALIZED :)');
console.log('--------------------------------------');

const route = useRoute();

const chaiStore = useChaiStore();
const { sender, messages, rooms, clients } = storeToRefs(chaiStore);
const socket = inject('$SOCKET');

chaiStore.getRooms();

const message = ref();
let isTypingTimeout;

const sendMessage = () => {
  const msg = {
    id: messages.value.length + 1,
    content: message.value,
    sender: sender.value,
  };

  socket.emit('message:new', {
    room: route.params.id,
    message: msg,
  });
};

const startTyping = () => {
  if (isTypingTimeout !== null) {
    clearTimeout(isTypingTimeout);
    isTypingTimeout = null;
  } else {
    socket.emit('typing:start');

    isTypingTimeout = setTimeout(() => {
      socket.emit('typing:stop');
    }, 1000);
  }
};


// ROUTE WATCHER

watch(
  () => route.params.id,
  (id, oldId) => {
    console.log("param changed")
    socket.emit('room:switch', {
      before: oldId,
      after: id,
    });
    
    chaiStore.$patch({
      messages: [],
    });

    chaiStore.getMessages(id)

  },
);

// EVENTS

socket.on('connection:ack', (clients) => {
  chaiStore.$patch((state) => {
    state.clients = clients;
  });
});

socket.on('message:new', (data) => {
  chaiStore.$patch((state) => {
    state.messages.push(data);
  });
});

socket.on('client:connect', ({ id, client }) => {
  chaiStore.$patch((state) => {
    state.clients[id] = client;
  });
});

socket.on('client:disconnect', ({ id, client }) => {
  chaiStore.$patch((state) => {
    delete state.clients[id];
  });
});

socket.on('typing:start', ({ client }) => {
  chaiStore.$patch((state) => {
    state.clients[client].isTyping = true;
  });
});

socket.on('typing:stop', ({ client }) => {
  chaiStore.$patch((state) => {
    state.clients[client].isTyping = false;
  });
});
</script>

<template>
  <div v-if="!sender">
    <username-modal />
  </div>
  <div class="p-5 h-screen w-full bg-blue-600">
    <div
      class="h-full bg-white flex flex-col rounded-xl overflow-hidden shadow-xl"
    >
      <!-- body -->
      <div class="h-full flex">
        <div class="h-full w-64 border-r pt-10 px-5">
          <p class="text-xs font-medium text-gray-400">
            TEXT-CHANNELS
          </p>

          <router-link
            v-for="room in rooms"
            :key="room.roomId"
            :to="{
              name: 'chat',
              params: {
                id: room.roomId,
              },
            }"
            class="mt-4 py-1.5 text-sm font-medium text-gray-600 group cursor-pointer flex items-center"
            active-class="text-blue-400"
          >
            <span @click="alert('foo')" />
            <ChatBubbleLeftIcon class="w-5 mr-2" />
            {{ room.name }}
          </router-link>
        </div>

        <div class="w-full h-full flex flex-col">
          <chat-header />
          <div class="h-full px-10 py-4">
            <!-- messages -->
            <div
              v-for="msg in messages"
              :key="msg.id"
              class="w-full flex flex-start overflow-y-auto"
            >
              <div
                v-if="msg.sender !== sender"
                class="w-1/2"
              >
                <div class="flex items-center">
                  <img
                    class="h-5 w-5 overflow-hidden rounded-full"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                    alt=""
                  >
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
              <div
                v-else
                class="w-full flex justify-end mt-3"
              >
                <div class="w-1/2">
                  <div class="flex items-center justify-end">
                    <p class="font-semibold mr-3 text-sm text-slate-600">
                      Me <span class="text-slate-400 text-xs">3:25 PM</span>
                    </p>

                    <img
                      class="h-5 w-5 overflow-hidden rounded-full"
                      src="https://source.unsplash.com/random/500x500/?face"
                      alt=""
                    >
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
                @input="startTyping()"
              >
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
        <div class="h-full w-72 border-l pt-10 px-5">
          <p class="text-xs font-medium text-gray-400">
            ONLINE
          </p>
          <!-- menu-item -->
          <div
            v-for="(clientVal, clientKey) in clients"
            :key="clientKey"
            class="mt-4 py-1.5 text-sm font-medium text-slate-500 hover:text-blue-500 group cursor-pointer flex items-center"
          >
            <img
              class="h-8 w-8 overflow-hidden rounded-full"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
              alt=""
            >
            <div class="flex flex-col">
              <span class="ml-2">{{ clientVal.username }}</span>
              <span class="ml-2 text-slate-300">{{
                clientVal.isTyping ? '...typing' : ''
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
