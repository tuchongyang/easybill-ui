<template>
  <div class="file-uploader-single">
    <div tabindex="0" class="el-upload--picture-card">
      <!--添加-->
      <template v-if="!model">
        <el-icon class="file-uploader-icon"><Plus /></el-icon>
      </template>

      <!--下载、删除-->
      <span v-if="model" class="el-upload-list__item-actions">
        <!-- <el-button type="primary" link  @click.stop="handleDownload()"
          ><el-icon><Download /></el-icon
        ></el-button> -->
        <el-button type="primary" link @click.stop="handleRemove()"
          ><el-icon><Delete /></el-icon
        ></el-button>
      </span>
      <!--图片文件-->
      <img v-if="model && accept == 'image'" class="single-img" :src="src" :alt="model" />

      <video v-if="model && accept == 'video'" class="single-img" :src="src" :alt="model"></video>

      <!--非图片文件-->
      <div v-if="model && !['image', 'video'].includes(accept)" class="file-main">
        <span :class="getFileIcon"></span>
        <div class="title" :title="fileName">
          {{ fileName }}
        </div>
      </div>
      <input ref="fileInputRef" :title="fileName" type="file" :multiple="false" name="file" class="el-upload_input" :accept="acceptType" @change="handleUploadChange($event)" />
      <el-progress v-if="saveMap.loading" type="circle" :percentage="saveMap.percent"></el-progress>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, reactive, PropType, watch, Ref } from "vue"
import { Plus, Delete } from "@element-plus/icons-vue"
import { ElButton, ElIcon, ElMessage, ElProgress, useFormItem } from "element-plus"
import { FormItemProps } from "../types"
// import axios from "axios"
import { ajaxUpload, UploadRequestOptions } from "../utils/ajax"
export default defineComponent({
  name: "SchemaFormFile",
  components: { Plus, Delete, ElButton, ElIcon, ElProgress },
  props: {
    ...FormItemProps,
    modelValue: {
      type: [String, File],
      default: undefined,
    }, // 表单项值
  },
  emits: ["update:modelValue", "success"],

  setup(props, { emit }) {
    const model = computed<any>({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    })

    const fileInputRef = ref()

    const saveMap = reactive({
      loading: false,
      percent: 0,
    })
    let fileName = ref("")
    const src = ref(model.value)
    watch(
      () => model.value,
      (val) => {
        if (typeof val == "string") {
          src.value = val
          return
        }
        if (val instanceof File) {
          const reader = new FileReader() // 创建 FileReader
          reader.onload = (res) => {
            src.value = res.target?.result
          }
          reader.readAsDataURL(val)
        }
      }
    )
    const accept: Ref<string> = computed(() => props.props?.accept)
    const acceptType = computed(() => {
      const map: Record<string, string> = {
        image: "image/png,image/gif,image/jpg,image/jpeg",
        video: "video/mp4,video/ogg,video/flv,video/avi,video/wmv,video/rmvb,video/mov",
      }
      return (accept.value && map[accept.value]) || accept.value
    })

    function handleDownload() {
      const url = fileName.value
      const link = document.createElement("a")
      link.style.display = "none"
      link.href = url
      link.target = "_blank"
      const title = url //.split("?").shift().split("/").pop()
      link.setAttribute("download", title)
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        document.body.removeChild(link)
      })
    }
    function handleRemove() {
      model.value = ""
      fileName.value = ""
      fileInputRef.value && (fileInputRef.value.value = "")
    }
    function getFileTypeByName(name: string) {
      if (!name) return "file"
      const map: Record<string, string> = {
        image: "png|gif|jpg|bmp|jpeg",
        video: "mp4|ogg|flv|avi|wmv|rmvb|mov",
      }
      for (const i in map) {
        const reg = eval("/\.(" + map[i] + ")$/i")
        if (reg.test(name.split("?")[0])) {
          return i
        }
      }

      return "file"
    }
    //单个上传操作 原生
    function handleUploadChange(e: Event) {
      const target = e.target as HTMLInputElement
      const file: File = (target.files as FileList)[0]
      if (!file) return
      if (props.props.maxSize && file.size > props.props.maxSize) {
        return ElMessage.error("上传文件大小不能超过" + props.props?.maxSize + "!")
      }
      fileName.value = file.name
      if (!props.props?.autoUpload) {
        model.value = file
      } else {
        const formData = new FormData()

        upLoadFile(file)
      }
      if (props.eventObject && props.eventObject.change) {
        props.eventObject.change()
      }
    }
    //上传接口
    function upLoadFile(file: File) {
      saveMap["loading"] = true
      saveMap["percent"] = 0

      const progressCallback = (currFilePercent: number) => {
        if (currFilePercent > 99) {
          currFilePercent = 99
        }
      }

      const options: UploadRequestOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: props.props?.withCredentials || false,
        file: file,
        method: "post",
        filename: "file",
        data: props.props?.data || {},
        action: props.props?.action || "/file/upload?random=" + Math.random(),
        onProgress: (evt) => {
          saveMap["percent"] = evt.percent
          progressCallback(saveMap["percent"])
        },
        onSuccess: (res) => {
          //成功进度条100%
          saveMap["loading"] = false
          saveMap["percent"] = 100
          progressCallback(100)
          model.value = (<any>res).result
          emit("success", (<any>res).result)
        },
        onError: (err) => {},
      }
      const request = ajaxUpload(options)
      if (request instanceof Promise) {
        request.then(options.onSuccess, options.onError)
      }
    }
    const getFileIcon = computed(() => {
      const avilable = ["pdf", "csv", "xls", "xlsx", "doc", "docx", "txt", "zip", "rar", "image"]
      const suffix = fileName.value.split(".").pop()
      return suffix && avilable.includes(suffix) ? "icon-document-" + suffix : "icon-document-txt"
    })
    const { formItem } = useFormItem()
    watch(
      () => props.modelValue,
      () => {
        // if (props.validateEvent) {
        formItem?.validate?.("change")
        // }
      }
    )

    return {
      model,
      fileInputRef,
      fileName,
      src,
      accept,
      acceptType,
      saveMap,
      getFileIcon,
      handleDownload,
      handleRemove,
      getFileTypeByName,
      handleUploadChange,
      upLoadFile,
    }
  },
})
</script>
