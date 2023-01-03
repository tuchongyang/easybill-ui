<template>
  <div class="detail-info">
    <div class="detail-info-header">
      <div class="header-left">
        <div v-if="props.title && !$slots.title" class="title">{{ props.title }}</div>
        <slot name="title"></slot>
      </div>
      <div class="header-right">
        <slot name="headerRight"></slot>
      </div>
    </div>

    <div class="table-detail">
      <slot></slot>
    </div>
    <el-row v-if="!$slots.default" class="table-detail" :class="[props.showType]">
      <el-col v-for="(item, i) in props.data" :key="i" :span="item.span">
        <div class="item-col">
          <div v-if="item.label" class="label" :style="{ width: getLabelWidth(item) }">{{ item.label }}：</div>
          <div class="det">
            <template v-if="item.slot">
              <slot :name="item.slot" :row="item" :data="props.data" :index="i"></slot>
            </template>
            <template v-else>
              <ConstantStatus v-if="item.options" :value="item.value" :options="item.options" />
              <template v-else-if="item.type == 'image'">
                <el-image :src="item.value" :preview-src-list="[item.value]" style="width: 40px; height: 40px; vertical-align: top" :fit="'cover'" v-bind="item.props"></el-image>
              </template>
              <template v-else>{{ item.value }}</template>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
export default {
  name: "DetailInfo",
}
</script>
<script lang="ts" setup>
import { PropType } from "vue"
import { ConstantStatus } from "../../ConstantStatus/src"
import { DetailDataItem } from "./types"

const props = defineProps({
  data: {
    type: Object as PropType<Array<DetailDataItem>>,
    default: () => ({}),
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
})
const getLabelWidth = (dataItem: DetailDataItem): string => {
  const labelWidth = typeof dataItem.labelWidth !== "undefined" ? dataItem.labelWidth : props.labelWidth
  return typeof labelWidth == "string" ? labelWidth + "" : labelWidth + "px"
}
</script>
