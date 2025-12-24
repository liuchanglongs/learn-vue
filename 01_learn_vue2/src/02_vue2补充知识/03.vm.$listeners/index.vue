<template>
  <div>
    <h1>hello</h1>
    <Child @grandchild-click="handleGrandchildClick" />
  </div>
</template>

<script>
import Child from './Child.vue';

export default {
  name: 'App',
  components: { Child },
  data: function () {
    return {
      message: 'App',
      foo: 'App',
    };
  },
  methods: {
    handleGrandchildClick(message) {
      console.log('收到孙子组件消息:', message); // 输出: 收到孙子组件消息: Hello from grandchild
      return '--->';
    },
  },
};
</script>

<style lang="less" scoped></style>
