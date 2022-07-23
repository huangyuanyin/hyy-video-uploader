<template>
  <p>
    <progress id="uploaderProgress" value="2" max="100"></progress>
  </p>
  <p>
    <input type="file" id="videoUploader" value="" />
  </p>
  <p>
    <span id="uploadInfo"></span>
  </p>
  <p>
    <button id="uploadBtn">上传视频</button>
  </p>
</template>

<script setup>
import { ref } from 'vue';

const inputName = ref("选择视频")
</script>

<style scoped>
</style>
