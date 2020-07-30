<template>
  <div>
    {{$store.state.name}}
    {{$store.getters.nameInfo}}
    <button @click="changes">change</button>
    <button @click="gettre">gettre</button>
    <iframe
      name="myiframe"
      id="myrame"
      :src="'https://www.baidu.com/'"
      frameborder="0"
      align="left"
      width="100%"
      height="100%"
      scrolling="auto"
      marginwidth="0"
      marginheight="0"
      class="iframesty"
      onload="changeFrameHeight()"
    >
      <p class="tip">你的浏览器不支持iframe标签</p>
    </iframe>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    changes() {
      this.$store.commit("changeName", "OFF");
    },
    gettre() {
      this.$store.commit("changeName", "No");
    }
  }
};
</script>

<style scoped>
</style>