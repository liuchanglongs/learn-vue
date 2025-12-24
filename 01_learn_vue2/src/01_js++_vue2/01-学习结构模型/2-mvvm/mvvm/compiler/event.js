/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-25 15:45:49
 * @LastEditors: lcl
 * @Description: lcl
 */

import { getArg, getFnName, randomNum } from '../share/utils';

/**
 * 给对应dom节点给唯一的标识,代替写的字符串事件
 * 1. 正则不事件字符串匹配出来
 * 2. 组装数据结构
 * eventPool = []
 * {
 *   mark:radom,
 *   handleer:事件函数字符串
 *   type:'click'
 * }
 * */
const reg_onclick = /onClick\=\"(.+?)\"/g;
const eventPool = [];
export function eventFormat(template) {
  // console.log(template.match(reg_onclick));
  return template.replace(reg_onclick, (node, key) => {
    const mark = randomNum();
    eventPool.push({
      mark,
      handler: key,
      type: 'click',
    });
    // data-:变量
    return `data-mark=${mark}`;
  });
}

export function bindEvent(method) {
  // 通过拿所有元素的dom，根据eventPool去匹配响应的dom，挂载事件
  const elementAll = document.querySelectorAll('*');
  elementAll.forEach(currentDom => {
    const _mark = currentDom.dataset.mark;
    eventPool.forEach(pool => {
      if (pool.mark == _mark) {
        // 需要找到事件名，函数名，参数
        const type = pool.type;
        currentDom.addEventListener(type, () => {
          const fnName = getFnName(pool.handler);
          const arg = getArg(pool.handler);
          method[fnName](arg);
        });
      }
    });
  });
}
