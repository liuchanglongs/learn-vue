/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-24 15:51:46
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-24 21:33:31
 * @Description: lcl
 */
import { createApp } from 'vue';
// 应用实例 app：组件、指令、use、filter
// const app = createApp({});
// // 1. config.js开启运行编译： runtimeCompiler: true
// // 2. index.html，里面#app下使用
// const app2 = app
//   .component('hallow-one', {
//     data() {
//       return {
//         msg: 'hallow-one',
//       };
//     },
//     template: `<h1>{{msg}}</h1>`,
//   })
//   .component('hallow-one1', {
//     data() {
//       return {
//         msg: 'hallow-one1',
//       };
//     },
//     template: `<h1>{{msg}}</h1>`,
//   });
// // 能链式调用的原因
// console.log(app === app2);
// app2.mount('#app');

/**
 * 根组件：本质就是一个对象，
 * createApp的时候需要一个根组件
 * 根组件时vue渲染的起点
 *
 * 根元素：一个html元素
 * createApp创建的应用的实例，需要一个html元素
 *   <div id="app"> </div>
 * */

/**
 * 根组件实例： vm
 * mount:返回的时根组件实例
 * vue不是一个完整的mvvm模型
 * */
// const app = createApp({
//   template: `<h1>{{a}} + {{b}} = {{total}}</h1>`,
//   data() {
//     return {
//       a: 1,
//       b: 2,
//       total: '',
//     };
//   },
//   mounted() {
//     this.sum();
//   },
//   methods: {
//     sum() {
//       this.total = this.a + this.b;
//     },
//   },
// });

// const vm = app.mount('#app');

/**
 * 组件实例：
 * 每个组件都有自己的实例，都共享着一个应用实例。
 * 无论时根组件还是应用组件中的其它组件，配置项、组件行为（生命周期）都是一样的
 * */
