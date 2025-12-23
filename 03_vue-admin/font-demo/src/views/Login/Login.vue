<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="title">lcl</div>
      <el-form :model="fromData" :rules="rules" ref="formRef">
        <el-form-item label="账号" prop="userName">
          <el-input
            placeholder="请输入账号"
            clearable
            v-model="fromData.userName"
          >
            <template #prefix>
              <el-icon>
                <i-ep-user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input
            placeholder="请输入密码"
            clearable
            type="password"
            v-model="fromData.userPwd"
          >
            <template #prefix>
              <el-icon>
                <i-ep-view />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" class="el-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      fromData: {
        userName: "admin",
        userPwd: "admin",
      },
      rules: {
        userName: {
          required: true,
          message: "Please input account ",
          trigger: "blur",
        },
        userPwd: {
          required: true,
          message: "Please input password ",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.formRef.validate(async (val) => {
        if (val) {
          const data = await this.$api.login(this.fromData);
          if (data) {
            this.$store.commit("saveUserInfo", data);
            // this.$router.push("/");
            window.location.reload();
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fcff;
  .login-box {
    width: 35.7143rem;
    padding: 3.5714rem;
    background-color: #fff;
    border-radius: 0.2857rem;
    box-shadow: 0rem 0rem 0.7143rem 0.2143rem #c7c9cb4d;
    .title {
      font-size: 3.5714rem;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 2.1429rem;
    }
    .el-btn {
      width: 100%;
    }
  }
}
</style>
