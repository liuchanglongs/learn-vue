/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-10 10:43:42
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-10 15:16:16
 * @Description: lcl
 */

import { Observer } from './observer';
function observe(data) {
  if (typeof data != 'object' || typeof data == null) return;
  return new Observer(data);
}

export { observe };
