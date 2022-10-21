import { NpmAppInterface } from "@/types/npmApp.interface";
import { AppUtilsInterface } from "@/types/appUtils.interface";

export interface AppInterface {
  id: number;
  enabled: number;
  name: string;
  components: NpmAppInterface["components"];
  package: NpmAppInterface["plugin"];
  settings: Record<string, any>;
  utils: AppUtilsInterface;
}
