<template>
  <div class="exception">
    <el-button @click="goBack">Back</el-button>
  </div>
</template>

<script setup>
defineOptions({
  name: "exception"
});

const router = useRouter();
const goBack = () => {
  router.back(-1);
}
</script>

<style lang="scss" scoped>
.exception {
  background-image: url("@/assets/images/404.jpeg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>