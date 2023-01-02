export interface StartChatParamsInterface {
  contactId?: number;
  channelId?: number;
  userId?: number;
  channelIdentity?: string;
  customerIdentity?: string;
  template?: string;
  variables?: string;
}
