<template>
  <div class="w-full px-5 py-3">
    <div
      class="h-12 flex justify-between px-3 items-center border border-transparent bg-slate-50 focus-within:border-slate-300 rounded-lg"
    >
      <input
        type="text"
        class="w-full px-3 bg-transparent outline-none placeholder:text-slate-400"
        placeholder="Type your message"
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
</template>