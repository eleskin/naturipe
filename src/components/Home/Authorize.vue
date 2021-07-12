<template>
  <div class="authorize relative">
    <img :src="logo" class="w-32 h-32 mt-16 ml-auto mr-auto" alt="">
    <div class="grid w-full grid-cols-1 p-2">
      <div class="shadow rounded bg-white p-4 flex flex-col w-10/12 w-4/5 mr-auto ml-auto">
        <div
            v-for="file of files"
            class="p-2 rounded border border-gray-200 bg-gray-50 flex justify-between items-center mb-1.5 mt-1.5 hover:shadow"
        >
          <span class="text-lg font-medium">{{ file.title }}</span>
          <a
              class="rounded bg-blue-500 hover:bg-blue-600 p-2 text-white outline-none cursor-pointer"
              @click="() => onDownload(file.title, file.link)"
              :href="file.link"
              target="_blank"
          >
            Download
          </a>
        </div>
      </div>
    </div>
    <div
        :class="`bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 absolute w-full ${modalIsActive ? 'modal_active' : 'modal'}`"
        role="alert"
    >
      <p class="font-bold">Informational message</p>
      <p class="text-sm">Information has been sent to your email address.</p>
    </div>
  </div>
</template>

<script>
import logo from '../../assets/img/logo.svg';
import db from '../../firebase';
import axios from 'axios';

export default {
  name: 'Authorize',
  data: () => ({
    logo: logo,
    files: [],
    modalIsActive: false
  }),
  props: ['onenterEmail'],
  mounted() {
    db.collection('files').get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        this.files.push(doc.data());
      });
    });
  },
  methods: {
    onDownload(title, link) {
      if (localStorage.getItem('email')) {

        axios
            .get(`https://us-central1-my-project-1558775535295.cloudfunctions.net/sendMessage?email=${localStorage.getItem('email')}&file=${title}&link=${link}`)
            .then(() => {
              this.modalIsActive = true;
              setTimeout(() => {
                this.modalIsActive = false;
              }, 5000);
            });
      } else {
        localStorage.removeItem('email');
        this.onenterEmail(false);
      }
    }
  }
};
</script>

<style scoped>
.authorize {
  display: grid;
  grid-template-rows: auto 1fr;
}
.modal {
  top: -100%;
  transition: 0.3s ease-in-out;
}
.modal_active {
  top: 0;
  transition: 0.3s ease-in-out;
}
</style>
