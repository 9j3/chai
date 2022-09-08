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
const chatSegments = ref([]);

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
  message.value = '';
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
    console.log('param changed');
    socket.emit('room:switch', {
      before: oldId,
      after: id,
    });

    chaiStore.$patch((state) => {
      state.messages = [];
      state.rooms[id].msgCnt = 0;
      state.rooms[oldId].msgCnt = 0;
    });

    chaiStore.getMessages(id);
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

  chatSegments.value[chatSegments.value.length - 1].scrollIntoView(false);
});

socket.on('message:push', ({ room }) => {
  chaiStore.$patch((state) => {
    state.rooms[room]['msgCnt']++;
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
        <div class="h-full w-80 border-r pt-10 px-5">
          <p class="text-xs font-medium text-gray-400">TEXT-CHANNELS</p>

          <router-link
            v-for="(room, roomId) in rooms"
            :key="roomId"
            :to="{
              name: 'chat',
              params: {
                id: roomId,
              },
            }"
            class="mt-4 py-1.5 align-middle text-sm font-medium text-gray-600 group cursor-pointer flex items-end"
            active-class="text-blue-400"
          >
            <span @click="alert('foo')" />
            <ChatBubbleLeftIcon class="w-5 mr-2" />
            <span class="flex-grow">{{ room.name }}</span>
            <span
              v-if="
                chaiStore.getRoomById(roomId).msgCnt &&
                roomId !== $route.params.id
              "
              class="inline-block py-1 px-2 rounded-xl leading-none text-center whitespace-nowrap align-baseline bg-red-400 text-white ml-2 float-right"
              >{{ chaiStore.getRoomById(roomId).msgCnt }}</span
            >
          </router-link>
        </div>

        <div class="w-full h-full flex flex-col">
          <chat-header />
          <div class="h-full overflow-auto px-10 py-4">
            <!-- messages -->
            <div
              v-for="msg in messages"
              :key="msg.id"
              class="w-full flex flex-start overflow-y-auto"
            >
              <div v-if="msg.sender !== sender">
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
                  class="mt-3 float-left bg-slate-50 p-4 rounded-b-xl rounded-tr-xl"
                >
                  <p ref="chatSegments" class="text-sm text-slate-500">
                    {{ msg.content }}
                  </p>
                </div>
              </div>
              <div v-else class="w-full flex justify-end mt-3">
                <div>
                  <div class="flex items-center justify-end">
                    <p class="text-slate-400 text-xs">3:25 PM</p>
                  </div>

                  <div
                    class="mt-3 float-right bg-blue-500 p-4 rounded-b-xl rounded-tl-xl"
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
              />
            </div>
          </div>
        </div>
        <div class="h-full w-64 border-l pt-10 px-5">
          <p class="text-xs font-medium text-gray-400">ONLINE</p>
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
            />
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
