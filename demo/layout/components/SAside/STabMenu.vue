<template>
  <div class="s-tab-menu">
    <div class="aside-menu-tab">
      <el-scrollbar>
        <ul>
          <li v-for="(item, i) in routes" :key="i" :class="{ active: props.currentTabPath == item.path }" @click="select(item)">
            <i v-if="item.icon" class="icon" :class="item.icon"></i>
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </el-scrollbar>
    </div>

    <div v-show="childRoutes.length" class="aside-menu-container">
      <el-scrollbar>
        <!-- <div v-if="childRoutes.length" class="aside-menu-top">
          <div class="title">{{ currentTabRoute.name }}</div>
        </div> -->
        <el-menu v-if="childRoutes.length && visible" ref="menuRef" :default-active="defaultActive" :default-openeds="defaultOpeneds" :router="true" class="aside-menu">
          <template v-for="(item, i) in childRoutes" :key="i">
            <SMenuItem :menu="item" :level="2" />
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { RouteItem } from "@/layout/hooks/useSetting"
import { computed, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useState } from "../../hooks/useState"
import SMenuItem from "../SMenu/SMenuItem.vue"

const props = defineProps({
  hasChild: {
    type: Boolean,
    default: false,
  },
  defaultParentActive: {
    type: String,
    default: "",
  },
  currentTabPath: {
    type: String,
    default: "",
  },
})
const emits = defineEmits(["update:hasChild", "update:currentTabPath"])

const route = useRoute()
const router = useRouter()
const { routes } = useState()
const defaultActive = computed(() => props.defaultParentActive || route.meta?.parent || route.path)

const getChildren = () => {
  const cur = routes.value.find((a) => a.path == props.currentTabPath)
  return (cur && cur.children) || []
}
const childRoutes = ref(getChildren())
const defaultOpeneds = ref<string[]>([])
// computed(() => {
//   const cur = routes.value.find((a) => a.path == props.currentTabPath)
//   return (cur && cur.children) || []
// })
const visible = ref(true)
watch(
  () => [routes.value, props.currentTabPath],
  () => {
    visible.value = false
    childRoutes.value = getChildren()
    defaultOpeneds.value = childRoutes.value.map((a) => a.path)
    setTimeout(() => {
      visible.value = true
    }, 0)
  },
)

onMounted(() => {
  emits("update:hasChild", childRoutes.value.length > 0)
})
const select = (item: RouteItem) => {
  emits("update:currentTabPath", item.path)
  if (!item.children?.length) {
    router.push(item.path)
  } else {
    // 找到第一个菜单
    let o = item
    while (o.children?.length) {
      o = o.children[0]
    }

    router.push(o.path)
  }
}
const menuRef = ref()
watch(
  () => childRoutes.value,
  (val) => {
    emits("update:hasChild", val.length > 0)
  },
)
</script>
<style scoped lang="scss">
.s-tab-menu {
  display: flex;
  height: 100%;
}
.aside-menu-tab {
  left: 0;
  width: var(--aside-width-close);
  background-color: var(--el-menu-bg-color);
  z-index: 10;
  position: relative;
  border-radius: 4px 0 0 4px;
  :deep(.el-scrollbar__view) {
    width: var(--aside-width-close);
  }
  ul {
    margin: 0;
    padding: 0;
    padding-left: 10px;
    margin-top: 20px;
  }
  li {
    width: auto;
    text-align: center;
    list-style: none;
    color: var(--el-menu-text-color);
    height: var(--el-menu-tab-item-height);
    box-sizing: border-box;
    line-height: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    font-size: var(--el-menu-item-font-size);
    border: 0;
    position: relative;
    padding: 10px 5px;
    opacity: 0.8;
    &:hover {
      background: var(--layout-tabmenu-hover-bg-color, var(--el-menu-hover-bg-color));
    }
    &.active {
      opacity: 1;
      background-color: var(--layout-aside-menu-bg, var(--el-bg-color));
      color: var(--el-color-primary);
      border-radius: var(--layout-tabmenu-border-radius, 10px 0 0 10px);
      &:before,
      &:after {
        content: "";
        width: 20px;
        height: 20px;
        background: url(/static/images/menu-triangle.svg) center/100% 100%;
        transform: rotate(90deg);
        color: #fff;
        position: absolute;
        top: -20px;
        right: 0;
        z-index: 5;
      }
      &:after {
        top: 100%;
        transform: rotate(0);
      }
    }
    .icon {
      display: inline-block;
      font-size: calc(var(--el-font-size-base) + 5px);
      margin-bottom: 10px;
    }
    .name {
      display: block;
    }
  }
}
.aside-menu-container {
  --el-menu-text-color: var(--layout-aside-menu-color);
  background: var(--layout-aside-menu-bg, var(--el-bg-color));
  flex: 1;
  // border-left: 1px solid var(--el-border-color);
  width: var(--aside-tab-width);
  color: var(--layout-aside-menu-color);
  // box-shadow: 0 0 0 1px var(--el-border-color) inset;
  .aside-menu-top {
    border-bottom: 1px solid var(--el-border-color);
    padding: 20px 10px;
    margin: 0 10px 20px;
    font-size: var(--el-font-size-medium);
  }
  .aside-menu {
    --el-menu-bg-color: transparent;
    border-right: 0;

    :deep(.el-sub-menu__icon-arrow) {
      opacity: 0.5;
    }
    :deep(.icon) {
      margin-right: 5px;
      font-size: var(--el-font-size-large);
    }
    :deep(.el-menu-item.is-active) {
      background-color: var(--el-color-primary-light-10);
    }
  }
}
</style>
