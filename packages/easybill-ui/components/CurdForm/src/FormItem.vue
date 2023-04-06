<template>
  <div class="form-item">
    <div v-if="props.formItem.prefix" class="form-item-prefix" v-html="props.formItem.prefix"></div>
    <slot name="prefix"></slot>
    <component :is="getComponent(props.formItem.type)" v-if="!(props.formItem.type && $slots[props.formItem.type])" v-model="modelRef[props.formItem.prop || '']" :form-item="props.formItem" :form-model="modelRef" :props="formItemProps" :event-object="eventObject" />
    <FormTooltip v-if="props.formItem.tooltip" :tooltip="props.formItem.tooltip" :form-item="props.formItem" :form-model="props.formModel" />
    <slot name="suffix"></slot>
    <div v-if="props.formItem.suffix" class="form-item-suffix" v-html="props.formItem.suffix"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, getCurrentInstance, Ref, PropType } from "vue"
import { FormItem, Fields } from "./types"
import { getComponent } from "./components"
import FormTooltip from "./FormTooltip.vue"
import { useForm } from "./hooks"

const props = defineProps({
  // 动态验证表单
  formItem: {
    required: true,
    type: Object as PropType<FormItem>,
  },
  formModel: {
    type: Object as PropType<Fields>,
    default: () => ({}),
  },
})
const emit = defineEmits(["change"])
const modelRef: Ref<Fields> = ref(props.formModel || {})
// 重新组装props
const formItemProps = computed(() => {
  if (!props.formItem.props) {
    return {}
  }
  if (props.formItem.props instanceof Function) {
    return props.formItem.props(props.formModel, props.formItem)
  }
  return props.formItem.props
})
// 重新组装eventObject
const { formContext } = useForm()
const eventObject = ref(
  (() => {
    const result: any = { ...props.formItem.eventObject }
    // 如果没有传eventObject，就初始一个change事件
    if (!props.formItem.eventObject || Object.keys(props.formItem.eventObject).length <= 0) {
      return {
        change: () => {
          emit("change", props.formModel, props.formItem, formContext)
        },
      }
    }
    if (props.formItem.eventObject.change) {
      const changeFun = props.formItem.eventObject.change
      result.change = () => {
        changeFun(props.formModel, props.formItem, formContext)
        emit("change", props.formModel, props.formItem, formContext)
      }
    }
    return result
  })()
)
</script>
<style lang="scss" scoped>
.form-item {
  width: 100%;
  display: flex;
  .tooltip {
    margin-left: 10px;
    color: #999;
    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
