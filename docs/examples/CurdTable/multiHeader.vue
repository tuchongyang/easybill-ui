<template>
  <div class="list">
    <CurdTable ref="tableRef" v-bind="table"> </CurdTable>
  </div>
</template>
<script lang="ts" setup>
import { ref, markRaw, Ref } from "vue"
import { CurdTableProps, CurdTable } from "easybill-ui/index"

const tableRef = ref()
const table: Ref<CurdTableProps<any>> = ref({
  data: [],
  option: {
    hideOperation: true,
    hideMenuAdd: true,
    hidePage: true,
    hideMenuRight: true,
  },
  columns: [
    {
      label: "一级表头-1",
      prop: "first1",
      children: [
        {
          label: "二级表头-1",
          prop:"second1",
          children: [
            {
              label: "三级表头-1",
                prop:"third1",
            },
            {
              label: "三级表头-2",
              prop:"third2",
            },
            {
              label: "三级表头-3",
              prop:"third3"
            },
          ],
        },
        {
            label:"二级表头-2",
            prop:"second2"
        }
      ],
    },
    {
        label:"一级表头-2",
        prop:"first2"
    }
  ],
  fetchData: ({ listQuery }) => {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const list = [
          {
            third1:"Tom",
            third2:"Jimmy",
            third3:"California",
            second2:"No. 189, Grove St, Los Angeles",
            first2:"CA 10086"
          },
          {
            third1:"Tom",
            third2:"Jimmy",
            third3:"California",
            second2:"No. 189, Grove St, Los Angeles",
            first2:"CA 10086"
          },
          {
            third1:"Tom",
            third2:"Jimmy",
            third3:"California",
            second2:"No. 189, Grove St, Los Angeles",
            first2:"CA 10086"
          },
        ]
        resolve({
          list,
          total: list.length,
        })
      }, 500)
    })
  },
})
</script>
<style lang="scss" scoped>
.list {
  padding: 20px;
}
:deep(table) {
  margin: 0;
}
</style>
