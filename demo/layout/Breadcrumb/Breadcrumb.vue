<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!--has transition  Judging by settings.mainNeedAnimation-->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1 || index == 0" class="no-redirect">
          {{ item.meta?.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
    <!--no transition-->
    <!-- <template>
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">
          {{ item.meta?.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </template> -->
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, computed, watch, Ref, onBeforeMount } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import * as Utils from "easybill-ui/utils"
import { RouteRecordRaw } from "vue-router"
// import { compile } from "path-to-regexp"
let levelList: Ref<Array<any>> = ref([])

//Whether close the animation fo breadcrumb
// import { useStore } from "vuex"
// let store = useStore()
// let settings = computed(() => {
//   return store.state.app.settings
// })
const store = useStore()
const route = useRoute()
const router = useRouter()
const mapPaths = computed(() => store.state.menu.mapPaths || [])
const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched: any = route.matched.filter((item: RouteRecordRaw) => item.meta && item.meta.title)
  const first = matched[0]
  if (!isDashboard(first)) {
    //it can replace the first page if not exits
    matched = [{ path: "/", meta: { title: "Dashboard" } }].concat(matched)
  }
  if (route.name == "webview") {
    levelList.value = mapPaths.value.map((a: any) => {
      return {
        ...a,
        path: a.url,
        meta: {
          title: a.name,
        },
      }
    })
  } else {
    levelList.value = matched.filter((item: RouteRecordRaw) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
  }
}

const isDashboard = (route: RouteRecordRaw) => {
  const name = route?.name
  if (!name) {
    return false
  }
  return name.toString().trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
}
const pathCompile = (path: string) => {
  const { params } = route
  const toPath = (param: any) => {
    return path
  }
  return toPath(params)
}
const handleLink = (item: RouteRecordRaw) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}
watch(
  () => route,
  () => {
    getBreadcrumb()
  },
  { immediate: true }
)
watch(
  () => store.state.menu.mapPaths,
  () => {
    getBreadcrumb()
  }
)
onBeforeMount(() => {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 12px;
  line-height: 50px;
  margin-left: 20px;

  .no-redirect {
    color: #666;
    cursor: text;
  }
  .el-breadcrumb__inner a {
    font-weight: normal;
    color: #969ba7;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.25s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
