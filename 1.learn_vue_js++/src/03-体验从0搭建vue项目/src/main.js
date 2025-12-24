/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-28 15:26:56
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-04 13:51:14
 * @Description: lcl
 */
import { createApp } from '../modules/vue';
import App from './App.vue';

const app = createApp(App);
console.log(app);
const root = app.mount('#app');
// console.log('root-->', root);
