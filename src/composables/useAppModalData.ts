import { NpmAppInterface } from "@/types/npmApp.interface";
import { ref, Ref } from "@vue/composition-api";

let allModalData: Map<string, Ref<Record<string, unknown>>>;

export const useAppModalData = () => {
  const init = () => {
    allModalData = new Map();
  };

  const loadModalData = (apps: Record<string, NpmAppInterface>): void => {
    for (const app in apps) {
      let modalData: Ref<Record<string, any>>;
      try {
        modalData = ref(
          JSON.parse(localStorage.getItem(`${app}_modal_data`) ?? "{}")
        );
      } catch {
        modalData = ref({});
      }

      allModalData.set(app, modalData);
    }
  };

  const updateModalData = (app: string, updates: Record<string, any>): void => {
    const modalData = getModalData(app);
    modalData.value = {
      ...modalData.value,
      ...updates,
    };

    localStorage.setItem(`${app}_modal_data`, JSON.stringify(modalData.value));
  };

  const getModalData = (app: string): Ref<Record<string, any>> => {
    const modalData = allModalData.get(app);

    return modalData ?? ref({});
  };

  return {
    init,
    getModalData,
    loadModalData,
    updateModalData,
  };
};
