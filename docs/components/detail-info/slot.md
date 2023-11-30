# 插槽

  <div>
    <h2>title插槽</h2>
   <DetailInfo title="DetailInfo" :data="list" show-type="table">
        <template #title>
            <el-tag type="danger" round effect="light">这里是title插槽</el-tag>
        </template>
        <template #slot1>
            <el-tag type="danger" round effect="light">这里是内容插槽</el-tag>
        </template>
    </DetailInfo>
    <h2>header插槽</h2>
    <DetailInfo title="DetailInfo" :data="list" show-type="table">
        <template #header>
            <el-tag type="danger" round effect="light">这里是header插槽(会覆盖title)</el-tag>
        </template>
        <template #slot1>
            <el-tag type="danger" round effect="light">这里是插槽的内容</el-tag>
        </template>
    </DetailInfo>
    <h2>headerRight插槽</h2>
    <DetailInfo title="DetailInfo" :data="list" show-type="table">
        <template #headerRight>
            <el-tag type="danger" round effect="light">这里是headerRight插槽(不能和header同时用)</el-tag>
        </template>
        <template #slot1>
            这里是插槽的内容
        </template>
    </DetailInfo>
    <h2>默认插槽</h2>
    <DetailInfo title="DetailInfo" :data="list" show-type="table">
        <template #headerRight>
            <el-tag type="danger" round effect="light">这里是headerRight插槽(不能和header同时用)</el-tag>
        </template>
        <template #default>
            <el-tag type="danger" round effect="light">这里是默认插槽的内容</el-tag>
        </template>
    </DetailInfo>
  </div>

<script lang="ts" setup>
import { ref, Ref,markRaw } from "vue"
import { DetailInfo, DetailDataItem } from "easybill-ui/index"
import TestSlot from "./components/testSlot.vue"
const list: Ref<DetailDataItem[]> = ref([
  { label: "正在同步", value: 1, span: 12 },
  { label: "同步完成", value: 2, tooltip: "这是一个提示消息", span: 12 },
  { label: "插槽1", value: "11", slot:"slot1"}
])
</script>

## 示例代码
```vue
  <div>
    <h2>title插槽</h2>
   <DetailInfo title="DetailInfo" :data="list" show-type="table">
        <template #title>
            <el-tag type="danger" round effect="light">这里是title插槽</el-tag>
        </template>
        <template #slot1>
            <el-tag type="danger" round effect="light">这里是内容插槽</el-tag>
        </template>
    </DetailInfo>
    <h2>header插槽</h2>
    <DetailInfo title="DetailInfo" :data="list" show-type="table">
        <template #header>
            <el-tag type="danger" round effect="light">这里是header插槽(会覆盖title)</el-tag>
        </template>
        <template #slot1>
            <el-tag type="danger" round effect="light">这里是插槽的内容</el-tag>
        </template>
    </DetailInfo>
    <h2>headerRight插槽</h2>
    <DetailInfo title="DetailInfo" :data="list" show-type="table">
        <template #headerRight>
            <el-tag type="danger" round effect="light">这里是headerRight插槽(不能和header同时用)</el-tag>
        </template>
        <template #slot1>
            这里是插槽的内容
        </template>
    </DetailInfo>
    <h2>默认插槽</h2>
    <DetailInfo title="DetailInfo" :data="list" show-type="table">
        <template #headerRight>
            <el-tag type="danger" round effect="light">这里是headerRight插槽(不能和header同时用)</el-tag>
        </template>
        <template #default>
            <el-tag type="danger" round effect="light">这里是默认插槽的内容</el-tag>
        </template>
    </DetailInfo>
  </div>

<script lang="ts" setup>
import { ref, Ref,markRaw } from "vue"
import { DetailInfo, DetailDataItem } from "easybill-ui/index"
import TestSlot from "./components/testSlot.vue"
const list: Ref<DetailDataItem[]> = ref([
  { label: "正在同步", value: 1, span: 12 },
  { label: "同步完成", value: 2, tooltip: "这是一个提示消息", span: 12 },
  { label: "插槽1", value: "11", slot:"slot1"}
])
</script>

```