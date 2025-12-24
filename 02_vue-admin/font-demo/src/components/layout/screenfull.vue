<template>
  <div class="screenfull">
    <el-icon @click="fullScreen">
      <i-ep-FullScreen />
    </el-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull';
import { ElMessage } from "element-plus"
const isFullScreen = ref(true);
const fullScreen = () => {
  console.log(!screenfull.isEnabled);
  if (!screenfull.isEnabled) {
    ElMessage({ message: '你的浏览器不支持全屏', type: 'warning' })
    return false
  }
  screenfull.toggle()
}
</script>

<style lang="scss" scoped>
.screenfull {
  margin: 0 1rem;
}
</style>