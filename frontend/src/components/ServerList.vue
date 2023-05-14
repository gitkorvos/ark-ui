<template>
  <div class="container">
    <h1 class="section-header">Server List</h1>

    <div class="serverListContainer">
      <div class="serverList">
        <div class="searchBar">
          <div class="searchInputs">
            <input type="text" v-model="searchTerm" placeholder="Search..." />

            <select v-model="selectedMap" class="mapSelector">
              <i class="fa-sharp fa-solid fa-map"></i>
              <option value="" :key="null">All Maps</option>
              <option v-for="(map, index) in maps" :value="map" :key="index">
                {{ map }}
              </option>
            </select>
          </div>
        </div>
        <ul>
          <li v-for="server in displayedServers" :key="server.id" :class="[
            'hvr-grow',
            {
              'server-status-online': server.player_count >= 2,
              'server-status-offline': server.player_count <= 1,
            },
          ]">
            <strong>{{ server.name }}</strong>
            <div class="server-info">
              <span><i class="lni lni-users"></i> {{ server.player_count }}/70</span>
              <span><i class="lni lni-map"></i> {{ server.map }}</span>
              <span><i class="lni lni-information"></i> {{ server.id }}</span>
            </div>
            <div class="server-status">
              <span :class="{
                'server-status-online': server.player_count >= 2,
                'server-status-offline': server.player_count <= 1,
              }"><i class="lni lni-pulse"></i>{{ serverStatus(server.player_count) }}</span>
            </div>
          </li>
        </ul>
        <div class="pagination">
          <div class="pagination-buttons">
            <button :disabled="currentPage === 1" @click="firstPage"><i class="lni lni-arrow-left-circle"></i>
              First</button>
            <button :disabled="currentPage === 1" @click="prevPage"><i class="lni lni-arrow-left"></i> Previous</button>
          </div>
          <span>Page: {{ currentPage }} &bull; {{ totalPages }}</span>
          <div class="pagination-buttons">
            <button :disabled="currentPage === totalPages" @click="nextPage">Next <i
                class="lni lni-arrow-right"></i></button>
            <button :disabled="currentPage === totalPages" @click="lastPage">Last <i
                class="lni lni-arrow-right-circle"></i></button>
          </div>
        </div>
      </div>

      <div class="serverFilters">
        Test
      </div>
    </div>

  </div>
</template>

<script>
import "hover.css/css/hover-min.css";
import axios from "axios";

export default {
  data() {
    return {
      servers: [],
      searchTerm: "",
      pageSize: 80,
      currentPage: 1,
      selectedMap: "",
      maps: ["Ragnarok", "TheCenter", "TheIsland"], // replace with your own map options
    };
  },
  created() {
    this.fetchData();
    setInterval(this.fetchData, 30 * 1000); // Update data every 30 seconds
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/your-resource"
        );
        this.servers = response.data;
        this.currentPage = 1; // reset current page after fetching new data
      } catch (error) {
        console.error(error);
      }
    },
    nextPage() {
      this.currentPage += 1;
    },
    prevPage() {
      this.currentPage -= 1;
    },
    firstPage() {
      this.currentPage = 1;
    },
    lastPage() {
      this.currentPage = this.totalPages;
    }
  },
  computed: {
    serverStatus() {
      return (playerCount) => {
        if (playerCount >= 2) {
          return 'ONLINE';
        } else {
          return 'OFFLINE';
        }
      }
    },
    filteredServers() {
      const searchTerm = this.searchTerm.toLowerCase().trim();
      const selectedMap = this.selectedMap.toLowerCase().trim();
      if (!searchTerm && !selectedMap) {
        return this.servers;
      }
      return this.servers.filter((server) => {
        const name = server.name.toLowerCase();
        const map = server.map.toLowerCase();
        return (
          (!searchTerm || name.includes(searchTerm)) &&
          (!selectedMap || map === selectedMap)
        );
      });
    },
    displayedServers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredServers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredServers.length / this.pageSize);
    },
  },
  watch: {
    searchTerm() {
      this.currentPage = 1;
    },
    selectedMap() {
      this.totalPages();
    },
  },
};
</script>

<style scoped>@import "@/assets/css/ServerList.css";</style>
