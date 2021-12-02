import Vue from "vue";
import Flicking from "@egjs/vue-flicking";
import "@egjs/vue-flicking/dist/flicking.css";

if (process.browser) {
  Vue.use(Flicking);
}
