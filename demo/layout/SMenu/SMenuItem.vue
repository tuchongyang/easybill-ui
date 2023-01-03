<template>
  <el-sub-menu v-if="props.menu.children && props.menu.children.length" :index="props.menu.url">
    <template #title>
      <el-icon v-if="props.menu.meta && props.menu.meta.icon"><component :is="props.menu.meta.icon" /></el-icon>
      <i :class="props.menu.icon || menuIconMap[props.menu.url]" class="icon"></i>
      <span class="name" :data-icon="props.menu.icon">{{ (props.menu.meta && props.menu.meta.title) || props.menu.name }}</span>
    </template>
    <template v-for="(sub, i) in props.menu.children" :key="i">
      <!-- <SMenuItem :menu="sub" /> -->
      <el-menu-item :index="sub.url" @click="toUrl(sub.url)">
        <el-icon v-if="sub.meta && sub.meta.icon"><component :is="sub.meta.icon" /></el-icon>
        <i v-if="sub.icon" :class="sub.icon || menuIconMap[sub.url]" class="icon"></i>
        <span class="name">{{ (sub.meta && sub.meta.title) || sub.name }}</span>
      </el-menu-item>
    </template>
  </el-sub-menu>
  <el-menu-item v-else :index="props.menu.url" @click="toUrl(props.menu.url)">
    <el-icon v-if="props.menu.meta && props.menu.meta.icon"><component :is="props.menu.meta.icon" /></el-icon>
    <i :class="props.menu.icon || menuIconMap[props.menu.url]" class="icon"></i>
    <span class="name">{{ (props.menu.meta && props.menu.meta.title) || props.menu.name }}</span>
  </el-menu-item>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import { getQueryString } from "easybill-ui/utils/common"
interface Props {
  menu: any
}
const props = withDefaults(defineProps<Props>(), {
  menu: {},
})
const menuIconMap = ref({
  "/management/account": "eicon icon-hzhb",
  "/admin/account": "eicon eicon-hzhb",
  "/admin/control": "eicon eicon-group",
  "/admin/log": "eicon eicon-book",
  "/admin/config": "eicon eicon-zhike",
  "/business/customer": "eicon eicon-yaoyue",
  "/business/strategy": "eicon eicon-celvehecha",
  "/business/billget": "eicon eicon-shujuhuoqu",
  "/business/invitation": "eicon eicon-yaoyue",
  "/business/bill": "eicon eicon-zhangdan",
  "/business/statements": "eicon eicon-jiesuandan",
  "/system/account": "eicon eicon-hzhb",
  "/system/partner": "eicon eicon-group",
  "/system/customer": "eicon eicon-zhike",
  "/system/enter": "eicon eicon-yaoyue",
  "/accounting/my": "eicon eicon-hzhb",
  "/accounting/partner": "eicon eicon-group",
  "/accounting/direct": "eicon eicon-zhike",
  "/accounting/export": "eicon eicon-file-export",
  "/rule/my": "eicon eicon-youhuiquan",
  "/rule/rule": "eicon eicon-zhekou",
  "/rule/policy": "eicon eicon-fanyong",
  "/admin/workorder": "eicon eicon-gongdan",
  "/admin/license": "eicon eicon-list",
  "/tools/contract": "eicon eicon-book",
  "/tools/report": "eicon eicon-baobiao",
  "/tools/cost": "eicon eicon-chengben",
})
const router = useRouter()
const toUrl = (url: string) => {
  const target = getQueryString("target", url) || ""
  if (/^http/.test(url) || target.includes("blank")) {
    window.open(url, "_blank")
  } else {
    router.push(url)
  }
}
</script>
