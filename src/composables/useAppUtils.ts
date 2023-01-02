import { AppUtilsInterface } from "@/types/appUtils.interface";
import * as lodash from "lodash";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { NpmAppInterface } from "@/types/npmApp.interface";
import { useToast } from "vue-toastification/composition";
import ToastInterface from "vue-toastification/dist/types/src";
import { useAppSettings } from "@/composables/useAppSettings";
import { useAppStorage } from "@/composables/useAppStorage";
import { i18n as i18nPlugin } from "@/plugins/i18n";

export const useApUtils = (
  appName: string,
  app: NpmAppInterface
): AppUtilsInterface => {
  const toast = useToast();

  const { getSettings, updateSettings } = useAppSettings();
  const { getStorageItem, updateStorageItem } = useAppStorage();

  const setEmitAndToast = (
    emit: (event: string, ...args: unknown[]) => void,
    toast: ReturnType<typeof ToastInterface>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): void => {};

  const appendToMessage = (message: string): void => {
    alert(`Append to message: ${message}`);
  };

  const i18n = i18nPlugin;

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
    email: string;
  }): Promise<T> => {
    const toEmailAddress = getSetting<string>("toEmailAddress", "");

    if (!toEmailAddress) {
      alert(
        `You are trying to send an email without the 'toEmailAddress' in your settings, this will fail`
      );

      throw new Error("No email address set");
    }

    alert(`Send email to: ${toEmailAddress}\n\nWith content: \n${email}`);

    return {} as T;
  };

  const getSetting = <T = unknown>(path: string, defaultValue: T): T => {
    const settings = getSettings(appName);

    return lodash.at(settings.value, [path])[0] ?? defaultValue;
  };

  const getStorage = async <T = unknown>(
    name: string,
    defaultValue: T | null = null
  ): Promise<T | null> => {
    return getStorageItem<T>(appName, name) ?? defaultValue;
  };

  const getData = <T = unknown>(
    name: string,
    defaultValue: T | null = null
  ): Promise<T | null> => {
    console.warn(
      "Method getData is deprecated please use 'getStorage' instead"
    );
    return getStorage(name, defaultValue);
  };

  // Plugin Data is only returned on request, which is directly opposite from Plugin Settings.
  const saveStorage = async (name: string, value: any): Promise<void> => {
    return updateStorageItem(appName, name, value)
  };

  const saveData = (name: string, value: any): Promise<void> => {
    console.warn(
      "Method getData is deprecated please use 'saveStorage' instead"
    );
    return saveStorage(name, value);
  };

  const saveSettings = async (settings: Record<string, any>): Promise<void> => {
    updateSettings(appName, settings);
  };

  const scrollToTop = (): void => {
    alert("Scroll to top");
  };

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
