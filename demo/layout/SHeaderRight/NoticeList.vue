<template>
  <div class="notice-list">
    <div v-for="(item, i) in props.list" :key="i" class="item">
      <div class="center">
        <div class="title">{{ event(item.eventName) }}</div>
        <div class="desc">{{ event(item.eventLog) }}</div>
        <div class="time">{{ paseTime(item.createTime) }}</div>
      </div>
      <div class="right">
        <el-tag size="small" type="info">{{ event(item.eventType) }}</el-tag>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue"
import { dayjs } from "element-plus"
export interface MessageItem {
  createTime: number
  eventLog: string
  eventName: string
  eventType: string
  tenantName: string
  userName: string
}
const props = defineProps({
  list: {
    type: Array as PropType<MessageItem[]>,
    default: () => [],
  },
})
function event(val: string) {
  try {
    var a = JSON.parse(val)
    val = a.zh_CN || a.ch
  } catch (e) {}
  return val
}
function paseTime(val: number) {
  return dayjs(val).format("YYYY-MM-DD HH:mm:ss")
}
</script>
<style scoped lang="scss">
.notice-list {
  max-height: 400px;
  overflow: auto;
  .item {
    border-bottom: 1px solid var(--el-border-color-light);
    padding: 10px 20px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.01);
    }
    &:active {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.06) inset;
    }
    .right {
      margin-left: 10px;
    }
    .time {
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
