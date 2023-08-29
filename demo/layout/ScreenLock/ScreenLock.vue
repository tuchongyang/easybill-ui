<template>
  <div v-if="screenlock" class="screenlock-container">
    <div class="bg" :style="{ 'background-image': pic ? 'url(' + pic + ')' : 'none' }"></div>
    <div class="main">
      <div class="head">
        <el-avatar class="avatar" :size="70" :src="circleUrl"></el-avatar>
      </div>
      <div class="form">
        <el-input type="password"></el-input>
        <el-button type="primary" :icon="Right" @click="pass"></el-button>
      </div>
      <div class="tip">屏幕已锁定</div>
    </div>
    <div class="change-pic" @click="changePic">不好看？换一张</div>
    <DateTime />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import { useStore } from "vuex"
import { Right } from "@element-plus/icons-vue"
const circleUrl = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
const store = useStore()
const screenlock = computed(() => store.state.layout.screenlock)
const pass = () => {
  store.commit("layout/setScreenlock", false)
}
const pic = ref("https://www.talklee.com/api/bing?rand=true")
const changePic = () => {
  pic.value = "https://www.talklee.com/api/bing?rand=true&t=" + Math.random()
}
</script>
<style scoped lang="scss">
.screenlock-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  z-index: 9000;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .main {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .head {
      text-align: center;
      margin-bottom: 20px;
    }
    .form {
      display: flex;
      .el-input {
        :deep(.el-input__inner) {
          border-radius: 0;
        }
      }
      .el-button {
        border-radius: 0;
      }
    }
    .tip {
      color: #eee;
      text-align: center;
      margin-top: 20px;
    }
  }
  .change-pic {
    position: absolute;
    right: 5%;
    top: 5%;
    z-index: 10;
    color: #fff;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
      text-decoration: underline;
    }
  }
}
</style>
