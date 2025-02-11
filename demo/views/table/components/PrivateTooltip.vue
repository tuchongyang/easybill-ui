<script setup lang="ts">
import { ref } from "vue"
import { ConstantStatus } from "easybill-ui/index"
import { InfoFilled } from "@element-plus/icons-vue"
const props = defineProps({
  privateReason: {
    type: String,
    default: () => "",
  },
})
const trueOrFalse = ref([
  { value: true, label: "是" },
  { value: false, label: "否" },
])
</script>

<template>
  <div class="private-tooltip-compose">
    <ConstantStatus :value="!props.privateReason" :options="trueOrFalse"></ConstantStatus>
    <el-tooltip v-if="props.privateReason" :open-delay="500" effect="dark" placement="bottom">
      <template #content>{{ props.privateReason }}</template>
      <el-icon>
        <InfoFilled />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss">
.private-tooltip-compose {
  display: flex;
  align-items: center;
}
</style>
