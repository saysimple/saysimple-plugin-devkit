<template>
  <b-col class="mb-4" cols="12" xl="3" lg="4" md="6">
    <b-card class="h-100">
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
    </b-card>
  </b-col>
</template>

<script lang="ts">
import Vue from "vue";
import { BCol, BCard, BCardText, BCardTitle, BAvatar } from "bootstrap-vue";

export default Vue.extend({
  components: {
    BCol,
    BCard,
    BCardText,
    BCardTitle,
    BAvatar,
  },
  props: {
    title: String,
    description: String,
    icon: Array,
    variant: String,
  },
});
</script>

<style lang="scss">
.flex-grow {
  flex: 1;
}
</style>
