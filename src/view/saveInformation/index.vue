<template>
  <div class="saveInformation">
    <iframe
      name="myiframe"
      id="myrame"
      :src="'http://192.168.0.41:8282/login'"
      frameborder="0"
      align="left"
      width="100%"
      height="100%"
      scrolling="auto"
      marginwidth="0"
      marginheight="0"
      class="iframesty"
    >
      <p class="tip">你的浏览器不支持iframe标签，请下载最新版本浏览器</p>
    </iframe>
  </div>
</template>

<script>
export default {
  name: "saveInformation"
};
</script>

<style lang="scss" scoped>
.saveInformation {
  height: 100%;
}
</style>