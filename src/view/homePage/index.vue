<template>
  <div class="homePage">
    <div class="homePage-label">
      <span
        class="homePage-label-btn"
        v-show="assetCatalog == false"
        @click="()=>this.assetCatalog = true"
      >资产目录</span>
      <span class="homePage-label-btn" v-show="term == false" @click="()=>this.term = true">术语</span>
    </div>
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
          <li v-for=" item in searchData" :key="item.id" @click="onSearch(item.expression)">
            <el-tooltip class="item" effect="dark" :content="item.expression" placement="bottom">
              <span>{{item.expression}}</span>
            </el-tooltip>
          </li>
        </ul>
      </div>
    </div>
    <assetCatalog v-if="assetCatalog" @close="()=>this.assetCatalog = false" />
    <modelTerm v-if="term" @close="()=>this.term = false" />
  </div>
</template>

<script>
// import axios from "axios";
import logo from "../../../public/img/logo_clinbrain.png";
import textareaInput from "@/component/textareaInput";
import assetCatalog from "@/component/assetCatalogAndTerm/assetCatalog";
import modelTerm from "@/component/assetCatalogAndTerm/term";
export default {
  name: "homePage",
  components: {
    textareaInput,
    assetCatalog,
    modelTerm,
  },
  data() {
    return {
      logo,
      textarea1: "",
      searchData: [],
      assetCatalog: false, // 资产目录
      term: false, // 术语
    };
  },
  watch: {
    textarea1(val) {
      this.getSearchTip(val);
    },
  },
  mounted() {
    ///hssp/body/getSearchTip
    this.getHistoryExpression();
  },
  methods: {
    onSearch(val) {
      this.$router.push({
        name: "searchDataView",
        query: { searchField: val },
      });
    },
    getHistoryExpression() {
      let url = "/hssp/body/getHistoryExpression";
      this.$axios.post(url).then((res) => {
        console.log(res.data);
        if (typeof res.data === "object") {
          this.searchData = res.data.expression;
        } else {
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.homePage {
  height: 100%;
  position: relative;
  .homePage-label {
    position: absolute;
    top: 80px;
    height: 300px;
    width: 27px;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    .homePage-label-btn {
      text-align: center;
      background: #409eff;
      color: #fff;
      margin-bottom: 20px;
      font-size: 14px;
      padding: 10px 0;
      cursor: pointer;
    }
    .homePage-label-btn:hover {
      background: #66b1ff;
    }
  }
  .homePage-top {
    width: 40%;
    height: 50%;
    margin: auto;
    padding: 30px 0 0 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .homePage-top-logo {
      width: 40%;
      height: 30%;
      // margin: auto;
      position: relative;
      img {
        width: 100%;
        position: absolute;
        height: 40%;
        bottom: 30px;
      }
    }
    .homePage-top-title {
      font-size: 30px;
      // margin-top: 30px;
      text-align: center;
      color: #999999;
      height: 30%;
    }
    .homePage-top-search {
      position: relative;
      width: 100%;
      // margin-top: 30px;
      height: 30%;
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