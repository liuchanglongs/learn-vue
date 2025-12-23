<!--
 * @Autor: lcl
 * @Version: 2.0
 * @Date: 2023-05-15 15:09:49
 * @LastEditors: lcl
 * @LastEditTime: 2023-05-15 16:03:43
 * @Description: lcl
-->
<template>
  <div>
    <div class="item-com">
      <div
        v-for="({ componentNmae, title, data }, index) in list"
        :key="title"
        :class="{ txt: cuttentindex == index }"
        class="item"
        @click="chageTab(index)"
      >
        {{ title }}
      </div>
    </div>
    <component
      :is="list[cuttentindex].componentNmae"
      :listDdata="list[cuttentindex].data"
    ></component>
  </div>
</template>

<script>
import codeItem from './15-动态组件/code-item.vue';
import fileItem from './15-动态组件/file-item.vue';
import musicItem from './15-动态组件/music-item.vue';
export default {
  components: {
    codeItem,
    fileItem,
    musicItem,
  },
  data() {
    return {
      list: [
        {
          title: 'music',
          componentNmae: 'musicItem',
          data: [
            {
              id: '1',
              title: 'music',
              comtent: 'music',
            },
          ],
        },
        {
          title: 'file',
          componentNmae: 'fileItem',
          data: [
            {
              id: '1',
              title: 'file',
              comtent: 'file content',
            },
          ],
        },
        {
          title: 'code',
          componentNmae: 'codeItem',
          data: [
            {
              id: '1',
              title: 'code',
              comtent: 'code content',
            },
            {
              id: '2',
              title: 'code2',
              comtent: 'code content 2',
            },
          ],
        },
      ],
      cuttentindex: 0,
    };
  },
  methods: {
    chageTab(index) {
      this.cuttentindex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.item-com {
  display: flex;
  align-items: center;
  .item {
    margin: 20px;
    cursor: pointer;
  }
}

.txt {
  color: red;
  font-size: 24px;
}
</style>
