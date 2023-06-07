<template>
  <transition name="fade" mode="out-in">
  <div class="page">
    <div class="layout-header-section">
      <h1 class="section-header">Server View</h1>
    </div>

    <div class="route-navigation">
      <router-link :to="'/'" class="no-link-styles"><i class="lni lni-home"></i> Server List</router-link><span> // </span><router-link :to="'/server/' + uuid" class="no-link-styles">{{server.data.name}}</router-link>
    </div>
    <div class="layout-content-section">
      <pre>Info {{JSON.stringify(server.data[0], null, 2)}}</pre>
      <pre>History {{JSON.stringify(server.data[1], null, 2)}}</pre>
    </div>
  </div>


  </transition>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";


export default {
  setup() {
    const route = useRoute();
    const uuid = computed(() => route.params.id);
    const server = reactive({ uuid: "", data: [] }); // Initialize the server object with reactive

    const fetchData = async () => {

      const server_data_response = await axios.get(`http://localhost:3000/api/server/${uuid.value}`);
      const server_history_response = await axios.get(`http://localhost:3000/api/server-history/${uuid.value}`);

      server.uuid = uuid.value;

      server.data = [server_data_response.data, server_history_response.data]

    };

    onMounted(() => {
      fetchData();
      setInterval(fetchData, 10 * 60 * 1000); // Update data every 10 minutes
    });

    return {
      uuid,
      server,  // Return server so it can be used in the template
      fetchData,
    };
  },
};
</script>

<style scoped>
@import '@/assets/css/Server.css';
</style>
