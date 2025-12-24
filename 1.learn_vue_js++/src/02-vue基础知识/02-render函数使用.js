/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-26 16:50:57
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-27 14:28:02
 * @Description: lcl
 */
/**
 * 模板语法：
 *
 * template ->html字符串；还有vue的一些特性：表达式、指令、属性（变量化）等
 * vue的模板都是基于html的，
 * html的模板中可以直接被浏览器的html解析器解析
 *
 * vue有自己的模板编译：开发中携带template -> 分析html字符串 -> ast ->表达式、指令、属性被转化成原生的 ->形成虚拟dom树 ->
 * ->解析成真实dom -> render
 *
 */
import { createApp } from 'vue';
import { h } from 'vue';

/**
 * 产生事具绑定的机制：props, data，mutation
 *
 * 指令：模板应该按照怎样的逻辑进行渲染与绑定行为。
 * vue: v-once、v-html、v-if、v-else、v-else-if、v-show、v-for
 * v-once：会影响整个标签的值改变的渲染。可以外面定义一个变量，这样就不会影响子元素数据改变后的渲染
 * v-html:
 * 插入的内容含有vue的一些指令不会被解析
 * 动态渲染html，使用基本的innerhtml，不要把有关用户相关的信息，有时候导致xss攻击
 *
 * 属性：
 * attribute：HTML扩展->title、src、href  -> attr
 * property：在对象内部中存储数据，描述数据结构 -> prop
 *
 * 插入值与表达式：{{}}（标签中）、v-bind/:(属性)
 * var a：声明语句
 * var a = 1; 声明赋值语句
 * a = 1 赋值表达式
 *
 * {{}}：数学运算表达式、字符串拼接('a'+'b')、判断表达式（三目、><）、jsapi（replace、parseInt）
 *       不能绑定语句与多个表达式
 *
 * v-if:删除节点
 * v-show：隐藏节点
 * v-on: 绑定事件处理函数
 *     @clike =" test(1)" ==  @clike ="()=> test(1)"
 *  arg = 'clike'
 *  @clike  = @[arg]
 *
 * v-bind: 绑定的属性也可以使用变量bindname,使用变量的时候bindname不能含有",'，如果需要可以利用函数和moutation计算。
 * bindname:不能为全局变量，只能使用data、prop、计算的变量。当bindname = null的时候，会移除该属性绑定
 * <p :[bindname]='name'></p>
 * <p :["data-" + bindname]='name'></p>  xx
 *
 * render->h()函数的使用。
 */

const app = {
  template: `
  <div>
    <h1 class="title">{{title}}</h1>
    <p>
      <span class="author">{{author}}</span>
        ---{{dateTime}}---
    </p>
    <p v-bind:title="content">{{content}}</p>
    <h1 :[restBind] ='title'>解除属性绑定<button @click ="changeBind">点击</button></h1>

  </div>
  `,

  data() {
    return {
      title: 'title',
      author: 'author',
      dateTime: new Date().getTime(),
      content: 'hallo word!!!',
      restBind: 'hahah',
    };
  },
  methods: {
    changeBind() {
      this.restBind = null;
    },
  },
  // render() {
  //   /**
  //    * 第1个参数："tag"
  //    * 第2个参数：{prop:'name'}
  //    * 第3个参数：'模板值' | [h(),h(),'字符串']
  //    *  */
  //   return h('div', {}, [
  //     h('h1', { class: 'title' }, this.title),
  //     h('p', {}, [
  //       h('span', { calss: 'author' }, this.author),
  //       ` ---${this.dateTime}---`,
  //     ]),
  //     h('p', { title: this.content }, this.content),
  //   ]);
  // },
};
createApp(app).mount('#app');
