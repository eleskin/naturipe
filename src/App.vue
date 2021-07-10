<template>
  <div class="app" :style="{ backgroundImage: 'url(' + backgroundImage + ')'}">
    <router-view></router-view>
  </div>
</template>

<script>
import backgroundImage from './assets/img/background-image.jpg';
export default {
  name: 'App',
  data: () => ({
    backgroundImage: backgroundImage
  }),
};
</script>

<style>
.app {
  background: no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  width: 100vw;
}
</style>
