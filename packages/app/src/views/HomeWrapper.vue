<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore, useChatStore } from '@/stores'
import ChatDaySeparator from '../components/ChatDaySeparator.vue'
import ChatBubble from '../components/ChatBubble.vue'
import InputBox from '../components/InputBox.vue'
import { useUsersStore } from '@/stores'
import { ref } from 'vue'

// variables
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
usersStore.getAll()

const chatStore = useChatStore()
const { selectedUserId } = storeToRefs(chatStore)

const input = ref('')

// functions
/**
 * todo
 */
function sendMessage() {
  if (input.value) {
    input.value = ''
    // todo: send message to backend
    // scrolling still todo
    // const messageContainer = document.getElementById('message-container')
    // messageContainer.scrollTop = messageContainer.scrollHeight
  }
}
</script>

<template>
  <div v-if="user">
    <div class="p-5 h-screen w-full bg-amber-500">
      <div class="h-screen flex">
        <!-- sidebar -->
        <div class="h-full w-96 bg-slate-50 border-r flex flex-col">
          <div
            class="h-topBar bg-primary border-b text-white text-4xl flex items-center justify-center space-x-4"
          >
            Chai
          </div>
          <div class="h-full overflow-y-auto">
            <div
              v-for="chatUser in users"
              :key="chatUser"
              class="px-5 py-4 flex items-center cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100"
              :class="[
                chatUser.userId === selectedUserId
                  ? 'border-l-4 border-l-blue-500 border-t border-b'
                  : ''
              ]"
              @click="
                chatStore.$patch({
                  selectedUserId: chatUser.userId
                })
              "
            >
              <img
                src="https://avatars.githubusercontent.com/u/35639254"
                class="h-12 w-12 border-2 border-white rounded-full"
                alt=""
              >
              <div class="ml-4">
                <p
                  x-text="user.name"
                  class="text-md font-semibold text-slate-600 m-0 p-0"
                >
                  {{ chatUser.fullName }}
                </p>
                <p
                  class="text-xs text-slate-400 -mt-0.5 font-semibold"
                  x-text="user.email"
                >
                  this is still empty and will be changed soonTM
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- chat view -->
        <div class="w-full h-full flex flex-col">
          <!-- user bar -->
          <div
            class="h-topBar border-b flex bg-primary-lighter justify-between items-center w-full px-5 py-2 shadow-sm"
          >
            <!-- user icon and name -->
            <div class="flex items-center">
              <img
                class="h-10 w-10 overflow-hidden rounded-full"
                src="https://avatars.githubusercontent.com/u/35639254"
                alt=""
              >
              <p class="font-semibold ml-3 text-white">
                {{ selectedUserId }}
              </p>
            </div>
            <!-- triple dots -->
            <div class="flex items-center space-x-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 stroke-white"
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
          <!-- message container -->
          <div
            ref="message-container"
            class="h-full px-10 py-4 overflow-y-auto"
          >
            <ChatDaySeparator :date="new Date()" />
            <!-- messages -->
            <ChatBubble
              v-for="message in messages"
              :key="JSON.stringify(message)"
              :is-my-message="message.sender === 'me'"
              :message="message.text"
              :timestamp="message.timestamp"
            />
            <ChatDaySeparator :date="new Date()" />
          </div>
          <InputBox
            v-model:inputModel="input"
            @send-message="sendMessage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
