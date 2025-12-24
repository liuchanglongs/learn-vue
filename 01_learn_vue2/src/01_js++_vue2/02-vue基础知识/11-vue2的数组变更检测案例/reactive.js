import { observe } from './observe';

function defineReactiveData(data, key, value) {
  // 递归进行劫持
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      console.log('--get--_data访问', key, value);
      return value;
    },
    set(nvalue) {
      console.log('--set--_data访问', key, nvalue == value, nvalue);
      if (nvalue === value) return;
      observe(nvalue);
      value = nvalue;
    },
  });
}

export { defineReactiveData };
