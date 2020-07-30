<template>
  <div class="headerManage">
    <div class="headerManage-headerFilter">
      <div>
        <span class="text">表名称：</span>
      </div>
      <div  style="margin-right: 20px">
        <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span  class="text">表字段名称：</span>
      </div>
      <div>
        <el-input v-model="input1" size="mini" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerFilter",
  data() {
    return {
      input: "",
      input1
    };
  }
};
</script>

<style lang="scss">
.headerManage-headerFilter {
  background: #fff;
  display: flex;
  padding: 20px;
  .el-input--mini .el-input__inner {
    width: 150px;
  }
  div{
    line-height: 28px;
    height: 28px;
    display: flex;
    .text{
      color: #999999;
      font-size: 12px;
    }
  }
}
</style>