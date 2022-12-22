import { ref, Ref } from "@vue/composition-api";
import { NpmAppInterface } from "@/types/npmApp.interface";

let storages: Map<string, Ref<Record<string, any>>>;

export const useAppStorage = () => {
  const init = () => {
    storages = new Map();
  };

  const loadStorage = (apps: Record<string, NpmAppInterface>): void => {
    for (const app in apps) {
      let storage: Ref<Record<string, any>>;
      try {
        storage = ref(
          JSON.parse(localStorage.getItem(`${app}_storage`) ?? "{}")
        );
      } catch {
        storage = ref({});
      }

      storages.set(app, storage);
    }
  };

  const updateStorageItem = (app: string, key: string, value: any): void => {
    const storage = getStorage(app);
    storage.value[key] = value;

    localStorage.setItem(`${app}_storage`, JSON.stringify(storage.value));
  };

  const updateStorage = (app: string, updates: Record<string, any>): void => {
    const settings = getStorage(app);
    settings.value = {
      ...settings.value,
      ...updates,
    };

    localStorage.setItem(`${app}_storage`, JSON.stringify(settings.value));
  };

  const getStorage = (app: string): Ref<Record<string, any>> => {
    const storage = storages.get(app);

    return storage ?? ref({});
  };

  const getStorageItem = <T = unknown>(app: string, key: string): T => {
    const storage = getStorage(app);

    return storage.value[key];
  };

  return {
    init,
    getStorage,
    getStorageItem,
    loadStorage,
    updateStorageItem,
    updateStorage,
  };
};
