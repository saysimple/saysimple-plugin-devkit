import { VueConstructor } from "vue";

export interface NpmAppInterface {
  components: {
    content: VueConstructor;
    settings: VueConstructor;
  };
  locales: Record<string, Record<string, string>>;
  name: string;
  plugin: {
    name: string;
    version: string;
    saysimple: {
      dataRequired: string[];
      description: string;
      icon: string;
      name: string;
    };
  };
}
