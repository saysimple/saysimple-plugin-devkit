import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AppViewer from "@/views/AppViewer.vue";
import AppSettingsViewer from "@/views/AppSettingsViewer.vue";
import AppModalViewer from "@/views/AppModalViewer.vue";

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
  {
    path: "/modal",
    name: "AppModalViewer",
    component: AppModalViewer,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
