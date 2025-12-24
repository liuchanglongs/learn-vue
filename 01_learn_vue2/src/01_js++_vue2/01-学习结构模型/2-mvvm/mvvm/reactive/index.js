/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-25 15:34:51
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-26 09:56:07
 * @Description: lcl
 */
import { isObject } from '../share/utils';
import { proxyHandler } from './ProxyHandler';

export function useReactive(data) {
  if (!isObject) {
    return data;
  }
  const observer = new Proxy(data, proxyHandler);
  return observer;
}
