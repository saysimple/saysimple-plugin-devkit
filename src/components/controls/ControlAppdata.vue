<template>
  <control-item
    :title="title"
    :icon="icon"
    :description="description"
    :variant="variant"
    :disabled="dataRequiredPresent.disabled"
    :warnings="dataRequiredPresent.warnings"
  >
    <div v-if="!dataRequiredPresent.disabled">
      <b-alert
        variant="warning"
        show
        dismissible
        v-for="warning in warnings"
        :key="warning"
        @dismissed="dismissWarning(warning)"
      >
        The package doesn't have <b>{{ warning }}</b> in dataRequired not all
        data in the {{ title }} object will be sent to the app
      </b-alert>
    </div>

    <b-form-select v-model="item">
      <b-form-select-option v-for="[key] in items" :key="key" :value="key">
        {{ key }}
      </b-form-select-option>
    </b-form-select>
  </control-item>
</template>

<script lang="ts">
import Vue from "vue";
import ControlItem from "@/components/controls/ControlItem.vue";
import { BFormSelect, BFormSelectOption, BAlert } from "bootstrap-vue";
import { computed } from "@vue/composition-api";

export default Vue.extend({
  components: {
    ControlItem,
    BFormSelect,
    BFormSelectOption,
    BAlert,
  },
  props: {
    value: String,
    items: Map,
    title: String,
    description: String,
    icon: Array,
    variant: String,
    dataRequiredPresent: Object,
  },
  setup(props, { emit }) {
    const item = computed({
      get() {
        return props.value;
      },
      set(value) {
        emit("input", value);
      },
    });

    const warnings = computed(() =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      props.dataRequiredPresent.warnings.filter(
        (warning: string) =>
          localStorage.getItem(`warning-${props.title}-${warning}`) !== "true"
      )
    );

    const dismissWarning = (warning: string) => {
      localStorage.setItem(`warning-${props.title}-${warning}`, "true");
    };

    return {
      item,
      warnings,
      dismissWarning,
    };
  },
});
</script>
