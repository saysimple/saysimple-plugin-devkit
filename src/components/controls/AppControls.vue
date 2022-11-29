<template>
  <b-row class="align-items-stretch">
    <control-appdata
      title="Contact"
      :icon="['fas', 'user']"
      description="A contact is a person contacting a company through a channel supported by saysimple (such as WhatsApp)"
      variant="primary"
      :items="contacts"
      :dataRequiredPresent="isRequiredAppDataPresent(['contact', 'contact_metadata'])"
      v-model="selectedContact"
    />

    <control-appdata
      title="Agent"
      :icon="['fas', 'user-tie']"
      description="The agent is the person currently logged in"
      variant="primary"
      :items="users"
      :dataRequiredPresent="isRequiredAppDataPresent(['agent'])"
      v-model="selectedLoggedInUser"
    />

    <control-appdata
      title="Assigned agent"
      :icon="['fas', 'user-headset']"
      description="This is the agent assigned to the conversation. This is not
          necessarily the logged in agent since you're able to view
          conversations assigned to other agents"
      variant="primary"
      :items="users"
      :dataRequiredPresent="isRequiredAppDataPresent(['assignedAgent'])"
      v-model="selectedAssignedUser"
    />

    <control-appdata
      title="Chat"
      :icon="['fas', 'comment']"
      description="A chat contains data of the currently opened conversation"
      variant="success"
      :items="chats"
      :dataRequiredPresent="
        isRequiredAppDataPresent(['conversation', 'messages', 'tags'])
      "
      v-model="selectedChat"
    />

    <control-item
      title="App info"
      :icon="['fas', 'fa-memo-circle-info']"
      description="The data that is given to the app"
      variant="warning"
    >
      <pre class="json-preview">{{ currentApp.package }}</pre>
    </control-item>

    <control-item
      title="Settings"
      :icon="['fas', 'gears']"
      description="The settings object that is supplied to the current app"
      variant="warning"
    >
      <pre class="json-preview">{{ currentApp.settings }}</pre>
    </control-item>

    <control-item
      title="App data"
      :icon="['fas', 'user-gear']"
      description="The data that is given to the app"
      variant="warning"
    >
      <pre class="json-preview">{{ currentAppData }}</pre>
    </control-item>
  </b-row>
</template>

<script lang="ts">
import { BRow } from "bootstrap-vue";
import ControlAppdata from "@/components/controls/ControlAppdata.vue";
import ControlItem from "@/components/controls/ControlItem.vue";
import { useAppData } from "@/composables/useAppData";
import { computed } from "@vue/composition-api";
import { i18n } from "@/plugins/i18n";
import Vue from "vue";
import { useApps } from "@/composables/useApps";

export default Vue.extend({
  name: "AppControls",
  components: {
    ControlItem,
    ControlAppdata,
    BRow,
  },
  setup() {
    const {
      users,
      currentAppData,
      loggedInUserString,
      assignedUserString,
      chatString,
      contactString,
      contacts,
      chats,
    } = useAppData();

    const { currentApp } = useApps();

    const selectedChat = computed<string>({
      get() {
        return chatString.value;
      },
      set(value) {
        chatString.value = value;
      },
    });

    const selectedLoggedInUser = computed<string>({
      get() {
        return loggedInUserString.value;
      },
      set(value) {
        loggedInUserString.value = value;
      },
    });

    const selectedAssignedUser = computed<string>({
      get() {
        return assignedUserString.value;
      },
      set(value) {
        assignedUserString.value = value;
      },
    });

    const country = computed(() => {
      if (i18n.locale === "en") {
        return "gb";
      }

      return i18n.locale;
    });

    const selectedContact = computed<string>({
      get() {
        return contactString.value;
      },
      set(value) {
        contactString.value = value;
      },
    });

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
      selectedLoggedInUser,
      selectedAssignedUser,
      selectedChat,
      selectedContact,
      currentAppData,
      country,
      isRequiredAppDataPresent,
    };
  },
});
</script>

<style lang="scss">
.json-preview {
  max-height: 300px;
  overflow: auto;
}
</style>
