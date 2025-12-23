/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-27 14:29:54
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-27 16:21:07
 * @Description: lcl
 */

const obj = {
  name: 'lcl',
  age: 90,
  info: {
    hobby: [
      'traval',
      'play game',
      {
        a: 1,
      },
    ],
    career: {
      name: 'font of development',
      year: 1,
    },
  },
};

// es5
// function deepClone(obj, target = {}) {
//   // {} -> key
//   // [] -> index
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (typeof obj[key] === 'object' && obj[key] != null) {
//         // 是数组就不拷贝了
//         const isArry = Object.prototype.toString.call(obj[key]);
//         target[key] = isArry != '[object Object]' ? [] : {};
//         deepClone(obj[key], target[key]);
//       } else {
//         target[key] = obj[key];
//       }
//     }
//   }

//   return target;
// }

// es6
function deepClone(origin, hashMap = new WeakMap()) {
  if (origin == undefined || typeof origin != 'object') {
    return origin;
  }
  if (origin instanceof Date) {
    return new Date(origin);
  }
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }
  const cloned = hashMap.get(origin);
  if (cloned) {
    console.log('---');
    return cloned;
  }
  const target = new origin.constructor();
  hashMap.set(origin, target);
  for (const key in origin) {
    if (origin.hasOwnProperty(key)) {
      target[key] = deepClone(origin[key], hashMap);
    }
  }
  return target;
}

// const newObj = deepClone(obj);

// console.log(obj);
// obj.info.hobby[2].a = 123;
// console.log(newObj);

// let a = { a: 4 };
// const arr = [a];
// a = null;
// console.log(arr);
// console.log(a);

// 是对象给{ }，是数组给[]  ->constructor  Array()/Object()
// const obj1 = {};
// const arr1 = [];
// console.log(new obj1.constructor() == obj1);
// console.log(new arr1.constructor() == arr1);

// 无限套娃对象
const objs1 = {};
const objs2 = {};
objs1.objs2 = objs2;
objs2.objs1 = objs1;
console.log(objs1);
// 面试题：怎么克隆这个对象？解决：记录是否拷贝过
console.log(deepClone(objs1));
