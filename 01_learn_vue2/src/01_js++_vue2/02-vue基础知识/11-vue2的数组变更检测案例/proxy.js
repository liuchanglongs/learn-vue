function proxydata(vm, target, key) {
  // 数据中间做了代理
  Object.defineProperty(vm, key, {
    // vm[key] -> _data -> _data[key]
    get() {
      console.log('--get--', key);
      return vm[target][key];
    },
    set(nValue) {
      console.log('--set--', key);
      vm[target][key] = nValue;
    },
  });
}

export default proxydata;
