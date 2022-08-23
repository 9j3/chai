<script setup>
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import { useAuthStore } from '@/stores'

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
})

async function onSubmit(values) {
  const authStore = useAuthStore()
  const { username, password } = values
  await authStore.login(username, password)
}
</script>

<template>
  <div class="h-screen flex">
    <div
      class="flex w-1/2 bg-gradient-to-r from-orange-500 to-orange-300 i justify-around items-center"
    >
      <div>
        <h1 class="text-white font-bold text-4xl font-sans">
          chai<span class="text-amber-800">.space</span>
        </h1>
        <p class="text-white mt-1">Die Teams Alternative</p>
        <div class="flex space-x-3">
          <button
            type="submit"
            class="block w-36 space-3 bg-amber-800 text-white mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Neuer Benutzer?
          </button>
          <button
            type="submit"
            class="block w-36 bg-white text-amber-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Mehr erfahren
          </button>
        </div>
      </div>
    </div>
    <div class="flex w-1/2 justify-center items-center bg-white">
      <Form
        v-slot="{ errors, isSubmitting }"
        class="bg-white"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
        <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
        <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <Field
            name="username"
            type="text"
            placeholder="Benutzername"
            class="form-control pl-2 outline-none border-none"
            :class="{ 'is-invalid': errors.username }"
          />
          <div class="invalid-feedback">
            {{ errors.username }}
          </div>
        </div>
        <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
          <Field
            name="password"
            type="text"
            placeholder="Passwort"
            class="form-control pl-2 outline-none border-none"
            :class="{ 'is-invalid': errors.password }"
          />
          <div class="invalid-feedback">
            {{ errors.password }}
          </div>
        </div>
        <button
          :disabled="isSubmitting"
          type="submit"
          class="block w-full bg-amber-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          Login
        </button>
        <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer"
          >Forgot Password ?</span
        >
      </Form>
    </div>
  </div>
</template>
