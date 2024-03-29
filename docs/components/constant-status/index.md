# constant-status
## 默认样式
<div>
    <div class="list">
      <div v-for="(item, i) in options1" :key="i" class="item"><ConstantStatus :value="item.value" :options="options1" /></div>
    </div>
  </div>

  <script lang="ts" setup>
import { OptionItem, ConstantStatus } from "easybill-ui/index"
import { ref, Ref } from "vue"

const options1: Ref<OptionItem[]> = ref([
  { label: "default", value: 10, type: "default" },
  { label: "primary", value: 0, type: "primary" },
  { label: "warning", value: 1, type: "warning" },
  { label: "success", value: 2, type: "success" },
  { label: "info", value: 3, type: "info" },
  { label: "danger", value: 4, type: "danger" },
  { label: "yellow", value: 5, type: "yellow" },
  { label: "blue", value: 6, type: "blue" },
  { label: "blue-dark", value: 7, type: "blue-dark" },
  { label: "red-purple", value: 8, type: "red-purple" },
  { label: "blueness", value: 9, type: "blueness" },
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
      <div v-for="(item, i) in options1" :key="i" class="item"><ConstantStatus :value="item.value" :options="options1" /></div>
    </div>
  </div>

  <script lang="ts" setup>
import { OptionItem, ConstantStatus } from "easybill-ui/index"
import { ref, Ref } from "vue"

const options1: Ref<OptionItem[]> = ref([
  { label: "default", value: 10, type: "default" },
  { label: "primary", value: 0, type: "primary" },
  { label: "warning", value: 1, type: "warning" },
  { label: "success", value: 2, type: "success" },
  { label: "info", value: 3, type: "info" },
  { label: "danger", value: 4, type: "danger" },
  { label: "yellow", value: 5, type: "yellow" },
  { label: "blue", value: 6, type: "blue" },
  { label: "blue-dark", value: 7, type: "blue-dark" },
  { label: "red-purple", value: 8, type: "red-purple" },
  { label: "blueness", value: 9, type: "blueness" },
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