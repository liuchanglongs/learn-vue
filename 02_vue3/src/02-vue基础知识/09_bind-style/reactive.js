/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-06 14:24:40
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-08 15:21:00
 * @Description: lcl
 */
function reactive(vm, target) {
  for (const key in target) {
    Object.defineProperty(vm, key, {
      get() {
        return target[key];
      },
      set(newValue) {
        if (newValue === target[key]) return;
        target[key] = newValue;
      },
    });
  }
}

export { reactive };
