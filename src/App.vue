<template>
  <div class="App" :style="{'height': height+'px'}">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      height: ""
    };
  },
  created() {
    this.height = window.innerHeight;
  }
};
</script>
<style lang="scss" scoped>
.App{
  background: #fafafa;
  min-width: 1060px;
}
</style>