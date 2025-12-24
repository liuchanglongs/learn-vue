/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-27 09:58:06
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-09 14:09:30
 * @Description: lcl
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app');
