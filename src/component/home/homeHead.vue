<template>
  <div class="head">
    <div class="head-nav">
      <el-menu
        :default-active="path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          v-for="item in navList"
          :key="item.meta.id"
          :index="item.path"
        >{{item.meta.title}}</el-menu-item>
      </el-menu>
    </div>
    <div class="head-out">
      <div class="head-out-welcome">
        <p>
          欢迎你:
          <span>大老板</span>
        </p>
      </div>
      <div class="head-out-icon">
        <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom-end">
          <i class="el-icon-share" @click="sginOut"></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import routerList from "@/router/config.js";
export default {
  name: "homeHead",
  data() {
    return {
      navList: []
    };
  },
  computed: {
    // 默认按钮需要根据路由改变
    path() {
      return this.$store.state.currentRouter["matched"][1]["path"];
    }
  },
  mounted() {
    this.filterRouter();
  },
  methods: {
    filterRouter() {
      this.navList = routerList.filter(item => item.meta.grade == 1);
    },
    sginOut() {
      this.$store.commit("removeToken");
      this.$router.push("/login");
    },
    handleSelect(key, keyPath) {
      if (this.path !== key) {
        this.$router.push(key);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.head {
  display: flex;
  .head-nav {
    flex: auto;
    .el-menu-demo::v-deep {
      border: none;
    }
  }
  .head-out {
    width: 16%;
    background: #545c64;
    // border-bottom: solid 1px #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .head-out-welcome {
      color: #fff;
      font-size: 14px;
    }
    .head-out-icon {
      font-size: 25px;
      color: #fff;
      .el-icon-share::v-deep {
        cursor: pointer;
      }
    }
    .head-out-icon:hover {
      color: #ffba5d;
    }
  }
}
</style>