/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faUser,
  faUserTie,
  faUserHeadset,
  faComment,
  faGears,
  faUserGear,
  faMemoCircleInfo,
  faTrash,
  faGear,
} from "@fortawesome/pro-solid-svg-icons";

import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";

import Vue from "vue";
import { saysimpleApps } from "@/saysimpleApps";
import * as _ from "lodash";

const appIcons = _.map(saysimpleApps, (app) => {
  if (!app.faIcons) {
    return [];
  }
  return app.faIcons;
}).flat();

console.log(appIcons);

library.add(
  faUser,
  faUserTie,
  faUserHeadset,
  faComment,
  faGears,
  faUserGear,
  faMemoCircleInfo,
  faTrash,
  faGear,
  ...appIcons
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);
