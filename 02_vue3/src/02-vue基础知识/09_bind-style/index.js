/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-06 14:09:55
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-09 14:35:03
 * @Description: lcl
 */
import { reactive } from './reactive';
// 去除空格，防止干扰正则
const regSpace = /\s+/g;
const regObj = /^\{(.+?)\}$/;
const regArry = /^\[(.+?)\]$/;
const reg_upp = /([A-Z])/g;
function trasformKeyToKebob(key) {
  return key.replace(reg_upp, '-$1').toLowerCase();
}

class Vue {
  constructor(options) {
    const { template, el, data } = options;
    this.$el = document.querySelector(el);
    this.$data = data();
    this.init(this, template);
  }
  init(vm, template) {
    this.initData(vm);
    this.render(vm, template);
  }
  initData(vm) {
    // 数据响应式
    const _data = this.$data;
    reactive(vm, _data);
  }
  render(vm, template) {
    // 这种没有分析字符串的方法不合理，平时学习可以使用
    const container = document.createElement('div');
    container.innerHTML = template;
    const allNodes = container.querySelectorAll('*');
    allNodes.forEach(element => {
      const attrs = [...element.attributes];
      attrs.forEach(v => {
        let { name, value } = v;
        name = name.replace(/:/, '');
        value = value.replace(regSpace, '');
        switch (name) {
          case 'class':
            if (regObj.test(value)) {
              const valueStr = value.match(regObj)[1].split(',');
              let str = '';
              valueStr.forEach(item => {
                const [value, key] = item.split(':');

                if (vm[key.trim()]) {
                  str += ' ' + value;
                }
              });
              element.setAttribute('class', str.trim());
            } else if (regArry.test(value)) {
              // console.log(vm, value);
              /**
               * ES6的时候发现了一种以前没有尝试过的写法,具体如下：
               * new Function的实现是这样的：:var function_name=new function(arg1,arg2,...,argN,function_body)
               * 参数必须写成字符串
               * 最后一个参数，function_body就是我们希望函数执行的函数体，这里函数体必须放在最后，而且参数和函数体都必须用字符串的形式写入
               * */
              const arr = (function (vm) {
                // with方法用于多次使用对象属性时，可简化多次编写同一对象的工作；
                // 作用域名–一个可以按序检索的对象列表，通过它可以进行变量名的解析。with语句用于临时拓展作用域链,
                // eval：字符串运算：可信环境下使用，防止执行用户输入的恶意的东西
                // const obj = { a: 1, b: 2 };
                // console.log(eval(obj['a'] + obj['b']));
                // 严格模式下不允许使用 "with" 语句。
                // function name () {
                //   // 严格模式下不允许使用 "with" 语句。
                //   // with(){}
                // }
                // (function (obj) {
                //   // console.log(obj);
                //   new Function(
                //     'obj',
                //     `with (obj) {
                //     console.log(eval(a + b));
                //   }`
                //   )(obj);
                // })(obj);
                // 在严格模式下使用 with 是被禁止的，因为它会破坏作用域链，影响代码的可读性和安全性。但是，使用 new Function 构造函数创建的函数并不会被视为在当前作用域内定义，因此 with 语句不会影响到该函数的作用域链。
                // 当你使用 new Function 构造函数时，你需要传递一个字符串作为函数的主体，这个字符串会被解析为函数体。在上面给出的代码中，with 语句是在字符串中定义的，而不是在当前作用域中定义的。因此，当函数被调用时，它会创建一个新的作用域，并将 vm 对象作为该作用域的上下文对象，然后使用 eval() 函数来执行 value 字符串的代码。
                // 需要注意的是，即使在使用 new Function 构造函数的情况下，使用 with 语句也可能会带来潜在的问题。因为 with 语句会使代码更难以理解和维护，因此最好避免使用它。

                /**
                 * 
                 * with 语句破坏作用域链的原因是它改变了作用域链的查找方式。
                 * 在 JavaScript 中，当代码引用一个变量时，
                 * JavaScript 引擎会在当前作用域中查找该变量。如果在当前作用域中没有找到该变量，它会向上一级作用域中查找，直到找到该变量或者到达全局作用域为止。
                    然而，当你使用 with 语句时，它会创建一个新的作用域，并将一个对象添加到当前该作用域的作用域链顶部。
                    这意味着在 with 语句块中引用的变量首先会在 with 语句所指定的对象中查找，而
                    不是在当前作用域中查找。如果在对象中没有找到该变量，JavaScript 引擎会继续向上查找，直到找到为止。
                    因此，使用 with 语句会导致以下问题：
                    可读性降低：代码变得更难以理解，因为变量的来源不再明确。
                    性能下降：由于引擎需要沿作用域链向上查找变量，所以 with 语句会降低代码的执行速度。
                    安全风险：如果 with 语句中的对象包含恶意代码，它可以访问当前作用域中的变量和对象，导致潜在的安全风险。
                    因此，在严格模式下，使用 with 语句被禁止，以提高代码的可读性、性能和安全性。
                 * 
                */
                const arr = new Function(
                  'vm',
                  `with(vm) {
                    return  eval(${value})
                }`
                );
                return arr(vm);
              })(vm);
              element.setAttribute('class', arr.join(' '));
            }
            break;
          case 'style':
            let str = '';
            // style识别：'font-size:20px' 这种形式
            if (regObj.test(value)) {
              const styleObj = new Function(
                'vm',
                `with(vm) {
                return  eval(${value})
            }`
              )(vm);
              // css识别font-size这种形式
              for (const key in styleObj) {
                str += `${trasformKeyToKebob(key)}:${styleObj[key]};`;
              }
            } else if (regArry.test(value)) {
              const styleObj = new Function(
                'vm',
                `with(vm) {
                return  ${value}
            }`
              )(vm);
              styleObj.forEach(item => {
                for (const key in item) {
                  str += `${trasformKeyToKebob(key)}:${item[key]};`;
                }
              });
            }
            element.setAttribute('style', str);
            break;
          default:
            break;
        }
      });
      element.removeAttribute(':class');
      element.removeAttribute(':style');
    });
    vm.$el.appendChild(container);
  }
}

export { Vue };
