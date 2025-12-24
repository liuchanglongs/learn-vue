/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-25 16:22:51
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-26 16:21:39
 * @Description: lcl
 */
import { statePool } from '../compiler/data';
import { viewUpdate } from '../render';
import { hasKey, isEqual, isObject } from '../share/utils';
import { useReactive } from './index';

const get = createGet();

function createGet() {
  // 在get之前可以进行数据操作
  return function (target, key, receiver) {
    if (isObject(target[key])) {
      return useReactive(target[key]);
    }
    return Reflect.get(target, key, receiver);
  };
}

const set = createSet();
function createSet() {
  return function (target, key, newValue, receiver) {
    /**
     * 新增
     * 新老值对比
     * */
    const isKeyExist = hasKey(target, key);
    const oldValue = target[key];
    const res = Reflect.set(target, key, newValue, receiver);
    if (!isKeyExist) {
      // console.log('add');
    } else if (!isEqual(newValue, oldValue)) {
      // console.log('edite');
      // update view
    }
    viewUpdate(statePool, key, newValue);
    return res;
  };
}

const proxyHandler = { get, set };

export { proxyHandler };
