<template>
  <div class="flex flex-col h-screen justify-center items-center min">
    <img :src="logo" class="w-32 h-32 mb-2" alt="">
    <form
        class="shadow rounded bg-white p-4 flex flex-col justify-center items-center mt-2 w-10/12 sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-lg"
    >
      <h2 class="text-xl font-semibold text-center">Download our latest catalog</h2>
      <input
          type="email"
          class="border border-gray-200 focus:border-blue-500 w-full outline-none p-2 mt-4 rounded"
          placeholder="Enter your email"
      >
      <button
          type="submit"
          class="rounded mt-2 bg-blue-500 hover:bg-blue-600 w-full p-2 text-white"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import logo from '../../assets/img/logo.svg';

export default {
  name: 'Authorize',
  data: () => ({
    logo: logo,
  })
};
</script>

<style scoped>

</style>
