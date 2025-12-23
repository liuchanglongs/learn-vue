/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-10 14:47:55
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-10 14:48:45
 * @Description: lcl
 */
import { observe } from './observe';
function observeArry(arr) {
  arr.forEach(v => {
    observe(v);
  });
}

export { observeArry };
