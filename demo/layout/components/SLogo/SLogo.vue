<template>
  <div class="s-logo" :class="{ split: layout == 'columns' }">
    <div class="logo">
      <a :href="setting.logoPath || '/'"><img :src="setting.logo" /></a>
    </div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { useSetting } from "../../hooks/useSetting"
const setting = useSetting()
// import logo from "@/assets/images/logo.png"

const layout = computed(() => setting.value.layout)
</script>
<style scoped lang="scss">
.s-logo {
  text-align: center;
  overflow: hidden;
  .logo {
    display: inline-block;
    vertical-align: top;
    line-height: 1;
    // padding: 10px 0;

    img {
      height: 30px;
      vertical-align: top;
      max-width: 100%;
    }
  }
  &.columns {
    .logo {
      width: var(--aside-width-close);
      float: left;
    }
  }
}
</style>
