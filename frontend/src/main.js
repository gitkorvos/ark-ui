import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import ServerList from '@/components/ServerList.vue';
import TestServer from '@/components/TestServer.vue';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ServerList
    },
    {
      path: '/server/:id',
      name: 'ServerDetails',
      component: TestServer,
      
    },
  ],
});

app.use(router);

app.mount('#app');
