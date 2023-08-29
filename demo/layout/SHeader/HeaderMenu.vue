<template>
  <div ref="headerMenuRef" class="header-menu">
    <a v-for="(item, i) in menus" :key="i" :class="{ active: current == i }" class="item" :href="getPath(item)" :target="isTarget(item.url) ? '_blank' : '_self'">
      <i class=""></i>
      <span class="name">{{ item.name }}</span>
    </a>
    <el-dropdown v-if="menu.outer.length" trigger="click">
      <span class="item dropdown-item">
        <el-icon><MoreFilled /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="dropdown-menu-button">
          <el-dropdown-item v-for="(item, i) in menu.outer" :key="i" :class="{ active: current == i }" class="item">
            <a :href="getPath(item)" :target="/^http/.test(item.url) ? '_blank' : '_self'" class="dropdown-menu-link">{{ item.name }}</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import { MoreFilled } from "@element-plus/icons-vue"
import { getQueryString } from "easybill-ui/utils/common"
const route = useRoute()
const router = useRouter()
const store = useStore()
// const menus = computed(() => store.state.menu.menus)
const current = computed(() => store.state.menu.currentMenuIndex)
function getDefaultPath(menus: Array<any>, path: string) {
  let result = path
  const find = (list: Array<any>) => {
    for (let i = 0; i < list.length; i++) {
      if (path == list[i].url) {
        let obj = list[i]
        while (obj.children && obj.children.length) {
          obj = obj.children[0]
        }
        result = obj.url
      }
      if (list[i].children) {
        find(list[i].children)
      }
    }
  }
  find(menus)
  return result
}
const headerMenuRef = ref()
const headerMenuWidthMap = ref<any>([])
const menu = ref<any>({
  inner: [],
  outer: [],
})
const menus = computed(() => (menu.value.inner.length ? menu.value.inner : store.state.menu.menus))
let timer: any = null
const setMenuWidth = () => {
  menu.value.inner = []
  menu.value.outer = []
  timer && window.clearTimeout(timer)
  timer = setTimeout(() => {
    const pw = headerMenuRef.value.parentNode.offsetWidth
    let total = 0
    for (let i = 0; i < headerMenuWidthMap.value.length; i++) {
      total += headerMenuWidthMap.value[i]
      if (total + 50 > pw) {
        store.state.menu.menus[i] && menu.value.outer.push(store.state.menu.menus[i])
      } else {
        store.state.menu.menus[i] && menu.value.inner.push(store.state.menu.menus[i])
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
// store.dispatch("menu/getMenus", store.state.user.user.tenantType).then((menuList) => {
//   const path = getDefaultPath(menuList, router.currentRoute.value.path)
//   if (path !== router.currentRoute.value.path) {
//     router.replace(path)
//   }
//   for (let i = 0; i < headerMenuRef.value.children.length; i++) {
//     const ow = headerMenuRef.value.children[i].offsetWidth
//     headerMenuWidthMap.value[i] = ow
//   }
//   setMenuWidth()
// })
const init = () => {
  const path = getDefaultPath(store.state.menu.menus, router.currentRoute.value.path)
  if (path !== router.currentRoute.value.path) {
    router.replace(path)
  }
  for (let i = 0; i < headerMenuRef.value.children.length; i++) {
    const ow = headerMenuRef.value.children[i].offsetWidth
    headerMenuWidthMap.value[i] = ow
  }
  setMenuWidth()
  store.dispatch("menu/getCurrentMenuIndex")
  store.dispatch("menu/getCurrentEndMenu")
}
onMounted(() => {
  // 默认menus是存缓存，这里是兼容做法，防止之前用户登录过，菜单没有保存进去缓存
  if (!store.state.menu.menus.length) {
  } else {
    init()
  }
})
watch(
  () => route.path,
  () => {
    // store.dispatch("menu/getCurrentMenuIndex")
    // store.dispatch("menu/getCurrentEndMenu")
    // 如果访问的菜单是/system，则去查找当前菜单的子菜单的第一个
    // const path = getDefaultPath(menus.value, router.currentRoute.value.path)
    // if (path !== router.currentRoute.value.path) {
    //   router.replace(path)
    // }
  },
)
const getPath = (item: any) => {
  const path = item.url
  if (/^http/.test(path)) {
    return path
  } else {
    return getDefaultPath([item], path)
  }
}
const isTarget = (item: any) => {
  const target = getQueryString("target", item.url) || ""
  if (/^http/.test(item.url) || target.includes("blank")) {
    return true
  }
  return false
}
</script>
<style lang="scss" scoped>
.header-menu {
  display: flex;
  .item {
    padding: 0 15px;
    position: relative;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    // font-size: 16px;
    color: var(--el-text-color-regular);
    text-decoration: none;
    &:hover {
      color: var(--el-color-primary);
    }
    // &:after {
    //   content: "";
    //   display: none;
    //   left: 15px;
    //   right: 15px;
    //   height: 2px;
    //   position: absolute;
    //   bottom: 0;
    //   background: var(--el-color-primary);
    // }
    &.active {
      color: var(--el-color-primary);
      &:after {
        display: block;
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
