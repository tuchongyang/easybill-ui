import type { LocationQuery, RouteMeta, RouteParamsGeneric } from "vue-router"

export interface TagItem {
  title: string
  path: string
  name: string | symbol
  fullPath: string
  meta: RouteMeta
  params: RouteParamsGeneric
  query: LocationQuery
}
