<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="getExcludes(Component)">
      <component :is="Component" :key="route.meta.key || route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
import type { VNode, VNodeTypes } from "vue"
const aliveExcludes: string[] = []
const getExcludes = (com: VNode) => {
  const name = (com?.type as VNodeTypes & { name: string })?.name
  if (name && !aliveExcludes.includes(name)) {
    aliveExcludes.push(name)
  }
  return aliveExcludes
}
</script>
