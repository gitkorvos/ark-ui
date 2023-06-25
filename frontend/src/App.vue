<template>
  <div>
    <button @click="toggleTheme">Toggle Theme</button>
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
  mounted() {
    const root = document.documentElement;
    root.classList.add('light-theme');
  },
  methods: {
    toggleTheme() {
      const root = document.documentElement;
      if (root.classList.contains('dark-theme')) {
        root.classList.remove('dark-theme');
        root.classList.add('light-theme');
      } else {
        root.classList.remove('light-theme');
        root.classList.add('dark-theme');
      }
    },
},
};


</script>

<style scoped>
@import '@vueform/multiselect/themes/default.css';
@import '@/assets/css/Main.css';
@import '@/assets/css/VueMultiselect.css';

</style>