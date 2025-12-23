<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="item in breadcrumb" :key="item.path">
        <el-breadcrumb-item v-if="item.path === '/'" :to="{ path: '/' }">{{item.meta.title}}</el-breadcrumb-item>
        <el-breadcrumb-item v-else>{{item.meta.title}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

 
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
defineOptions({
  name: 'BreadCrumb',
});
const route = useRoute();

// route.matched 记录路由
const breadcrumb = computed(() => {
  return route.matched
})
</script>

<style lang="scss" scoped>
</style>