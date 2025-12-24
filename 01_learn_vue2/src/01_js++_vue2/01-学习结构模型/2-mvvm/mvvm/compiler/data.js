import { randomNum } from '../share/utils';

/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-25 15:45:54
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-26 16:25:17
 * @Description: lcl
 */
const rg_html = /\<(.+?)\>\{\{(.+?)\}\}\<\/(.+?)\>/g;
const rg_value = /\{\{(.+?)\}\}/g;

// 更新时用
export const statePool = [];
/**
 * 组装更新的时候用的statePool
 * {
 *   mark:_mark,
 *   state:value
 * }
 */

export function dataFormat(template, data) {
  /**
   * 得到标签名、得到变量名、设置mark；加入数据处理obj.key，加入数据
   * */
  let _state = {};
  template = template.replace(rg_html, function (node, tag, key) {
    // 加标识
    const mark = randomNum();
    _state.mark = mark;
    // 处理value:num,num.key
    let _arg = key.trim();
    const _argArr = _arg.split('.');
    _state.state = _argArr;

    let i = 0;
    let _data = { ...data };
    while (i < _argArr.length) {
      _arg = _data[_argArr[i]];
      _data = _data[_argArr[i]];
      i++;
    }
    statePool.push(_state);
    _state = {};
    return `<${tag} data-mark="${mark}">${_arg}</${tag}>`;
  });
  // 处理赋值
  return template;
}
