/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-24 22:15:56
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-25 14:54:10
 * @Description: lcl
 */
/**
 * M:model 数据管理 数据劫持
 *
 * V:view 模板管理 渲染管理
 *
 * C: controller 事件绑定 事件处理函数
 *
 * view -> controller -> model -> view
 * controller -> model ->view
 *
 * */
(function () {
  function init() {
    model.init();
    view.render();
    controller.init();
  }
  const model = {
    data: {
      a: 0,
      s: '+',
      b: 0,
      eq: '=',
      r: 0,
    },
    init() {
      for (const key in this.data) {
        (key => {
          /**
           * 1. this对象，收集this.data里面的key，model[key] 返回数据
           * 2. this.data对象，收集this.data里面的key， model[key]返回数据：需要外面定义一个变量接受get的值，不然会死循环
           * */
          Object.defineProperty(this, key, {
            get() {
              return this.data[key];
            },
            set(nvalue) {
              console.log('set:', nvalue);
              this.data[key] = nvalue;
              view.render({ [key]: nvalue });
            },
          });
        })(key);
      }
    },
  };
  const view = {
    root: '#app',
    template: `
    <P>
      <span class="cl-a">{{a}}</span>
      <span class="cl-s">{{s}}</span>
      <span class="cl-b">{{b}}</span>
      <span class="cl-eq">{{eq}}</span>
      <span class="cl-r">{{r}}</span>
    </P>
    <p>
      <input type="number" class="set-number a"  placeholder="Number a"/>
      <input type="number" class="set-number b"  placeholder="Number b"/>
    </p>
    <p>
      <button>+</button>
      <button>-</button>
      <button>*</button>
      <button>/</button>
    </p>
    `,
    render(value) {
      // 初始化执行一次
      // data改变执行一次

      // * 匹配0或多个正好在它之前的那个字符。例如正则表达式。*意味着能够匹配任意数量的任何字符。? 匹配0或1个正好在它之前的那个字符。注意：这个元字符不是所有的软件都支持的。.*是指任何字符0个或多个，.?是指任何字符0个或1个.
      // .*具有贪婪的性质，首先匹配到不能匹配为止，根据后面的正则表达式，会进行回溯。.*？则相反，一个匹配以后，就往下进行，所以不会进行回溯，具有最小匹配的性质。
      // ？表示非贪婪模式，即为匹配最近字符 如果不加?就是贪婪模式a.*bc 可以匹配  abcbcbc

      // 当第二个参数是函数时，这个函数的前三个参数（）：
      // 1、当正则没有分组的时候，传进去的第一个实参是正则捕获到的内容，第二个参数是捕获到的内容在原字符串中的索引位置，第三个参数是原字符串（输入字符串）
      // 2、当正则有分组的时候，第一个参数是总正则查找到的内容，后面依次是各个子正则查找到的内容。
      // 2、传完查找到的内容之后，再把总正则查找到的内容在原字符串中的索引传进（就是arguments[0]在str中的索引位置）。最后把输入字符串（就是原字符串）传进去
      if (!value) {
        this.template = this.template.replace(
          /\{\{(.*?)\}\}/g,
          function (target, key) {
            return model[key];
          }
        );
        const container = document.createElement('div');
        container.innerHTML = this.template;
        document.querySelector('#app').appendChild(container);
      } else {
        for (const key in value) {
          // 通过对应的class拿dom
          document.querySelector('.cl-' + key).textContent = value[key];
        }
      }
    },
  };

  const controller = {
    init() {
      // class 名字来对应类名

      // input 事件绑定
      const inputs = document.querySelectorAll('.set-number');
      for (let index = 0; index < inputs.length; index++) {
        inputs[index].addEventListener('input', this.handleinput);
      }

      // btns 事件绑定
      const btns = document.querySelectorAll('button');

      for (let index = 0; index < btns.length; index++) {
        btns[index].addEventListener('click', this.handleclick);
      }
    },
    handleinput(e) {
      const target = e.target;
      const value = target.value;
      const field = target.className.split(' ')[1];
      model[field] = value;
      // model['r'] = eval(model['a'] + model['s'] + model['b']);
      with (model) {
        r = eval(a + s + b);
      }
    },
    handleclick(e) {
      const target = e.target;
      const symbol = target.textContent;
      model['s'] = symbol;
      with (model) {
        r = eval(a + s + b);
      }
    },
  };

  init();
})();
