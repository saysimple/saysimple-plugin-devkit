<template>
  <b-row class="align-items-stretch">
    <control-app-data
      title="Contact"
      :icon="['fas', 'user']"
      description="A contact is a person contacting a company through a channel supported by Saysimple (such as WhatsApp)"
      variant="primary"
      :items="contacts"
      :dataRequiredPresent="
        isRequiredAppDataPresent(['contact', 'contact_metadata'])
      "
      v-model="contactString"
    />

    <control-app-data
      title="Agent"
      :icon="['fas', 'user-tie']"
      description="The agent is the person currently logged in"
      variant="primary"
      :items="users"
      :dataRequiredPresent="isRequiredAppDataPresent(['agent'])"
      v-model="loggedInUserString"
    />

    <control-app-data
      title="Assigned agent"
      :icon="['fas', 'user-headset']"
      description="This is the agent assigned to the chat. This is not
          necessarily the logged in agent since you're able to view
          chats assigned to other agents"
      variant="primary"
      :items="users"
      :dataRequiredPresent="isRequiredAppDataPresent(['assignedAgent'])"
      v-model="assignedUserString"
    />

    <control-app-data
      title="Chat"
      :icon="['fas', 'comment']"
      description="A chat contains data about the correspondence between a contact and the business through Saysimple"
      variant="success"
      :items="chats"
      :dataRequiredPresent="
        isRequiredAppDataPresent(['conversation', 'messages', 'tags'])
      "
      v-model="chatString"
    />

    <control-app-data
      title="Channels"
      :icon="['fas', 'comment']"
      description="Channels is an array of social accounts which have been connected to Saysimple so we can show you the messages that account receives and or sends. Examples are WhatsApp accounts or Twitter accounts"
      variant="success"
      :items="channels"
      :dataRequiredPresent="
        isRequiredAppDataPresent(['channels', 'channels_auth'])
      "
      v-model="selectedChannelString"
    />

    <control-item
      title="App info"
      :icon="['fas', 'fa-memo-circle-info']"
      description="The data that is given to the app"
      variant="warning"
    >
      <json-viewer :value="currentApp.package" />
    </control-item>

    <control-item
      title="Settings"
      :icon="['fas', 'gears']"
      description="The settings object that is supplied to the current app"
      variant="warning"
    >
      <json-viewer :value="currentApp.settings" />
    </control-item>

    <control-item
      title="Storage"
      :icon="['fas', 'database']"
      description="Storage can be used to store data for the plugin just like settings. However where all settings are fetched before rendering the plugin, storage needs to be manually fetched."
      variant="warning"
    >
      <json-viewer :value="storage.value" />
    </control-item>

    <control-item
      title="App data"
      :icon="['fas', 'user-gear']"
      description="The data about the Saysimple that is given to the app, see readme for more info"
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
import { channels } from "@/data/channels";

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
