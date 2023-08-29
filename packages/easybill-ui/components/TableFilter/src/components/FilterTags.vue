<template>
  <div v-if="selectList.length" class="filter-tags">
    <div class="tag-title">已筛选</div>
    <div class="tag-list">
      <div v-for="(item, i) in selectList" :key="i" class="tag-item">
        <el-popover ref="popoverRef" trigger="click" placement="bottom-start" :disabled="!['select'].includes(item.type)" popper-class="table-filter-tag-popper" @show="show(i)">
          <template #reference>
            <div class="dropdown-toggle" @click="onClick(item)">
              <div class="label">{{ item.label }}：</div>
              <div class="value">{{ isValue(item) }}</div>
              <div class="action" @click.stop="remove(item, i)">
                <el-icon>
                  <CircleCloseFilled />
                </el-icon>
              </div>
            </div>
          </template>
          <div ref="selectRef" class="select-list" @click.stop>
            <TagsSelect ref="tagsSelectRef" v-model="listQuery[item.prop]" :list-query="listQuery" :params-item="item" @change="onChange" />
          </div>
        </el-popover>
      </div>
      <div class="tag-clear"><el-button type="primary" link @click="clear">清空</el-button></div>
    </div>

    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref, PropType, inject } from "vue"
import * as I from "../../types"
import { ListQuery } from "../../types"
import { CircleCloseFilled } from "@element-plus/icons-vue"
import TagsSelect from "./containers/TagsSelect.vue"
const emit = defineEmits(["change", "remove", "itemClick"])
const props = defineProps({
  listQuery: {
    type: Object as PropType<ListQuery>,
    default: () => {
      return {}
    },
  },
})
const visibleMap = ref<Record<string, boolean>>({})
const listQuery: Ref<ListQuery> = ref(props.listQuery)
const selectList = inject<Ref<I.ParamsItem[]>>("selectList") || ref([])
const remove = (row: I.ParamsItem, index: number) => {
  selectList.value.splice(index, 1)
  // listQuery.value[row.prop] = ""
  delete listQuery.value[row.prop]
  emit("remove")
}
const clear = () => {
  for (let i = 0; i < selectList.value.length; i++) {
    delete listQuery.value[selectList.value[i].prop]
    selectList.value.splice(i, 1)
    i--
  }
  emit("remove")
}
const isValue = (item: I.ParamsItem) => {
  let text = item.tagNames
  let type = item.type
  switch (type) {
    case "time":
      if (item.tableKey && item.tableKey.length) {
        return listQuery?.value[item.tableKey[0]] + " 至 " + listQuery?.value[item.tableKey[1]]
      } else {
        return listQuery?.value[item.prop]
      }
      break
    case "select":
      if (!text) {
        const cur = item.options?.find((a) => a.value == listQuery.value[item.prop])
        if (cur) {
          text = cur.label
        }
      }
    default:
      return text || listQuery.value[item.prop]
  }
}
const popoverRef = ref()
const selectRef = ref()
const tagsSelectRef = ref()
const show = (i: number) => {
  if (selectList.value[i].type !== "select") return

  tagsSelectRef.value[i] && tagsSelectRef.value[i].focus && tagsSelectRef.value[i].focus()
}

const onChange = (opt: any) => {
  for (let j in visibleMap.value) {
    visibleMap.value[j] = false
  }
  select(
    opt,
    selectList.value.find((a) => a.prop == opt.prop),
  )
  for (let i in popoverRef.value) {
    popoverRef.value[i].hide()
  }
}
const select = (option: any, params?: I.ParamsItem) => {
  if (!params) return
  if (params.tableKey && params.tableKey.length) {
    params.tableKey.forEach((a, i) => {
      listQuery.value[a] = option.value[i]
    })
  } else {
    listQuery.value[params.prop] = option.value
  }
  params.tagNames = option.label
  emit("change", params)
}
const onClick = (item: I.ParamsItem) => {
  if (["select"].includes(item.type)) {
    return
  }
  emit("itemClick", item)
}
</script>
