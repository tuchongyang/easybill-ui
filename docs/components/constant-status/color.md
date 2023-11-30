# 自定义颜色
支持自定义颜色，可在 `options` 中通过 `style` 设置
<br/>

  <div>
    <div class="list">
      <div v-for="(item, i) in options5" :key="i" class="item"><ConstantStatus :value="item.value" :options="options5" /></div>
    </div>
  </div>

<script lang="ts" setup>
import { OptionItem, ConstantStatus } from "easybill-ui/index"
import { ref, Ref } from "vue"
const options5 = ref<OptionItem[]>([
  { label: "自定义颜色", value: 1, type: "primary", style: { borderColor: "#e0c1fd", color: "#8154c7", backgroundColor: "#f9f0ff" } },
   { label: "自定义颜色", value: 2, type: "primary", style: { borderColor: "#e0c1fd", color: "#fff", backgroundColor: "skyblue" } },
    { label: "自定义颜色", value: 3, type: "primary", style: { borderColor: "#FFAEBD", color: "#fff", backgroundColor: "#FFE0E6" } },
     { label: "自定义颜色", value: 4, type: "primary", style: { borderColor: "#73C79F", color: "#fff", backgroundColor: "#73C79F" } },
])
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
}
.list {
  display: flex;
  margin-bottom: 20px;
  .item {
    margin-right: 10px;
  }
}
</style>

## 示例代码
```vue
  <div>
    <div class="list">
      <div v-for="(item, i) in options5" :key="i" class="item"><ConstantStatus :value="item.value" :options="options5" /></div>
    </div>
  </div>

<script lang="ts" setup>
import { OptionItem, ConstantStatus } from "easybill-ui/index"
import { ref, Ref } from "vue"
const options5 = ref<OptionItem[]>([
  { label: "自定义颜色", value: 1, type: "primary", style: { borderColor: "#e0c1fd", color: "#8154c7", backgroundColor: "#f9f0ff" } },
   { label: "自定义颜色", value: 2, type: "primary", style: { borderColor: "#e0c1fd", color: "#fff", backgroundColor: "skyblue" } },
    { label: "自定义颜色", value: 3, type: "primary", style: { borderColor: "#FFAEBD", color: "#fff", backgroundColor: "#FFE0E6" } },
     { label: "自定义颜色", value: 4, type: "primary", style: { borderColor: "#73C79F", color: "#fff", backgroundColor: "#73C79F" } },
])
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
}
.list {
  display: flex;
  margin-bottom: 20px;
  .item {
    margin-right: 10px;
  }
}
</style>
```