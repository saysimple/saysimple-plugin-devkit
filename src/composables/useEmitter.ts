import { TinyEmitter } from "tiny-emitter";

const emitter = new TinyEmitter();

export const useEmitter = () => {
  return {
    emitter,
  };
};
