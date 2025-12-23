<template>
  <div>
    <Suspense>
        <router-view></router-view>
    </Suspense>
  </div>
</template>

<script>
</script>


<style lang="scss">
@import "./assets/style/index.scss";
@import "./assets/style/reset.css";
::-webkit-scrollbar {
  display: none;
}

// .el-menu--popup {
// 	// background: none !important;
//   // margin-left: -0.0714rem!important;
// 	padding: 0 0;
//   min-width: 8.5714rem !important;
//   line-height: 2.8571rem !important;
//   box-shadow: 0 .2857rem .5714rem 0 rgba(25,14,109,0.13);
//   // border-radius: 1.0714rem !important;
// }

// 修改弹出层激活的样式
//   .el-menu--popup > div:has(.is-active){
//   background-color: #001529 !important;
//   border-left: 2px solid #ed1c24 !important;
// }
// ::v-deep .el-menu--popup{
//   &div{
//     background: #001529 !important;
//   }
// }
// 修改弹出层hover样式
//   .el-menu--popup > div:has(.el-menu-item) :hover{
//   background-color: #001529 !important;
//   border-left: 2px solid #ed1c24 !important;
//   color:#001529 !important;
// }

// 添加虚线
// .el-menu--popup> div {
//   border-bottom: 1px dashed rgba(0, 0, 0, 0.7) !important;
// }
// 修改element菜单的样式
// .el-menu {
//   border: none;
//   height: 100%;
//   width: 100%;
//   background-color: #001529 !important;
//   /**配色 */

//    .el-menu-item {
//     background-color: #001529 !important;
//     color: #001529 !important;
//     &:hover {
//       background-color: #001529 !important;
//       border-left: 2px solid #ed1c24  !important;
//       color:#001529 !important;
//     }
//     &.is-active {
//       background-color: #001529 !important;
//       border-left: 2px solid #ed1c24 !important;
//       color:#001529 !important;
//     }
//   }

//    .el-submenu__title {
//     background-color: #001529 !important;
//     &:hover {
//       background-color: #001529 !important;
//       border-left: 2px solid #ed1c24;
//       color:#001529 !important;
//     }
//   }

//    .el-submenu.is-active > .el-submenu__title {
//     color: #001529 !important;
//     &:hover,
//     &:hover > i {
//       color:#001529 !important;
//     }
//   }

//   // 一级菜单加上横向实线，二级菜单虚线
//   .submenu-title-noDropdown,
//   .el-submenu__title {
//     border-bottom: 1px solid rgba(201, 211, 213, 0.3) !important;
//   }
// // 二级菜单添加虚线
//   .el-menu--inline > div {
//     border-bottom: 1px dashed rgba(201, 211, 213, 0.7) !important;
//   }
// }
</style>

