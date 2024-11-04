import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

// Import Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faViber,
  faLine,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Add icons to the library
library.add(faFacebook, faViber, faLine, faPhone);

const app = createApp(App);

// Register Font Awesome component globally
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
