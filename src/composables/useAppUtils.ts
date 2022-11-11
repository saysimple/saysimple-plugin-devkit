import { AppUtilsInterface } from "@/types/appUtils.interface";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { NpmAppInterface } from "@/types/npmApp.interface";
import { useToast } from "vue-toastification/composition";
import ToastInterface from "vue-toastification/dist/types/src";
import { useAppSettings } from "@/composables/useAppSettings";
import { i18n as i18nPlugin } from "@/plugins/i18n";
import VueI18n from "vue-i18n";

export const useApUtils = (
  appName: string,
  app: NpmAppInterface
): AppUtilsInterface => {
  const toast = useToast();

  const { getSettings, updateSettings } = useAppSettings();

  const setEmitAndToast = (
    emit: (event: string, ...args: unknown[]) => void,
    toast: ReturnType<typeof ToastInterface>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): void => {};

  const appendToMessage = (message: string): void => {
    alert("Append to message: " + message);
  };

  const i18n = (): VueI18n => {
    return i18nPlugin;
  };

  const notify = (
    title: string,
    type: "success" | "error" | "warning" | "info" = "success"
  ): void => {
    toast[type](title);
  };

  const apiCall = <T = unknown>(
    axiosRequestConfig: AxiosRequestConfig
  ): Promise<T> => {
    return axios
      .post<T>("http://localhost:3001/proxy", axiosRequestConfig)
      .then((result) => result.data)
      .catch((error: AxiosError) => {
        throw error.response?.data || error;
      });
  };

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const insightsApiCall = <T = unknown>(url: string): Promise<T> => {};

  const sendEmail = async <T = unknown>({
    email,
  }: {
    email: unknown;
  }): Promise<T> => {
    alert("Send email to: " + email);

    return {} as T;
  };

  const getSetting = <T = unknown>(path: string, defaultValue: T): T => {
    const settings = getSettings(appName);

    return settings.value[path] ?? defaultValue;
  };

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const getData = async <T = unknown>(
    name: string,
    defaultValue: T | null = null
  ): Promise<any> => {
    const localData = localStorage.getItem(`${appName}_data:${name}`);

    if (!localData) {
      return defaultValue;
    }

    return JSON.parse(localData);
  };

  // Plugin Data is only returned on request, which is directly opposite from Plugin Settings.
  // eslint-disable-next-line
  const saveData = async (name: string, value: any): Promise<void> => {
    localStorage.setItem(`${appName}_data:${name}`, JSON.stringify(value));
  };

  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const saveSettings = async (settings: Record<string, any>): Promise<void> => {
    updateSettings(appName, settings);
  };

  // Scroll container to top
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const scrollToTop = (): void => {};

  return {
    i18n,
    setEmitAndToast,
    appendToMessage,
    notify,
    apiCall,
    insightsApiCall,
    sendEmail,
    getSetting,
    getData,
    saveData,
    saveSettings,
    scrollToTop,
  };
};
