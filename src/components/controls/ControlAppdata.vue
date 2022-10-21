<template>
  <control-item
    :title="title"
    :icon="icon"
    :description="description"
    :variant="variant"
  >
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
import { BFormSelect, BFormSelectOption } from "bootstrap-vue";
import { computed } from "@vue/composition-api";

export default Vue.extend({
  components: {
    ControlItem,
    BFormSelect,
    BFormSelectOption,
  },
  props: {
    value: String,
    items: Map,
    title: String,
    description: String,
    icon: Array,
    variant: String,
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

    return {
      item,
    };
  },
});
</script>
