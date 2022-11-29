import { convertFilesToMap } from "@/data/convertFilesToMap";
import { ChatsInterface } from "@/types/chats.interface";

const context = require.context("./", false, /.+\.json$/);

export const chats = convertFilesToMap<ChatsInterface>(context);

// Replace date strings with dates
chats.forEach((chat) => {
  if (chat.conversation) {
    chat.conversation.start = new Date(chat.conversation.start);
  }

  if (chat.messages && Array.isArray(chat.messages)) {
    chat.messages.forEach((message) => {
      message.time = new Date(message.time);
    });
  }
});
