export var mixinCommonpent = {
  myOption: 'mixin-option-value',
  myArrayOption: ['mixin-item-1', 'mixin-item-2'],
  myObjectOption: { mixinKey: 'mixin-value' },
  data: function () {
    return {
      message: 'hello',
      foo: 'abc',
    };
  },
  beforeCreate() {
    console.log('mixinCommonpent-->beforeCreate');
  },
  created() {
    console.log('mixinCommonpent-->created');
  },
  beforeMount() {
    console.log('mixinCommonpent-->beforeMount');
  },
  mounted() {
    console.log('mixinCommonpent-->mounted');
  },
  beforeUpdate() {
    console.log('mixinCommonpent-->beforeUpdate');
  },
  updated() {
    console.log('mixinCommonpent-->updated');
  },
  beforeUnmount() {
    console.log('mixinCommonpent-->beforeUnmount');
  },
  unmounted() {
    console.log('mixinCommonpent-->unmounted');
  },
};
