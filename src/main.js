import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faHouse, faPersonDigging, faLocationDot, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";

import App from "./App.vue";
import router from "./router";
import.meta.hot;

// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import materialKit from "./material-kit";

library.add(faHouse);
library.add(faPersonDigging);
library.add(faLocationDot);
library.add(faCircleDollarToSlot);

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(materialKit);
app.mount("#app");
