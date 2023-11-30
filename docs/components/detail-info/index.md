# detail-info
## 基础用法

  <div>
    <DetailInfo title="默认模式" :data="list" />
  </div>

<script lang="ts" setup>
import { ref, Ref } from "vue"
import { DetailInfo, DetailDataItem } from "easybill-ui/index"
const list: Ref<DetailDataItem[]> = ref([
  { label: "正在同步", value: 1, span: 12 },
  { label: "同步完成", value: 2, tooltip: "这是一个提示消息", span: 12 },
  { label: "已取消", value: 3, span: 12 },
  { label: "错误", span: 12, type: "el-image", props: { src: "https://element-plus.gitee.io/images/element-plus-logo.svg", style: "height: 50px;" } },
  { label: "描述1", value: "这里是一大段文字这里是一大段文<span style='color:red'>字这</span>里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字", labelStyle: "align-items: flex-start" },
  {
    label: "描述2",
    value:
      "<div style='width: 400px'>这里是<span style='color:red'>一大段文字</span>这里是一大段文字这里是一大这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字段文字这里是一大段文字这里是一大段文字这里是一大段文字</div>",
    showOverflowTooltip: { rawContent: true },
    span: 12,
    rawContent: true,
  },
  { label: "描述", value: "这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字", showOverflowTooltip: true, span: 12 },
])
</script>

## 示例代码
```vue
  <div>
    <DetailInfo title="默认模式" :data="list" />
  </div>

<script lang="ts" setup>
import { ref, Ref } from "vue"
import { DetailInfo, DetailDataItem } from "easybill-ui/index"
const list: Ref<DetailDataItem[]> = ref([
  { label: "正在同步", value: 1, span: 12 },
  { label: "同步完成", value: 2, tooltip: "这是一个提示消息", span: 12 },
  { label: "已取消", value: 3, span: 12 },
  { label: "错误", span: 12, type: "el-image", props: { src: "https://element-plus.gitee.io/images/element-plus-logo.svg", style: "height: 50px;" } },
  { label: "描述1", value: "这里是一大段文字这里是一大段文<span style='color:red'>字这</span>里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字", labelStyle: "align-items: flex-start" },
  {
    label: "描述2",
    value:
      "<div style='width: 400px'>这里是<span style='color:red'>一大段文字</span>这里是一大段文字这里是一大这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字段文字这里是一大段文字这里是一大段文字这里是一大段文字</div>",
    showOverflowTooltip: { rawContent: true },
    span: 12,
    rawContent: true,
  },
  { label: "描述", value: "这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字这里是一大段文字", showOverflowTooltip: true, span: 12 },
])
</script>
```
