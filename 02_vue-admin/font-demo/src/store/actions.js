import storage from "@/utils/storage"
import api from "@/api/index.js"
import { Router } from "@/router/index.js"
import allRouter from "@/router/router.js"
import configRouter from "@/utils/routerConfig.js"

export default {
  // async getMenuList ({ commit, getters }) {
  //   const { actionList, menuList } = await api.getPermissionList() || [];
  //   if (actionList && menuList) {
  //     commit("saveMenuList", menuList);
  //     commit("savePermission", actionList);
  //     const getRouter = configRouter(menuList, allRouter);
  //     getRouter.map((v) => {
  //       Router.addRoute("home", v);
  //     });
  //   } else {
  //     Router.replace({ path: "/login" });
  //     store.commit("signOut");
  //   }
  // }
}