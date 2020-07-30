<template>
  <div class="setUp">
    <div class="setUpn-nav">
      <el-menu :default-active="path" class="el-menu-vertical-demo">
        <el-submenu v-for="item in routerList" :key="item.id" :index="item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item-group
            v-for="element in item.children"
            :key="element.id"
            @click.native="onClickInRouter(element)"
          >
            <el-menu-item :index="element.path">
              <i :class="element.meta.icon"></i>
              {{element.meta.title}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="setUp-content" ref="setUpContent">
      <router-view />
    </div>
  </div>
</template>

<script>
import textareaInput from "@/component/textareaInput";
import RouterList from "./config";
export default {
  name: "setUp",
  components: {
    textareaInput
  },
  data() {
    return {
      boxHeight: 0
    };
  },
  computed: {
    routerList() {
      return RouterList;
    },
    path() {
      let url = "";
      if (this.$store.state.currentRouter["matched"][3]) {
        url = this.$store.state.currentRouter["matched"][3]["path"];
      } else {
        url = "/systemConfig/tableConfig";
      }
      return url;
    }
  },
  mounted() {
    // 进入该路由默认进入tableConfig
    if (this.path == "/systemConfig/tableConfig") {
      this.$router.push({
        name: "tableConfig"
      });
    }
    console.log();
    this.$store.commit(
      "setSetUpRightHeight",
      this.$refs.setUpContent.offsetHeight - 120
    );
  },
  methods: {
    onClickInRouter(item) {
      this.$router.push({
        name: item.name,
        query: this.boxHeight
      });
    }
  }
};
</script>

<style lang="scss">
.setUp {
  display: flex;
  height: 100%;
  .setUpn-nav {
    background: #fff;
    height: 100%;
    min-width: 210px;
    .el-menu-vertical-demo {
      height: 100%;
    }
  }
  .setUp-content {
    flex: auto;
    padding: 10px;
  }
}
</style>