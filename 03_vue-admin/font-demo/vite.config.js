import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import DefineOptions from 'unplugin-vue-define-options/vite';

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  server: {
    port: 5210,
    proxy:{
      '/api': {
        target: "http://localhost:3000",
        // changeOrigin: true,
      },
    }
  },
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue',  'vue-router', 'vuex'],
       // 声明文件的存放位置
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),

        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],

    }),

    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        // 注意，前缀i-是固定的，ep就是我们刚才上面vite.config.ts中配置的那个参数enabledCollections:['ep']，
        // 使用：<i-ep-Edit></i-ep-Edit>
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),

    Icons({
      autoInstall: true,
    }),

    Inspect(),

    // 组件命名
    DefineOptions()
  ],
})
