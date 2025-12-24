/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-28 15:49:41
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-04 15:12:15
 * @Description: lcl
 */
// webpack给自定义编写了loader权限。我哦们纸编译app.vue
const {
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} = require('fs');
const { mkdir } = require('fs/promises');
const { resolve } = require('path');

const templateReg = /\<template\>(.*?)\<\/template\>/;
const scriptReg = /\<script\>(.*?)\<\/script\>/;
const styleReg = /\<style\>(.*?)\<\/style\>/;
function vueLoader(source) {
  // 遇到vue文件会把.vue的内容当字符串传进来。
  /**
   *  把.vue文件解析成一个对象，返回出去
   */
  // 去掉换行对正则的影响
  const str = source.replace(/[\r\n]/g, '');
  const template = str.match(templateReg)[1];
  const script = str.match(scriptReg)[1];
  const style = str.match(styleReg)[1];

  // 提出div标签,放在script里面
  const vueScript = script.replace(/\{(.*?)/, (node, key) => {
    return `
      {template: '${template}',
    `;
  });
  // 引入css：建立文件夹，装入临时文件
  const cssName = new Date().getTime();
  const cssFileName = `../../_temp/css/_${cssName}.css`;
  writeFile(cssFileName, style);

  // 导出类似app.js的字符串
  /**
   * 处理: style中的样式, 要变成 import''这种:创建临时文件夹,存储该字符串,然后import这个路径
   * vue loader 执行完后,返回这种格式, style loader: 会处理这种字符串: import'../_temp/css/_${cssName}.css'
   * return出去的东西:会在vue的createApp里面接受vueScript字符串变成的对象
   */
  return `
    import'../_temp/css/_${cssName}.css';
    ${vueScript}
  `;
}
function writeFile(cssFileName, styleStr) {
  // 没有文件创建
  const _temp = '../../_temp';
  const _tempCss = '../../_temp/css';
  // 文件夹不存在才建立
  if (!existsSync(formatPath(_temp))) {
    mkdirSync(formatPath(_temp));
    mkdirSync(formatPath(_tempCss));
  }
  // 有文件就删除
  const files = readdirSync(formatPath(_tempCss));

  files &&
    files.forEach(file => {
      unlinkSync(formatPath(_tempCss + '/' + file));
    });
  writeFileSync(formatPath(cssFileName), styleStr);
}
const formatPath = path => resolve(__dirname, path);

module.exports = vueLoader;
