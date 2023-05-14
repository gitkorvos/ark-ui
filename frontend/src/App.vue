<template>
  <div>
    <NavigationBar></NavigationBar>
    <ServerList></ServerList>
  </div>
</template>

<script>
import ServerList from './components/ServerList.vue';
import NavigationBar from './components/NavigationBar.vue';

export default {
  components: {
    ServerList,
    NavigationBar,
  },
};
</script>

<style scoped>
@import '@/assets/css/Main.css';

</style>