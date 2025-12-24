/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-10 10:46:51
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-10 15:20:45
 * @Description: lcl
 */
/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-10 10:46:51
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-10 10:52:20
 * @Description: lcl
 */
import { defineReactiveData } from './reactive';
import { observeArry } from './observeArry';
import { arrMethods } from './arry';
function Observer(data) {
  /**
   * {}:
   * []:
   */
  if (Array.isArray(data)) {
    // 更改原型链
    // const a = [];
    // a.__proto__ = [456];
    // console.log(a);
    // function name(params) {}
    // name.a = 456;
    // name.prototype = {};
    // console.log('fn-->', name.prototype);

    /**
     * 数组7个方法操作的数据，进行响应式
     */
    // 添加中间重写的方法
    data.__proto__ = arrMethods;
    // 递归绑定
    observeArry(data);
  } else {
    this.walk(data);
  }
}
Observer.prototype.walk = function (data) {
  var keys = Object.keys(data);
  // 每次遍历产生新的作用域。value来保存值，get读取、set设置该值
  for (const key of keys) {
    let value = data[key];
    defineReactiveData(data, key, value);
  }
};

export { Observer };
