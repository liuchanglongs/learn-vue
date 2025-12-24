/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-24 15:51:46
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-30 09:49:03
 * @Description: lcl
 */
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  // 开启运行时编译:学习的时候使用
  runtimeCompiler: true, // 加上这一段
  lintOnSave: false,
});
