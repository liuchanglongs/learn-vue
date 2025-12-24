<template>
  <h2>Son</h2>
</template>
<script>
export default {
  name: 'Son',
  beforeCreate() {
    console.log('Son-->beforeCreate');
  },
  created() {
    console.log('Son-->created');
  },
  beforeMount() {
    console.log('Son-->beforeMount');
  },
  mounted() {
    console.log('Son-->mounted');
  },
  beforeUpdate() {
    console.log('Son-->beforeUpdate');
  },
  updated() {
    console.log('Son-->updated');
  },
  beforeUnmount() {
    console.log('Son-->beforeUnmount');
  },
  unmounted() {
    console.log('Son-->unmounted');
  },
};
</script>
