import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "@/lang/en.json";
import nl from "@/lang/nl.json";
import es from "@/lang/es.json";

Vue.use(VueI18n);

const messages = {
  nl,
  en,
  es,
};

export const i18n = new VueI18n({
  locale: "en", // set locale
  messages, // set locale messages
});

// Hot updates
if (module.hot) {
  module.hot.accept(
    ["@/lang/en.json", "@/lang/nl.json", "@/lang/es.json"],
    async () => {
      const [en, nl, es] = await Promise.all([
        import("@/lang/en.json"),
        import("@/lang/nl.json"),
        import("@/lang/es.json"),
      ]);

      i18n.setLocaleMessage("en", en.default);
      i18n.setLocaleMessage("nl", nl.default);
      i18n.setLocaleMessage("es", es.default);
    }
  );
}
