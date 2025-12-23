/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-25 15:35:32
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-26 16:45:00
 * @Description: lcl
 */
import { eventFormat, dataFormat, bindEvent } from './index';

export function mount({ data, template, methods }, rootDom) {
  rootDom.innerHTML = render(data, template, methods);
  bindEvent(methods);
}

export function render(data, template, methods) {
  /**
   * 1. 绑定事件
   * 2. 绑定数据
   */
  template = eventFormat(template);
  template = dataFormat(template, data);

  return template;
}

// 先用key找出mark，再用mark找出更新的dom
export function viewUpdate(statePool, key, value) {
  const allElements = document.querySelectorAll('*');

  statePool.forEach(pool => {
    if (pool.state[pool.state.length - 1] === key) {
      allElements.forEach(element => {
        const mark = element.dataset.mark;
        if (parseInt(mark) === parseInt(pool.mark)) {
          element.textContent = value;
        }
      });
    }
  });
}
