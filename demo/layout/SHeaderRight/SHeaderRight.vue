<template>
  <!-- <el-button type="primary" link  class="menu-item" @click="toLock">
    <el-icon size="14px"><Lock /></el-icon>
  </el-button> -->
  <el-button type="primary" link class="menu-item" @click="toggleTheme">
    <el-icon size="14px"><Moon v-if="theme == 'dark'" /><Sunny v-else /></el-icon>
  </el-button>
  <MessageCenter class="menu-item" />
</template>
<script setup lang="ts">
import { computed } from "vue"
import { useStore } from "vuex"
import { Moon, Sunny } from "@element-plus/icons-vue"
// import axios from "axios"
import MessageCenter from "./MessageCenter.vue"

const store = useStore()

const theme = computed(() => store.state.layout.theme)
if (theme.value == "dark") {
  document.documentElement.classList.add("dark")
}
const toggleTheme = () => {
  store.commit("layout/setTheme", theme.value == "dark" ? "light" : "dark")
  if (theme.value == "dark") {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}
</script>
<style scoped lang="scss">
.menu-item,
.menu-item.el-button.is-link {
  display: inline-block;
  vertical-align: top;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0;
  height: 100%;
  color: inherit;
  border-radius: 0;
  cursor: pointer;
  color: var(--el-text-color-regular);
  &:active {
    color: var(--el-text-color-regular);
  }
  &:hover {
    background: rgba(200, 200, 200, 0.1);
  }
  :deep(.el-icon) {
    font-size: 14px;
  }
  > i {
    vertical-align: top;
  }
}

.item-avatar {
  display: inline-flex;
  align-items: center;
  // color: var(--el-color-primary);
  .avatar {
    vertical-align: middle;
  }
  .toggle {
    cursor: pointer;
    padding: 10px 0;
    display: flex;
    white-space: nowrap;
    align-items: center;
    span {
      vertical-align: middle;
    }
    .name {
      margin-left: 10px;
    }
    .el-icon {
      vertical-align: middle;
    }
  }
}
</style>
