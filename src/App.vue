<template>
  <div id="app">
    <app-layout>
      <router-view />
    </app-layout>
  </div>
</template>

<script>
import { useApps } from "@/composables/useApps";
import Vue from "vue";
import { saysimpleApps } from "@/saysimpleApps";
import { provideToast } from "vue-toastification/composition";
import { useAppSettings } from "@/composables/useAppSettings";
import AppLayout from "@/layouts/AppLayout";
import { useAppData } from "@/composables/useAppData";

export default Vue.extend({
  components: {
    AppLayout,
  },
  setup() {
    const { loadApps, init: initApps } = useApps();
    const { loadSettings, init: initSettings } = useAppSettings();
    const { init: initAppData } = useAppData();

    provideToast({});

    initAppData();
    initApps();
    initSettings();

    loadApps(saysimpleApps);
    loadSettings(saysimpleApps);
  },
});
</script>
