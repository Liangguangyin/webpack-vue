
<template>
  <div class="searchTable">
    <div class="searchTable-top">
      <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button> -->
      <el-button size="mini" @click="onDrawerShow">检索计划</el-button>
      <div class="tabel-filter">
        <span class="searchTable-top-field">
          <el-cascader
            :options="cascaderOptions"
            size="mini"
            :props="cascaderProps"
            collapse-tags
            clearable
            placeholder="显示字段"
          ></el-cascader>
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
          ></el-date-picker>
        </span>

        <span>排序字段：</span>
        <span class="searchTable-top-sort">
          <el-select v-model="sortvalue" size="mini" placeholder="请选择">
            <el-option
              v-for="item in sortoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span>排序方式：</span>
        <span class="searchTable-top-check">
          <el-select v-model="checkvalue" size="mini" placeholder="请选择">
            <el-option
              v-for="item in checkoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <!-- <span class="searchTable-top-show">
          <el-select v-model="checkvalue" size="mini" placeholder="隐藏">
            <el-option
              v-for="item in showoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>-->
      </div>
    </div>
    <table-list
      :fieldList="fieldList"
      :dataList="tableData"
      :pagination="pagination"
      :height="height"
      @header-click="onHeaderClick"
    >
      <template slot="bottom-button">
        <div>
          <el-button type="primary" size="mini">数据筛选</el-button>
          <el-button type="primary" size="mini">数据保存</el-button>
          <el-button type="primary" size="mini">保存表达式</el-button>
        </div>
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
      </div>
    </transition>
    <el-dialog title="内容" width="30%" :visible.sync="dialogTableVisible">{{searchName}}</el-dialog>
  </div>
</template>

<script>
export default {
  name: "searchTable",
  props: {
    topheight: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      sortoptions: [
        {
          value: "1",
          label: "就诊日期"
        },
        {
          value: "2",
          label: "门诊或住院"
        },
        {
          value: "3",
          label: "病例号"
        },
        {
          value: "4",
          label: "年龄"
        }
      ],
      sortvalue: "1",
      checkoptions: [
        {
          value: "1",
          label: "降序"
        },
        {
          value: "2",
          label: "升序"
        }
      ],
      checkvalue: "1",
      pickerOptions: {
        shortcuts: [
          {
            text: "三个月数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "半年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "一年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "两年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 720);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "三年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1080);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "四年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1440);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "五年数据",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1800);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      tableData: [
        {
          n: "2016-05-02",
          a: "王小虎",
          b: "上海市普陀区金沙江路 1518 弄",
          c: "家"
        },
        {
          n: "2016-05-04",
          a: "王小虎",
          b: "上海市普陀区金沙江路 1517 弄",
          c: "公司"
        },
        {
          n: "2016-05-01",
          a: "王小虎",
          b: "上海市普陀区金沙江路 1519 弄",
          c: "家"
        },
        {
          n: "2016-05-03",
          a: "王小虎",
          b: "上海市普陀区金沙江路 1516 弄",
          c: "公司"
        },
        {
          n: "2016-05-02",
          a: "王小虎",
          b: "上海市普陀区金沙江路 1518 弄",
          c: "家"
        },
        {
          n: "2016-05-04",
          a: "王小虎",
          b: "上海市普陀区金沙江路 1517 弄",
          c: "公司"
        },
        {
          n: "2016-05-01",
          a: "王小虎",
          b: "上海市普陀区金沙江路 1519 弄",
          c: "家"
        },
        {
          n: "2016-05-03",
          a: "王小虎",
          b: "上海市普陀区金沙江路 1516 弄",
          c: "公司"
        },
        {
          n: "2016-05-02",
          a: "王小虎",
          b: "上海市普陀区金沙江路 1518 弄",
          c: "家"
        },
        {
          n: "2016-05-04",
          a: "王小虎",
          b: "上海市普陀区金沙江路 1517 弄",
          c: "公司"
        }
      ],
      fieldList: [
        {
          config: {
            label: "一次就诊号",
            prop: "a",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          },
          render: (h, scope) => {
            return <div>{scope.row.a}</div>;
          }
        },
        {
          config: {
            label: "就诊号",
            prop: "b",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "就诊日期",
            prop: "n",
            filters: [
              { text: "2016-05-01", value: "2016-05-01" },
              { text: "2016-05-02", value: "2016-05-02" },
              { text: "2016-05-03", value: "2016-05-03" },
              { text: "2016-05-04", value: "2016-05-04" }
            ],
            ["show-overflow-tooltip"]: true,
            sortable: "",
            ["filter-method"]: this.filterHandler,
            ["min-width"]: "200",
            align: "center"
          }
        },
        {
          config: {
            label: "门诊或住院",
            prop: "c",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "就诊年龄",
            prop: "d",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "性别",
            prop: "e",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "出院诊断",
            prop: "f",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "入院诊断",
            prop: "g",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "门诊诊断",
            prop: "h",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "诊断名称",
            prop: "i",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "科室",
            prop: "j",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "病区",
            prop: "k",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },

        {
          config: {
            label: "主任医生",
            prop: "m",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "主治医生",
            prop: "l",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        },
        {
          config: {
            label: "病人状态",
            prop: "o",
            ["min-width"]: "200",
            align: "center",
            ["show-overflow-tooltip"]: true
          }
        }
      ],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 11
      },
      height: 0,
      cascaderProps: { multiple: true },
      cascaderOptions: [
        {
          value: 1,
          label: "就诊记录",
          children: [
            {
              value: 2,
              label: "病区"
            },
            {
              value: 3,
              label: "病人状态"
            },
            {
              value: 4,
              label: "科室"
            },
            {
              value: 5,
              label: "性别"
            },
            {
              value: 6,
              label: "病人ID"
            },
            {
              value: 7,
              label: "出院诊断"
            },
            {
              value: 8,
              label: "入院诊断"
            },
            {
              value: 9,
              label: "门诊诊断"
            },
            {
              value: 10,
              label: "主任医生"
            },
            {
              value: 11,
              label: "主治医生"
            },
            {
              value: 12,
              label: "就诊年龄"
            },
            {
              value: 13,
              label: "就诊日期"
            },
            {
              value: 14,
              label: "就诊号"
            },
            {
              value: 15,
              label: "门诊或住院"
            }
          ]
        },
        {
          value: 100,
          label: "检验明细",
          children: [
            {
              value: 101,
              label: "参考值"
            },
            {
              value: 102,
              label: "检验项目"
            },
            {
              value: 103,
              label: "检验结果"
            },
            {
              value: 104,
              label: "检验项目EN"
            },
            {
              value: 105,
              label: "异常标志"
            },
            {
              value: 106,
              label: "检验日期"
            },
            {
              value: 107,
              label: "检验数字结果"
            }
          ]
        },
        {
          value: 200,
          label: "诊断",
          children: [
            {
              value: 201,
              label: "诊断类型"
            },
            {
              value: 202,
              label: "诊断名称"
            },
            {
              value: 203,
              label: "诊断ID"
            },
            {
              value: 204,
              label: "诊断日期"
            },
            {
              value: 205,
              label: "icd—10"
            }
          ]
        }
      ],
      Drawer: false,
      modelHeight: 0,
      dialogTableVisible: false,
      searchName: ""
    };
  },
  watch: {
    topheight(val) {
      if (val) {
        this.setHeight();
      }
    }
  },
  mounted() {
    if (this.topheight) {
      this.setHeight();
    }
  },
  methods: {
    refresh() {
      console.log("shuaxing");
    },
    onDrawerShow() {
      this.Drawer = true;
    },
    closeDrawer() {
      this.Drawer = false;
    },
    setHeight() {
      this.height = window.innerHeight - (181 + this.topheight);
      this.modelHeight = window.innerHeight - 91;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    onHeaderClick(obj) {
      console.log(obj);
      this.dialogTableVisible = true;
      this.searchName = `[${obj.label}]`;
    }
  }
};
</script>
<style lang="scss">
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
        .el-cascader .el-input .el-input__inner {
          width: 200px;
        }
        .el-cascader__tags {
          display: flex;
          flex-wrap: nowrap;
          overflow: hidden;
        }
      }
      .searchTable-top-date {
        .el-date-editor.el-range-editor--mini {
          width: 250px !important;
          height: 30px;
        }
      }
      span {
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
    }
  }
}
</style>