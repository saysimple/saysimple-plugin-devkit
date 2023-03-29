import { users } from "@/data/users";
import { contacts } from "@/data/contacts";
import { chats } from "@/data/chats";
import { channels } from "@/data/channels";
import { computed, ref, Ref } from "@vue/composition-api";
import { useDataParser } from "@/composables/useDataParser";
import { UsersInterface } from "@/types/users.interface";
import { ContactsInterface } from "@/types/contacts.interface";
import { ChatsInterface } from "@/types/chats.interface";
import { useApps } from "@/composables/useApps";
import { ChannelsInterface } from "@/types/channels.interface";
import * as lodash from "lodash";

let loggedInUserString: Ref<string>;
let assignedUserString: Ref<string>;
let contactString: Ref<string>;
let chatString: Ref<string>;
let selectedChannelString: Ref<string>;
let seed: Ref<number>;

export const useAppData = () => {
  const { currentApp } = useApps();
  const { parseData, getValue, setFakerData } = useDataParser();

  const init = () => {
    const [firstUser] = users.keys();
    const [firstContact] = contacts.keys();
    const [firstChat] = chats.keys();
    const [firstChannel] = channels.keys();

    seed = ref(Math.floor(Math.random() * 10000000));

    loggedInUserString = ref(firstUser);
    assignedUserString = ref(firstUser);
    contactString = ref(firstContact);
    chatString = ref(firstChat);
    selectedChannelString = ref(firstChannel);
  };

  const refreshSeed = () => {
    seed.value = Math.floor(Math.random() * 10000000);
  };

  const contact = computed(() => {
    const foundContact = contacts.get(contactString.value);

    if (!foundContact) {
      return;
    }

    const contact = { ...foundContact };

    const contactSeed = seed.value - contact.id;

    const locale = getValue("countryCode", contact.countryCode ?? "UK");

    setFakerData({
      locale,
      seed: contactSeed,
    });

    contact.name = getValue("displayName", contact.name ?? "[RANDOM]");

    if (contact.countryCode) {
      contact.countryCode = locale;
    }

    return parseData<ContactsInterface>(contact, contactSeed, {
      name: contact.name,
      locale,
    });
  });

  const chat = computed<ChatsInterface>(() => {
    const chat = chats.get(chatString.value);

    if (!chat) {
      return {
        id: 1,
      };
    }

    return parseData(chat, chat.id + seed.value, {});
  });

  const loggedInUser = computed(() => {
    const user = users.get(loggedInUserString.value);

    if (!user) {
      return;
    }

    return parseUser(user);
  });

  const assignedUser = computed(() => {
    const user = users.get(assignedUserString.value);

    if (!user) {
      return;
    }

    return parseUser(user);
  });

  const parseUser = (user: UsersInterface) => {
    user = { ...user };

    const userSeed = seed.value + user.id;

    setFakerData({ seed: userSeed });

    const name = getValue("displayName", user.displayName ?? "[RANDOM]");

    if (user.displayName) {
      user.displayName = name;
    }

    return parseData<UsersInterface>(user, userSeed, { name });
  };

  const selectedChannels = computed<ChannelsInterface[] | undefined>(() => {
    const channel = channels.get(selectedChannelString.value);

    if (!channel) {
      return;
    }

    return channel;
  });

  const currentAppData = computed(() => {
    const appData: any = {};

    if (currentApp.value?.package.saysimple.dataRequired.includes("contact")) {
      appData.contact = { ...contact.value };

      if (
        !currentApp.value.package.saysimple.dataRequired.includes(
          "contact_metadata"
        )
      ) {
        appData.contact.metadata = undefined;
      }
    }

    if (currentApp.value?.package.saysimple.dataRequired.includes("agent")) {
      appData.agent = loggedInUser.value;
    }

    if (
      currentApp.value?.package.saysimple.dataRequired.includes("assignedAgent")
    ) {
      appData.assignedAgent = assignedUser.value;
    }

    if (currentApp.value?.package.saysimple.dataRequired.includes("channels")) {
      appData.channels = lodash.cloneDeep(selectedChannels.value);

      if (
        !currentApp.value.package.saysimple.dataRequired.includes(
          "channels_auth"
        )
      ) {
        appData.channels.forEach((channel: ChannelsInterface) => {
          channel.auth = undefined;
        });
      }
    }

    if (
      currentApp.value?.package.saysimple.dataRequired.includes("conversation")
    ) {
      appData.conversation = chat.value.conversation;
    }

    if (currentApp.value?.package.saysimple.dataRequired.includes("messages")) {
      appData.messages = chat.value.messages;
    }

    if (currentApp.value?.package.saysimple.dataRequired.includes("tags")) {
      appData.tags = chat.value.tags;
    }

    return appData;
  });

  return {
    init,
    chats,
    users,
    contacts,
    channels,
    currentAppData,
    loggedInUserString,
    assignedUserString,
    selectedChannelString,
    chatString,
    contactString,
    refreshSeed,
  };
};
