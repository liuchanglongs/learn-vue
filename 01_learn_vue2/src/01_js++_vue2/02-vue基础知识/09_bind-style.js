/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-06 10:54:50
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-09 14:35:55
 * @Description: lcl
 */
import { createApp } from 'vue';
// const son = {
//   template: `<div>
//     <h2>hahahh</h2>
// </div>`,
//   created() {
//     console.log(this.$attrs);
//   },
// };
// const app = createApp({
//   template: `<div>
//     <h1>hahahh</h1>
//     <son data-in="hahah"></son>
//   </div>`,
//   components: { son },
// });

// app.mount('#app');

/**
 * 简单实现：class与class的绑定
 * 一些简单的实现思路
 */
import './09-bindstyleClass.less';
import { Vue } from './09_bind-style/index';
const vm = new Vue({
  el: '#app',
  template: `<div>
       <div :class="['box', isShow?'show':'', isDanger?'danger':'']">className Arry</div>
       <div :class="{danger:hasError}"> class Object </div>
       <h1 :style="[titleStyle,{display:titleShow?'block':'none'}]">style Array</h1>
       <h2 :style="{display:titleShow?'block':'none', ...titleStyle,fontSize:'28px'}">style object</h2>
   
     </div>`,
  data() {
    return {
      isShow: true,
      isDanger: true,
      hasError: true,

      titleStyle: {
        color: '#2e2020',
        fontSize: '20px',
      },
      titleShow: true,
    };
  },
});

console.log(vm);
