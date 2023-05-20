import { createApp } from 'vue'
import App from './App.vue'

import Popper from "vue3-popper";

createApp(App).mount('#app')
App.component("PopperToolTip", Popper);