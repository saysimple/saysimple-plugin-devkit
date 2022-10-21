import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AppViewer from "@/views/AppViewer.vue";
import AppSettingsViewer from "@/views/AppSettingsViewer.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "AppSettingsViewer",
    component: AppSettingsViewer,
  },
  {
    path: "/viewer",
    name: "AppViewer",
    component: AppViewer,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
