<template>
  <div class="date-time">
    <!-- <div class="time">{{ time }}</div>
    <div class="date">{{ now }}</div> -->
  </div>
</template>
<script setup lang="ts">
// import dayjs from "dayjs"
// const now = dayjs().format("YYYY-MM-DD")
// const time = ref(dayjs().format("HH:mm"))
// const inter = setInterval(() => {
//   time.value = dayjs(new Date()).format("HH:mm")
// }, 1000)

// onUnmounted(() => {
//   inter && window.clearInterval(inter)
// })
</script>
<style scoped lang="scss">
.date-time {
  position: absolute;
  z-index: 5;
  left: 6%;
  bottom: 6%;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  font-size: 30px;
  text-align: center;
  .time {
    font-size: 65px;
  }
}
</style>
