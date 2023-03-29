import { VueConstructor } from "vue";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface NpmAppInterface {
  components: {
    content: VueConstructor;
    settings: VueConstructor;
    modal?: VueConstructor;
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
  faIcons?: IconDefinition[];
}
