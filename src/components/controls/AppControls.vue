<template>
  <b-row class="align-items-stretch">
    <control-app-data
      v-model="contactString"
      :dataRequiredPresent="
        isRequiredAppDataPresent(['contact', 'contact_metadata'])
      "
      :icon="['fas', 'user']"
      :items="contacts"
      description="A contact is a person contacting a company through a channel supported by Saysimple (such as WhatsApp)"
      title="Contact"
      variant="primary"
    />

    <control-app-data
      v-model="loggedInUserString"
      :dataRequiredPresent="isRequiredAppDataPresent(['agent'])"
      :icon="['fas', 'user-tie']"
      :items="users"
      description="The agent is the person currently logged in"
      title="Agent"
      variant="primary"
    />

    <control-app-data
      v-model="assignedUserString"
      :dataRequiredPresent="isRequiredAppDataPresent(['assignedAgent'])"
      :icon="['fas', 'user-tag']"
      :items="users"
      description="This is the agent assigned to the chat. This is not
          necessarily the logged in agent since you're able to view
          chats assigned to other agents"
      title="Assigned agent"
      variant="primary"
    />

    <control-app-data
      v-model="chatString"
      :dataRequiredPresent="
        isRequiredAppDataPresent(['conversation', 'messages', 'tags'])
      "
      :icon="['fas', 'comment']"
      :items="chats"
      description="A chat contains data about the correspondence between a contact and the business through Saysimple"
      title="Chat"
      variant="success"
    />

    <control-app-data
      v-model="selectedChannelString"
      :dataRequiredPresent="
        isRequiredAppDataPresent(['channels', 'channels_auth'])
      "
      :icon="['fas', 'comment']"
      :items="channels"
      description="Channels is an array of social accounts which have been connected to Saysimple so we can show you the messages that account receives and or sends. Examples are WhatsApp accounts or Twitter accounts"
      title="Channels"
      variant="success"
    />

    <control-item
      :icon="['fas', 'fa-circle-info']"
      description="The data that is given to the app"
      title="App info"
      variant="warning"
    >
      <json-viewer :value="currentApp.package" />
    </control-item>

    <control-item
      :icon="['fas', 'gears']"
      description="The settings object that is supplied to the current app"
      title="Settings"
      variant="warning"
    >
      <json-viewer :value="currentApp.settings" />
    </control-item>

    <control-item
      :icon="['fas', 'database']"
      description="Storage can be used to store data for the plugin just like settings. However where all settings are fetched before rendering the plugin, storage needs to be manually fetched."
      title="Storage"
      variant="warning"
    >
      <json-viewer :value="storage.value" />
    </control-item>

    <control-item
      :icon="['fas', 'user-gear']"
      description="The data about the Saysimple that is given to the app, see readme for more info"
      title="App data"
      variant="warning"
    >
      <json-viewer :value="currentAppData" />
    </control-item>
  </b-row>
</template>

<script lang="ts">
import { BRow } from "bootstrap-vue";
import ControlAppData from "@/components/controls/ControlAppData.vue";
import ControlItem from "@/components/controls/ControlItem.vue";
import { useAppData } from "@/composables/useAppData";
import { computed } from "@vue/composition-api";
import Vue from "vue";
import { useApps } from "@/composables/useApps";
import { useAppStorage } from "@/composables/useAppStorage";

export default Vue.extend({
  name: "AppControls",
  components: {
    ControlItem,
    ControlAppData,
    BRow,
  },
  setup() {
    const {
      users,
      currentAppData,
      selectedChannelString,
      loggedInUserString,
      assignedUserString,
      chatString,
      contactString,
      contacts,
      channels,
      chats,
    } = useAppData();
    const { getStorage } = useAppStorage();

    const { currentApp } = useApps();

    const storage = computed(() => getStorage(currentApp.value?.name || ""));

    const isRequiredAppDataPresent = (
      moduleDataRequired: string[]
    ): { disabled: boolean; warnings: string[] } => {
      if (!currentApp.value) {
        return {
          disabled: true,
          warnings: [],
        };
      }

      const warnings = moduleDataRequired.filter(
        (appDataRequired) =>
          !currentApp.value?.package.saysimple.dataRequired.includes(
            appDataRequired
          )
      );

      return {
        disabled: warnings.length === moduleDataRequired.length,
        warnings: warnings,
      };
    };

    return {
      users,
      chats,
      contacts,
      currentApp,
      contactString,
      assignedUserString,
      loggedInUserString,
      selectedChannelString,
      chatString,
      channels,
      storage,
      currentAppData,
      isRequiredAppDataPresent,
    };
  },
});
</script>

<style lang="scss" scoped>
.json-preview {
  max-height: 300px;
  overflow: auto;
}
</style>
