<template>
  <div>
    <button @click="showFn">隐藏</button>
    <Parent v-if="isShow"></Parent>
  </div>
</template>

<script>
import Parent from './Parent.vue';

export default {
  components: { Parent },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    showFn() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="less" scoped></style>
