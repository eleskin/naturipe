<template>
  <div>
    <Unauthorize v-if="!isLogin" :onauthorization="onAuthorization"></Unauthorize>
    <Authorize v-if="isLogin"></Authorize>
  </div>
</template>

<script>
import Unauthorize from '../components/Admin/Unauthorize.vue';
import Authorize from '../components/Admin/Authorize.vue';
import router from '../router';

export default {
  name: 'Admin',
  data: () => ({
    isLogin: false,
  }),
  methods: {
    onAuthorization(state = false) {
      if (state) router.push('/admin/letters');
      this.isLogin = state;
    }
  },
  components: {
    Authorize,
    Unauthorize
  }
};
</script>

<style scoped>

</style>
