<template>
  <div class="grid w-full grid-cols-1 p-2">
    <div class="text-right mb-4">
      <button
          class="rounded bg-blue-500 hover:bg-blue-600 p-2 text-white outline-none mr-2"
          @click="isActiveNewForm = !isActiveNewForm"
      >
        {{ isActiveNewForm ? 'Cancel' : 'Add file' }}
      </button>
    </div>
    <form
        class="bg-white p-4 flex flex-col justify-center items-center w-full mb-8"
        v-if="isActiveNewForm"
        @submit="(event) => onAddFile(event, activeID, activeIndex)"
    >
      <input
          type="text"
          class="border border-gray-200 focus:border-blue-500 w-full outline-none p-2 mt-4 rounded"
          placeholder="Enter title"
          required
          v-model="title"
      >
      <input
          type="text"
          class="border border-gray-200 focus:border-blue-500 w-full outline-none p-2 mt-4 rounded"
          placeholder="Enter link"
          required
          v-model="link"
      >
      <button
          type="submit"
          class="rounded mt-2 bg-blue-500 hover:bg-blue-600 w-full p-2 text-white outline-none"
      >
        Save
      </button>
    </form>
    <div
        v-for="(file, index) in files"
        class="p-2 rounded border hover:shadow border-gray-200 bg-gray-50 flex justify-between items-center mb-1.5 mt-1.5"
        :key="index"
    >
      <span class="text-lg font-medium">
        {{ file.title }}
        <i class="not-italic block text-sm font-normal text-gray-500">{{ file.link }}</i>
      </span>
      <div>
        <button
            class="rounded bg-yellow-400 hover:bg-yellow-500 p-2 text-white outline-none mr-2"
            @click="() => onChangeFile(file.id, index)"
        >
          Change
        </button>
        <button
            class="rounded bg-red-500 hover:bg-red-600 p-2 text-white outline-none"
            @click="() => onDeleteFile(file.id, index)"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../firebase';

export default {
  name: 'Files',
  data: () => ({
    files: [],
    isActiveNewForm: false,
    title: '',
    link: '',
    activeID: null,
    activeIndex: null
  }),
  mounted() {
    db.collection('files').get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        this.files.push(doc.data());
      });
    });
  },
  methods: {
    onAddFile(event, activeID, activeIndex) {
      event.preventDefault();
      if (!activeID) {
        const file = db.collection('files').doc();

        file.set({title: this.title, link: this.link, id: file.id}).then(() => {
          this.files.push({title: this.title, link: this.link, id: file.id});

          this.title = '';
          this.link = '';
          this.isActiveNewForm = false;
        });
      } else if (activeID) {
        const file = db.collection('files').doc(activeID);

        file.update({title: this.title, link: this.link}).then(() => {
          this.files[activeIndex].title = this.title;
          this.files[activeIndex].link = this.link;

          this.title = '';
          this.link = '';
          this.isActiveNewForm = false;
        });
      }
    },
    onDeleteFile(id, index) {
      db.collection('files').doc(id).delete().then(() => {
        this.files.splice(index, 1);
      });
    },
    onChangeFile(id, index) {
      this.isActiveNewForm = true;
      this.title = this.files[index].title;
      this.link = this.files[index].link;
      this.activeID = this.files[index].id;
      this.activeIndex = index;
    }
  }
};
</script>

<style scoped>

</style>
