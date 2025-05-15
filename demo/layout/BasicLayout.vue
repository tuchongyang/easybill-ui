<template>
  <Layout :setting="setting">
    <template #headerRight> </template>
    <template #headerLeft> </template>
  </Layout>
</template>
<script lang="ts" setup>
import routes from "~pages"
// import { useLayoutStore } from "@/stores/layout"
import { computed } from "vue"
import Layout from "./CommonBasicLayout.vue"
// const layout = useLayoutStore()
/*

routes = [
    {
        "name": "index-form-form-item-IndexView",
        "path": "form/form-item/indexview",
    },
    {
        "name": "index-form-cascade-IndexView",
        "path": "form/cascade/indexview",
    },
    {
        "name": "index-table-filter",
        "path": "table-filter",
    },
    {
        "name": "index-table",
        "path": "table",
    },
    {
        "name": "index-form-dialog",
        "path": "form-dialog",
    },
    {
        "name": "index-form",
        "path": "form",
    },
    {
        "name": "index-detail-info",
        "path": "detail-info",
    },
    {
        "name": "index-constant-status",
        "path": "constant-status",
    },
    {
        "name": "index-table-TestView",
        "path": "table/testview",
    },
    {
        "name": "index-form-TestView",
        "path": "form/testview"
    }
]
// 根据routes生成树状结构的菜单，以path的/为分隔符,其中path前面增加/。例：[{name:'form',path:'/form',children:[{name:'form-item',path:'/form/form-item'}]}]

*/
const getRoutes = (routes: any) => {
  const result: any = []
  routes.forEach((route: any) => {
    const paths = route.path.split("/")
    let current = result
    let index = 0
    let path = paths[index]
    let currentPaths = []
    while (index < paths.length) {
      path = paths[index]
      currentPaths.push(path)
      if (path) {
        const find = current.find((item: any) => item.name === path)
        if (find) {
          current = find.children
          // 如果children中没有当前的path，则添加
          if (!current.find((item: any) => item.name === path) && currentPaths.length == 1) {
            current.push({
              name: path,
              path: `/${currentPaths.join("/")}`,
              children: [],
            })
          }
        } else {
          // 子集的path需要每级都加上
          const newItem = {
            name: path,
            path: `/${currentPaths.join("/")}`,
            children: [],
          }
          current.push(newItem)
          current = newItem.children
        }
      }
      index++
    }
  })
  return result
}
const setting = computed(() => ({ routes: getRoutes(routes[0].children) }))
console.log("routes", routes, getRoutes(routes[0].children))
</script>
