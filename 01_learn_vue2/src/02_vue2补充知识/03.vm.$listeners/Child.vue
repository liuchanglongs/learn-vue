<template>
  <!-- 通过 v-on="$listeners" 将所有事件监听器传递给内部组件 -->
  <GrandChild v-on="$listeners" />
</template>

<script>
import GrandChild from './GrandChild.vue';

export default {
  components: { GrandChild },
  mounted() {
    console.log('$listeners', this.$listeners);
  },

  // 不需要额外处理事件，直接传递
};
</script>
