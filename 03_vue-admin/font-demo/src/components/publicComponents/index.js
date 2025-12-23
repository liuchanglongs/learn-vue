import LFrom from './LFrom/index.vue'
import Ltable from './LTable/index.vue'

export default {
  install (Vue, options) {
    Vue.component("LFrom", LFrom);
    Vue.component("Ltable", Ltable);
  }
}