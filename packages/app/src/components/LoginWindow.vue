<script setup>
function loginUser() {
    console.log('login');
}

function resetPassword() {
    console.log('reset pw');
}

function createAccount() {
    console.log('create acc');
}
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 class="font-bold text-center text-2xl mb-5">Chai</h1>
            <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <div class="px-5 py-7">
                    <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                    <input type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                    <input type="password" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    <button type="button" @click="loginUser"
                        class="transition duration-200 bg-primary hover:bg-primary-hover focus:bg-primary-hover text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        <span class="inline-block mr-2">Login</span>
                    </button>
                </div>
                <div class="py-5">
                    <div class="grid grid-cols-2 gap-1">
                        <div class="text-center sm:text-left whitespace-nowrap">
                            <button
                                class="transition duration-200 mx-8 px-2 py-2 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
                                @click="resetPassword">
                                <span class="inline-block ml-1">Forgot Password</span>
                            </button>
                        </div>
                        <div class="text-center sm:text-right whitespace-nowrap">
                            <button
                                class="transition duration-200 mx-8 px-2 py-2 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
                                @click="createAccount">
                                <span class="inline-block ml-1">Create Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
