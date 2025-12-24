import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import store from "@/store/index.js"
import api from "@/api/index.js"
import allRouter from "@/router/router.js"
import configRouter from "@/utils/routerConfig.js"

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/welcome",
    component: () => import('@/components/layout/Home.vue'),
    meta: {
      title: "home",
      isAuthorization: true
    },
    children: [
      {
        path: "welcome",
        name: "MyPlugin",
        component: () => import('@/views/Welcome.vue'),
        meta: {
          title: "MyPlugin",
          isAuthorization: true
        },
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login/Login.vue'),
    meta: {
      title: "login",
      isAuthorization: false
    },
  },
  {
    // path: "/:cathchAll(.*)*",
    path: '/:pathMatch(.*)*',
    name: "404",
    component: () => import('../views/404.vue'),
    meta: {
      title: "404",
      isAuthorization: false
    },
  }
];

export const Router = createRouter(
  {
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes
  }
);

Router.beforeEach(async (to, from, next) => {
  const meta = to.meta || {}
  document.title = meta.title;
  if (store.state.userInfo.token) {
    if (to.path === "/login") {
      // next(); // 登录为router.push
      next("/");
    } else {
      if (store.state.menuList.length === 0) {
        const { actionList, menuList } = await api.getPermissionList() || [];
        if (actionList && menuList) {
          // 获取后端返回的路由名字
          const getRouter = configRouter(menuList, allRouter);
          getRouter.map((v) => {
            Router.addRoute("home", v);
          });
          store.commit("saveMenuList", menuList);
          store.commit("savePermission", actionList);
          next(to.path);
        } else {
          next({ path: "/login" });
          store.commit("signOut");
        }
      } else {
        next();
      }
    }
  } else {
    if (meta.isAuthorization === false) {
      next();
    } else {
      next({ path: "/login" });
      store.commit("signOut");
    };
  }
});

