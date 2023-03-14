export interface ChannelsInterface {
  id: number;
  name: string;
  provider: string;
  platform: string;
  identity: string;
  auth?: string;
  active: 1 | 0;
}
