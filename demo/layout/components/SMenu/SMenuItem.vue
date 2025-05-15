<template>
  <el-sub-menu v-if="props.menu.children?.length && level < 3" :index="props.menu.path">
    <template #title>
      <i v-if="props.menu.icon" :class="props.menu.icon" class="icon" style="margin-right: 5px"></i>
      <i v-if="!props.menu.icon && props.level == 1 && !sideOpen" class="icon-txt">{{ props.menu.name[0] }}</i>
      <span class="menu-name">
        <span :data-icon="props.menu.icon" class="name">{{ props.menu.name }}</span
        ><br v-if="level > 1 && curRoute" />
        <span v-if="level > 1 && curRoute" class="sub-name">{{ curRoute.name }}</span>
      </span>
    </template>
    <template v-for="(sub, i) in props.menu.children" :key="i">
      <SMenuItem :level="level + 1" :menu="sub" />
    </template>
  </el-sub-menu>
  <el-menu-item v-else :disabled="props.menu.disabled" :index="props.menu.path" @click="props.menu.disabled ? void 0 : toUrl(props.menu.path)">
    <router-link class="menu-link" :to="props.menu.path">
      <i v-if="props.menu.icon" :class="props.menu.icon" class="icon" style="margin-right: 5px"></i>
      <i v-if="!props.menu.icon && props.level == 1 && !sideOpen" class="icon-txt">{{ props.menu.name[0] }}</i>
      <span class="menu-name">
        <span class="name" :to="props.menu.path">{{ props.menu.name }}</span>
      </span>
    </router-link>
  </el-menu-item>
</template>
<script lang="ts" setup>
import type { RouteItem } from "@/layout/hooks/useSetting"
import { computed, type PropType } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useState } from "../../hooks/useState"
import { getQueryString } from "../../utils"

const props = defineProps({
  menu: {
    type: Object as PropType<RouteItem>,
    default: () => ({}),
  },
  level: {
    type: Number,
    default: 1,
  },
})
const level = computed(() => props.level || 1)
const { sideOpen } = useState()

const router = useRouter()
const toUrl = (url: string) => {
  const target = getQueryString("target", url) || ""
  if (/^http/.test(url) || target.includes("blank")) {
    window.open(url, "_blank")
  } else {
    router.push(url)
  }
}
const route = useRoute()
const curRoute = computed(() => {
  return props.menu.children?.find((a) => a.path == route.path)
})
</script>
<style lang="scss" scoped>
.menu-link {
  text-decoration: none;
  color: inherit;
  line-height: 1;
  display: flex;
  align-items: center;
}
.menu-name {
  line-height: 18px;
}
</style>
