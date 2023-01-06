import { AxiosRequestConfig } from "axios";
import ToastInterface from "vue-toastification/dist/types/src";
import VueI18n from "vue-i18n";
import { StartChatParamsInterface } from "@/types/startChatParams.interface";

export interface AppUtilsInterface {
  i18n: VueI18n;
  setEmitAndToast: (
    emit: (event: string, ...args: unknown[]) => void,
    toast: ReturnType<typeof ToastInterface>
  ) => void;

  appendToMessage: (message: string) => void;

  notify: (
    title: string,
    type: "success" | "error" | "warning" | "info"
  ) => void;

  apiCall: <T = unknown>(axiosRequestConfig: AxiosRequestConfig) => Promise<T>;
  insightsApiCall: <T = unknown>(url: string) => Promise<T>;
  sendEmail: <T = unknown>(emailProps: {
    to?: string;
    replyTo?: string;
    subject: string;
    html: string;
  }) => Promise<T>;
  getSetting: <T = unknown>(path: string, defaultValue: T) => T;

  getData: <T = unknown>(
    name: string,
    defaultValue: T | null
  ) => Promise<T | null>;

  saveData: (name: string, value: any) => Promise<void>;

  saveSettings: (settings: Record<string, any>) => void;

  // Scroll container to top
  scrollToTop: () => void;
  startChat: (startChatParams: StartChatParamsInterface) => void;
}
