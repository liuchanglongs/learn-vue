<template>
  <div></div>
</template>

<script>
import { mixinCommonpent } from './mixin';

export default {
  name: 'App',
  mixins: [mixinCommonpent],
  components: {},
  data: function () {
    return {
      message: 'App',
      foo: 'App',
    };
  },
  beforeCreate() {
    console.log('App-->beforeCreate');
  },
  created() {
    console.log('App-->created', this.$data);
  },
  beforeMount() {
    console.log('App-->beforeMount');
  },
  mounted() {
    console.log('App-->mounted');
  },
  beforeUpdate() {
    console.log('App-->beforeUpdate');
  },
  updated() {
    console.log('App-->updated');
  },
  beforeUnmount() {
    console.log('App-->beforeUnmount');
  },
  unmounted() {
    console.log('App-->unmounted');
  },
};
</script>

<style lang="less" scoped></style>
