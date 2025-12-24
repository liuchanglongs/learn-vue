/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-11 09:57:46
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-11 11:02:30
 * @Description: lcl
 */
import { createApp } from 'vue';

const app = {
  template: `
  <div>
  <h1>v-for： 没有key</h1>
  <ui>
    <li v-for="({id, name,value}, index) of list" :key="index">
      <span>{{name}}</span>
      <input  />
      <button @click="deleteFn(index)">dele</button>
    </li>
  </ui>
  </div>
  `,
  data() {
    return {
      list: [
        { id: 'aaa', name: 'hahah', value: 2 },
        { id: 'aaa1', name: 'hahah1', value: 3 },
        { id: 'aaa2', name: 'hahah2', value: 4 },
        { id: 'aaa3', name: 'hahah3', value: 5 },
      ],
      isShow: true,
    };
  },
  methods: {
    deleteFn(index) {
      this.list.splice(index, 1);
    },
    dianji() {
      this.isShow = !this.isShow;
    },
  },
};

createApp(app).mount('#app');
