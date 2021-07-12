<template>
  <div class="grid w-full grid-cols-1 p-2">
    <div class="text-right mb-4">
      <button
          class="rounded bg-blue-500 hover:bg-blue-600 p-2 text-white outline-none mr-2"
          @click="export"
      >Export to CSV
      </button>
    </div>
    <div
        v-for="(email, index) in emails"
        class="p-2 rounded border hover:shadow border-gray-200 bg-gray-50 flex flex-col items-start mb-1.5 mt-1.5"
        :key="index"
    >
      <span class="text-md mb-1">Email: {{ email.value }}</span>
      <span class="text-md mb-1">Date: {{ email.date }}</span>
    </div>
  </div>
</template>

<script>
import db from '../../firebase';

export default {
  name: 'Letters',
  data: () => ({
    emails: []
  }),
  mounted() {
    db.collection('emails').get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        this.emails.push(doc.data());
      });
    });
  },
  methods: {
    export() {
      function flattenObject(ob) {
        const toReturn = {};

        for (let i in ob) {
          if (!ob.hasOwnProperty(i)) continue;

          if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            const flatObject = flattenObject(ob[i]);
            for (let x in flatObject) {
              if (!flatObject.hasOwnProperty(x)) continue;

              toReturn[x] = flatObject[x];
              toReturn[i] = flatObject[x];
            }
          } else {
            toReturn[i] = ob[i];
          }
        }
        return toReturn;
      }

      const items = this.emails.map((item) => flattenObject(item));

      const replacer = (key, value) => value === null ? '' : value;
      const header = Object.keys(items[0]);
      const csv = [
        header.join(','),
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      ].join('\r\n');

      const downloadLink = document.createElement('a');
      const blob = new Blob(['\ufeff', csv]);
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'emails.csv';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }
};
</script>

<style scoped>

</style>
