/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-25 16:07:32
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-26 14:18:32
 * @Description: lcl
 */
export function isObject(obj) {
  return typeof obj == 'object' && obj != null;
}

export function hasKey(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

export function isEqual(newValue, oldValue) {
  return newValue === oldValue;
}

export function randomNum() {
  return new Date().getTime() + parseInt(Math.random() * 1000);
}

const rg_FnName = /^(.+?)\(/;
export function getFnName(str) {
  return str.match(rg_FnName)[1];
}

const rg_arg = /\((.+?)\)/;
const rg_checkstr = /^[\'|\"].*?[\'|\"]$/;
export function getArg(str) {
  const content = str.match(rg_arg)[1];
  const isStr = rg_checkstr.test(content);
  if (isStr) {
    return content.replace(/[\'|\"]/g, '').trim();
  } else {
    return parseInt(content);
  }
}
