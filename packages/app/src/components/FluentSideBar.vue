<template>
  <div class="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4">
    <div
      class="flex flex-col items-center py-4 flex-shrink-0 w-20 bg-indigo-800 rounded-3xl"
    >
      <ul class="flex flex-col space-y-2 mt-12">
        <li>
          <a href="#" class="flex items-center">
            <span
              class="flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl"
            >
              <HomeIcon class="w-7 ext-violet-400" />
            </span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center">
            <span
              class="flex items-center justify-center text-indigo-100 hover:bg-indigo-700 h-12 w-12 rounded-2xl"
            >
              <ChatBubbleLeftIcon class="w-7 ext-violet-400" />
            </span>
          </a>
        </li>
      </ul>

      <div class="mt-auto">
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton
              class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0"
            >
              BH
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute left-12 bottom-0 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    <UserIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                    Profile
                  </button>
                </MenuItem>
              </div>

              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                    @click="authStore.logout()"
                  >
                    <ArrowLeftOnRectangleIcon
                      :active="active"
                      class="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                    Sign out
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
    <FluentChatConversations />
  </div>
</template>
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import {
  HomeIcon,
  ChatBubbleLeftIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
} from '@heroicons/vue/24/outline';
import FluentChatConversations from '@/components/FluentChatConversations.vue';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>
