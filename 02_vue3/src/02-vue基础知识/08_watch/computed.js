/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-05 10:40:32
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-05 16:35:55
 * @Description: lcl
 */
class Computed {
  constructor() {
    this.computedData = {};
  }
  addComputed(vm, key, computed) {
    const descriptor = Object.getOwnPropertyDescriptor(computed, key);
    const value = descriptor.value.call(vm);
    const get = descriptor.get ? descriptor.get : descriptor.value;
    vm[key] = value;
    // console.log(value);

    this.computedData[key] = {
      value,
      get: get.bind(vm),
      dep: this._collecDep(get),
    };
  }
  _collecDep(getFn) {
    const strFn = getFn.toString();
    const match = strFn.match(/this.(.+?)/g);
    const dep = [];
    match.forEach((v, i) => {
      dep[i] = v.split('.')[1];
    });
    return dep;
  }

  undate(key, cb) {
    // console.log(this);
    const computedData = this.computedData;
    // console.log(key, this.computedData);
    for (const _key in computedData) {
      if (computedData[_key].dep.includes(key)) {
        // console.log(computedData[_key]);
        const Ovalue = computedData[_key].value;
        const nValue = computedData[_key].get();
        // console.log('nValue', nValue);
        this.computedData[_key].value = nValue;
        // console.log('--undate-->', _key, nValue, Ovalue);
        cb && cb(_key, nValue, Ovalue);
      }
    }
  }
}

export { Computed };
