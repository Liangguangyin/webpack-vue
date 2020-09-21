<template>
  <div class="home">
    <home-head />
    <div class="content">
      <transition name="slide-fade">
        <router-view />
      </transition>
    </div>
    <home-footer />
    <!-- {{$store.state.name}}
    {{$store.getters.nameInfo}}
    <button @click="changes">change</button>
    <button @click="gettre">gettre</button>
    <router-link :to="'/login'">login</router-link>-->
    <!-- <iframe
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
      >
        <p class="tip">你的浏览器不支持iframe标签</p>
    </iframe>-->
  </div>
</template>

<script>
import homeHead from "./homeHead";
import homeFooter from "./homeFooter";
export default {
  name: "home",
  components: {
    homeHead,
    homeFooter,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // changes() {
    //   this.$store.commit("changeName", "OFF");
    // },
    // gettre() {
    //   this.$store.commit("changeName", "No");
    // }
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px;
  margin: 0px;
  border: none;
  .content {
    flex: auto;
    overflow: hidden;
    overflow-y: auto;
    .slide-fade-enter-active {
      transition: all 0.5s ease;
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
      transform: translateX(100px);
      opacity: 0;
    }
  }
}
</style>