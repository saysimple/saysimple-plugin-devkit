import untappd from "@saysimple-plugins/untappd";
import example from "@saysimple-plugins/example";
import idas from "@saysimple-plugins/idas";
import { NpmAppInterface } from "@/types/npmApp.interface";

export const saysimpleApps: Record<string, NpmAppInterface> = {
  example,
  untappd,
  idas,
};
