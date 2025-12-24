/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-27 16:40:01
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-30 11:34:29
 * @Description: lcl
 */

/**
 
 *
 * vue在创建实例的过程中调用data函数，返回data对象
 * 通过响应式包装后存储在实例$data中，并且实例可以直接访问$data里面的属性
 * vm.name改变，this.$data也改变。
 * this.$data改变，vm.name也改变。
 * vue：全局变量$,_,__开头。
 */
// import { createApp } from 'vue';
// const vm = createApp({
//   template: `
//   <div>
//     <h1>04-深入研究data.js</h1>
//   </div>
//   `,
//   data() {
//     return {
//       name: 'lcl',
//     };
//   },
// }).mount('#app');

/**
 *  data必须是一个函数：确保每个组件实例都不相互影响
 *  实例上有数据、还有个$data代理
 */

// let vm = new Vue({
//   data() {
//     return {
//       a: 1,
//       b: 2,
//     };
//   },
// });

// function Vue(obj) {
//   this.$data = obj.data();
//   // 如果为var,key最后指的是 b，解决，立即执行函数、let\const
//   // 在浏览器查看a,b的值会触发get，而这时候key永远为b，所以a,b查看为b的值
//   for (var key in this.$data) {
//     (key => {
//       // 1.
//       Object.defineProperty(this, key, {
//         get() {
//           console.log('get-key', key);
//           return this.$data[key];
//         },
//         set(nvalue) {
//           console.log('set-key', key);
//           this.$data[key] = nvalue;
//         },
//       });
//       // 2.使用底层api
//       // this.__defineGetter__(key, function () {
//       //   return this.$data[key];
//       // });
//       // this.__defineSetter__(key, function (newValue) {
//       //   this.$data[key] = newValue;
//       // });
//     })(key);
//   }
// }
// console.log('---');
// console.log(vm.a);
// vm.a = 456;
// // console.log(vm);
// // vm.$data.a = 555;
// console.log(vm);
// console.log(vm.a);
// console.log('---');

//data必须是一个函数：确保每个组件实例都不相互影响

// function myCreateApp() {}
// myCreateApp.prototype.datas = {};
// const com1 = new myCreateApp();
// com1.datas.a = 1;
// console.log('com1->', com1.datas);

// const com2 = new myCreateApp();
// console.log('com2->', com2.datas);

// function myCreateApp() {
//   // console.log('new-->this', this);
//   this.datas = this.datas();
// }
// myCreateApp.prototype.datas = function () {
//   console.log(this);
//   return {};
// };
// const com1 = new myCreateApp();
// com1.datas.a = 1;
// console.log('com1->', com1.datas);

// const com2 = new myCreateApp();
// console.log('com2->', com2.datas);
