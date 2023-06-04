<template>
  <div>
    <NavigationBar></NavigationBar>
    <router-view></router-view>
  </div>

</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
  components: {
    NavigationBar
  },
};
</script>

<style scoped>
@import '@/assets/css/Main.css';

</style>