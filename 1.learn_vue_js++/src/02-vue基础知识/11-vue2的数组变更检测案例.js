/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-10 09:27:39
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-10 15:35:52
 * @Description: lcl
 */

import { Vue } from './11-vue2的数组变更检测案例/index';
const app = {
  el: '#app',
  data() {
    return {
      name: 'lcl',
      age: '18',
      friends: ['hihihihi', 'hahaha', { fake: 'xiao si' }],
      info: {
        heiht: 185,
        man: {
          name: '789',
        },
      },
    };
  },
};

const vm = new Vue(app);
// vm.friends.push({ ha: 8888 });
// vm.name = { a: '=' };
// console.log(vm.friends[0]);
// vm.friends[2].fake = 9999;
// console.log('vm-->', vm.friends[2]);
// console.log(vm.name);
// console.log(vm._data.name);

// console.log(vm.info.man);
// console.log(vm.info);
// vm.info.man = 5;
// console.log(vm.info.man);
// vm.friends.push(456);
// vm.friends.push({ id: 456 });
vm.friends.push('{ id: 456 }');
