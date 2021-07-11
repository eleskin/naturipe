<template>
  <div class="authorize">
    <img :src="logo" class="w-32 h-32 mt-2 ml-auto mr-auto" alt="">
    <div class="grid w-full grid-cols-1 p-2">
      <div class="shadow rounded bg-white p-4 flex flex-col w-10/12 w-4/5 mr-auto ml-auto">
        <div
            v-for="file of files"
            class="p-2 rounded border border-gray-200 bg-gray-50 flex justify-between items-center mb-1.5 mt-1.5 hover:shadow"
        >
          <span class="text-lg font-medium">{{ file.title }}</span>
          <button
              class="rounded bg-blue-500 hover:bg-blue-600 p-2 text-white outline-none"
              @click="onDownload"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../../assets/img/logo.svg';
import db from '../../firebase';
import admin from 'firebase';

export default {
  name: 'Authorize',
  data: () => ({
    logo: logo,
    files: []
  }),
  mounted() {
    db.collection('files').get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        this.files.push(doc.data());
      });
    });
  },
  methods: {
    onDownload() {
      admin
          .firestore()
          .collection('mail')
          .add({
            to: 'eleskin732@mail.ru',
            message: {
              subject: 'Hello from Firebase!',
              text: 'This is the plaintext section of the email body.',
              html: 'This is the <code>HTML</code> section of the email body.',
            },
          })
          .then(() => console.log('Queued email for delivery!'));
    }
  }
};
</script>

<style scoped>
.authorize {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
