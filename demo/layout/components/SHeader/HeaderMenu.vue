<template>
  <div ref="headerMenuRef" class="header-menu">
    <div style="display: flex">
      <a v-for="(item, i) in list" :key="i" :class="{ active: currentTabPath == item.path, 'is-disabled': item.disabled }" :target="isTarget(item) ? '_blank' : '_self'" :to="getPath(item)" class="item" @click="onClick(item)">
        <i class=""></i>
        <span class="name">{{ item.name }}</span>
      </a>
      <el-dropdown v-if="menu.outer.length" trigger="click">
        <span class="item dropdown-item">
          <el-icon><MoreFilled /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="dropdown-menu-button">
            <el-dropdown-item v-for="(item, i) in menu.outer" :key="i" :class="{ active: currentTabPath == item.path, 'is-disabled': item.disabled }" class="item">
              <a :target="/^http/.test(item.path) ? '_blank' : '_self'" :to="getPath(item)" class="dropdown-menu-link" @click="onClick(item)">{{ item.name }}</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSetting, type RouteItem } from "@/layout"
import { MoreFilled } from "@element-plus/icons-vue"
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useState } from "../../hooks/useState"

const router = useRouter()

const headerMenuRef = ref<HTMLDivElement | undefined>()
const headerMenuWidthMap = ref<number[]>([])
const menu = ref<{ inner: RouteItem[]; outer: RouteItem[] }>({
  inner: [],
  outer: [],
})
const setting = useSetting()
const { currentTabPath } = useState()
const routes = ref(setting.value.routes)
const list = computed(() => (menu.value.inner?.length ? menu.value.inner : setting.value.routes))
let timer: number | null = null
const setMenuWidth = () => {
  menu.value.outer = []
  if (timer) window.clearTimeout(timer)
  timer = setTimeout(() => {
    if (!headerMenuRef.value) return
    const pw = headerMenuRef.value.offsetWidth
    let total = 0
    menu.value.inner = []
    for (let i = 0; i < headerMenuWidthMap.value.length; i++) {
      total += headerMenuWidthMap.value[i]
      if (total + 50 > pw) {
        if (routes.value[i]) menu.value.outer.push(routes.value[i])
      } else {
        if (routes.value[i]) menu.value.inner.push(routes.value[i])
      }
    }
  }, 300)
}
onMounted(() => {
  window.addEventListener("resize", setMenuWidth)
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", setMenuWidth)
})
const init = () => {
  if (!headerMenuRef.value) return
  const len = headerMenuRef.value?.children[0]?.children.length
  if (!len) return
  for (let i = 0; i < headerMenuRef.value.children[0].children.length; i++) {
    const child = headerMenuRef.value.children[0].children[i]
    if (child instanceof HTMLElement) {
      const ow = child.offsetWidth
      headerMenuWidthMap.value[i] = ow
    }
  }
  setMenuWidth()
}
onMounted(() => {
  init()
})
watch(
  () => setting.value.routes,
  () => {
    init()
  },
  { deep: true },
)

const getPath = (item: RouteItem) => {
  const path = item.path
  if (/^http/.test(path)) {
    return path
  } else {
    return item.path
  }
}
const isTarget = (item: RouteItem) => {
  if (/^http/.test(item.path)) {
    return true
  }
  return false
}
const onClick = (row: RouteItem) => {
  if (row.disabled) return
  const path = getPath(row)
  const target = isTarget(row)
  if (target) {
    window.open(path, "_blank")
  } else {
    router.push(path)
  }
}
</script>
<style lang="scss" scoped>
.el-dropdown-menu {
  :deep(.el-dropdown-menu__item.is-disabled) {
    opacity: 1;
  }
}

.header-menu {
  display: flex;
  overflow: hidden;
  flex: 1;

  .item {
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    color: var(--layout-header-text-color);

    &:hover {
      color: var(--layout-header-hover-text-color);
      background: var(--layout-header-hover-bg-color);
    }

    &.active {
      color: var(--layout-header-active-color);
      background: var(--layout-header-active-bg-color);

      &:after {
        display: block;
      }
    }

    &.is-disabled {
      opacity: 0.7;
      cursor: not-allowed;
      background: 0 0 !important;
      &:hover {
        color: inherit;
      }
    }

    &.dropdown-item {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
<style lang="scss">
.dropdown-menu-link {
  color: var(--el-text-color-regular);
  text-decoration: none;

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
