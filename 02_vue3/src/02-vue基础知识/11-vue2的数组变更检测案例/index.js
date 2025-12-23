/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-10 09:53:39
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-10 10:05:08
 * @Description: lcl
 */
/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-10 09:53:39
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-10 10:01:06
 * @Description: lcl
 */

import { initState } from './init';

// vue:会大量的给proptype上添加许多方法
function Vue(options) {
  this._init(options);
}
// 初始化方法
Vue.prototype._init = function (options) {
  var vm = this;
  vm.$options = options;
  initState(vm);
  // vm.$data = data();
  // vm.$el = document.querySelector(el);
};
export { Vue };
