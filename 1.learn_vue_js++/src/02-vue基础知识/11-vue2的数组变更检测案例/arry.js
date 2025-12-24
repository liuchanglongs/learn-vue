/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-10 14:01:12
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-10 15:36:20
 * @Description: lcl
 */

import { observeArry } from './observeArry';
const ARRMETHODS = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
];

const origionArrMethods = Array.prototype;
const arrMethods = Object.create(origionArrMethods);

ARRMETHODS.forEach(m => {
  arrMethods[m] = function () {
    const arg = Array.prototype.slice.call(arguments);
    origionArrMethods[m].apply(this, arg);

    // 监听添加的数组
    console.log('数组新方法');
    var newArr;
    switch (m) {
      case 'push':
        newArr = arg;
        break;
      case 'unshift':
        newArr = arg;
        break;
      case 'splice':
        newArr = arg.slice(2);
        break;
      default:
        break;
    }
    newArr && observeArry(newArr);
  };
});

export { arrMethods };
