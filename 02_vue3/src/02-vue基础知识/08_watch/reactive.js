/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-05 10:26:55
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-05 11:28:26
 * @Description: lcl
 */
export function reactive(vm, _get_, _set_) {
  const _data = vm.$data;
  for (const key in _data) {
    Object.defineProperty(vm, key, {
      get() {
        const value = _data[key];
        _get_(vm, value, key);
        return value;
      },
      set(nValue) {
        const value = _data[key];
        _data[key] = nValue;
        _set_(vm, nValue, value, key);
      },
    });
  }
}
