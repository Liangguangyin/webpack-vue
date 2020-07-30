<template>
  <div class="rolePermissions">
    <div class="rolePermissions-headerFilter">
      <div>
        <span class="text">角色名称：</span>
      </div>
      <div>
        <el-input v-model="input1" size="mini" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-button type="primary" size="mini" icon="el-icon-search">检索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerFilter",
  data() {
    return {
      input1: ""
    };
  }
};
</script>

<style lang="scss">
.rolePermissions-headerFilter {
  background: #fff;
  display: flex;
  padding: 20px;
  .el-input--mini .el-input__inner {
    width: 150px;
  }
  div {
    line-height: 28px;
    height: 28px;
    display: flex;
    .text {
      color: #999999;
      font-size: 12px;
    }
  }
}
</style>