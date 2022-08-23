import { defineStore } from 'pinia'

import { fetchWrapper } from '@/helpers'
import { useAuthStore } from '@/stores'

const baseUrl = `http://localhost:3000/api/users`

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {},
    user: {}
  }),
  actions: {
    /**
     * Registers a new user
     * @param user
     * @returns {Promise<void>}
     */
    async register(user) {
      await fetchWrapper.post(`${baseUrl}/register`, user)
    },

    /**
     * Fetches all users
     * TODO: We may not need this
     * @returns {Promise<void>}
     */
    async getAll() {
      this.users = { loading: true }
      try {
        const { data } = await fetchWrapper.get(baseUrl)
        console.log(data)
        this.users = data
      } catch (error) {
        this.users = { error }
      }
    },

    /**
     * Fetches a user by id
     * @param id
     * @returns {Promise<void>}
     */
    async getById(id) {
      this.user = { loading: true }
      try {
        this.user = await fetchWrapper.get(`${baseUrl}/${id}`)
      } catch (error) {
        this.user = { error }
      }
    },

    /**
     * Updates an existing user
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async update(id, params) {
      await fetchWrapper.put(`${baseUrl}/${id}`, params)

      // update stored user if the logged in user updated their own record
      const authStore = useAuthStore()
      if (id === authStore.user.id) {
        // update local storage
        const user = { ...authStore.user, ...params }
        localStorage.setItem('user', JSON.stringify(user))

        // update auth user in pinia state
        authStore.user = user
      }
    },

    /**
     * Deletes an existing user
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
      // add isDeleting prop to user being deleted
      this.users.find(x => x.id === id).isDeleting = true

      await fetchWrapper.delete(`${baseUrl}/${id}`)

      // remove user from list after deleted
      this.users = this.users.filter(x => x.id !== id)

      // auto logout if the logged in user deleted their own record
      const authStore = useAuthStore()
      if (id === authStore.user.id) {
        authStore.logout()
      }
    }
  }
})
