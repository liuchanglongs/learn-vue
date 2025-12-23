/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-24 22:15:56
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-25 14:59:30
 * @Description: lcl
 */

/**
 * 实现一个加减乘除计算器
 * mvc：3层解耦 - 解决逻辑分离
 *
 * 管理数据 监听数据
 * Model -> data: a b s r
 *          watch ->data change ->undate view
 * 管理视图模板 渲染（render）
 * view -> template -> render
 * controller ->事件绑定，触发数据更新
 *
 * 事件绑定处理 事件处理函数
 * controller -> event tirgger -> modlel/data
 *
 * controller -> model ->view
 * view -> controller -> model -> view
 *
 *
 * 缺点： 驱动不集中，不内聚。
 * 驱动就是放在mvc各个层面：数据劫持（view）、render函数、事件处理函数(controller)
 * 开发层面：只需要写data、template、事件处理函数地方，其它由驱动完成。
 * mvc是mvvm的雏形，mvvm解决了驱动不集中，不内聚。解决了视图与模型之间完全隔离的一种关系。
 * 例如：model中去调用render函数，跨模块去调用，数据劫持对外界有强的依赖（自己需要去调用init())
 *
 * mvvm：双向数据流
 * 希望有驱动把数据（劫持）管理、模板渲染管理、事件处理绑定管理，都集中管理，隔离m 与 v。
 * 形成 view model， m管理data/事件处理函数操作data, v管理视图
 *
 * 但是在m层，vue又可以直接操作dom -> ref -> dom节点，所以是不完全依赖与mvvm
 *
 * angular ： mvw(whatever)
 * vue : 不完全依赖mv vm(viewModel) viewModel:主要数据（劫持）、模板编译、收集依赖
 * react:mvvm vm->单向数据流，需要手动改变
 *
 * vue是视图渲染库，依赖许多扩展库(vuex\router)，是渐进式框架。
 *
 * https://zhuanlan.zhihu.com/p/51045100
 * */

// 创建一个独立的作用域
(function () {
  function init() {
    model.init(); // 组织数据 + 数据监听/数据代理
    view.render(); //组织模板 + 更新/渲染模板
    controller.init(); // 事件函数的定义 与绑定
  }
  const model = {
    data: {
      a: 0,
      b: 0,
      s: '+',
      r: 0,
    },
    init() {
      const _this = this;
      // 代理：获取、设置model，把data转发出去
      for (var key in _this.data) {
        (function (key) {
          Object.defineProperty(_this, key, {
            get() {
              console.log('get', key);
              return _this.data[key];
            },
            set(newValue) {
              console.log('set', newValue);
              _this.data[key] = newValue;
              // 触发渲染
              view.render({ [key]: newValue });
            },
          });
        })(key);
      }
    },
  };

  const view = {
    el: '#app',

    template: `
    <p>
      <span class="cal-a">{{a}}</span>
      <span class="cal-s">{{s}}</span>
      <span class="cal-b">{{b}}</span>
      <span class="cal-eq">=</span>
      <span class="cal-r">{{r}}</span>
    </p>
    <p>
      <input type="Number" placeholder="Number a" class="cla-input a"/>
      <input type="Number" placeholder="Number b" class="cla-input b"/>
    </p>
    <p>
      <button class="cal-btn">+</button>
      <button class="cal-btn">-</button>
      <button class="cal-btn">*</button>
      <button class="cal-btn">/</button>
    </p>
    `,
    render(mutedData) {
      if (!mutedData) {
        // 初始化：view
        this.template = this.template.replace(
          /\{\{(.*?)\}\}/g,
          function (node, key) {
            // console.log(node, key);
            return model[key];
          }
        );
        const container = document.createElement('div');
        container.innerHTML = this.template;
        document.querySelector('#app').appendChild(container);
      } else {
        for (const key in mutedData) {
          console.log(key);
          // 使用calss做对应
          document.querySelector('.cal-' + key).textContent = mutedData[key];
        }
      }
    },
  };

  const controller = {
    init() {
      const inpus = document.querySelectorAll('.cla-input');
      for (let index = 0; index < inpus.length; index++) {
        inpus[index].addEventListener('input', this.handleInput, false);
      }
      const btns = document.querySelectorAll('.cal-btn');
      for (let index = 0; index < btns.length; index++) {
        btns[index].addEventListener('click', this.handleClick, false);
      }
    },
    handleInput(e) {
      // 它可以将字符串当成有效的表达式来求值并返回计算结果,不是字符串就直接返回
      const value = Number(e.target.value);
      const field = e.target.className.split(' ')[1];
      model[field] = value;
      model['r'] = eval(model['a'] + model['s'] + model['b']);
      // with (model) {
      //   r = eval(a + s + b);
      // }
    },
    handleClick(e) {
      const value = e.target.textContent;
      model['s'] = value;
      model['r'] = eval(model['a'] + model['s'] + model['b']);
      // with (model) {
      //   r = eval(a + s + b);
      // }
    },
  };

  init();
  // console.log(model['c']);
})();
