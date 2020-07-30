<template>
  <div>
    <table-list
      :fieldList="fieldList"
      :dataList="dataList"
      :pagination="pagination"
      :height="height"
    ></table-list>
  </div>
</template>

<script>
export default {
  name: "startConstConfig",
  data() {
    return {
      fieldList: [
        {
          config: {
            label: "key名",
            prop: "a",
            align: "center"
          }
        },
        {
          config: {
            label: "value值",
            prop: "b",
            align: "center"
          }
        },
        {
          config: {
            label: "功能描述",
            prop: "c",
            align: "center",
            width: 400
          }
        },
        {
          config: {
            label: "操作",
            prop: "f",
            align: "center"
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
                  提交
                </a>
              </div>
            );
          }
        }
      ],
      dataList: [
        {
          a: "rowsNum",
          b: "123123",
          c: "#当前每次请求返回多少条数据（分页每页返回数据数目）"
        },
        {
          a: "coreList",
          b: "asdasdasd",
          c: "#只查表及只查表优先级"
        },
        {
          a: "rowsNum",
          b: "123123",
          c: "#当前每次请求返回多少条数据（分页每页返回数据数目）"
        },
        {
          a: "coreList",
          b: "asdasdasd",
          c: "#只查表及只查表优先级"
        },
        {
          a: "rowsNum",
          b: "123123",
          c: "#当前每次请求返回多少条数据（分页每页返回数据数目）"
        },
        {
          a: "coreList",
          b: "asdasdasd",
          c: "#只查表及只查表优先级"
        },
        {
          a: "rowsNum",
          b: "123123",
          c: "#当前每次请求返回多少条数据（分页每页返回数据数目）"
        },
        {
          a: "coreList",
          b: "asdasdasd",
          c: "#只查表及只查表优先级"
        },
        {
          a: "rowsNum",
          b: "123123",
          c: "#当前每次请求返回多少条数据（分页每页返回数据数目）"
        },
        {
          a: "coreList",
          b: "asdasdasd",
          c: "#只查表及只查表优先级"
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
      return this.$store.state.setUpRightHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>