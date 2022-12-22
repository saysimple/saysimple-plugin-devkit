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
import { useAppStorage } from "@/composables/useAppStorage";

export default Vue.extend({
  components: {
    AppLayout,
  },
  setup() {
    const { loadApps, init: initApps } = useApps();
    const { loadSettings, init: initSettings } = useAppSettings();
    const { loadStorage, init: initStorage } = useAppStorage();
    const { init: initAppData } = useAppData();

    provideToast({});

    initAppData();
    initApps();
    initSettings();
    initStorage();

    loadApps(saysimpleApps);
    loadSettings(saysimpleApps);
    loadStorage(saysimpleApps);
  },
});
</script>
