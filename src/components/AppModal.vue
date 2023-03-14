<template>
  <b-card class="maxHeight">
    <component
      v-if="currentApp"
      :is="currentApp.components.modal"
      :app="currentApp"
      :appData="currentAppData"
      :modalData="currentModalData"
    />
  </b-card>
</template>

<script lang="ts">
import { useApps } from "@/composables/useApps";
import Vue from "vue";
import { useAppData } from "@/composables/useAppData";
import { useAppModalData } from "@/composables/useAppModalData";
import { computed } from "@vue/composition-api";
import { BCard } from "bootstrap-vue";

export default Vue.extend({
  components: {
    BCard,
  },
  setup() {
    const { currentApp, selectedApp } = useApps();
    const { currentAppData } = useAppData();
    const { getModalData } = useAppModalData();

    const currentModalData = computed(
      () => getModalData(selectedApp.value ?? "").value
    );

    return {
      currentApp,
      currentAppData,
      currentModalData,
    };
  },
});
</script>

<style scoped>
.maxHeight {
  max-height: calc(100vh - 162px);
  overflow: auto;
}
</style>
