<template>
  <h1>Parent</h1>
  <button @click="add">add-->{{ number }}</button>

  <Son :number="number"></Son>
</template>

<script>
import Son from './Son.vue';

export default {
  name: 'Parent',
  components: {
    Son,
  },
  data() {
    return {
      number: 1,
    };
  },
  beforeCreate() {
    console.log('Parent-->beforeCreate');
  },
  created() {
    console.log('Parent-->created');
  },
  beforeMount() {
    console.log('Parent-->beforeMount');
  },
  mounted() {
    console.log('Parent-->mounted');
  },

  beforeUpdate() {
    console.log('Parent-->beforeUpdate');
  },
  updated() {
    console.log('Parent-->updated');
  },
  beforeUnmount() {
    console.log('Parent-->beforeUnmount');
  },
  unmounted() {
    console.log('Parent-->unmounted');
  },
  methods: {
    add() {
      this.number = ++this.number;
    },
  },
};
</script>
