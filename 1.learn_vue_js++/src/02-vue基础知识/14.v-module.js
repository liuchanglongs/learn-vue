/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-15 10:37:05
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-15 10:40:25
 * @Description: lcl
 */
import { createApp } from 'vue';

const app = {
  template: `
  <div>
  <input v-module.lazy="value" @input= "inputs"/>
  </div>
  `,
  data() {
    return {
      value: '',
    };
  },
  methods: {
    inputs() {
      console.log('------');
    },
  },
};

createApp(app).mount('#app');
