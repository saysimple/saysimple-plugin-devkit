<template>
  <div class="home">
    <b-row>
      <b-col cols="12" xl="3" lg="4" md="6">
        <b-card>
          <b-card-title>Apps page</b-card-title>

          <template #header>
            <img
              :src="currentApp.package.saysimple.icon"
              class="mr-1 round-large"
              height="35"
            />
            {{ currentApp.name }}
          </template>

          <b-card-text class="text-secondary">
            <small>{{
              currentApp.package.saysimple.description || "N/A"
            }}</small>
          </b-card-text>

          <template #footer>
            <div class="w-100 text-right">
              <b-button class="mb-50 font-weight-normal" variant="light"
                ><font-awesome-icon
                  class="mr-50"
                  icon="trash"
                />Uninstall</b-button
              >

              <b-button
                v-b-tooltip.hover
                title="App Settings"
                class="mb-50 ml-50"
                variant="primary"
                ><font-awesome-icon icon="gear"
              /></b-button>
            </div>
          </template>
        </b-card>
      </b-col>

      <b-col>
        <b-card>
          <b-card-title>Settings page</b-card-title>
          <AppSettings :key="rerenderCounter" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import AppSettings from "@/components/AppSettings.vue";
import Vue from "vue";
import {
  BRow,
  BCol,
  BCard,
  BCardTitle,
  BCardText,
  BButton,
  VBTooltip,
} from "bootstrap-vue";
import { useEmitter } from "@/composables/useEmitter";
import { onUnmounted, ref } from "@vue/composition-api";
import { useApps } from "@/composables/useApps";

export default Vue.extend({
  name: "AppSettingsViewer",
  directives: {
    "b-tooltip": VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BCard,
    BCardText,
    BButton,
    BCardTitle,
    AppSettings,
  },
  setup() {
    const { emitter } = useEmitter();
    const { currentApp } = useApps();

    const rerenderCounter = ref(0);

    const rerender = () => {
      rerenderCounter.value++;
    };

    emitter.on("refresh", rerender);

    onUnmounted(() => {
      emitter.off("refresh", rerender);
    });

    return {
      currentApp,
      rerenderCounter,
    };
  },
});
</script>

<style scoped></style>
