<template>
  <button @click="handleClick">点击我</button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      // 触发从祖父组件传递下来的事件
      const result = this.$emit('grandchild-click', 'Hello from grandchild');
      console.log('result:', result);
      console.log('result:', this.$listeners);
      console.log('result:', this);
    },
  },
};
</script>
