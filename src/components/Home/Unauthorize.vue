<template>
  <div class="unauthorize min-h-screen h-full">
    <img :src="logo" class="w-32 h-32 mt-2 ml-auto mr-auto" alt="">
    <div class="grid h-full w-full grid-cols-1 justify-center items-center p-2">
      <form
          class="shadow rounded bg-white p-4 pt-8 pb-8 flex flex-col justify-center items-center w-10/12 sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-lg mr-auto ml-auto"
          @submit="(event) => onSubmit(event)"
      >
        <h2 class="text-xl font-semibold text-center">Download our latest catalog</h2>
        <input
            type="email"
            class="border border-gray-200 focus:border-blue-500 w-full outline-none p-2 mt-4 rounded"
            placeholder="Enter your email"
            required
            v-model="email"
            @input="errorEmail = null"
        >
        <span v-if="errorEmail" class="mr-auto text-red-400 mt-0.5 mb-1 text-sm">{{ errorEmail }}</span>
        <button
            type="submit"
            class="rounded mt-2 bg-blue-500 hover:bg-blue-600 w-full p-2 text-white outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import logo from '../../assets/img/logo.svg';
import 'firebase/firestore';
import db from '../../firebase/index';

export default {
  name: 'Unauthorize',
  props: ['onenterEmail'],
  data: () => ({
    logo: logo,
    email: '',
    errorEmail: null,
  }),
  methods: {
    async onSubmit(event) {
      event.preventDefault();

      this.errorEmail = null;

      const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (emailRE.test(this.email)) {
        let isExist = false;
        await db.collection('emails').get().then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            if (this.email.toLowerCase() === doc.data().value.toLowerCase()) isExist = true;
          });
        });
        if (!isExist) {
          const today = new Date();
          const dd = String(today.getDate()).padStart(2, '0');
          const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          const yyyy = today.getFullYear();

          const date = mm + '/' + dd + '/' + yyyy;

          await db.collection('emails').add({value: this.email, date: date});
        }
        this.onenterEmail(true);
        localStorage.setItem('email', this.email);
      } else {
        this.errorEmail = 'Invalid email!';
      }
    },
  },
};
</script>

<style scoped>
.unauthorize {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
