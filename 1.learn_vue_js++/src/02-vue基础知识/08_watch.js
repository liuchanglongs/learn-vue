/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-05 09:29:16
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-05 16:51:50
 * @Description: lcl
 */
/**
 * 模板处理、事件绑定：案例就不像vue进行字符串解析。这里直接转成dom再做处理
 * data: 数据响应 -> vm.key -> this.key -> get()/set()
 *       get() -> return data[key]
 *       set() -> data[key] = nvalue \ update() \updateComputed \undateWatch -> update()
 * computed: 数据响应
 *           收集依赖\数据改变:{value:value,get:fn(),dep:[]}
 *
 * watch ：
 *  {props:key, fn:fn()}
 */
import { reactive } from './08_watch/reactive';
import { Computed } from './08_watch/computed';
import { Watch } from './08_watch/watch';
class Vue {
  constructor(options) {
    const { computed, el, watch, data, template } = options;
    this.$data = data();
    this.$el = document.querySelector(el);
    // this._init = this.init;
    this.init(computed, watch, template);
  }
  init(computed, watch, template) {
    this.initData();
    const computedIns = this.initComputed(computed);
    this.$computed = computedIns.undate.bind(computedIns);
    const waatchIns = this.initWatch(watch);
    this.$watch = waatchIns.invoke.bind(waatchIns);
    this.initTemplate(template);
  }

  /**
   * data数据响应式
   */
  initData() {
    // 利用回调函数，接受get set函数的参数，抛出接口
    reactive(
      this,
      function (vm, nValue, key) {
        // console.log('get->', vm, nValue, key);
      },
      function (vm, nValue, OValue, key) {
        vm.$computed(key, function (_key, _nValue, _OValue) {
          if (nValue != OValue) {
            vm.$watch(_nValue, _OValue, _key);
          }
        });
        if (nValue != OValue) {
          vm.$watch(nValue, OValue, key);
        }
        // console.log('set-->', vm, nValue, OValue, key);
      }
    );
  }

  /**
   * computed响应式
   * @param {object} computed 包含计算属性的对象
   */
  initComputed(computed) {
    // 枚举computed
    const computedIns = new Computed();
    // 响应式
    for (const key in computed) {
      computedIns.addComputed(this, key, computed);
      const currentComputed = computedIns.computedData[key];
      // console.log('====', currentComputed);
      Object.defineProperty(this, key, {
        get() {
          return currentComputed.value;
        },
        // set(nvalue) {
        //   console.log('nvalue->', nvalue);
        //   // currentComputed.value = currentComputed.get();
        // },
      });
    }
    // 返回实例 -> undate -> 更新computed的value
    return computedIns;
  }

  /**
   * 收集 watch 侦听器
   * @param {object} watch 包含watch的对象
   */
  initWatch(watch) {
    // 枚举watch -> 增加侦听器
    const WatchIns = new Watch();

    for (const key in watch) {
      WatchIns.addWatcher(WatchIns, watch[key], key);
    }

    // 返回实例 -> 实例有调用watch的方法 -> 执行侦听器
    return WatchIns;
  }

  /**
   * 解析模板
   * @param {string} template 模板字符串
   */
  initTemplate(template) {
    const container = document.createElement('div');
    container.innerHTML = template;
    var allNodes = container.querySelectorAll('*');
    console.log(allNodes);
  }
}

const vm = new Vue({
  el: '#app',
  template: `
      <span>{{a}}</span>
      <span>+</span>
      <span>{{b}}</span>
      <span>=</span>
      <span>{{total}}</span>
    `,
  data() {
    return {
      a: 1,
      b: 2,
    };
  },
  computed: {
    total() {
      return this.a + this.b;
    },
    // total: {
    //   get() {
    //     return this.a + this.b;
    //   },
    //   set(value) {
    //     console.log(value);
    //   },
    // },
  },
  watch: {
    a(nValue, oValue) {
      console.log('a-watch-->', nValue, oValue);
    },
    b(nValue, oValue) {
      console.log('b-watch-->', nValue, oValue);
    },
    total(nValue, oValue) {
      console.log('total-watch-->', nValue, oValue);
    },
  },
});

vm.a = 3;
console.log('total>', vm.total);

vm.b = 30;
console.log('total>', vm.total);
console.log(vm);
