<template>
  <el-aside class="a-aside" :width="!isCollapse ? 'var(--aside-width-open)' : 'var(--aside-width-close)'">
    <div class="a-aside-menu">
      <el-scrollbar always>
        <SLogo />
        <!-- <div style="height: 100px"></div> -->
        <STabMenu v-if="layout == 'split'" />
        <SMenu v-else />
      </el-scrollbar>
    </div>
    <SAsideToggle class="asideToggle" />
  </el-aside>
</template>
<script setup lang="ts">
import { ref, computed, Ref } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import SLogo from "../SLogo"
import STabMenu from "./STabMenu.vue"
import SMenu from "../SMenu"
import SAsideToggle from "../SAsideToggle"
const store = useStore()
const isCollapse = computed(() => !store.state.layout.sideOpen)
const layout = computed(() => store.state.layout.layout)
</script>
<style scoped lang="scss">
.a-aside {
  --a-aside-bg-color: var(--el-bg-color);
  height: 100vh;
  background: var(--a-aside-bg-color);
  transition: width 0.3s;
  z-index: 50;
  border-right: var(--el-border-base);
  display: flex;
  flex-direction: column;
  box-shadow: 1px 0px 16px 0px rgb(0 0 0 / 10%);
  :deep(.s-logo) {
    .logo {
      padding: 10px 0 10px;
      vertical-align: top;
      margin: 0 10px;
      img {
        max-height: 50px;
        vertical-align: top;
        margin-top: 15px;
      }
    }
    .title {
      display: block;
      margin: 0 0 20px 0;
      line-height: 1.5;
    }
  }
  .a-aside-menu {
    flex: 1;
  }
  .asideToggle {
    width: 64px;
    text-align: center;
  }
}
</style>
