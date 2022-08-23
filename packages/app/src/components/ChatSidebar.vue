<template>
  <div class="border-b px-5 py-1 flex justify-between items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="50"
              viewBox="-149.1 -248.49675 1292.2 1490.9805"
            >
              <g transform="translate(-15 -11.5)">
                <linearGradient
                  id="a"
                  y2="1005.5"
                  x2="512"
                  y1="11.5"
                  x1="512"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#00b2ff" />
                  <stop offset="1" stop-color="#006aff" />
                </linearGradient>
                <path
                  d="M512 11.5c-280 0-497 205.1-497 482.1 0 144.9 59.4 270.1 156.1 356.6 8.1 7.3 13 17.4 13.4 28.3l2.7 88.4c.9 28.2 30 46.5 55.8 35.2l98.6-43.5c8.4-3.7 17.7-4.4 26.5-2 45.3 12.5 93.6 19.1 143.9 19.1 280 0 497-205.1 497-482.1S792 11.5 512 11.5z"
                  fill="url(#a)"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                />
                <path
                  d="M213.6 634.6l146-231.6c23.2-36.8 73-46 107.8-19.9l116.1 87.1c10.7 8 25.3 7.9 35.9-.1l156.8-119c20.9-15.9 48.3 9.2 34.2 31.4L664.5 614c-23.2 36.8-73 46-107.8 19.9l-116.1-87.1c-10.7-8-25.3-7.9-35.9.1L247.8 666c-20.9 15.9-48.3-9.2-34.2-31.4z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill="#fff"
                />
              </g></svg
            ></span>
    <!-- search -->
    <div
      class="w-1/2 relative focus-within:shadow-lg"
      x-data="{ search : false }"
    >
      <div
        class="flex items-center w-full focus-within:border px-3 py-2 focus-within:border-b-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 stroke-slate-300 mr-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search.."
          class="w-full outline-none placeholder:text-slate-300 font-semibold"
        />
      </div>
      <!-- alpine js  -->
      <div
        class="absolute w-full border bg-white"
        x-data="alpineInstance()"
        x-show="search"
      >
        <div >
          <div
            class="w-full px-4 py-3 border-b last:border-b-0 flex items-start hover:bg-slate-50 cursor-pointer"
          >
            <img
              class="h-12 w-12 border rounded-full"
              alt=""
            />
            <div class="ml-4">
              <p
                x-text="user.name"
                class="text-md font-semibold text-slate-600 m-0 p-0"
              />
              <p
                class="text-xs text-slate-400 -mt-0.5"
                x-text="user.email"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- profile -->
    <div class="flex space-x-4 items-center">
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
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <img
        src="https://source.unsplash.com/random/500x500/?face"
        class="h-10 w-10 rounded-full"
        alt=""
      />
    </div>
  </div>
</template>

