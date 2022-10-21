import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "@/plugins/toastification";
import "@/plugins/compositionApi";
import "@/plugins/bootstrap";
import "@/plugins/font-awesome";
import { i18n } from "@/plugins/i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
