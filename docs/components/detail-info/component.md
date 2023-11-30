# 自定义组件
<br/>
<hr/>

  <div>
    <DetailInfo title="自定义组件" :data="list" />
  </div>

<script lang="ts" setup>
import { ref, Ref,markRaw } from "vue"
import { DetailInfo, DetailDataItem } from "easybill-ui/index"
import TestSlot from "./components/testSlot.vue"
const list: Ref<DetailDataItem[]> = ref([
  { label: "正在同步", value: 1, span: 12 },
  { label: "同步完成", value: 2, tooltip: "这是一个提示消息", span: 12 },
  { label: "已取消", value: 3, span: 12 },
  { label: "element组件", span: 12, type: "el-image", props: { src: "https://element-plus.gitee.io/images/element-plus-logo.svg", style: "height: 50px;" } },
  { label: "自定义组件", value: "11", type: markRaw(TestSlot),props:{style:"color:skyblue"} },
])
</script>

## 示例代码
```vue
  <div>
    <DetailInfo title="自定义组件" :data="list" />
  </div>

<script lang="ts" setup>
import { ref, Ref,markRaw } from "vue"
import { DetailInfo, DetailDataItem } from "easybill-ui/index"
import TestSlot from "./components/testSlot.vue"
const list: Ref<DetailDataItem[]> = ref([
  { label: "正在同步", value: 1, span: 12 },
  { label: "同步完成", value: 2, tooltip: "这是一个提示消息", span: 12 },
  { label: "已取消", value: 3, span: 12 },
  { label: "element组件", span: 12, type: "el-image", props: { src: "https://element-plus.gitee.io/images/element-plus-logo.svg", style: "height: 50px;" } },
  { label: "自定义组件", value: "11", type: markRaw(TestSlot),props:{style:"color:skyblue"} },
])
</script>
```
