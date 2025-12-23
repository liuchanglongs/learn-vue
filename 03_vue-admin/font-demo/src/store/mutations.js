import storage from "../utils/storage"
import { Router } from "@/router/index.js"
import allRouter from "@/router/router.js"
import configRouter from "@/utils/routerConfig.js"

export default {
  saveUserInfo (state, data) {
    state.userInfo = data;
    storage.setItem("userInfo", data);
  },

  saveMenuList (state, data) {
    state.menuList = data;
    storage.setItem("menuList", data);
  },

  savePermission (state, data) {
    state.buttonPermission = data;
    storage.setItem("buttonPermission", data);
  },

  signOut (state) {
    const getRouter = configRouter(state.menuList, allRouter);
    if (getRouter.length > 0) {
      getRouter.map((v) => {
        Router.removeRoute(v.name)
      });
    }
    storage.clearAll();
    state.userInfo = {};
    state.menuList = [];
    state.buttonPermission = [];
  },
  changeNoticeData (state, data) {
    state.noticeData = data;
  }
}