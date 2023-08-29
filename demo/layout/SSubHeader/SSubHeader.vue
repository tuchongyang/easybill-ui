<template>
  <el-header v-if="!headerHidden" class="a-sub-header">
    <div class="header-left">
      <div v-if="route.meta.showBack && showBack" class="back">
        <div class="back-text" @click="isBack">
          <el-icon><back /></el-icon> 返回
        </div>
      </div>
      <div v-if="headerMenu && headerMenu.length" class="tab-list">
        <div v-for="(item, i) in headerMenu" :key="i" class="item" :class="{ active: route.path === item.url.replace(/(\?.*)$/, '') }" @click="toUrl(item.url)">{{ item.name }}</div>
      </div>
      <template v-else>
        <div v-if="currentRoute && currentRoute.level <= 2" class="title">{{ currentRoute.name }}</div>
        <div v-if="!currentRoute" class="title">{{ store.state.header.headerTitle || route.meta.title }}</div>
      </template>
      <el-button v-for="(item, i) in headerLeft" :key="i" v-bind="item.props" v-on="item.eventObject">{{ item.label }}</el-button>
    </div>
    <div class="header-right">
      <el-button v-for="(item, i) in headerRight" :key="i" v-bind="item.props" v-on="item.eventObject">{{ item.label }}</el-button>
      <el-button v-if="hasRefresh" type="primary" link :icon="Refresh" @click="refresh">刷新</el-button>
    </div>
  </el-header>
</template>
<script setup lang="ts">
import { ref, computed, shallowRef, watch } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import { Refresh, Back } from "@element-plus/icons-vue"
import { getQueryString } from "easybill-ui/utils/common"
const route = useRoute()
const store = useStore()
const router = useRouter()
const hasRefresh = computed(() => !!store.state.header.refresh)
const headerHidden = computed(() => store.state.header.headerHidden)
const refresh = () => {
  if (store.state.header.refresh && store.state.header.refresh instanceof Function) {
    store.state.header.refresh()
  }
}
const headerMenu = computed(() => {
  const isSystem = store.state.menu.currentEndMenu && store.state.menu.currentEndMenu.level >= 2
  const menus = isSystem ? store.state.menu.currentEndMenu.children : []
  return [...menus, ...store.state.header.headerMenu]
})
// const headerMenu = shallowRef(store.state.app.headerMenu)
const headerLeft = shallowRef(store.state.header.headerLeft)
const headerRight = shallowRef(store.state.header.headerRight)
// watch(
//   () => store.state.header.headerMenu,
//   (val) => {
//     headerMenu.value = val
//   }
// )

watch(
  () => store.state.header.headerLeft,
  (val) => {
    headerLeft.value = val
  },
)
watch(
  () => store.state.header.headerRight,
  (val) => {
    headerRight.value = val
  },
)
// 查找四级菜单
// const routes = computed(() => store.state.menu.menus[store.state.menu.currentMenuIndex]?.children)
let currentRoute = computed(() => store.state.menu.currentEndMenu)
// const getCurrentRoute = () => {
//   const routes = store.state.menu.menus[store.state.menu.currentMenuIndex]?.children
//   let result: EndMenuItem | undefined = undefined
//   if (!routes || !routes.length) {
//     store.commit("menu/setCurrentEndMenu", result)
//     return
//   }
//   const find = (childs: Array<any>, level: number, parent: any) => {
//     for (let i = 0; i < childs.length; i++) {
//       if (childs[i].path == route.path) {
//         result = {
//           ...parent,
//           level,
//         }
//       }
//       if (childs[i].children && childs[i].children.length) {
//         find(childs[i].children, level + 1, childs[i])
//       }
//     }
//   }
//   find(routes, 0, null)
//   console.log("result", result)
//   store.commit("menu/setCurrentEndMenu", result)
// }
// getCurrentRoute()
//$ref<MenuItem>()

// console.log("currentRoute", currentRoute)
// for(let i=0;i<routes.value.length;i++){
//   const one = routes[i]
//   for(let j=0;routes[i].children && j<routes[i].children.length;j++){
//     const two = routes[i].children[j]

//   }
// }

const showBack = ref(!!router.options.history.state.back || !!route.query.prev || false)
watch(
  () => route.path,
  () => {
    store.commit("header/setRefresh", null)
    store.commit("header/setHeaderTitle", "")
    store.commit("header/setHeaderHidden", false)
    store.commit("header/setHeaderMenu", [])
    store.commit("header/setHeaderLeft", [])
    store.commit("header/setHeaderRight", [])
    // console.log("currentEndMenu", store.state.menu.currentEndMenu)
    // console.log("headerMenu", store.state.header.headerMenu)
    showBack.value = !!router.options.history.state.back || !!route.query.prev
  },
)
const isBack = () => {
  const prev = (route.meta.backPath as string) || (route.query.prev as string)
  if (prev) {
    router.push(prev)
  } else {
    router.back()
  }
}
const toUrl = (url: string) => {
  const target = getQueryString("target", url)
  if (/^http/.test(url) || target.includes("blank")) {
    window.open(url, "_blank")
  } else {
    router.push(url)
  }
}
</script>
<style scoped lang="scss">
.a-sub-header {
  display: flex;
  justify-content: space-between;
  background: none;
  height: 40px;
  .header-left {
    display: flex;
    justify-self: center;
    .title {
      font-weight: 700;
      color: var(--el-text-color-primary);
    }
    .tab-list {
      overflow: hidden;
      .item {
        float: left;
        margin: 0 15px;
        line-height: 20px;
        padding-bottom: 6px;
        display: block;
        // padding: 0 20px;
        // border-radius: 30px;
        text-decoration: none;
        color: var(--el-text-color-primary);
        cursor: pointer;
        font-weight: 700;
        &:first-child {
          margin-left: 0;
        }
        &:hover {
          border-color: var(--el-color-primary);
          color: var(--el-color-primary);
        }
        &.active {
          border-color: var(--el-color-primary);
          // background: var(--el-color-primary);
          color: var(--el-color-primary);
          border-bottom: 3px solid var(--el-color-primary);
        }
      }
    }
    .back {
      margin-right: 20px;
      .back-text {
        color: var(--el-color-primary);
        padding-right: 20px;
        cursor: pointer;
        position: relative;
        i {
          vertical-align: middle;
          font-weight: bold;
          font-size: 20px;
        }
        &::after {
          position: absolute;
          content: "";
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 14px;
          background-color: var(--el-border-color-light);
        }
      }
    }
  }
}
</style>
