<template>
  <div class="flex flex-col h-screen justify-center items-center">
    <img :src="logo" class="w-32 h-32 mb-2" alt="">
    <form
        class="shadow rounded bg-white p-4 flex flex-col justify-center items-center mt-2 w-10/12 sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-lg"
        @click="(event) => onSubmit(event)"
    >
      <h2 class="text-xl font-semibold text-center">Download our latest catalog</h2>
      <input
          type="email"
          class="border border-gray-200 focus:border-blue-500 w-full outline-none p-2 mt-4 rounded"
          placeholder="Enter your email"
          required
          v-model="email"
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
import logo from '../../assets/img/logo.svg';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  name: 'Unauthorize',
  props: ['onenterEmail'],
  data: () => ({
    logo: logo,
    email: '',
  }),
  methods: {
    onSubmit(event) {
      event.preventDefault();

      const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const firebaseConfig = {
        apiKey: 'AIzaSyBdKWj0Y4jM_hmcyA8YUSIEAk4EZxoEmpU',
        authDomain: 'my-project-1558775535295.firebaseapp.com',
        projectId: 'my-project-1558775535295',
        storageBucket: 'my-project-1558775535295.appspot.com',
        messagingSenderId: '645661619503',
        appId: '1:645661619503:web:36eb0d39f654c3df9f5dda',
        measurementId: 'G-T51ZW0CWJX'
      };

      let db;

      if (!firebase.apps.length) {
        db = firebase.initializeApp(firebaseConfig).firestore();
      } else {
        db = firebase.app().firestore();
      }

      if (emailRE.test(this.email)) {
        let isExist = false;
        db.collection('emails').get().then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            if (this.email.toLowerCase() === doc.data().value.toLowerCase()) isExist = true;
          });
        });
        if (isExist) db.collection('emails').add({value: this.email});
        this.onenterEmail(true);
        localStorage.setItem('isEnterEmail', 'true');
      } else {
        console.log('Invalid email!');
      }
    },
  },
};
</script>

<style scoped>

</style>
