<template>
  <!-- <div class="treeMenu"> -->
    <!-- 递归组件 侧边栏 -->
    <template v-for="item in props.menuList" :key="item._id">
      <el-sub-menu :index="item.path"
        v-if="item.children && item.children.length > 0 && item.children[0].menuType == 1">
        <template #title>
          <el-icon>
           <i-ep-Setting v-if="item.icon === 'el-icon-setting'" />
           <i-ep-Promotion v-else-if="item.icon === 'el-icon-s-promotion'" />
          </el-icon>
          <span>{{item.menuName}}</span>
        </template>
        <TreeMenu :menuList="item.children"></TreeMenu>
      </el-sub-menu>
      <el-menu-item-group v-else-if="item.menuType == 1">
        <el-menu-item :index="item.path">{{item.menuName}}</el-menu-item>
      </el-menu-item-group>
    </template>
  <!-- </div> -->
</template>



<script setup >
defineOptions({
  name: 'TreeMenu',
});
const props = defineProps({
  menuList: {
    type: Array,
    default: []
  }
});


</script>

<style lang="scss">


</style>