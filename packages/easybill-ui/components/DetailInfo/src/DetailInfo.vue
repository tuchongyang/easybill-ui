<template>
  <div class="detail-info" :class="[props.showType, $attrs.shadow]">
    <div class="detail-info-header">
      <slot name="header"></slot>
      <div v-if="!$slots.header" class="header-left">
        <div v-if="props.title && !$slots.title" class="title">{{ props.title }}</div>
        <slot name="title"></slot>
      </div>
      <div v-if="!$slots.header" class="header-right">
        <slot name="headerRight"></slot>
      </div>
    </div>

    <div v-if="$slots.default" class="detail-info-body">
      <slot></slot>
    </div>
    <div v-if="!$slots.default" class="detail-info-body" :class="[props.showType]">
      <div v-for="(item, i) in list" :key="i" class="table-detail-col" :span="item.span" :style="getItemStyle(item)">
        <div class="item-col">
          <div v-if="item.label" class="label" :style="getLabelStyle(item)">
            <span>{{ item.label }}</span>
            <DetailInfoTooltip :tooltip="item.tooltip" />{{ props.showType == "table" ? "" : "：" }}
          </div>
          <div class="det">
            <template v-if="item.slot">
              <slot :name="item.slot" :row="item" :data="props.data" :index="i"></slot>
            </template>
            <template v-else>
              <ConstantStatus v-if="item.options" :value="item.value" :options="item.options" />
              <template v-else-if="item.type == 'image'">
                <el-image :src="item.value" :preview-src-list="[item.value]" style="width: 40px; height: 40px; vertical-align: top" :fit="'cover'" v-bind="item.props"></el-image>
              </template>
              <component :is="item.type" v-else-if="item.type" v-model="item.value" v-bind="item.props"></component>
              <template v-else><DetailInfoContent :data="item" /></template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "DetailInfo",
}
</script>
<script lang="ts" setup>
import { PropType, computed } from "vue"
import { ConstantStatus } from "../../ConstantStatus/src"
import { DetailDataItem } from "./types"
import DetailInfoTooltip from "./DetailInfoTooltip.vue"
import DetailInfoContent from "./DetailInfoContent.vue"
import { ElImage } from "element-plus"

const props = defineProps({
  data: {
    type: Array as PropType<DetailDataItem[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  /** 显示方式，默认是normal，表格式、带边框，可选项：table、normal */
  showType: {
    type: String,
    default: "normal",
  },
  labelWidth: {
    type: [Number, String],
    default: "",
  },
  labelPosition: {
    type: String,
    default: "left",
  },
})
const list = computed(() => {
  const d = props.data || []
  return d.filter((item) => {
    if (typeof item.hidden == "function") return !item.hidden(props.data)
    if (typeof item.hidden != "undefined") return !item.hidden
    return true
  })
})
const getLabelWidth = (dataItem: DetailDataItem): string => {
  const labelWidth = typeof dataItem.labelWidth !== "undefined" ? dataItem.labelWidth : props.labelWidth
  const isNum = typeof labelWidth == "number" || (typeof labelWidth == "string" && /^\d+$/.test(labelWidth))
  return !isNum ? labelWidth + "" : labelWidth + "px"
}
const getLabelStyle = (item: DetailDataItem) => {
  let s = ""
  if (item.labelStyle && typeof item.labelStyle == "object") {
    const l = item.labelStyle
    s = Object.keys(l)
      .map((a) => a + ":" + l[a])
      .join(";")
  }
  return `width: ${getLabelWidth(item)}; justifyContent: ${item.labelPosition || props.labelPosition};` + s
}
const getItemStyle = (dataItem: DetailDataItem) => {
  const width = (100 * (dataItem.span || 24)) / 24 + "%"
  return { width: width, flex: "0 0 " + width }
}
</script>
