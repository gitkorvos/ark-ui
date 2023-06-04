<template>
  <div class="container">
    <h1 class="section-header">Server View</h1>
    <div class="route-navigation">
      <router-link :to="'/'" class="no-link-styles"><i class="lni lni-home"></i> Server List</router-link><span> // </span><router-link :to="'/server/' + uuid" class="no-link-styles">{{server.data.name}}</router-link>
    </div>
    <div class="content-container">
      <pre>Data {{JSON.stringify(server.data, null, 2)}}</pre> <!-- Here is how you would display a property from the server object -->
      <!-- Other content -->
    </div>
  </div>
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
      try {
        const response = await axios.get(
          `http://localhost:3000/api/server/${uuid.value}`
        );
        server.uuid = uuid.value;
        server.data = response.data;
        console.log(server)
      } catch (error) {
        console.error(error);
      }
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
