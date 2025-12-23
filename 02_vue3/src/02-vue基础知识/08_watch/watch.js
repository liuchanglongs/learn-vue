/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-05 15:04:57
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-05 16:35:44
 * @Description: lcl
 */
class Watch {
  constructor() {
    /**
     * {
     *   key:"",
     *   fn:fn()
     * }
     */
    this.watchers = [];
  }
  addWatcher(vm, watcher, key) {
    this._addWatcher({
      key,
      watcher: watcher.bind(vm),
    });
  }
  _addWatcher(item) {
    this.watchers.push(item);
  }
  invoke(nValue, OValue, key) {
    this.watchers.forEach(item => {
      if (item.key === key) {
        item.watcher(nValue, OValue);
      }
    });
  }
}

export { Watch };
