<template>
  <div class="home">
    <b-row class="flex-column-reverse flex-md-row">
      <b-col cols="12" xl="9" lg="8" md="6">
        <AppControls />
      </b-col>
      <b-col cols="12" xl="3" lg="4" md="6">
        <AppContent :key="rerenderKey" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppContent from "@/components/AppContent.vue";
import AppControls from "@/components/controls/AppControls.vue";
import { BRow, BCol } from "bootstrap-vue";
import { useAppData } from "@/composables/useAppData";
import { onUnmounted, ref, watch } from "@vue/composition-api";
import { useEmitter } from "@/composables/useEmitter";

export default Vue.extend({
  name: "AppViewer",
  components: {
    BRow,
    BCol,
    AppContent,
    AppControls,
  },
  setup() {
    const { emitter } = useEmitter();
    const { users, currentAppData, contacts, refreshSeed } = useAppData();

    const rerenderKey = ref(1);

    const rerenderApp = () => {
      rerenderKey.value++;
      refreshSeed();
    };

    emitter.on("refresh", rerenderApp);

    onUnmounted(() => {
      emitter.off("refresh", rerenderApp);
    });

    watch(currentAppData, () => rerenderKey.value++, { deep: true });

    return { rerenderKey, users, currentAppData, contacts };
  },
});
</script>
