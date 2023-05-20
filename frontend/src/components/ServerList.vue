<template>
  <div class="container">
    <h1 class="section-header">Server List</h1>

    <div class="serverListContainer">
      <div class="serverList">
        <div class="searchBar">
          <div class="searchInputs">
            <input
              type="text"
              v-model="searchTerm"
              placeholder="Search Server(s)..."
            />
          </div>
        </div>
        <ul>
          <li
            v-for="server in displayedServers"
            :key="server.id"
            :class="[
              'hvr-grow',
              {
                'server-status-online': isServerOnline(server.updated_at),
                'server-status-offline': !isServerOnline(server.updated_at),
              },
            ]"
          >
            <strong>{{ server.name }}</strong>
            <div class="server-info">
              <span
                ><i class="lni lni-users"></i>
                {{ server.player_count }}/70</span
              >
              <span><i class="lni lni-map"></i> {{ server.map }}</span>
              <span><i class="lni lni-information"></i> {{ server.id }}</span>
              <br/>
              <div class="server-last-updated">Last Updated &bull; {{ formatTimestamp(server.timestamp) }}</div>
            </div>
            
              <div class="server-status">
                <span :class="{'server-status-online': isServerOnline(server.updated_at), 'server-status-offline': !isServerOnline(server.updated_at),}">
                  <i class="lni lni-pulse"></i>{{ getServerStatusText(server.updated_at) }}
                </span>
              </div>

          </li>
        </ul>

        <div class="pagination">
          <div class="pagination-buttons">
            <button :disabled="currentPage === 1" @click="firstPage">
              <i class="lni lni-arrow-left-circle"></i> First
            </button>
            <button :disabled="currentPage === 1" @click="prevPage">
              <i class="lni lni-arrow-left"></i> Previous
            </button>
          </div>
          <span>Page: {{ currentPage }} &bull; {{ totalPages }}</span>
          <div class="pagination-buttons">
            <button :disabled="currentPage === totalPages" @click="nextPage">
              Next <i class="lni lni-arrow-right"></i>
            </button>
            <button :disabled="currentPage === totalPages" @click="lastPage">
              Last <i class="lni lni-arrow-right-circle"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="serverFilters">
        <div>
          <p>Map Selection</p>
          <Multiselect
            mode="tags"
            placeholder="Choose Map(s)"
            :searchable="true"
            v-model="selectedMaps"
            :options="maps"
            @input="filterServers"
          />
        </div>
        <div>
          <p>Status</p>
          <Multiselect
            mode="single"
            placeholder="Server Status"
            :searchable="true"
            v-model="selectedStatuses"
            :options="options"
            @input="filterServers"
          />
        </div>
        <div>
          <p>Player Count</p>
          <Multiselect
            mode="single"
            placeholder="Below 10, Above 60, etc"
            :searchable="true"
            v-model="selectedStatuses"
            :options="options"
            @input="filterServers"
          />
        </div>
        <div>
          <p>Platform</p>
          <Multiselect
            mode="single"
            placeholder="Platform (Xbox/PS4)"
            :searchable="true"
            v-model="selectedStatuses"
            :options="options"
            @input="filterServers"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "hover.css/css/hover-min.css";
import axios from "axios";
import Multiselect from "@vueform/multiselect";

import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale'; // Import the desired locale if needed


export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      selectedMaps: [], // Updated property to hold selected maps
      selectedStatuses: [], // Updated property to hold selected statuses
      value: null,
      options: ["Batman", "Robin", "Joker"],
      servers: [],
      searchTerm: "",
      pageSize: 80,
      currentPage: 1,
      selectedMap: "",
      maps: [
        { label: "Ragnarok", value: "Ragnarok" },
        { label: "The Center", value: "TheCenter" },
        { label: "The Island", value: "TheIsland" },
        { label: "Abberation", value: "Abberation_P" },
        { label: "Extinction", value: "Extinction" },
        { label: "Valguero", value: "Valguero_P" },
        { label: "Scorched Earth", value: "ScorchedEarth_P" },
        { label: "Crystal Isles", value: "CrystalIsles" },
        { label: "Lost Island", value: "LostIsland" },
        { label: "Genesis: Part 1", value: "Genesis" },
        { label: "Genesis: Part 2", value: "Gen2" },
        { label: "Fjordur", value: "Fjordur" },
      ],
    };
  },
  created() {
    this.fetchData();
    setInterval(this.fetchData, 10 * 60 * 1000); // Update data every 10 minutes
  },
  methods: {
    formatTimestamp(timestamp) {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: enUS });
    },

    isServerOnline(updatedAt) {
    const oneHourInMillis = 10 * 60 * 1000 // Convert 1 hour to milliseconds
    const currentTime = new Date().getTime(); // Get the current time in milliseconds

    const updatedAtTime = new Date(updatedAt).getTime(); // Convert updatedAt string to a Date object and get its time in milliseconds

    return currentTime - updatedAtTime <= oneHourInMillis;
  },
  getServerStatusText(updatedAt) {
    return this.isServerOnline(updatedAt) ? "Online" : "Offline";
  },
    async fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/server-list"
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
    },
    filterServers() {
      this.currentPage = 1;
    },
  },
  computed: {
    serverStatus() {
      return (playerCount) => {
        if (playerCount >= 2) {
          return "ONLINE";
        } else {
          return "OFFLINE";
        }
      };
    },
    filteredServers() {
      const searchTerm = this.searchTerm.toLowerCase().trim();
      const selectedMaps = this.selectedMaps.map((map) =>
        map.toLowerCase().trim()
      );
      const selectedStatuses = this.selectedStatuses;

      if (
        !searchTerm &&
        selectedMaps.length === 0 &&
        selectedStatuses.length === 0
      ) {
        return this.servers;
      }

      return this.servers.filter((server) => {
        const name = server.name.toLowerCase();
        const map = server.map.toLowerCase();
        const playerCount = server.player_count;

        return (
          (!searchTerm || name.includes(searchTerm)) &&
          (selectedMaps.length === 0 || selectedMaps.includes(map)) &&
          (selectedStatuses.length === 0 ||
            selectedStatuses.includes(this.serverStatus(playerCount)))
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
  },
};
</script>

<style scoped>
@import "@/assets/css/ServerList.css";
</style>
<style src="@vueform/multiselect/themes/default.css"></style>
