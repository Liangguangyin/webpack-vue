<template>
  <div class="saveExproession">
    <div class="saveExproession-content">
      <ul class="saveExproession-content-ul">
        <li
          class="saveExproession-content-field"
          v-for="item in dataList"
          :key="item.id"
          :style="{'background': getRandomColorString()}"
          @click="searchField(item)"
        >
          {{item.expression}}
          <i @click.stop="deleteField(item)" class="el-icon-circle-close"></i>
        </li>
      </ul>
    </div>
    <div class="saveExproession-content-pages">
      <el-pagination
        @size-change="handleSizeChange"
        size="mini"
        @current-change="handleCurrentChange"
        :current-page="pagination['currentPage']"
        :page-sizes="[40, 60, 80, 100, 120]"
        :page-size="pagination['pageSize']"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination['pageTotal']"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "saveExproession",
  data() {
    return {
      dataList: [],
      pagination: {
        currentPage: 1,
        pageSize: 40,
        pageTotal: 0,
      },
      colorList: [
        "#27AE60",
        "#16A085",
        "#E67E22",
        "#8E44AD",
        "#3498DB",
        "#F39C12",
      ],
    };
  },
  created() {
    this.getExpression();
  },
  methods: {
    getExpression() {
      this.$loadingOpen();
      let formData = new FormData();
      formData.append("pageNum", this.pagination.currentPage);
      formData.append("pageCount", this.pagination.pageSize);
      this.$axios.post("/hssp/head/getExpression", formData).then((res) => {
        this.$loadingClose();
        this.dataList = res.data.expression;
        this.pagination.pageTotal = res.data.totalCount;
      });
    },
    getRandomColorString() {
      return this.colorList[Math.floor(Math.random() * 6)];
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getExpression();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getExpression();
    },
    deleteField(item) {
      this.$confirm(`此操作将永久删除${item.expression}吗, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$loadingOpen();
          this.removeExpression(item);
        })
        .catch(() => {});
    },
    removeExpression(item) {
      let formData = new FormData();
      formData.append("USERID", item.userid);
      formData.append("id", item.id);
      formData.append("expression", item.expression);
      this.$axios.post("/hssp/head/removeExpression", formData).then((res) => {
        this.$loadingClose();
        if (res.status == 200) {
          this.$notify({
            title: "成功",
            message: "表达式删除成功",
            type: "success",
          });
          this.getExpression();
        }
      });
    },
    searchField(item) {
      this.$router.push({
        name: "searchDataView",
        query: { searchField: item.expression },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.saveExproession {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .saveExproession-content {
    flex: auto;
    overflow: hidden;
    overflow-y: auto;
    .saveExproession-content-ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .saveExproession-content-field {
      height: 90px;
      line-height: 90px;
      padding: 0 90px;
      margin-right: 10px;
      margin-bottom: 10px;
      text-align: center;
      white-space: nowrap;
      flex: 1;
      font-size: 16px;
      font-weight: 500;
      border-radius: 5px;
      position: relative;
      color: #fff;
      cursor: pointer;
      background: #ffffff;
      position: relative;
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
      .el-icon-circle-close {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 20px;
        display: none;
      }
    }
    .saveExproession-content-field:hover {
      .el-icon-circle-close {
        display: inline-block;
        color: #ffffff;
      }
      .el-icon-circle-close:hover {
        color: #dcdcdc;
      }
      background: rgba($color: #000000, $alpha: 0.8) !important;
      color: #ffffff;
      // transition: 0.1s font-size;
      // font-size: 17px;
    }
  }
  .saveExproession-content-pages {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #ffffff;
  }
}
</style>