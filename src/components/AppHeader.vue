<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-brand class="d-flex align-items-center">
      <img src="@/assets/logo.svg" class="logo" alt="saysimple-logo" />
      <span class="ml-2"> Saysimple plugin devkit </span>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <country-flag
              rounded
              :country="localeToCountry($i18n.locale)"
              size="small"
            />
            Language
          </template>

          <b-dropdown-item
            v-for="locale in $i18n.availableLocales"
            :key="locale"
          >
            <div
              class="d-flex align-items-center"
              @click="$i18n.locale = locale"
            >
              <div>
                <country-flag rounded :country="localeToCountry(locale)" />
              </div>
              <div class="ml-2">{{ localeToLanguage(locale) }}</div>
            </div>
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown :text="`${app}`" right>
          <b-dropdown-item
            v-for="[name, { value }] in apps"
            :key="name"
            @click="app = name"
          >
            <b-avatar
              class="mr-2"
              rounded="lg"
              :src="value.package.saysimple.icon"
            ></b-avatar>
            {{ name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-form>
          <b-button @click="refresh">Refresh</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import {
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse,
  BButton,
  BNavItemDropdown,
  BDropdownItem,
  BAvatar,
  BNavForm,
} from "bootstrap-vue";
import { useApps } from "@/composables/useApps";
import { computed } from "@vue/composition-api";
import CountryFlag from "vue-country-flag";
import Vue from "vue";
import { useEmitter } from "@/composables/useEmitter";

export default Vue.extend({
  name: "AppHeader",
  components: {
    CountryFlag,
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BButton,
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
    BNavForm,
  },
  setup() {
    const { emitter } = useEmitter();
    const { apps, selectedApp, setCurrentApp } = useApps();

    const refresh = () => {
      emitter.emit("refresh");
    };

    const localeToCountry = (locale: string): string => {
      if (locale === "en") {
        return "gb";
      }

      return locale;
    };

    const localeToLanguage = (locale: string): string => {
      switch (locale) {
        case "en":
          return "English";
        case "es":
          return "Spanish";
        case "nl":
          return "Dutch";
        default:
          return "Other";
      }
    };

    const app = computed<string>({
      get() {
        return selectedApp.value;
      },
      set(value) {
        setCurrentApp(value);
      },
    });

    return {
      app,
      apps,
      refresh,
      localeToCountry,
      localeToLanguage,
    };
  },
});
</script>

<style scoped lang="scss">
.logo {
  height: 40px;
}
</style>
