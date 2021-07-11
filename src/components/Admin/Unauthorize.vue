<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <form
        class="shadow rounded bg-white p-4 flex flex-col justify-center items-center w-10/12 sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-lg mr-auto ml-auto"
        @submit="(event) => login(event)"
    >
      <h2 class="text-xl font-semibold text-center">Log In</h2>
      <input
          type="email"
          class="border border-gray-200 focus:border-blue-500 w-full outline-none p-2 mt-4 rounded"
          placeholder="Enter your email"
          required
          v-model="email"
      >
      <input
          type="password"
          class="border border-gray-200 focus:border-blue-500 w-full outline-none p-2 mt-4 rounded"
          placeholder="Enter your password"
          required
          v-model="password"
      >
      <button
          type="submit"
          class="rounded mt-2 bg-blue-500 hover:bg-blue-600 w-full p-2 text-white outline-none"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Unauthorize',
  props: ['onauthorization'],
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    login(event) {
      event.preventDefault();
      firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.onauthorization(true);
          })
          .catch(error => {
            alert(error.message);
          });
    },
  }
};
</script>

<style scoped>

</style>
