import { createApp } from "vue";
import App from "@/App.vue";
import { Router } from "@/router";
import store from "@/store/index.js";
import LPlugin from "@/components/publicComponents/index.js";

import request from "@/utils/request.js";
import storage from "@/utils/storage.js";
import api from "@/api/index.js";
import "element-plus/dist/index.css";
import permission from "@/directive/permission.js";

const app = createApp(App);

app.directive("permission", permission);
app.config.globalProperties.$http = request;
app.config.globalProperties.$api = api;
app.config.globalProperties.$storage = storage;

app.use(Router).use(store).use(LPlugin).mount("#app");
