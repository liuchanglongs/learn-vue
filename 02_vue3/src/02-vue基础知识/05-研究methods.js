/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-27 21:34:15
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-27 22:38:23
 * @Description: lcl
 */
/**
 * vue创建实例的时候会自动绑定当前的实例
 *    方法避免使用箭头函数
 *    fn()：()不是调用函数，而是传入实参的容器。
 *
 * 实例中直接挂载methods中的每一个方法
 */
const vm = new Vue({
  data() {
    return {
      a: 1,
      b: 2,
    };
  },
  methods: {
    add(num) {
      this.a += num;
    },
  },
});
function Vue(obj) {
  // console.log(obj);
  this.$data = obj.data();
  const methods = obj.methods;
  for (const key in this.$data) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(nvalue) {
        this.$data[key] = nvalue;
      },
    });
  }
  for (const key in methods) {
    this[key] = methods[key];
  }
  // console.log(methods);
}

console.log(vm);
vm.add(2);
console.log(vm);
