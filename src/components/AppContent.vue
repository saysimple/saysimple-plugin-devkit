<template>
  <div class="m-2" v-if="currentApp">
    <header
      class="mb-1 d-flex align-items-center bg-light text-dark round mb-1"
    >
      <div class="app-icon d-flex align-items-center justify-content-center">
        <div
          class="app-icon-container round-large"
          :style="{
            backgroundImage: `url('${currentApp.package.saysimple.icon}')`,
          }"
        />
      </div>
      <span class="m-0 text-dark flex-fill">
        <strong>{{ currentApp.name }}</strong>
      </span>
    </header>

    <component
      :is="currentApp.components.content"
      :app="currentApp"
      :appData="currentAppData"
      @open-app-modal="openAppModal"
    />
  </div>
</template>

<script lang="ts">
import { useApps } from "@/composables/useApps";
import { useAppModalData } from "@/composables/useAppModalData";
import Vue from "vue";
import { useAppData } from "@/composables/useAppData";
import router from "@/router";

export default Vue.extend({
  setup() {
    const { currentApp, selectedApp } = useApps();
    const { currentAppData } = useAppData();
    const { updateModalData } = useAppModalData();

    const openAppModal = (data: Record<string, unknown>) => {
      updateModalData(selectedApp.value ?? "", data);

      router.push("/modal");
    };

    return {
      currentApp,
      currentAppData,
      openAppModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.round-large {
  border-radius: 12px !important;
}

.app-icon {
  width: 59.5px;
  height: 59.5px;

  .app-icon-container {
    background-size: cover;
    width: 32px;
    height: 32px;
  }
}
</style>
