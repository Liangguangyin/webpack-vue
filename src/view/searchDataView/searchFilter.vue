<template>
  <div class="searchFliter">
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>搜索数据视图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <div class="searchFliter-head">
      <div class="searchFliter-head-content">
        <textareaInput style="flex:auto;" @search-event="searChEvent" :searchValue="searchValue" />
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span
        class="searchInformmation"
      >从{{searchRecord.recordTotal}}条记录找到{{searchRecord.totalRecord}}条,耗时{{searchRecord.totalTime}}毫秒</span>
    </div>
  </div>
</template>

<script>
import textareaInput from "@/component/textareaInput";
export default {
  name: "searchFliter",
  components: {
    textareaInput,
  },
  props: {
    searchRecord: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      options: [
        {
          value: "VKey",
          label: "人次",
        },
        {
          value: "Empiid",
          label: "人",
        },
      ],
      value: "VKey",
      searchValue: "",
    };
  },
  created() {
    this.searchValue = this.$route.query.searchField;
  },
  mounted() {
    this.$nextTick(() => {
      this.searChEvent(this.searchValue);
    });
  },
  methods: {
    searChEvent(val) {
      this.$emit("callBack", { value: val, type: this.value });
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  padding: 10px;
  border-bottom: 1px solid #dddddd;
}
.searchFliter-head {
  height: 70px;
  border-bottom: 1px solid #dddddd;
  background-image: url("../../../public/img/logo ico.png");
  background-size: 70px 50px;
  background-repeat: no-repeat;
  background-position: 20px 50%;
  padding: 15px;
  display: flex;
  .searchFliter-head-content {
    width: 600px;
    margin-left: 100px;
    display: flex;
    // margin-top: ;
    .el-select::v-deep {
      width: 100px;
    }
  }
  .searchInformmation {
    margin-top: 20px;
    margin-left: 10px;
    font-size: 14px;
    color: #999999;
  }
}
</style>