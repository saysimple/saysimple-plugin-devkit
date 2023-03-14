<template>
  <component
    v-if="currentApp"
    :is="currentApp.components.settings"
    :app="currentApp"
  />
</template>

<script lang="ts">
import { useApps } from "@/composables/useApps";
import Vue from "vue";

export default Vue.extend({
  setup() {
    const { currentApp } = useApps();

    return {
      currentApp,
    };
  },
});
</script>

<style scoped></style>
