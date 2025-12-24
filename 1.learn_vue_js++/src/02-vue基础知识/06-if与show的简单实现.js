/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-28 09:35:28
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-28 15:17:46
 * @Description: lcl
 */
// import { createApp } from 'vue';
// createApp({
//   template: `
//   <div>
//     <h1 v-if="isIf">v-if</h1>
//     <h1 v-show="isShow">v-show</h1>
//     <button @click="changeShow">v-show</button>
//     <button @click="changeIf">v-if</button>
//   </div>
//   `,
//   data() {
//     return {
//       isShow: true,
//       isIf: true,
//     };
//   },
//   methods: {
//     changeShow() {
//       this.isShow = !this.isShow;
//     },
//     changeIf() {
//       this.isIf = !this.isIf;
//     },
//   },
// }).mount('#app');

/**
 * v-if：注释节点与真实dom切换
 * v-show：display控制
 * 实现难点：利用数据结构，记录数据
 * 合理利用数据保存信息，利用保存的数据做绑定操作和更新操作
 *
 * .vue文件就是规定统一的写法，解析后就是下面js写法，一个组件就是一个{}
 */
const vm = new Vue({
  el: '#app',
  template: `
        <h1 v-if="isIf">v-if</h1>
        <h1 v-show="isShow">v-show</h1>
        <button @click="changeShow">v-show</button>
        <button @click="changeIf">v-if</button>
      `,
  data() {
    return {
      isShow: true,
      isIf: false,
    };
  },
  methods: {
    changeShow() {
      this.isShow = !this.isShow;
    },
    changeIf() {
      this.isIf = !this.isIf;
    },
  },
  circle: {
    beforeCreate() {
      console.log('beforeCreate');
    },
    created() {
      console.log('created');
    },
    beforeMounted() {
      console.log('beforeMounted');
    },
    mounted() {
      this.isIf = true;
      console.log('mounted');
    },
    beforeUpdate() {
      console.log('beforeUpdate');
    },
    updated() {
      console.log('updated');
    },
  },
});
function Vue(options) {
  this.$el = document.querySelector(options.el);
  this.$data = options.data();
  _init.bind(this)(options);
}
function _init({ template, methods, circle }) {
  const vm = this;
  const showPool = new Map();
  const eventPool = new Map();
  // 抛出生命周期函数：
  for (const key in circle) {
    this[key] = circle[key];
  }
  /**
   * vue ：把template分析字符串，然后在一个一个的创建dom，在组装为标识结构
   *  我们实现： 先把template形成dom不挂载，在跟data形成showpool，然后在移除
   * showpool : Map({dom:{}})
   * [
   *  [
   *    dom, {type:if/show,prop:data}
   *  ]
   * ]
   *
   * eventpool：
   * [
   *   [dom,eventfn]
   * ]
   *  */
  // 数据劫持
  this.beforeCreate();
  initData(vm, showPool);
  this.created();

  const container = document.createElement('div');
  container.innerHTML = template;

  initPool(container, methods, showPool, eventPool);
  bindEvent(vm, eventPool);
  this.beforeMounted();
  render(vm, showPool, container);
  this.mounted();
  function initData(vm, showPool) {
    const _data = vm.$data;
    // console.log('-->', this);
    for (const key in _data) {
      Object.defineProperty(vm, key, {
        get() {
          return _data[key];
        },
        set(nvalue) {
          _data[key] = nvalue;
          vm.beforeUpdate();
          update(vm, key, showPool);
          vm.updated();
        },
      });
    }
  }
  function initPool(container, methods, showPool, eventPool) {
    const allNodes = container.querySelectorAll('*');
    let dom = null;
    for (let index = 0; index < allNodes.length; index++) {
      dom = allNodes[index];
      const vShowData = dom.getAttribute('v-show');
      const vIfData = dom.getAttribute('v-if');
      const vEventData = dom.getAttribute('@click');
      // 获取属性：dom.getAttribute、dom.dataset
      if (vShowData) {
        showPool.set(dom, { type: 'v-show', props: vShowData });
        dom.removeAttribute('v-show');
      }
      if (vIfData) {
        showPool.set(dom, { type: 'v-if', props: vIfData });
        dom.removeAttribute('v-if');
      }
      if (vEventData) {
        eventPool.set(dom, methods[vEventData]);
        dom.removeAttribute('@click');
      }
    }
  }
  function bindEvent(vm, eventPool) {
    for (const [dom, fn] of eventPool) {
      vm[fn.name] = fn;
      dom.addEventListener('click', vm[fn.name].bind(vm), false);
    }
  }
  function render(vm, showPool, container) {
    const _data = vm.$data;
    const el = vm.$el;

    // console.log(container);
    for (const [dom, info] of showPool) {
      switch (info.type) {
        case 'v-if':
          // 注释节点
          info.comment = document.createComment('v-if');
          !_data[info.props] && dom.parentNode.replaceChild(info.comment, dom);
          break;
        case 'v-show':
          !_data[info.props] && (dom.style.display = 'none');
          break;
        default:
          break;
      }
    }
    // console.log(container);
    el.appendChild(container);
    return container;
  }
  function update(vm, key, showPool) {
    const _data = vm.$data;
    const el = vm.$el;
    for (const [dom, info] of showPool) {
      if (info.props == key) {
        switch (info.type) {
          case 'v-if':
            // 注释节点
            // info.comment = document.createComment('v-if');
            console.log(_data[info.props], info.comment);
            _data[info.props]
              ? info.comment.parentNode.replaceChild(dom, info.comment)
              : dom.parentNode.replaceChild(info.comment, dom);
            break;
          case 'v-show':
            _data[info.props]
              ? (dom.style.display = 'block')
              : (dom.style.display = 'none');
            break;
          default:
            break;
        }
      }
    }
  }
}
console.log(vm);
