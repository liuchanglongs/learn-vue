<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-15 15:39:21
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-15 16:02:46
 * @Description: lcl
-->
<template>
  <div>
    <ul>
      <li v-for="{ id, title, comtent } in listDdata" :key="id">
        <h1>{{ title }}</h1>
        <span>{{ comtent }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    listDdata: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped></style>
