<template>
  <button @click="toggleNavbar" class="navbar-toggle" v-if="isMobile"><i class="lni lni-menu"></i></button>
  <nav :class="{ 'navbar-active': isActive || !isMobile }" class="navbar" v-if="!isMobile || isActive">
    <div class="navbar-logo">
      <img src="../assets/logo.png">
    </div>
    <div class="navbar-section">
      <p>MENU</p>
      <ul>
        <li>
          <a href="#">
            <i class="lni lni-home"></i>
            Home
          </a>
        </li>
        <li>
          <a href="#about">
            <i class="lni lni-list"></i>
            Servers
          </a>
        </li>
        <li>
          <a href="#contact">
            <i class="lni lni-code"></i>
            Commands
          </a>
        </li>
      </ul>
    </div>

    <div class="navbar-section">
      <p>DASHBOARD</p>
      <ul>
        <li>
          <a href="#">
            <i class="lni lni-discord"></i>
            Login
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      isMobile: false
    };
  },
  methods: {
    toggleNavbar() {
      this.isActive = !this.isActive;
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 1180; // Adjust the breakpoint as needed
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
};
</script>

<style scoped>
@import '@/assets/css/NavigationBar.css';

@media screen and (min-width: 1180px) {
  .navbar-toggle {
    display: none;
  }
}
</style>
