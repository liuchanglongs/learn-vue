/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-09 15:43:17
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-10 09:39:07
 * @Description: lcl
 */
// import { createApp } from 'vue';
// const app = {
//   template: `
//   <div>
//   <div v-for="({name}, index) of list" :key="index">
//     {{name}}+{{index}}
//   </div>
//   <hr>

//   <div v-for="(key, value, index) of obj" :key="key">
//     {{key}}+{{value}}+ {{index}}
//   </div>
//   <hr>

//   <div v-for="v in 2" :key="key">
//     {{v}}
//   </div>
// <hr>
//   </div>
//   `,
//   data() {
//     return {
//       list: [
//         { name: '1' },
//         { name: '1' },
//         { name: '1' },
//         { name: '1' },
//         { name: '1' },
//         { name: '1' },
//         { name: '1' },
//         { name: '1' },
//         { name: '1' },
//       ],
//       obj: {
//         name: 'lcl',
//         age: '23',
//         sex: 'man',
//       },
//     };
//   },
// };

// const vm = createApp(app);
// const component = vm.mount('#app');
// console.log(component);

/**
 * 对象数据的检测
 * */

// const obj = function () {
//   return {
//     name: 'lcl',
//     age: '90',
//     sex: 'man',
//     list: [112, 12, 12, 4, 2, 2, 33, 3],
//   };
// };
// const vm = {};
// vm.$data = obj();

// for (const key in vm.$data) {
//   Object.defineProperty(vm, key, {
//     get() {
//       console.log('get-key', key);
//       return vm.$data[key];
//     },
//     set(nValue) {
//       console.log('set-key', key);
//       vm.$data[key] = nValue;
//     },
//   });
// }
// console.log(vm);
// console.log(vm.name);

// vm.age = 1;
// console.log(vm.age);

// vm.list = [];
// console.log(vm.list);

// vm.list.push(5);
// console.log(vm.list);
// console.log(vm.$data.list);
/**
 * 
 * 数据变化了
   视图能不能变化呢? 这个属性的set有没有执行
   
   不返回新数组
   Object.defineProperty -> 没办法监听下列方法对数组的操作变更
   解决：vue在这些方法上面又封装了一层函数
   Arry -> 原型上的方法 arryProp
   Arry -> 原型为封装的function ->在指向arryProp
   vue3: proxy - 》 可以
 * 
*/

// const obj = {
//   name: 'krry',
//   age: 24,
//   others: { mobile: 'mi10', watch: 'mi4' },
//   list: [1, 23, 5],
// };
// const p = new Proxy(obj, {
//   get(target, key, receiver) {
//     console.log('查看的属性为：' + key, Reflect.get(target, key, receiver));
//     return Reflect.get(target, key, receiver);
//   },
//   set(target, key, value, receiver) {
//     console.log('设置的属性为：' + key, '值为：' + value);
//     Reflect.set(target, key, value, receiver);
//   },
// });
// p.age = 22;
// console.log(p.age);
// p.single = 'NO';
// console.log(p.single);
// p.others.shoe = 'boost';
// console.log(p.others.shoe);
// p.list.push(1);
// p.a = 456;

// const list = [1, 2.3, 4, 4, 5, 5, 66];
// let res = null;
// for (const key in list) {
//   res = list[key];
//   Object.defineProperty(list, key, {
//     get() {
//       console.log('get');
//       return res;
//     },
//     set(nValue) {
//       console.log(nValue);
//       list[key] = nValue;
//     },
//   });
// }

console.log(list[1]);
list[1] = 5;

// 代理实现
// 获取Array的原型
// const arrayProto = Array.prototype;
// // 创建一个新对象，该新对象的原型指向Array的原型。
// export const arrayMethods = Object.create(arrayProto);
// ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(
//   mentod => {
//     // 缓存原始方法
//     const original = arrayProto[mentod];
//     // 对新原型对象上的方法，做数据绑定
//     Object.defineProperty(arrayMethods, mentod, {
//       value: function mutator(...args) {
//         console.log(args);
//         // 返回原始方法
//         return original.apply(this, args);
//       },
//       enumerable: false,
//       writable: true,
//       configurable: true,
//     });
//   }
// );
// console.log(arrayMethods.push('4'));
// console.log(arrayMethods);
