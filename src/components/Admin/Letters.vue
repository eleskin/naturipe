<template>
  <div class="grid w-full grid-cols-1 p-2">
    <div class="text-right mb-4">
      <button
          class="rounded bg-blue-500 hover:bg-blue-600 p-2 text-white outline-none mr-2"
      >Export to CSV</button>
    </div>
    <div
        v-for="(letter, index) in letters"
        class="p-2 rounded border hover:shadow border-gray-200 bg-gray-50 flex flex-col items-start mb-1.5 mt-1.5"
        :key="index"
    >
      <span class="text-md mb-1">to: {{ letter.to }}</span>
      <span class="text-md mb-1">html: {{ letter.message.html }}</span>
      <span class="text-md mb-1">subject: {{ letter.message.subject }}</span>
      <span class="text-md mb-1">text: {{ letter.message.text }}</span>
    </div>
  </div>
</template>

<script>
import db from '../../firebase';

export default {
  name: 'Letters',
  data: () => ({
    letters: []
  }),
  mounted() {
    db.collection('mail').get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        this.letters.push(doc.data());
      });
    });
  }
};
</script>

<style scoped>

</style>
