/*
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-04-24 15:24:23
 * @LastEditors: lcl
 * @LastEditTime: 2023-04-28 10:54:12
 * @Description: lcl
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 'plugin:vue/vue3-essential',
    // 'eslint:recommended',
    // '@vue/typescript/recommended',
    // 'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // quotes: 1,
    'vue/no-mutating-props': 0,
    'vue/multi-word-component-names': 0,
    'no-unused-vars': 0,
    'no-prototype-builtins': 0,
    'no-useless-escape': 0,
  },
};
