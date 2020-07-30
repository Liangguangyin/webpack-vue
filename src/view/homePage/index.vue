<template>
  <div class="homePage">
    <div class="homePage-top">
      <div class="homePage-top-logo">
        <img :src="logo" alt />
      </div>
      <p class="homePage-top-title">临床大数据搜索引擎</p>
      <div class="homePage-top-search">
        <textareaInput @search-event="onSearch" />
      </div>
    </div>
    <div class="homePage-bottom">
      <span class="homePage-bottom-title">历史表达式</span>
      <div class="homePage-bottom-content">
        <ul class="homePage-bottom-content-box">
          <li v-for=" (item,index) in searchData" :key="index" @click="onSearch(item.text)">
            <el-tooltip class="item" effect="dark" :content="item.text" placement="bottom">
              <span>{{item.text}}</span>
            </el-tooltip>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import logo from "../../../public/img/logo_clinbrain.png";
import textareaInput from "@/component/textareaInput";
export default {
  name: "homePage",
  components: {
    textareaInput
  },
  data() {
    return {
      logo,
      textarea1: "",
      searchData: [
        { text: "需要部署的时候处理" },
        { text: "现在没有办法" },
        { text: "刷新这个需要部署" },
        { text: "动态路由 不懂原" },
        { text: "这里再网上找" },
        { text: "化的你就说哈 我去" },
        { text: "你觉得哪里可以优" },
        { text: "我对前端不是很熟悉" },
        { text: "你觉得呢" },
        { text: "候就改一个地方" },
        {
          text: "我们把写在vue里的IP地址 都写到config/index.js里把 这样改的时"
        },
        { text: "我提交了代码 你拉一下" }
      ]
    };
  },
  mounted() {
    let url = "/hssp/head/getAllFunction";
    this.$axios.post(url).then(res => {
      console.log(res);
    });
  },
  methods: {
    onSearch(val) {
      this.$router.push({
        name: "searchDataView",
        query: { searchField: val }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.homePage {
  height: 100%;
  position: relative;
  .homePage-top {
    width: 40%;
    height: 50%;
    margin: auto;
    padding: 30px 0 0 0;
    position: relative;
    .homePage-top-logo {
      width: 40%;
      height: 70px;
      margin: auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .homePage-top-title {
      font-size: 30px;
      margin-top: 30px;
      text-align: center;
      color: #999999;
    }
    .homePage-top-search {
      position: relative;
      width: 100%;
      margin-top: 30px;
    }
  }
  .homePage-bottom {
    padding: 0 125px;
    .homePage-bottom-title {
      font-size: 16px;
      color: #666666;
      font-weight: 600;
      padding-left: 14px;
      line-height: 30px;
    }
    .homePage-bottom-content {
      border-top: 1px solid #dedede;
      .homePage-bottom-content-box {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 24%;
          color: #666666;
          font-size: 14px;
          margin: 20px 0;
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          text-align: center;
        }
        li:hover {
          color: #c1c1c1;
        }
      }
    }
  }
}
</style>