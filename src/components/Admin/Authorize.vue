<template>
  <div class="p-2">
    <div class="shadow rounded bg-white flex flex-col w-10/12 w-4/5 mr-auto ml-auto">
      <nav class="w-full flex justify-between">
        <div
            :class="`w-1/2 text-center border-b-2 flex justify-center items-center ${$router.currentRoute.value.name === 'AdminLetters' ? 'border-blue-500' : 'border-gray-200'}`"
        >
          <router-link
              to="/admin/letters"
              :class="`pt-2 pb-2 w-full h-full ${$router.currentRoute.value.name === 'AdminLetters' ? 'text-blue-500' : 'text-gray-500'}`"
          >Letters</router-link>
        </div>
        <div
            :class="`w-1/2 text-center border-b-2 flex justify-center items-center ${$router.currentRoute.value.name === 'AdminFiles' ? 'border-blue-500' : 'border-gray-200'}`"
        >
          <router-link
              to="/admin/files"
              :class="`pt-2 pb-2 w-full h-full ${$router.currentRoute.value.name === 'AdminFiles' ? 'text-blue-500' : 'text-gray-500'}`"
          >Files</router-link>
        </div>
      </nav>
      <Letters v-if="$router.currentRoute.value.name === 'AdminLetters'"></Letters>
      <Files v-if="$router.currentRoute.value.name === 'AdminFiles'"></Files>
    </div>
  </div>
</template>

<script>
import Files from './Files.vue';
import Letters from './Letters.vue';

export default {
  name: 'Authorize',
  components: {
    Letters,
    Files
  }
};
</script>

<style scoped>

</style>
