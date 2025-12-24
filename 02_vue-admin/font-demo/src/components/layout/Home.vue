<template>
  <div class="home">
    <div :class="['nav-aside', isCollapse?'close-bar':'']">
      <div class="header">
        <img src="@/assets/logo.png" mode="" />
        <div>Manger</div>
      </div>
      <div class="nav-bar-list">
        <el-menu router unique-opened menu-trigger="click" background-color="#001529" class="nav-menu"
          :default-active="defaultActive" text-color="#fff" :collapse="isCollapse">
          <TreeMenu :menuList="menuList"></TreeMenu>
        </el-menu>
      </div>
    </div>
    <div :class="['content-right', isCollapse?'change-width':'']">
      <div class="nav-top">
        <div class="left">
          <el-icon class="is-fold" @click="changeCollapse">
            <i-ep-Fold v-if="!isCollapse" />
            <i-ep-Expand v-else />
          </el-icon>
          <div class="bread-content">
            <BreadCrumb></BreadCrumb>
          </div>
        </div>
        <div class="right">
          <screenfull></screenfull>
          <el-badge :is-dot="noticeData" class="notice" @click="go">
            <el-icon>
              <i-ep-Bell />
            </el-icon>
          </el-badge>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{userInfo.userName}}
              <el-icon class="el-icon--right">
                <i-ep-arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="info">{{userInfo.userEmail}}</el-dropdown-item>
                <el-dropdown-item command="layout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="bottom">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
import screenfull from './screenfull.vue'
defineOptions({
  name: 'Home',
});
const store = useStore();
const router = useRouter();
const { proxy } = getCurrentInstance();

const userInfo = store.state.userInfo;
const isCollapse = ref(false);
const noticePath = ref("");
const noticeData = computed(() => store.state.noticeData);

let defaultActive = ref("");

// 初始化请求

const menuList = computed(() => {
  return store.state.menuList
});

// 方法
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
};


const handleCommand = (res) => {
  if (res === "layout") {
    store.commit("signOut");
    router.push("/login");
  }
};

const go = () => {
  if (noticePath.value && noticeData.value) {
    router.push("/audit/approve");
    store.commit("changeNoticeData", false);
  }
}

// console.log(proxy.$route);
watch(() => proxy.$route, async (nval, oval) => {
  defaultActive.value = nval.path
  if (nval.path === "/audit/approve") {
    noticePath.value = "";
    store.commit("changeNoticeData", false);
  } else {
    noticePath.value = nval.path;
    const getNoticeData = await proxy.$api.notice();
    if (getNoticeData) {
      store.commit("changeNoticeData", true);
    } else {
      store.commit("changeNoticeData", false);
    }
  }
}, { immediate: true })


</script>

<style lang="scss" scoped>
.home {
  display: flex;
  .nav-aside {
    width: 14.2857rem;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #001529;
    transition: width 0.5s linear 0s;
    color: #fff;
    &.close-bar {
      width: 4.5714rem;
    }
    .header {
      display: flex;
      align-items: center;
      font-size: 1.2857rem;
      height: 3.5714rem;
      img {
        width: 2.4286rem;
        height: 2.4286rem;
        margin: 0 1.1429rem;
      }
    }
    .nav-bar-list {
      .nav-menu {
        height: calc(100vh - 50px);
        border-right: none;
        // ::v-deep.el-menu--collapse {
        //   .treeMenu {
        //     .el-sub-menu {
        //      .el-tooltip__trigger {
        //         /*隐藏 > */
        //         span {
        //           display: none;
        //         }
        //         .el-submenu__icon-arrow {
        //           display: none;
        //         }
        //       }
        //     }
        //   }
        // }
      }
    }
  }
  .content-right {
    width: calc(100vw - 14.2857rem);
    transition: width 0.5s linear 0s;
    height: 100vh;
    background: #eef0f3;
    &.change-width {
      width: calc(100vw - 4.5714rem);
      transition: width 0.5s linear 0s;
    }
    .nav-top {
      height: 3.5714rem;
      line-height: 3.5714rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 0.0714rem solid #ddd;
      padding: 0 1.4286rem;
      background: #fff;
      .left {
        display: flex;
        align-items: center;
        .is-fold {
          margin-right: 1.0714rem;
          font-size: 1.2857rem;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .notice {
          line-height: 1.8571rem;
          margin-right: 1rem;
        }
        .el-dropdown {
          line-height: revert;
        }
      }
    }
    .bottom {
      padding: 1.4286rem;
      height: calc(100vh - 3.5714rem);
      .content {
        background: #eef0f3;
        height: 100%;
      }
    }
  }
}
</style>