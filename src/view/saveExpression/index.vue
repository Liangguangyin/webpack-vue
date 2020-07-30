<template>
  <div class="saveExproession">
    <ul class="saveExproession-content">
      <li
        class="saveExproession-content-field"
        v-for="item in dataList"
        :key="item.id"
        :style="{'background': getRandomColorString()}"
        @click="searchField(item)"
      >
        {{item.text}}
        <i @click.stop="deleteField(item)" class="el-icon-circle-close"></i>
      </li>
    </ul>
    <div class="saveExproession-content-pages">
      <el-pagination
        @size-change="handleSizeChange"
        size="mini"
        @current-change="handleCurrentChange"
        :current-page="pagination['currentPage']"
        :page-sizes="[10, 20, 30, 40, 50]"
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
      dataList: [
        {
          text: "[检验明细.检验数字结果] > 22",
          id: 1
        },
        {
          text: "[检验明细] > 22",
          id: 2
        },
        {
          text: "[检验数字结果] > 22",
          id: 3
        },
        {
          text: "[耗时1005毫秒] > 22",
          id: 4
        },
        {
          text: "[检验明细.检验数字结果] > 22",
          id: 5
        },
        {
          text: "[检验明细] > 22",
          id: 6
        },
        {
          text: "[检验数字结果] > 22",
          id: 7
        },
        {
          text: "[耗时1005毫秒] > 22",
          id: 8
        },
        {
          text: "[耗时1005毫秒] > 22",
          id: 9
        },
        {
          text: "[检验明细.检验数字结果] > 22",
          id: 11
        },
        {
          text: "[检验明细] > 22",
          id: 12
        },
        {
          text: "[检验数字结果] > 22",
          id: 13
        },
        {
          text: "[耗时1005毫秒] > 22",
          id: 14
        },
        {
          text: "[检验明细.检验数字结果] > 22",
          id: 15
        },
        {
          text: "[检验明细] > 22",
          id: 16
        },
        {
          text: "[检验数字结果] > 22",
          id: 17
        },
        {
          text: "[耗时1005毫秒] > 22",
          id: 18
        },
        {
          text: "[耗时1005毫秒] > 22",
          id: 19
        },
        {
          text: "[检验明细.检验数字结果] > 22",
          id: 21
        },
        {
          text: "[检验明细] > 22",
          id: 22
        },
        {
          text: "[检验数字结果] > 22",
          id: 23
        },
        {
          text: "[耗时1005毫秒] > 22",
          id: 24
        },
        {
          text: "[检验明细.检验数字结果] > 22",
          id: 25
        },
        {
          text: "[检验明细] > 22",
          id: 26
        },
        {
          text: "[检验数字结果] > 22",
          id: 27
        },
        {
          text: "[耗时1005毫秒] > 22",
          id: 28
        },
        {
          text: "[耗时1005毫秒] > 22",
          id: 29
        }
      ],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 20
      }
    };
  },
  methods: {
    getRandomColorString() {
      return (
        "#" +
        ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
      );
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val, 22222222);
    },
    deleteField(item) {
      console.log(item);
      this.$confirm(`此操作将永久删除${item.text}吗, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    searchField(item) {
      this.$router.push({
        name: "searchDataView",
        query: { searchField: item.text }
      });
    }
  }
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
    overflow-y: auto;
    .saveExproession-content-field {
      height: 90px;
      line-height: 90px;
      padding: 0 30px;
      margin-right: 10px;
      margin-bottom: 10px;
      text-align: center;
      white-space: nowrap;
      flex: 1;
      font-size: 16px;
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
      }
      background: rgba($color: #000000, $alpha: 0.8) !important;
      color: #ffffff;
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