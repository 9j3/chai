<script setup>
function createAccount() {
    console.log('create acc');
}
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 class="font-bold text-center text-2xl mb-5">Create a Chai Account</h1>
            <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <div class="px-5 py-7">
                    <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                    <input type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                    <input type="password" class="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full" />
                    <input type="password" placeholder="Repeat password" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    <button type="button" @click="createAccount"
                        class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        <span class="inline-block mr-2">Create Account</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
