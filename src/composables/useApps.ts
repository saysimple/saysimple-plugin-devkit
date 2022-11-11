import { computed, Ref, ref } from "@vue/composition-api";
import { NpmAppInterface } from "@/types/npmApp.interface";
import { i18n } from "@/plugins/i18n";
import { AppInterface } from "@/types/app.interface";
import { useApUtils } from "@/composables/useAppUtils";
import { useAppSettings } from "@/composables/useAppSettings";

let selectedApp: Ref<string>;
let apps: Map<string, Ref<AppInterface>>;
let id: number;

export const useApps = () => {
  const { getSettings } = useAppSettings();

  const init = () => {
    selectedApp = ref<string>("");
    apps = new Map();
    id = 1;
  };

  const currentApp = computed<AppInterface | undefined>(
    () => apps.get(selectedApp.value)?.value
  );

  const loadApps = (newApps: Record<string, NpmAppInterface>) => {
    for (const app in newApps) {
      loadApp(app, newApps[app]);
    }

    const selectedApp = localStorage.getItem("selectedApp");

    if (selectedApp) {
      setCurrentApp(selectedApp);

      return;
    }

    const [firstApp] = apps.keys();

    setCurrentApp(firstApp);
  };

  const loadApp = (name: string, app: NpmAppInterface) => {
    for (const locale in app.locales) {
      i18n.mergeLocaleMessage(locale, app.locales[locale]);
    }

    apps.set(name, convertApp(name, app));
  };

  const convertApp = (
    appName: string,
    app: NpmAppInterface
  ): Ref<AppInterface> => {
    return computed(() => {
      const settings = getSettings(appName);

      return {
        id: id++,
        enabled: 1,
        name: app.name,
        package: app.plugin,
        utils: useApUtils(appName, app),
        components: app.components,
        settings: settings.value,
      };
    });
  };

  const setCurrentApp = (app: string) => {
    localStorage.setItem("selectedApp", app);

    selectedApp.value = app;
  };

  return {
    init,
    currentApp,
    selectedApp,
    setCurrentApp,
    loadApps,
    apps,
  };
};
