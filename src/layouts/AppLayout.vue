<template>
  <div>
    <AppHeader />

    <b-card no-body>
      <b-card-header header-tag="nav">
        <b-nav card-header tabs>
          <b-nav-item to="/" exact exact-active-class="active">
            Settings
          </b-nav-item>
          <b-nav-item to="/viewer" exact exact-active-class="active">
            Viewer
          </b-nav-item>
        </b-nav>
      </b-card-header>

      <b-card-body>
        <slot />
      </b-card-body>
    </b-card>
  </div>
</template>

<script lang="ts">
import { BCard, BCardBody, BCardHeader, BNav, BNavItem } from "bootstrap-vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "defaultLayout",
  components: {
    AppHeader,
    BCard,
    BCardHeader,
    BCardBody,
    BNav,
    BNavItem,
  },
};
</script>
