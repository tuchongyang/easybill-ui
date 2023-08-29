<template>
  <div id="tags-view-container" class="tags-view-container" :class="tagViewType">
    <el-scrollbar>
      <div class="tags-view-wrapper">
        <router-link
          v-for="tag in visitedViews"
          ref="refTag"
          :key="tag.path"
          :class="isActive(tag) ? 'active' : ''"
          :to="{ path: tag.path, query: tag.query, params: tag.params, name: tag.name }"
          class="tags-view-item"
          @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          {{ tag.title }}
          <Close v-if="!isAffix(tag) && visitedViews.length > 1" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></Close>
        </router-link>
      </div>
    </el-scrollbar>

    <el-dropdown trigger="click" @command="operation.handleCommand">
      <el-button :icon="Menu" type="primary" link class="toggle"></el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item, i) in operation.list" :key="i" :command="item.code">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        <el-icon>
          <Refresh />
        </el-icon>
        刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <el-icon>
          <Close />
        </el-icon>
        关闭
      </li>
      <li @click="closeOthersTags">
        <el-icon>
          <Right />
        </el-icon>
        关闭其他
      </li>
      <li @click="closeAllTags(selectedTag)">
        <el-icon>
          <CircleClose />
        </el-icon>
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, shallowRef } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import { Back, CircleClose, Close, Menu, Refresh, Right } from "@element-plus/icons-vue"

import { onMounted, reactive, toRefs, watch } from "vue"
//获取store和router
import { RouteRecordRaw } from "vue-router"

const store = useStore()
const router = useRouter()
const route = useRoute()

interface State {
  visible: boolean
  top: number
  left: number
  selectedTag: any
  affixTags: any[]
}

const state = reactive<State>({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  affixTags: [],
})
const tagViewType = computed(() => store.state.layout.tagViewType)
const visitedViews = computed(() => {
  return store.state.tagsView.visitedViews
})
const routes = computed(() => {
  return router.getRoutes()
})

watch(
  () => route.path,
  (val) => {
    if (val !== "/login" && val !== "/" && val !== "/dashboard") {
      addTags()
    }
    // tag remove has issue
    // moveToCurrentTag()
  },
)
watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener("click", closeMenu)
    } else {
      document.body.removeEventListener("click", closeMenu)
    }
  },
)

watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener("click", closeMenu)
    } else {
      document.body.removeEventListener("click", closeMenu)
    }
  },
)

onMounted(() => {
  initTags()
  if (route.path !== "/login" && route.path !== "/" && route.path !== "/dashboard") {
    addTags()
  }
})

const isActive = (routeItem: RouteRecordRaw) => {
  return routeItem.path === route.path
}
const isAffix = (tag: any) => {
  return tag.meta && tag.meta.affix
}

const filterAffixTags = (routes: Array<RouteRecordRaw>) => {
  let tags: Array<any> = []
  routes.forEach((route) => {
    // if (route.meta && route.meta.affix) {
    //   const tagPath = router.resolve(basePath, route.path)
    //   tags.push({
    //     fullPath: tagPath,
    //     path: tagPath,
    //     name: route.name,
    //     meta: { ...route.meta },
    //   })
    // }
    if (route.children) {
      const tempTags = filterAffixTags(route.children)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}
const initTags = () => {
  const affixTags = (state.affixTags = filterAffixTags(routes.value))
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      store.dispatch("tagsView/addVisitedView", tag)
    }
  }
}
const addTags = () => {
  const { name } = route
  if (name) {
    store.dispatch("tagsView/addView", route)
  }
  return false
}
const refreshSelectedTag = (view: any) => {
  const { fullPath } = view
  nextTick(() => {
    router.replace({
      path: "/redirect" + fullPath,
    })
  })
}
const closeSelectedTag = (view: any) => {
  store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}
const closeOthersTags = () => {
  router.push(state.selectedTag)
  store.dispatch("tagsView/delOthersViews", state.selectedTag)
}
const closeAllTags = (view: any) => {
  store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
    if (state.affixTags.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}
const toLastView = (visitedViews: any, view: any) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    // if (view.name === "Dashboard") {
    // to reload home page
    router.replace({ path: "/redirect" + view.fullPath })
    // } else {
    // router.push("/")
    // }
  }
}
const openMenu = (tag: any, e: MouseEvent) => {
  const con = document.getElementById("tags-view-container")
  const menuMinWidth = 105
  const offsetLeft = (con && con.offsetLeft) || 240 //proxy.$el.getBoundingClientRect().left // container margin left
  const offsetWidth = (con && con.offsetLeft) || 800 //proxy.$el.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 5 // 15: margin right

  if (left > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = left
  }
  state.top = e.clientY
  state.visible = true
  state.selectedTag = tag
}
const closeMenu = () => {
  state.visible = false
}
// const handleScroll = () => {
//   closeMenu()
// }

//export to page use
let { visible, top, left, selectedTag } = toRefs(state)

const operation = shallowRef({
  list: [
    { name: "关闭其他", icon: Close, code: "closeOther" },
    { name: "关闭左侧", icon: Back, code: "closeLeft" },
    { name: "关闭右侧", icon: Right, code: "closeRight" },
    { name: "关闭全部", icon: CircleClose, code: "closeAll" },
  ],
  handleCommand(command: string) {
    switch (command) {
      case "closeOther":
        closeOthersTags()
        break
      case "closeLeft":
        store.dispatch("tagsView/delLeftViews", route.path)
        break
      case "closeRight":
        store.dispatch("tagsView/delRightViews", route.path)
        break
      case "closeAll":
        const current = visitedViews.value.find((a: any) => a.path == route.path)
        store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
          toLastView(visitedViews, current)
        })
        break
    }
  },
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  background: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-lighter);
  border-bottom: 1px solid var(--el-border-color-lighter);
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 24px 0 16px 1px rgba(0, 0, 0, 0.2);
  z-index: 50;
  display: flex;
  justify-content: space-between;

  .tags-view-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 32px;
      line-height: 32px;
      border: 1px solid var(--el-border-color-light);
      color: var(--el-text-color-primary);
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 3px;
      margin-bottom: 3px;
      text-decoration: none;
      border-radius: var(--el-border-radius-base);
      opacity: 0.6;

      &:first-of-type {
        margin-left: 10px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        // border-color: var(--el-color-primary);
        // color: var(--el-color-primary);
        opacity: 1;

        .el-icon-close {
          display: inline-block;
        }
      }

      .el-icon-close {
        margin-left: 3px;
        //   display: none;
      }

      // &:hover {
      //   .el-icon-close {
      //     opacity: 1;
      //   }
      // }
    }
  }

  .toggle {
    padding: 0 15px;
    height: 100%;
    border: 0;
  }

  &.tab {
    .tags-view-wrapper {
      .tags-view-item {
        margin-top: 6px;
        margin-bottom: 0;
        background: var(--el-fill-color-light);
        border-radius: 8px 8px 0 0;
        border-color: transparent;
        padding: 0 15px 0 15px;

        &.active,
        &.active:hover {
          border-color: transparent;
        }

        &:hover {
          background: var(--el-fill-color);
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      border-radius: 6px;
      width: 12px;
      height: 12px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      vertical-align: -2px;

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
