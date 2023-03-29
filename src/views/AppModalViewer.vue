<template>
  <div class="home">
    <b-row class="flex-column-reverse flex-md-row">
      <control-item
        title="Modal data"
        :icon="['fas', 'database']"
        description="data that is sent to the appModal when the modal is opened"
        variant="warning"
      >
        <json-viewer :value="currentModalData || {}" />
      </control-item>
      <b-col cols="12" xl="9" lg="8" md="6">
        <app-modal />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { BCol, BRow } from "bootstrap-vue";
import ControlItem from "@/components/controls/ControlItem.vue";
import AppModal from "@/components/AppModal.vue";
import { computed } from "@vue/composition-api";
import { useApps } from "@/composables/useApps";
import { useAppModalData } from "@/composables/useAppModalData";

export default Vue.extend({
  components: {
    BRow,
    BCol,
    ControlItem,
    AppModal,
  },
  setup() {
    const { selectedApp } = useApps();
    const { getModalData } = useAppModalData();

    const currentModalData = computed(
      () => getModalData(selectedApp.value ?? "").value
    );

    return {
      currentModalData,
    };
  },
});
</script>
