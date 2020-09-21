<template>
  <div class="searchDataView">
    <search-filter ref="filter" @callBack="callBack" :searchRecord="searchRecord" />
    <searchTable
      class="searchDataView-table"
      :topheight="topheight"
      :tableDataArr="tableDataArr"
      :showFieldTree="showFieldTree"
      :sortFieldData="sortFieldData"
      :pagination="pagination"
      @paginationEvent="paginationEvent"
      @filterData="filterData"
      :expression="expression"
    />
  </div>
</template>

<script>
import searchFilter from "./searchFilter";
import searchTable from "./searchTable";
export default {
  name: "searchDataView",
  components: {
    searchFilter,
    searchTable,
  },
  data() {
    return {
      topheight: 0,
      tableDataArr: {},
      searchRecord: {},
      showFieldTree: [],
      sortFieldData: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
      searchField: {},
      limitTime: {
        limit_time_start: "",
        limit_time_end: "",
      },
      returnField: 1,
      sortBy: "PatinfoVisitRecord_RecentlyRegisterTime",
      sortOrderBy: "DESC",
      expression: "",
    };
  },
  mounted() {
    // 获取高度，高度没有算上border所以需要加3
    this.topheight = this.$refs.filter.$el.clientHeight + 23;
    this.getSolrReturn();
    this.GetSortList();
  },
  methods: {
    callBack(obj, page = 1) {
      this.expression = obj.value;
      this.$loadingOpen();
      this.searchField = obj;
      let url = "/hssp/rest/solrQure";
      let formData = new FormData();
      formData.append("requestID", "");
      formData.append("maxPageNum", "");
      formData.append("expression", obj.value);
      formData.append("expression_old", obj.value);
      formData.append("sortBy", this.sortBy);
      formData.append("sortOrderBy", this.sortOrderBy);
      formData.append("limit", "");
      formData.append("pageNum", page);
      formData.append("statisticsNum", 0);
      formData.append("groupNum", 0);
      formData.append("countDrawFileName", "");
      formData.append("maxData", this.pagination.pageTotal);
      formData.append("limit_time_start", this.limitTime.limit_time_start);
      formData.append("limit_time_end", this.limitTime.limit_time_end);
      formData.append("analysisWay", "");
      formData.append("returnFieldSt", this.returnField);
      formData.append("returnSearchOk", 0);
      formData.append("searchDatas", 0);
      formData.append("userId", "");
      formData.append("searchType", 1);
      formData.append("searchWay", 0);
      formData.append("checkPage", 0);
      formData.append(
        "fromPageDate",
        new Date().pattern("yyyy-MM-dd hh:mm:ss S")
      );
      formData.append("lastDateNum", 0);
      formData.append("nextCursorMark", 0);
      formData.append("searchByType", obj.type);
      formData.append("limitTimeOK", 0);
      formData.append("limitTimeStart", 1);
      formData.append("limitTimeEnd", "");
      this.$axios.post(url, formData).then((res) => {
        this.$loadingClose();
        this.tableDataArr = res.data;
        let obj = {
          recordTotal: res.data.recordTotal,
          totalRecord: res.data.totalRecordShow,
          totalTime:
            new Date(res.data.solrQureTimeEnd).getTime() -
            new Date(res.data.solrQureTimeStart).getTime(),
        };
        this.searchRecord = obj;
        this.pagination = {
          pageTotal: res.data.totalRecordShow,
        };
      });
    },
    // 获取显示字段, 该字段后端返回的是一个数组，前端需要把数据转换为tree 数据
    getSolrReturn() {
      let SolrReturnTree = [];
      this.$axios.post("/hssp/tail/getSolrReturn").then((res) => {
        const dataList = res.data.getSolrReturn;
        for (let index = 0; index < dataList.length; index++) {
          if (dataList[index]["pId"] == 0) {
            let obj = {
              id: dataList[index]["id"],
              pId: dataList[index]["pId"],
              name: dataList[index]["name"],
              children: [],
            };
            SolrReturnTree.push(obj);
          }
        }
        for (let i = 0; i < SolrReturnTree.length; i++) {
          for (let j = 0; j < dataList.length; j++) {
            if (SolrReturnTree[i]["id"] == dataList[j]["pId"]) {
              SolrReturnTree[i]["children"].push(dataList[j]);
            }
          }
        }
        this.showFieldTree = SolrReturnTree;
      });
    },

    // 获取排序字段
    GetSortList() {
      this.sortFieldData = [];
      let formData = new FormData();
      formData.append("requestID", "");
      formData.append("maxPageNum", "");
      formData.append("expression", "");
      formData.append("expression_old", "");
      formData.append("sortBy", "");
      formData.append("sortOrderBy", "");
      formData.append("limit", "");
      formData.append("pageNum", "1");
      formData.append("statisticsNum", "0");
      formData.append("groupNum", "0");
      formData.append("countDrawFileName", "");
      formData.append("maxData", "0");
      formData.append("limit_time_start", "1");
      formData.append("limit_time_end", "");
      formData.append("analysisWay", "");
      formData.append("returnFieldSt", "1");
      formData.append("returnSearchOk", "0");
      formData.append("searchDatas", "0");
      formData.append("userId", "");
      formData.append("searchType", "1");
      formData.append("searchWay", "0");
      formData.append("checkPage", "0");
      formData.append("fromPageDate", "0");
      formData.append("lastDateNum", "0");
      formData.append("nextCursorMark", "0");
      this.$axios.post("/hssp/rest/GetSortList", formData).then((res) => {
        console.log(res.data.sortMap);
        let data = {};
        for (const key in res.data.sortMap) {
          data = {
            label: res.data.sortMap[key],
            value: key,
          };
          this.sortFieldData.push(data);
        }
      });
    },

    // 子组件回调报告分页
    paginationEvent(val) {
      this.callBack(this.searchField, val.page);
    },

    // 表格头部过滤触发事件，由子元素回调
    filterData(obj) {
      ///new Date(val[0]).pattern("yyyyMMdd")
      switch (obj.type) {
        case "date":
          if (obj.data) {
            this.limitTime = {
              limit_time_start: new Date(obj.data[0]).pattern("yyyyMMdd"),
              limit_time_end: new Date(obj.data[1]).pattern("yyyyMMdd"),
            };
          } else {
            this.limitTime = {
              limit_time_start: "",
              limit_time_end: "",
            };
          }
          break;
        case "show":
          let returnField = "*";
          var reg = new RegExp('"', "g");
          if (obj.data.length !== 0) {
            obj.data.map((item, index) => {
              returnField =
                returnField +
                "AND*" +
                JSON.stringify(item).replace(",", ".").replace(reg, "");
            });
            this.returnField = returnField.slice(4);
          } else {
            this.returnField = 1;
          }
          break;
        case "sortBy":
          this.sortBy = obj.data;
          break;
        case "sortOrderBy":
          this.sortOrderBy = obj.data;
          break;
        case "addExpression":
          this.saveExpression();
          break;
      }

      this.$nextTick(() => {
        this.callBack(this.searchField, 1);
      });
    },
    // 保存表达式
    saveExpression() {
      let formData = new FormData();
      formData.append("USERID", "kpi");
      formData.append("expression", this.expression);
      this.$axios.post("/hssp/tail/addExpression", formData).then((res) => {
        if (res.status == 200) {
          this.$notify({
            title: "保存提示",
            message: "表达式保存成功",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.searchDataView {
  padding: 10px;
}
</style>