<template>
  <div v-if="visitedViews.length" id="tags-view-container" class="tags-view-container" :class="setting.tabs">
    <el-scrollbar>
      <div class="tags-view-wrapper">
        <router-link v-for="tag in visitedViews" :key="tag.path" ref="refTag" :class="isActive(tag) ? 'active' : ''" :to="{ path: tag.path, query: tag.query }" class="tags-view-item" @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''" @contextmenu.prevent="openMenu(tag, $event)">
          {{ tag.title }}
          <Close v-if="!isAffix(tag) && visitedViews.length > 1" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></Close>
        </router-link>
      </div>
    </el-scrollbar>

    <el-dropdown trigger="click" @command="operation.handleCommand">
      <el-button :icon="Menu" class="toggle" link type="primary"></el-button>
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
    <ul v-if="selectedTag" v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
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
import { computed, nextTick, onMounted, reactive, shallowRef, toRefs, watch } from "vue"
//获取store和router
import { Back, CircleClose, Close, Menu, Refresh, Right } from "@element-plus/icons-vue"
import type { RouteRecordRaw } from "vue-router"
import { useRoute, useRouter } from "vue-router"
import { useSetting } from "../../hooks/useSetting"
import type { TagItem } from "./types"
import { useTagsView } from "./useTagsView"

const router = useRouter()
const route = useRoute()
const setting = useSetting()

interface State {
  visible: boolean
  top: number
  left: number
  affixTags: TagItem[]
  selectedTag?: TagItem
}

const state = reactive<State>({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: undefined,
  affixTags: [],
})
const { state: tagsView, actions } = useTagsView()
const visitedViews = computed(() => {
  return tagsView.visitedViews
})
const routes = computed(() => {
  return router.getRoutes()
})

watch(
  () => route.path,
  (val) => {
    if (val !== "/login") {
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
  if (route.path !== "/login") {
    addTags()
  }
})

const isActive = (routeItem: TagItem) => {
  return routeItem.path === route.path
}
const isAffix = (tag: TagItem) => {
  return tag.meta && tag.meta.affix
}

const filterAffixTags = (routes: Array<RouteRecordRaw>) => {
  let tags: Array<TagItem> = []
  routes.forEach((route) => {
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
      actions.addVisitedView(tag)
    }
  }
}
const addTags = () => {
  const { name, meta, path, query, params, fullPath } = route
  if (name && !route.meta?.parent) {
    actions.addView({ name, meta, path, query, params, fullPath, title: "" })
  }
  return false
}
const refreshSelectedTag = (view: TagItem) => {
  const { fullPath } = view
  nextTick(() => {
    router.replace({
      path: "/redirect" + fullPath,
    })
  })
}
const closeSelectedTag = (view: TagItem) => {
  actions.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}
const closeOthersTags = () => {
  if (state.selectedTag) {
    router.push(state.selectedTag)
    actions.delOthersViews(state.selectedTag)
  }
}
const closeAllTags = (view: TagItem) => {
  actions.delAllViews().then(({ visitedViews }) => {
    if (state.affixTags.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}
const toLastView = (visitedViews: TagItem[], view: TagItem) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    router.replace({ path: "/redirect" + view.fullPath })
  }
}
const openMenu = (tag: TagItem, e: MouseEvent) => {
  const con = document.getElementById("tags-view-container")
  const offsetLeft = (con && con.getBoundingClientRect().left) || 240 //proxy.$el.getBoundingClientRect().left // container margin left
  const offsetTop = (con && con.getBoundingClientRect().top) || 50 //proxy.$el.offsetWidth // container width
  const left = e.clientX - offsetLeft + 5 // 15: margin right
  const top = e.clientY - offsetTop + 5 // 15: margin right
  state.left = left
  state.top = top
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
        actions.delLeftViews(route.path)
        break
      case "closeRight":
        actions.delRightViews(route.path)
        break
      case "closeAll":
        const current = visitedViews.value.find((a) => a.path == route.path)
        actions.delAllViews().then(({ visitedViews }) => {
          if (current) toLastView(visitedViews, current)
        })
        break
    }
  },
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  background: var(--layout-tags-bg-color, var(--el-bg-color));
  border-bottom: 1px solid var(--el-border-color-lighter);
  box-shadow: var(var(--layout-tags-box-shadow), 16px 0 6px 0px rgba(0, 0, 0, 0.15));
  z-index: 50;
  display: flex;
  justify-content: space-between;
  position: relative;

  .tags-view-wrapper {
    height: var(--layout-tagsview-height, 40px);
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;

    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      line-height: 20px;
      border: 1px solid var(--el-border-color-light);
      color: var(--el-text-color-primary);
      background: var(--el-bg-color);
      padding: 4px 12px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 3px;
      margin-bottom: 3px;
      text-decoration: none;
      border-radius: var(--el-border-radius-base);
      opacity: 0.6;

      &:first-of-type {
        margin-left: 20px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        opacity: 1;
        color: var(--el-text-color-primary);
        background-color: var(--el-fill-color-light);
        &:hover {
          background-color: var(--el-fill-color-lighter);
        }

        .el-icon-close {
          display: inline-block;

          &:hover {
            background-color: var(--el-color-primary);
            color: #fff;
          }
        }
      }

      &:hover {
        background-color: var(--el-fill-color-light);
      }

      .el-icon-close {
        margin-left: 3px;
      }
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
        height: 32px;
        line-height: 32px;
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
    &:hover {
      .el-icon-close {
        width: 12px;
        transition: all 0.3s;
      }
    }
    .el-icon-close {
      border-radius: 6px;
      //width: 12px;
      height: 12px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      vertical-align: -2px;
      width: 0;
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
