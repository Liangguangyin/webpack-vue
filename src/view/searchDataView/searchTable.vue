<template>
  <div class="searchTable">
    <div class="searchTable-top">
      <el-select
        style="width: 120px;"
        v-show="btnShowType == 'screen'"
        v-model="defailtStateValue"
        size="mini"
        placeholder="请选择"
        @change="defailtStateEvent"
      >
        <el-option
          v-for="item in defailtState"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button size="mini" @click="onDrawerShow">检索计划</el-button>
      <el-button size="mini" @click="()=>this.term = true">术语</el-button>
      <el-button size="mini" @click="()=>this.assetCatalog = true">资产目录</el-button>
      <div class="tabel-filter">
        <!-- <span class="tabel-filter-span">显示字段：</span> -->
        <span class="searchTable-top-field">
          <!-- <el-cascader
            :options="cascaderOptions"
            size="mini"
            :props="cascaderProps"
            collapse-tags
            clearable
            placeholder="显示字段"
            v-model="selectCascaderData"
            filterable
            @visible-change="cascaderOnChange"
          ></el-cascader>
          <span v-show="showFieldButton">
            <el-button size="mini" @click="cascaderOnDetermine" type="primary">确定</el-button>
            <el-button size="mini" type="warning">取消</el-button>
          </span>-->
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              显示字段
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="searchTable-top-field-box">
                <el-input placeholder="输入关键字进行过滤" size="mini" v-model="filterText"></el-input>
                <span class="el-dropdown-menu-tree">
                  <el-tree
                    :data="cascaderOptions"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="selectCascaderData"
                    :props="cascaderProps"
                    :filter-node-method="filterNode"
                    ref="tree"
                  ></el-tree>
                </span>
                <span class="el-dropdown-menu-button">
                  <el-button size="mini" @click="cascaderOnDetermine" type="primary">确定</el-button>
                  <!-- <el-button size="mini" type="warning">取消</el-button> -->
                </span>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
        <span class="searchTable-top-date">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            size="mini"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="dateTimeChange"
          ></el-date-picker>
        </span>

        <span class="tabel-filter-span">排序字段：</span>
        <span class="searchTable-top-sort">
          <el-select v-model="sortvalue" @change="sortChange" size="mini" placeholder="请选择">
            <el-option
              v-for="item in sortoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="tabel-filter-span">排序方式：</span>
        <span class="searchTable-top-check">
          <el-select v-model="checkvalue" @change="sortChange" size="mini" placeholder="请选择">
            <el-option
              v-for="item in checkoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span>
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              隐藏
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item) in fieldList" :key="item.config.prop">
                <el-checkbox
                  v-if="item.config['label']"
                  :checked="!item.config.hide"
                  @change="(val)=>dropdownCheckbox(val,item)"
                >{{item.config.label}}</el-checkbox>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
    <table-list
      ref="multipTable"
      :fieldList="fieldList"
      :dataList="tableData"
      :pagination="pagination"
      :height="height"
      @header-click="onHeaderClick"
      @selection-change="selectionChange"
      @paginationEvent="paginationEvent"
      :spanMethod="objectSpanMethod"
      :pageSizes="[10]"
      :setKeys="setKeys"
    >
      <template slot="bottom-button">
        <div v-show="btnShowType == 'home'">
          <el-button type="primary" size="mini" @click="screenData">数据筛选</el-button>
          <el-button type="primary" size="mini" @click="dataStorage">数据保存</el-button>
          <el-button type="primary" size="mini" @click="addExpression">保存表达式</el-button>
        </div>
        <div v-show="btnShowType == 'screen'">
          <el-button type="primary" size="mini" @click="onScreenAdd">保 存</el-button>
          <el-button type="primary" size="mini" @click="onScreenCancel">取 消</el-button>
        </div>
      </template>
      <template v-if="btnShowType == 'screen'" slot="checkBox">
        <el-table-column type="selection" :reserve-selection="true" fixed="left" align="center"></el-table-column>
      </template>
    </table-list>
    <transition name="slide-fade">
      <div
        v-if="Drawer"
        :style="{'height': modelHeight+'px'}"
        ref="Drawer"
        class="searchTable-Drawer"
      >
        <div style="height: 50px"></div>
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <i class="el-icon-refresh-right" @click="refresh"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="关闭" placement="top">
          <i class="el-icon-close" @click="closeDrawer"></i>
        </el-tooltip>
        <table-list :fieldList="drawerFieldList" :dataList="drawerTableData"></table-list>
        <div class="searchTable-Drawer-dataInformation">
          <span>显示第 1 到第 1 条记录，总共 1 条记录</span>
        </div>
      </div>
    </transition>
    <el-dialog title="内容" width="30%" :visible.sync="dialogTableVisible">{{searchName}}</el-dialog>
    <dialogModel
      ref="dialogModel"
      :expression="expression"
      :selectionDataList="selectionDataList"
      :deselectDataList="deselectDataList"
      :requestID="tableDataArr.requestID"
    />
    <assetCatalog v-if="assetCatalog" @close="()=>this.assetCatalog = false" />
    <modelTerm v-if="term" @close="()=>this.term = false" />
  </div>
</template>

<script>
let initData = [
  // {
  //   config: {
  //     align: "center",
  //     type: "selection",
  //     hide: false,
  //     prop: "tv",
  //   },
  // },
  // {
  //   config: {
  //     label: "序号",
  //     align: "center",
  //     type: "index",
  //     ["min-width"]: "200",
  //     hide: false,
  //     prop: "av",
  //   },
  // },
  {
    config: {
      label: "一次就诊号",
      prop: "a",
      ["min-width"]: "200",
      align: "center",
      ["show-overflow-tooltip"]: true,
      hide: true,
    },
  },
];
import dialogModel from "./dialogModel";
import assetCatalog from "@/component/assetCatalogAndTerm/assetCatalog";
import modelTerm from "@/component/assetCatalogAndTerm/term";
export default {
  name: "searchTable",
  props: {
    topheight: {
      type: Number,
      default: () => 0,
    },
    tableDataArr: {
      type: Object,
      default: () => {},
    },
    showFieldTree: {
      type: Array,
      default: () => [],
    },
    sortFieldData: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      default: () => {},
    },
    expression: {
      type: String,
      default: () => "",
    },
  },
  components: {
    dialogModel,
    assetCatalog,
    modelTerm,
  },
  data() {
    return {
      assetCatalog: false, // 资产目录
      term: false, // 术语
      defailtStateValue: "默认全部选中",
      defailtState: [
        {
          value: "默认全部选中",
          label: "默认全部选中",
        },
        {
          value: "默认全不选中",
          label: "默认全不选中",
        },
      ],
      sortvalue: "", //this.sortFieldData[0]["value"],
      sortoptions: [],
      checkoptions: [
        {
          value: "DESC",
          label: "降序",
        },
        {
          value: "ASC",
          label: "升序",
        },
      ],
      checkvalue: "DESC",
      pickerOptions: {
        shortcuts: [
          {
            text: "三个月数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "半年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "一年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "两年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 720);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "三年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1080);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "四年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1440);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "五年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1800);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      showFieldButton: false,
      tableData: [],
      fieldList: [],
      selectionDataList: [], //  checkBox选中数据
      deselectDataList: [], // 取消选中的数据
      changeStatus: true,
      height: 0,
      cascaderProps: { label: "name" },
      cascaderOptions: [],
      selectCascaderData: [],
      selectCascaderDataCopy: [],
      filterText: "",
      Drawer: false,
      modelHeight: 0,
      dialogTableVisible: false,
      searchName: "",
      drawerTableData: [],
      drawerFieldList: [
        {
          config: {
            label: "序号",
            align: "center",
            type: "index",
          },
        },
        {
          config: {
            label: "检索词",
            prop: "keywords",
            ["min-width"]: "200",
            align: "center",
          },
        },
        {
          config: {
            label: "命中结果",
            prop: "totalRecord",
            ["min-width"]: "200",
            align: "center",
          },
        },
      ],
      btnShowType: "home", // 下面的按钮显示类型，在进入筛选页面需要更还按钮
      tableSpansign: {}, // 表格合并标记
    };
  },
  watch: {
    topheight(val) {
      if (val) {
        this.setHeight();
      }
    },
    // 表格数据
    tableDataArr(val) {
      if (JSON.stringify(val) !== "{}") {
        this.initTable();
        this.setHeight();
      }
    },
    // 显示字段数据
    showFieldTree(val) {
      if (val.length !== 0) {
        // console.log(val, 11111111111111);
        this.cascaderOptions = val;
      }
    },
    // 排序字段
    sortFieldData(val) {
      if (val.length !== 0) {
        this.sortoptions = val;
        this.sortvalue = val[0]["value"];
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    if (this.topheight) {
      this.setHeight();
    }
    // 表格数据
    if (JSON.stringify(this.tableDataArr) !== "{}") {
      this.initTable();
    }
    // 显示字段数据
    if (this.showFieldTree.length !== 0) {
      this.cascaderOptions = this.showFieldTree;
    }
    // 排序字段
    if (this.sortFieldData.length !== 0) {
      this.sortoptions = this.sortFieldData;
      this.sortvalue = this.sortFieldData[0]["value"];
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 抽屉框刷新按钮
    refresh() {
      this.onDrawerShow();
    },
    // 隐藏前端的change方法
    dropdownCheckbox(val, obj) {
      // 一次就诊号默认是不显示的，但是在勾选显示的时候需要在点击分页也需要保存该设置
      if (obj.config.label == "一次就诊号") {
        initData[1].config.hide = !val;
      }
      let arr = this.$deepClone(this.fieldList); // 深拷贝数据更新，不能用JSON拷贝，render 属于方法
      arr.map((item) => {
        if (item.config.prop == obj.config.prop) {
          item.config.hide = !val;
        }
      });
      this.fieldList = arr;
    },

    // checkbox 选中框的状态改变方法
    defailtStateEvent(val) {
      this.checkboxControlMethod();
    },

    // 全选与全不选的数据控制方法
    checkboxControlMethod() {
      let element = this.$refs.multipTable.getTableRefs();
      this.changeStatus = false;
      let arr = this.tableData;
      // arr 进入数据
      if (this.defailtStateValue == "默认全部选中") {
        this.$nextTick(() => {
          if (this.deselectDataList.length > 0) {
            this.deselectDataList.map((item) => {
              arr = arr.filter(
                (obj) =>
                  obj.a +
                    obj["PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"] !=
                  item.a +
                    item["PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"]
              );
            });
          } else {
            arr = this.tableData;
          }
          arr.map((data) => {
            element.toggleRowSelection(data, true);
          });
          this.changeStatus = true;
        });
      } else {
        this.tableData.map((el) => {
          element.toggleRowSelection(el, false);
        });
        this.$nextTick(() => {
          this.selectionDataList.map((item) => {
            element.toggleRowSelection(item, true);
          });
          this.changeStatus = true;
        });
      }
    },

    onDrawerShow() {
      this.$loadingOpen();
      let formData = new FormData();
      formData.append("requestID", this.tableDataArr.requestID);
      formData.append(
        "maxPageNum",
        Math.ceil(this.tableDataArr.totalRecordShow / 10)
      );
      formData.append("expression", this.tableDataArr.expression);
      formData.append("expression_old", this.tableDataArr.expression);
      formData.append("sortBy", "PatinfoVisitRecord_RecentlyRegisterTime");
      formData.append("sortOrderBy", "DESC");
      formData.append("limit", "");
      formData.append("pageNum", this.tableDataArr.pageNum);
      formData.append("statisticsNum", this.tableDataArr.statisticsNum);
      formData.append("groupNum", this.tableDataArr.groupNum);
      formData.append("countDrawFileName", "");
      formData.append("maxData", this.tableDataArr.totalRecordShow);
      formData.append("limit_time_start", "");
      formData.append("limit_time_end", "");
      formData.append("analysisWay", this.tableDataArr.analysisWay);
      formData.append("returnFieldSt", 1);
      formData.append("returnSearchOk", 1);
      formData.append("userId", "");
      formData.append("searchType", 1);
      formData.append("searchWay", 0);
      formData.append("checkPage", 0);
      formData.append(
        "fromPageDate",
        new Date().pattern("yyyy-MM-dd hh:mm:ss S")
      );
      formData.append("lastDateNum", 10);
      formData.append("nextCursorMark", "");
      this.$axios.post("/hssp/rest/checkSearchPlan", formData).then((res) => {
        if (res.data.status == 0 || res.data.status == 1) {
          this.onDrawerShow();
        } else {
          let params = {
            requestID: this.tableDataArr.requestID,
          };
          this.$axios
            .get("/hssp/rest/getcheckSearchPlan", params)
            .then((res) => {
              this.$loadingClose();
              this.drawerTableData = res.data.rows;
              this.Drawer = true;
            });
        }
      });
    },
    // 关闭抽屉
    closeDrawer() {
      this.Drawer = false;
    },
    // 动态设置高度
    setHeight() {
      window.onresize = () => {
        return (() => {
          this.height = document.body.clientHeight - (181 + this.topheight);
          this.modelHeight = document.body.clientHeight - 91;
        })();
      };
      this.height = window.innerHeight - (181 + this.topheight);
      this.modelHeight = window.innerHeight - 91;
    },

    // 显示字段数改变触发change事件
    cascaderOnChange(value) {
      if (!value) {
        this.showFieldButton = false;
        // 聚焦事件比click事件要触发的快一些，使用定时器延迟执行
        setTimeout(() => {
          this.selectCascaderData = this.selectCascaderDataCopy;
        }, 100);
      } else {
        this.showFieldButton = true;
      }
    },
    // 显示字段数改变触发确定事件
    cascaderOnDetermine() {
      this.$emit("filterData", {
        type: "show",
        data: this.selectCascaderData,
      });
    },
    // 日期时间选择器change事件
    dateTimeChange(val) {
      this.$emit("filterData", { type: "date", data: val });
    },

    // 排序方式change事件
    sortChange(val) {
      if (val == "DESC" || val == "ASC") {
        this.$emit("filterData", { type: "sortOrderBy", data: val });
      } else {
        this.$emit("filterData", { type: "sortBy", data: val });
      }
    },
    // 点击数据筛选触发事件
    screenData() {
      // let arr = this.$deepClone(this.fieldList);
      // arr.unshift({
      //   //type="selection" align="center"
      //   config: {
      //     type: "selection",
      //     align: "center",
      //     fixed: true,
      //   },
      // });
      // this.fieldList = arr;
      this.$loadingOpen();
      setTimeout(() => {
        this.$loadingClose();
        this.btnShowType = "screen";
      }, 200);
    },

    // 点击保存按钮，
    onScreenAdd() {
      if (
        this.selectionDataList.length > 0 ||
        this.defailtStateValue == "默认全部选中"
      ) {
        console.log(this.deselectDataList, this.selectionDataList);
        this.$refs.dialogModel.onVisible(
          this.defailtStateValue,
          this.sortvalue,
          this.checkvalue
        );
      } else {
        this.$message({
          message: "现在选中'0'条数据，请至少选中一条",
          type: "warning",
        });
      }
    },
    // 点击取消筛选按钮
    onScreenCancel() {
      this.btnShowType = "home";
    },

    // 数据保存
    dataStorage() {
      console.log("数据保存");
      this.$refs.dialogModel.onVisible();
    },

    // 保存表达式
    addExpression() {
      this.$emit("filterData", { type: "addExpression", data: null });
    },

    // 表格头部点击事件
    onHeaderClick(val) {
      if (val.label && val.label !== "一次就诊号" && val.label !== "序号") {
        let text = null;
        this.selectCascaderData.map((item, index) => {
          if (item[1] == val.label) {
            text = `[${item[0]}.${item[1]}]`;
          }
        });
        this.$alert(text, "检索字段", {
          dangerouslyUseHTMLString: true,
        });
      }
    },
    // 选中数据的一个过滤与保存
    selectionChange(selection) {
      if (this.changeStatus) {
        if (this.defailtStateValue == "默认全部选中") {
          let arr = JSON.parse(JSON.stringify(this.tableData));
          selection.map((item) => {
            arr = arr.filter(
              (element) =>
                element.a +
                  element[
                    "PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"
                  ] !==
                item.a +
                  item["PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"]
            );
          });
          this.deselectDataList = this.deselectDataList.concat(arr);

          let obj = {};
          let arrr = this.deselectDataList.reduce((cur, next) => {
            obj[
              next.a + next["PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"]
            ]
              ? ""
              : (obj[
                  next.a +
                    next["PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"]
                ] = true && cur.push(next));
            return cur;
          }, []);
          this.deselectDataList = arrr;
          selection.map((item) => {
            this.deselectDataList = this.deselectDataList.filter(
              (obj) =>
                obj.a +
                  obj["PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"] !==
                item.a +
                  item["PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"]
            );
          });
        } else {
          this.selectionDataList = this.selectionDataList.concat(selection);
          let obj = {};
          let arrr = this.deselectDataList.reduce((cur, next) => {
            obj[
              next.a + next["PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"]
            ]
              ? ""
              : (obj[
                  next.a +
                    next["PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"]
                ] = true && cur.push(next));
            return cur;
          }, []);
        }
      }
    },

    // 分页事件
    paginationEvent(val) {
      this.$emit("paginationEvent", val);
    },

    // 初始换级表格数据改变触发事件
    initTable() {
      let tableHead = this.tableDataArr.columnNameCN,
        tableList;
      (this.fieldList = []), (this.tableData = []);
      if (JSON.stringify(tableHead) !== "{}") {
        let { fieldList, defaultSelet } = this.forAddTableHead(tableHead);
        this.fieldList = fieldList;
        // 获取默认显示字段
        this.selectCascaderData = defaultSelet;
        this.selectCascaderDataCopy = defaultSelet;
        // 遍历对象获取列表数据 tableData
        if (this.tableDataArr.searchByType == "VKey") {
          // 也人次为单位的数据处理
          tableList = this.tableDataArr.columnValue;
          // 遍历对象获取field 信息
          for (const key in tableList) {
            tableList[key]["a"] = key;
            this.tableData.push(tableList[key]);
          }
          this.checkboxControlMethod(tableList);
        } else {
          // 也认为单位的数据处理，两个是不一样的返回数据，需要前端做处理后在进行显示,
          tableList = this.tableDataArr.columnValueListMap;
          let total = 0;
          for (const key in tableList) {
            if (tableList[key].length > 0) {
              tableList[key].map((item) => {
                item = { ...item, a: key };
                this.tableData.push(item);
              });
            }

            this.tableSpansign[key] = {
              sign: tableList[key].length,
              index: total,
            };
            total = tableList[key].length + total;
            this.tableSpansign["total"] = total;
          }
          this.checkboxControlMethod(tableList);
        }
      } else {
        (this.fieldList = []),
          (this.tableData = []),
          (this.selectCascaderData = []);
      }
    },

    forAddTableHead(obj) {
      let defaultSelet = [];
      let fieldList;
      if (this.tableDataArr.searchByType == "VKey") {
        fieldList = JSON.parse(JSON.stringify(initData));
      } else {
        fieldList = JSON.parse(JSON.stringify(initData));
        fieldList[0]["config"]["label"] = "Empiid";
        fieldList[0]["config"]["hide"] = false;
      }
      for (const key in obj) {
        defaultSelet.push([obj[key]["searchTableCN"], obj[key]["displayName"]]);
        fieldList.push({
          config: {
            label: obj[key]["displayName"],
            prop: key,
            ["min-width"]: "200",
            align: "center",
            hide: false,
            // ["show-overflow-tooltip"]: true,
          },
          render: (h, scope) => {
            if (scope.row[key]) {
              return (
                <div>
                  {scope.row[key].map((item, index) => {
                    return (
                      <div
                        style="white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      word-break: break-all;"
                        key={index}
                      >
                        <span
                          slot="reference"
                          style="cursor: pointer;"
                          onClick={() => this.onClickTextContent(item)}
                          domPropsInnerHTML={item}
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            }
          },
        });
      }
      // <el-popover
      //   placement="top-start"
      //   // title="标题"
      //   min-width="100"
      //   trigger="hover"
      // >
      //   <p style="max-width: 600px" domPropsInnerHTML={item}>
      //                     {item}
      //                   </p>
      //                   <div slot="content" style="width: 100%; ">
      //                     {item}
      //                   </div>
      // </el-popover>;
      return {
        defaultSelet,
        fieldList,
      };
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        this.tableDataArr.searchByType == "Empiid" &&
        (column.label === "Empiid" || column.type == "selection")
      ) {
        for (const key in this.tableSpansign) {
          if (row.a == key) {
            if (rowIndex == this.tableSpansign[key]["index"]) {
              return {
                rowspan: this.tableSpansign[key]["sign"],
                colspan: 1,
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0,
              };
            }
          }
        }
      }
    },

    setKeys(row) {
      return (
        row["a"] + row["PatinfoVisitRecord_PatinfoVisitRecord_VisitNumber"][0]
      );
    },

    // 点击内容事件，在内容超过100 length 时显示内容
    onClickTextContent(item) {
      if (item.length > 100) {
        this.$alert(item, "内容", {
          dangerouslyUseHTMLString: true,
          customClass: "searchTableTextConentBox",
        });
      }
    },
  },
};
</script>
<style lang="scss" >
.el-dropdown-menu {
  max-height: 500px;
  overflow: hidden;
  overflow-y: auto;
}
.searchTable-top-field-box {
  height: 300px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  .el-dropdown-menu-button {
    height: 30px;
    min-height: 30px;
    .el-button {
      width: 100%;
    }
  }
  .el-dropdown-menu-tree {
    flex: auto;
    // overflow-y: auto;
    // height: 200px;
    overflow-y: auto;
  }
}

.el-tooltip__popper.is-dark {
  max-width: 99%;
}
.searchTableTextConentBox {
  width: 620px;
}
.searchTable {
  .el-dialog__header {
    border-bottom: 1px solid #dedede;
  }
  .el-dialog__body {
    height: 200px;
  }
  position: relative;
  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  .searchTable-Drawer {
    position: fixed;
    width: 70%;
    background: #fff;
    top: 61px;
    z-index: 1000;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
    .el-icon-close {
      position: absolute;
      right: 10px;
      top: 15px;
      cursor: pointer;
      font-size: 20px;
      font-weight: 600;
      z-index: 1000;
    }
    .el-icon-close:hover {
      color: #999999;
    }
    .el-icon-refresh-right {
      position: absolute;
      right: 50px;
      top: 15px;
      cursor: pointer;
      font-size: 20px;
      font-weight: 600;
      z-index: 1000;
    }
    .el-icon-refresh-right:hover {
      color: #999999;
    }
    .searchTable-Drawer-dataInformation {
      padding: 10px;
      font-size: 14px;
      color: #666666;
    }
  }
  .searchTable-top {
    height: 50px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    .el-button::v-deep {
      max-height: 40px;
    }
    .tabel-filter {
      float: right;
      .searchTable-top-field {
        .el-dropdown-menu {
          height: 300px;
          overflow: hidden;
          overflow-y: auto;
          .el-dropdown-menu-button {
            position: absolute;
            bottom: 5px;
          }
        }
        // .el-cascader .el-input .el-input__inner {
        //   width: 200px;
        // }
        // .el-cascader__tags {
        //   display: flex;
        //   flex-wrap: nowrap;
        //   overflow: hidden;
        // }
      }
      .searchTable-top-date {
        .el-date-editor.el-range-editor--mini {
          width: 250px !important;
          height: 30px;
        }
      }
      .tabel-filter-span {
        color: #999999;
        font-size: 12px;
      }
      .searchTable-top-sort {
        .el-input--mini .el-input__inner {
          width: 110px;
        }
      }
      .searchTable-top-check {
        .el-input--mini .el-input__inner {
          width: 80px;
        }
      }
      .el-dropdown-link {
        cursor: pointer;
        color: #999999;
        font-size: 12px;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
      .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>