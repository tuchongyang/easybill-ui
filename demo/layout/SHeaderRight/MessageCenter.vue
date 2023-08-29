<template>
  <el-popover :visible="visible" placement="bottom" :width="300" trigger="click" popper-class="message-popover">
    <template #reference>
      <el-button type="primary" link class="menu-item item-bell" @click.stop="visible = !visible">
        <el-badge :is-dot="list.length > 0" class="item">
          <el-icon :size="14"><Bell /></el-icon>
        </el-badge>
      </el-button>
    </template>
    <el-tabs v-model="activeName" class="message-tabs" @click.stop>
      <el-tab-pane label="通知" name="1"></el-tab-pane>
      <!-- <el-tab-pane label="关注" name="2">
        <el-empty description="数据空空的" :image-size="60"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="待办" name="3"><el-empty description="数据空空的" :image-size="60"></el-empty></el-tab-pane> -->
    </el-tabs>
    <NoticeList v-if="list.length" :list="list" /><el-empty v-else description="数据空空的" :image-size="60"></el-empty>

    <div class="view-all" @click="toall">查看全部</div>
  </el-popover>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Bell } from "@element-plus/icons-vue"
import NoticeList, { MessageItem } from "./NoticeList.vue"

const route = useRoute()
const router = useRouter()
const activeName = ref("0")
const visible = ref(false)

const list: Ref<MessageItem[]> = ref([])

const toall = () => {
  if (route.path != "/admin/log/message") {
    router.push("/admin/log/message")
  }
  visible.value = false
}
document.body.addEventListener("click", () => {
  visible.value = false
})
</script>
<style lang="scss">
.el-popover.el-popper.message-popover {
  padding: 0;
}
</style>
<style scoped lang="scss">
.item-bell,
.item-bell.el-button.is-link {
  font-size: 16px;
  vertical-align: top;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  color: inherit;
  margin: 0;
  border-radius: 0;
  color: var(--el-text-color-regular);
  &:hover {
    background: rgba(200, 200, 200, 0.1);
  }
  .el-icon {
    font-size: 14px;
  }
}

.message-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
  :deep(.el-tabs__nav) {
    float: none;
    display: flex;
  }
  :deep(.el-tabs__item) {
    flex: 1;
    text-align: center;
    margin: 0;
    height: 34px;
    line-height: 34px;
    font-size: 12px;
  }
  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
  }
  :deep(.el-tabs__active-bar) {
    height: 1px;
  }
}

.view-all {
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: #fafafa;
  }
  &:active {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.06) inset;
  }
}
</style>
