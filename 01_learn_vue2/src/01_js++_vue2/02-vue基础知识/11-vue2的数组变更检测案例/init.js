/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-10 10:03:45
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-10 10:59:22
 * @Description: lcl
 */

import proxydata from './proxy';
import { observe } from './observe';

function initState(vm) {
  var options = vm.$options;
  if (options.data) {
    initData(vm);
  }
}

function initData(vm) {
  var data = vm.$options.data;
  // 一般不会直接操作data，
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  // 对this.进行劫持
  for (const key in data) {
    proxydata(vm, '_data', key);
  }
  // 对_data内部进行观察劫持
  observe(data);
}

export { initState };
