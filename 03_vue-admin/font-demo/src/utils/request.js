// axios 二次封装 
import axios from "axios"
import envApi from "../config/envApi.js"
import { ElMessage } from "element-plus"
import { Router } from "@/router"
import storage from "./storage.js";
import store from "@/store/index.js"

const TOKEN_INVALID = "请重新登录!"
const NETWORK_ERR = "网络异常，请稍后尝试！"

let showOne = null;

const service = axios.create({
  baseURL: envApi.mock ? envApi.mockApi : envApi.baseApi,
  timeout: 8000
});

service.interceptors.request.use((req) => {
  const header = req.headers;
  const userInfo = storage.getItem("userInfo") || "";
  if (!header.Authorization) header.Authorization = "Bearer " + userInfo.token;
  return req;
});

service.interceptors.response.use((res) => {
  const { data, code, msg } = res.data;
  if (code === 200) {
    return data
  } else if (code === 500001) { //|| code === 40001
    if (!showOne) {
      showOne = setTimeout(() => {
        ElMessage.error(TOKEN_INVALID);
        const trim = setTimeout(() => {
          Router.push("/login")
          store.commit("signOut");
          clearTimeout(showOne);
          clearTimeout(trim);
        }, 2000);
      }, 0);
    }
    Promise.reject(msg || TOKEN_INVALID);
    return;
  } else {
    ElMessage.error(msg || NETWORK_ERR);
    Promise.reject(msg || NETWORK_ERROR);
    return;
  }
});

const request = (options) => {
  const isMock = options.isMock || false;
  service.defaults.baseURL = isMock ? envApi.mockApi : envApi.baseApi;
  return service(options)
}


export default request