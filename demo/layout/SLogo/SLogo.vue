<template>
  <div class="s-logo" :class="{ split: layout == 'split' }">
    <div class="logo"><img v-if="logo" :src="logo" /></div>
    <div class="title">{{ title }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
// import logo from "@/assets/images/logo.png"
const store = useStore()
const layout = computed(() => store.state.layout.layout)
const title = computed(() => store.state.layout.title)
const logo = computed(() => store.state.layout.logo)
</script>
<style scoped lang="scss">
.s-logo {
  line-height: var(--header-height);
  text-align: center;
  overflow: hidden;
  line-height: 1;
  .logo {
    display: inline-block;
    vertical-align: top;
    line-height: 1;
    padding: 5px 0;

    img {
      max-height: 40px;
      vertical-align: top;
      max-width: 100%;
    }
    & + .title {
      margin-left: 10px;
    }
  }
  .title {
    display: inline-block;
    vertical-align: top;
  }
  &.split {
    .logo {
      width: var(--aside-width-close);
      float: left;
    }
    .title {
      background: #fff;
      margin-left: var(--aside-width-close);
      display: block;
      white-space: nowrap;
      color: var(--el-text-color-primary);
    }
  }
}
</style>
