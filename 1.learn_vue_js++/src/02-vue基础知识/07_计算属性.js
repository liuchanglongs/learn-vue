/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-28 09:35:28
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-05 15:51:34
 * @Description: lcl
 */
// import { createApp } from 'vue';
// const app = createApp({
//   template: `
//   <div>
//     <span>{{a}}</span>
//     <span>+</span>
//     <span>{{b}}</span>
//     <span>=</span>
//     <span>{{total}}</span>
//     <h1>{{total}}</h1>
//     <h2>{{total}}</h2>
//     <button @click="change">点击</button>
//   </div>
//   `,
//   data() {
//     return {
//       a: 1,
//       b: 2,
//     };
//   },
//   computed: {
//     total() {
//       console.log('----');
//       return this.a + this.b;
//     },
//   },
//   methods: {
//     change() {
//       this.a = 1;
//     },
//   },
// });
// const vm = app.mount('#app');
// console.log(app);
// console.log(vm);

/**
 * 实现computed
 *  computed -> this -> 实例
 *  值也挂载到实例上
 *  收集依赖，依赖值不改变，computed就不会重新执行
 *  缓存上次计算的结果
 *  set
 *  get
 */

var computedData = {};
var dataPool = {};
function Vue(options) {
  this.$data = options.data();
  this.$el = document.querySelector(options.el);
  this._init(options.computed, options.template);
}
Vue.prototype._init = function (computed, template) {
  dataReactive.call(this);
  ComputedReactive.call(this, computed);
  render.call(this, template);
};

function render(template) {
  const reg1 = /\{\{(.*?)\}\}/;
  // 不使用虚拟节点
  const container = document.createElement('div');
  container.innerHTML = template;
  var allNodes = container.querySelectorAll('*');
  allNodes.forEach(node => {
    const match = node.textContent.match(reg1);
    if (match) {
      node.textContent = node.textContent.replace(reg1, (_node, key) => {
        // console.log(node, key.trim());
        dataPool[key.trim()] = node;
        return this[key.trim()];
      });
    }
  });
  this.$el.appendChild(container);
}

function updata(key) {
  // console.log('update', this[key], key, dataPool);
  dataPool[key].textContent = this[key];
}

function dataReactive() {
  var _data = this.$data;
  for (var key in _data) {
    (function (key, vm) {
      Object.defineProperty(vm, key, {
        get() {
          return _data[key];
        },
        set(nvalue) {
          _data[key] = nvalue;
          updata.call(this, key);
          updateComputed.call(this, key);
        },
      });
    })(key, this);
  }
}

function ComputedReactive(computed) {
  _initCompitedData.call(this, computed, computedData);
  for (var key in computedData) {
    (function (key, _this) {
      // console.log('--', computedData[key]);
      this[key] = computedData[key].value;
      Object.defineProperty(_this, key, {
        get() {
          return computedData[key].value;
        },
        set(nValue) {
          computedData[key].value = nValue;
        },
      });
    })(key, this);
  }
}

function updateComputed(key) {
  for (const _key in computedData) {
    const _dep = computedData[_key].dep;
    _dep.forEach(v => {
      if (v === key) {
        this[_key] = computedData[_key].get.call(this);
        // console.log('-->', this[_key]);
        updata.call(this, _key, this[_key]);
      }
    });
  }
}

/**
 * 组装 computed的数据结构
 * total: {
 *  value：函数返回值/实例上绑定的值
 *  get: get() // 调用的函数，还有set（没有做），默认函数都是get
 *  dep: []  依赖哪些值
 * }
 */
function _initCompitedData(computed, computedData) {
  for (const key in computed) {
    // 获取属性描述符：value
    var descriptor = Object.getOwnPropertyDescriptor(computed, key);
    console.log('descriptor-->', descriptor);
    var descriptorFn = descriptor.value.get
      ? descriptor.value.get
      : descriptor.value;
    computedData[key] = {};
    computedData[key].value = descriptorFn.call(this);
    computedData[key].get = descriptorFn;
    computedData[key].dep = collectDep(descriptorFn);
  }
}

function collectDep(fn) {
  const _collect = fn.toString().match(/this.(.+?)/g);
  if (_collect.length > 0) {
    for (let index = 0; index < _collect.length; index++) {
      _collect[index] = _collect[index].split('.')[1];
    }
  }
  return _collect;
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
    // total() {
    //   console.log('com:', this.a, this.b);
    //   return this.a + this.b;
    // },
    total: {
      get() {
        return this.a + this.b;
      },
      set(value) {
        console.log(value);
      },
    },
  },
});
vm.a = 200;
console.log(vm);
vm.b = 200;
