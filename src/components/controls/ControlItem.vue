<template>
  <b-col class="mb-4" cols="12" xl="3" lg="4" md="6">
    <b-card class="relative h-100">
      <div class="h-100 d-flex flex-column">
        <b-card-title>
          <b-avatar rounded="lg" :variant="variant">
            <font-awesome-icon :icon="icon" />
          </b-avatar>
          {{ title }}
        </b-card-title>

        <b-card-text class="flex-grow">{{ description }}</b-card-text>

        <slot />
      </div>
      <div
        v-if="disabled"
        class="disabled-wrapper"
        :id="`disabled-wrapper-${_uid}`"
      />
    </b-card>

    <b-popover
      triggers="hover"
      placement="bottom"
      :target="`disabled-wrapper-${_uid}`"
      title="Disabled"
    >
      <span>
        {{ title }} is disabled to enable this element you need to add
      </span>
      <span v-for="(warning, index) in warnings" :key="index">
        <b>{{ warning }}</b>
        <span v-if="index === warnings.length - 2"> or </span>
        <span v-else-if="index !== warnings.length - 1">, </span>
      </span>
      <span> to dataRequired inside the package.json </span>
    </b-popover>
  </b-col>
</template>

<script lang="ts">
import Vue from "vue";
import {
  BCol,
  BCard,
  BCardText,
  BCardTitle,
  BAvatar,
  BPopover,
} from "bootstrap-vue";

export default Vue.extend({
  components: {
    BCol,
    BCard,
    BCardText,
    BCardTitle,
    BAvatar,
    BPopover,
  },
  props: {
    title: String,
    description: String,
    icon: Array,
    variant: String,
    disabled: Boolean,
    warnings: Array,
  },
});
</script>

<style lang="scss">
.flex-grow {
  flex: 1;
}

.relative {
  position: relative;
}

.disabled-wrapper {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 0.3;
}
</style>
