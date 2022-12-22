import { ref, Ref } from "@vue/composition-api";
import { NpmAppInterface } from "@/types/npmApp.interface";

let settings: Map<string, Ref<Record<string, any>>>;

export const useAppSettings = () => {
  const init = () => {
    settings = new Map();
  };

  const loadSettings = (apps: Record<string, NpmAppInterface>): void => {
    for (const app in apps) {
      let setting: Ref<Record<string, any>>;
      try {
        setting = ref(
          JSON.parse(localStorage.getItem(`${app}_settings`) ?? "{}")
        );
      } catch {
        setting = ref({});
      }

      settings.set(app, setting);
    }
  };

  const updateSetting = (app: string, key: string, value: any): void => {
    const settings = getSettings(app);
    settings.value[key] = value;

    localStorage.setItem(`${app}_settings`, JSON.stringify(settings.value));
  };

  const updateSettings = (app: string, updates: Record<string, any>): void => {
    const settings = getSettings(app);
    settings.value = {
      ...settings.value,
      ...updates,
    };

    localStorage.setItem(`${app}_settings`, JSON.stringify(settings.value));
  };

  const getSettings = (app: string): Ref<Record<string, any>> => {
    const setting = settings.get(app);

    return setting ?? ref({});
  };

  return {
    init,
    getSettings,
    loadSettings,
    updateSetting,
    updateSettings,
  };
};
