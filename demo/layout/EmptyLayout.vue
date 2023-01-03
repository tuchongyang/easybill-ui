<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="aliveExcludes">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
const store = useStore()
const aliveExcludes = computed(() => store.state.app.aliveExcludes)
</script>
