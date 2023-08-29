import { RouteRecordRaw } from "vue-router"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: { title: "首页" },
    component: () => import("@/layout/BasicLayout.vue"),
    children: [
      {
        path: "/table",
        name: "table",
        meta: { title: "curd-table" },
        component: () => import("@/views/table/IndexView.vue"),
      },
      {
        path: "/form",
        name: "form",
        meta: { title: "curd-form" },
        component: () => import("@/views/form/IndexView.vue"),
      },
      {
        path: "/constant-status",
        name: "constant-status",
        meta: { title: "constant-status" },
        component: () => import("@/views/constant-status/IndexView.vue"),
      },
      {
        path: "/detail-info",
        name: "detail-info",
        meta: { title: "detail-info" },
        component: () => import("@/views/detail-info/IndexView.vue"),
      },
      {
        path: "/table-filter",
        name: "table-filter",
        meta: { title: "table-filter" },
        component: () => import("@/views/table-filter/IndexView.vue"),
      },
      {
        path: "/form-dialog",
        name: "form-dialog",
        meta: { title: "form-dialog" },
        component: () => import("@/views/form-dialog/IndexView.vue"),
      },
    ],
  },
]
export default routes
