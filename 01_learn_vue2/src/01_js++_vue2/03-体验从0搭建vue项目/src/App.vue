<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-28 15:26:16
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-04 15:09:34
 * @Description: lcl
-->
<template>
  <div class="boxs">
    <h1 v-show="isShow">v-show</h1>
    <h1 v-if="isIf">v-if</h1>
    <button @click="changeShow">v-show</button>
    <button @click="changeIf">v-if</button>
  </div>
</template>
<!--
 * 1、vue项目 -> 为服务器项目 -> node:fs-> writeFile\readFile等
 * 2、node应用上 -> .vue、js、
 * 3、es6->es5
 * 4、less -> css
 * 5、跟文件 index.html
 * 6、webpack
-->
<script>
export default {
  data() {
    return {
      isShow: true,
      isIf: false,
    };
  },
  methods: {
    changeShow() {
      console.log('--->', this);
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
</script>

<style>
.boxs {
  background: red;
}
</style>
