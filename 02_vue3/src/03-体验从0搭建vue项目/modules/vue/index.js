/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-28 16:22:13
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-04 15:09:06
 * @Description: lcl
 */
export function createApp(component) {
  const $data = component.data();
  const $template = component.template;
  const $methods = component.methods;
  const vm = {};
  /**
   * 1. vue是解析的字符串,绑定事件,组装两个数据类型类记录事件\更新dom
   *    我们直接解析dom
   * */
  reactive.call(vm, $data);
  vm.Dom = createDom($template);

  const { propsPool, enentPool } = pools.call(vm, vm.Dom, $methods);

  // 初始化页面
  render.call(vm, propsPool);
  //绑定事件
  bindEvent.call(vm, enentPool);

  vm.mount = mount;
  return vm;
}

function mount(el) {
  // vue这里是innerhtml,它是直接处理的字符串,我们是创建成dom再筛选
  document.querySelector(el).appendChild(this.Dom);
}

function createDom(template) {
  const _c = document.createElement('div');
  // 经过虚拟节点对比
  _c.innerHTML = template;
  // 去点_c,多的div
  const firstChildNode = getFirstElementNode(_c);
  return firstChildNode;
}

function getFirstElementNode(node) {
  const children = node.childNodes;
  let firstNode = null;
  children.forEach(element => {
    // 元素节点类型
    if (element.nodeType === 1) {
      firstNode = element;
      return;
    }
  });
  return firstNode;
}

// 数据响应
const propsPool = new Map();
const enentPool = new Map();
function reactive(data) {
  this.$data = data;
  for (const key in data) {
    Object.defineProperty(this, key, {
      get() {
        return data[key];
      },
      set(value) {
        data[key] = value;
        update.call(this, propsPool, key);
      },
    });
  }
}

/**
 * 解析template字符串
 */

const props = {
  VIf: 'v-if',
  VShow: 'v-show',
};
const events = {
  VClick: 'click',
};
function pools(dom, methods) {
  const allNodes = dom.querySelectorAll('*');
  allNodes.forEach(element => {
    const isIf = element.getAttribute(props.VIf);
    const isShow = element.getAttribute(props.VShow);
    const isclick = element.getAttribute('@' + events.VClick);
    if (isIf) {
      propsPool.set(element, {
        type: props.VIf,
        key: isIf,
      });
    } else if (isShow) {
      propsPool.set(element, {
        type: props.VShow,
        key: isShow,
      });
    } else if (isclick) {
      console.log();
      enentPool.set(element, {
        type: events.VClick,
        handler: methods[isclick],
      });
    }
  });

  return { propsPool, enentPool };
}
/**
 * 绑定事件处理函数
 * @param  {object} eventPool  绑定事件标识对象
 */
function bindEvent(eventPool) {
  for (const [dom, info] of eventPool) {
    this[info.handler.name] = info.handler;
    dom.addEventListener(info.type, info.handler.bind(this), false);
  }
}
/**
 * 渲染函数
 * @param {object} propsPool  绑定属性标识对象
 */
function render(propsPool) {
  const data = this.$data;
  for (const [dom, info] of propsPool) {
    switch (info.type) {
      case props.VIf:
        // 首先判断有没有command node
        info.command || (info.command = document.createComment(props.VIf));
        !data[info.key] && dom.parentNode.replaceChild(info.command, dom);
        break;
      case props.VShow:
        data[info.key] || (dom.style.display = 'none');
        break;
      case events.VClick:
        break;
      default:
        break;
    }
  }
}

/**
 * 更新函数
 * @param {object} propsPool  绑定属性标识对象
 * @param {string} key  data的key
 */
function update(propsPool, key) {
  const data = this.$data;
  for (const [dom, info] of propsPool) {
    if (info.key === key) {
      switch (info.type) {
        case props.VIf:
          // 首先判断有没有command node
          info.command || (info.command = document.createComment(props.VIf));
          !data[info.key]
            ? dom.parentNode.replaceChild(info.command, dom)
            : info.command.parentNode.replaceChild(dom, info.command);
          break;
        case props.VShow:
          !data[info.key]
            ? (dom.style.display = 'none')
            : (dom.style.display = 'block');
          break;
        case events.VClick:
          break;
        default:
          break;
      }
    }
  }
}
