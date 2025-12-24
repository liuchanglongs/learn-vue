/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-02 13:00:34
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-04 09:30:49
 * @Description: lcl
 */
/**
 * 1、vue项目 -> 为服务器项目 -> node:fs-> writeFile\readFile等
 * 2、node应用上 -> .vue、js、
 * 3、es6->es5
 * 4、less -> css
 * 5、跟文件 index.html
 * 6、webpack
 */
import './app.css';
export default {
  el: '#app',
  template: `  <div class="boxs">
      <h1 v-if="isIf">v-if</h1>
      <h1 v-show="isShow">v-show</h1>
      <button @click="changeShow">v-show</button>
      <button @click="changeIf">v-if</button>
    </div>`,
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
};
