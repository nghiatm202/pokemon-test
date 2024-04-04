import { createApp } from "vue";
import { router } from "./routes";
import { createPinia } from "pinia";
import { rippleEffect } from "./composiable/rippleEffect";

import axios from "axios";

import "./tailwind.scss";
import "./style.scss";

import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App).use(router).use(pinia);
app.directive("ripple-effect", rippleEffect);

axios.defaults.baseURL =
  "https://api.eien-development.com/api/pokemon-api/pokemons";
axios.defaults.timeout = 5000;
axios.interceptors.response.use(undefined, function (err) {
  return new Promise(function (_, reject) {
    if (err.code === "ECONNABORTED") {
      err.message = "Server is not responding";
    }
    reject(err);
  });
});

router.isReady().then(() => {
  app.mount("#app");
});
