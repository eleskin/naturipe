<template>
  <div>
    <Unauthorize v-if="!isEnterEmail" :onenter-email="onenterEmail"></Unauthorize>
    <Authorize v-if="isEnterEmail" :onenter-email="onenterEmail"></Authorize>
  </div>
</template>

<script>
import Authorize from '../components/Home/Authorize.vue';
import Unauthorize from '../components/Home/Unauthorize.vue';

export default {
  name: 'Home',
  components: {
    Authorize,
    Unauthorize
  },
  data: () => ({
    isEnterEmail: false,
  }),
  methods: {
    onenterEmail(state = false) {
      this.isEnterEmail = state;
    }
  },
  mounted() {
    this.isEnterEmail = Boolean(localStorage.getItem('email'));
  }
};
</script>

<style scoped>

</style>
