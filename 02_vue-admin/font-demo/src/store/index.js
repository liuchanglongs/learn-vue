import { createStore } from "vuex"
import mutations from "./mutations.js"
import actions from "./actions.js"
import getters from "./getters.js"
import storage from "@/utils/storage.js";

const state = {
  userInfo: storage.getItem("userInfo") || {},
  menuList: [],
  buttonPermission: [],
  noticeData: false
}

export default createStore({
  state,
  getters,
  mutations,
  actions
});