<template>
  <div>
    <headerFilter />
    <table-list
      :fieldList="fieldList"
      :dataList="dataList"
      :pagination="pagination"
      :height="height"
    >
      <template slot="bottom-button">
        <el-button type="primary" size="mini">新增</el-button>
        <el-button type="primary" size="mini">回收站</el-button>
      </template>
    </table-list>
  </div>
</template>

<script>
import headerFilter from "./headerFilter";
export default {
  name: "userSet",
  components: {
    headerFilter
  },
  data() {
    return {
      fieldList: [
        {
          config: {
            label: "序号",
            align: "center",
            prop: "a"
          }
        },
        {
          config: {
            label: "用户ID",
            align: "center",
            prop: "b"
          }
        },
        {
          config: {
            label: "用户名称",
            align: "center",
            prop: "c"
          }
        },
        {
          config: {
            label: "登录密码",
            align: "center",
            prop: "d"
          }
        },
        {
          config: {
            label: "使用量统计",
            align: "center",
            prop: "e"
          }
        },
        {
          config: {
            label: "科室名称",
            align: "center",
            prop: "f"
          }
        },
        {
          config: {
            label: "科室ID",
            align: "center",
            prop: "g"
          }
        },
        {
          config: {
            label: "检索展示占比",
            align: "center",
            prop: "h"
          }
        },
        {
          config: {
            label: "检索展示限制方式",
            align: "center",
            prop: "i",
            width: 150
          }
        },
        {
          config: {
            label: "欢迎视频",
            align: "center",
            prop: "j"
          }
        },
        {
          config: {
            label: "操作",
            align: "center",
            prop: "k"
          },
          render: (h, scope) => {
            return (
              <div>
                <a
                  href="javascript:;"
                  style="margin-right: 10px"
                  onClick={() => {
                    this.onEdit(scope.row);
                  }}
                >
                  修改
                </a>
                <a
                  href="javascript:;"
                  onClick={() => {
                    this.delete(scope.row);
                  }}
                >
                  删除
                </a>
              </div>
            );
          }
        }
      ],
      dataList: [
        {
          a: 1,
          b: "solr",
          c: "系统管理员",
          d: "123456",
          e: "是",
          f: "柯林布瑞",
          g: "22,123",
          h: "100",
          i: "0",
          j: "0"
        },
        {
          a: 1,
          b: "solr",
          c: "系统管理员",
          d: "123456",
          e: "是",
          f: "柯林布瑞",
          g: "22,123",
          h: "100",
          i: "0",
          j: "0"
        },
        {
          a: 1,
          b: "solr",
          c: "系统管理员",
          d: "123456",
          e: "是",
          f: "柯林布瑞",
          g: "22,123",
          h: "100",
          i: "0",
          j: "0"
        },
        {
          a: 1,
          b: "solr",
          c: "系统管理员",
          d: "123456",
          e: "是",
          f: "柯林布瑞",
          g: "22,123",
          h: "100",
          i: "0",
          j: "0"
        },
        {
          a: 1,
          b: "solr",
          c: "系统管理员",
          d: "123456",
          e: "是",
          f: "柯林布瑞",
          g: "22,123",
          h: "100",
          i: "0",
          j: "0"
        },
        {
          a: 1,
          b: "solr",
          c: "系统管理员",
          d: "123456",
          e: "是",
          f: "柯林布瑞",
          g: "22,123",
          h: "100",
          i: "0",
          j: "0"
        }
      ],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 20
      }
    };
  },
  computed: {
    height() {
      return this.$store.state.setUpRightHeight - 68;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>