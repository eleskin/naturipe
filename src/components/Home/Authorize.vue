<template>
  <div class="flex flex-col h-screen justify-center items-center min">
    <img :src="logo" class="w-32 h-32 mb-2" alt="">
  </div>
</template>

<script>
import logo from '../../assets/img/logo.svg';

export default {
  name: 'Authorize',
  data: () => ({
    logo: logo,
  }),
};
</script>

<style scoped>

</style>
